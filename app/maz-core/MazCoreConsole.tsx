"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Project = { name: string; branch?: string; dirty?: number; kind?: string; last_commit?: string };
type CoreStatus = {
  hostname?: string;
  ollama_model?: string;
  ollama?: { online?: boolean; selected_installed?: boolean };
  project_count?: number;
  bridge?: boolean;
  bridge_repo?: string;
  cardputer_url?: string;
};
type Health = { version?: string; pc_control?: boolean; bridge?: { enabled?: boolean; running?: boolean }; core?: CoreStatus };

type Job = { id: string; action: string; project: string; state: string; ok?: boolean | null; output?: string; error?: string };

const cleanBase = (value: string) => value.trim().replace(/\/+$/, "");

export default function MazCoreConsole() {
  const [base, setBase] = useState("");
  const [token, setToken] = useState("");
  const [connected, setConnected] = useState(false);
  const [health, setHealth] = useState<Health | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [cardputer, setCardputer] = useState<Record<string, unknown> | null>(null);
  const [log, setLog] = useState("Enter your private MAZ Core HTTPS URL and pairing token, then connect.");
  const [chat, setChat] = useState("");
  const [reply, setReply] = useState("");
  const [session, setSession] = useState("");
  const [busy, setBusy] = useState(false);
  const [job, setJob] = useState<Job | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    setBase(localStorage.getItem("mazCoreUrl") || "");
    setToken(sessionStorage.getItem("mazCoreToken") || "");
  }, []);

  const headers = useCallback(
    (json = false) => ({
      Authorization: `Bearer ${token}`,
      ...(json ? { "Content-Type": "application/json" } : {}),
    }),
    [token],
  );

  const api = useCallback(
    async (path: string, init?: RequestInit) => {
      const url = `${cleanBase(base)}${path}`;
      const response = await fetch(url, { cache: "no-store", ...init });
      if (!response.ok) {
        const detail = await response.text();
        throw new Error(`${response.status} ${detail || response.statusText}`);
      }
      return response;
    },
    [base],
  );

  const refresh = useCallback(async () => {
    if (!base || !token) return;
    try {
      const [h, p, c] = await Promise.all([
        api("/health", { headers: headers() }).then((r) => r.json()),
        api("/core/projects", { headers: headers() }).then((r) => r.json()),
        api("/core/cardputer/status", { headers: headers() }).then((r) => r.json()).catch(() => null),
      ]);
      setHealth(h);
      setProjects(p.projects || []);
      setCardputer(c);
      setConnected(true);
    } catch (error) {
      setConnected(false);
      setLog(`Refresh failed: ${String(error)}`);
    }
  }, [api, base, headers, token]);

  async function connect() {
    if (!base || !token) {
      setLog("Core URL and token are required.");
      return;
    }
    localStorage.setItem("mazCoreUrl", cleanBase(base));
    sessionStorage.setItem("mazCoreToken", token);
    setBusy(true);
    try {
      const response = await api("/health", { headers: headers() });
      const data: Health = await response.json();
      setHealth(data);
      setConnected(true);
      setLog(`Connected to MAZ Core ${data.version || ""}.`);
      await refresh();
    } catch (error) {
      setConnected(false);
      setLog(`Connection failed: ${String(error)}\nUse a private HTTPS endpoint (for example Tailscale Serve) when opening this console from the HTTPS Maz Works site.`);
    } finally {
      setBusy(false);
    }
  }

  async function ensureSession() {
    if (session) return session;
    const data = await api("/session/start", { method: "POST", headers: headers() }).then((r) => r.json());
    setSession(data.session_id);
    return data.session_id as string;
  }

  async function sendChat() {
    if (!chat.trim()) return;
    setBusy(true);
    try {
      const sid = await ensureSession();
      const data = await api("/turn/text", {
        method: "POST",
        headers: headers(true),
        body: JSON.stringify({ session_id: sid, route: "local", text: chat.trim() }),
      }).then((r) => r.json());
      setReply(data.reply || "No reply");
      setLog(JSON.stringify({ provider: data.provider, timings: data.timings }, null, 2));
      setChat("");
    } catch (error) {
      setReply(`Error: ${String(error)}`);
    } finally {
      setBusy(false);
    }
  }

  async function startJob(project: string, action: string) {
    setBusy(true);
    try {
      const data = await api("/core/job", {
        method: "POST",
        headers: headers(true),
        body: JSON.stringify({ project, action }),
      }).then((r) => r.json());
      setJob(data);
      setLog(JSON.stringify(data, null, 2));
    } catch (error) {
      setLog(`Job failed to start: ${String(error)}`);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    if (!connected) return;
    const timer = window.setInterval(refresh, 8000);
    return () => window.clearInterval(timer);
  }, [connected, refresh]);

  useEffect(() => {
    if (!job?.id || job.state === "done" || !connected) return;
    const timer = window.setInterval(async () => {
      try {
        const next: Job = await api(`/core/job/${encodeURIComponent(job.id)}`, { headers: headers() }).then((r) => r.json());
        setJob(next);
        if (next.state === "done") setLog(next.output || next.error || JSON.stringify(next, null, 2));
      } catch (error) {
        setLog(`Job refresh failed: ${String(error)}`);
      }
    }, 1500);
    return () => window.clearInterval(timer);
  }, [api, connected, headers, job?.id, job?.state]);

  useEffect(() => {
    if (!connected || !canvasRef.current) return;
    let stopped = false;
    const draw = async () => {
      if (stopped || !canvasRef.current) return;
      try {
        const response = await api("/core/cardputer/screen", { headers: headers() });
        const bytes = new Uint8Array(await response.arrayBuffer());
        if (bytes.length !== 240 * 135 * 2) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;
        const image = context.createImageData(240, 135);
        for (let p = 0, i = 0; p < 240 * 135; p++, i += 2) {
          const value = bytes[i] | (bytes[i + 1] << 8);
          const o = p * 4;
          image.data[o] = (((value >> 11) & 31) * 255) / 31;
          image.data[o + 1] = (((value >> 5) & 63) * 255) / 63;
          image.data[o + 2] = ((value & 31) * 255) / 31;
          image.data[o + 3] = 255;
        }
        context.putImageData(image, 0, 0);
      } catch {
        // Cardputer may be sleeping/offline while Core remains healthy.
      }
    };
    void draw();
    const timer = window.setInterval(draw, 500);
    return () => {
      stopped = true;
      window.clearInterval(timer);
    };
  }, [api, connected, headers]);

  const core = health?.core;
  const bridge = health?.bridge;
  const deviceOnline = Boolean(cardputer && cardputer.ok !== false);

  return (
    <main className="corePage">
      <div className="coreShell">
        <header className="coreHeader">
          <div>
            <h1><span className="accent">MAZ</span> CORE <span className="muted">v0.5</span></h1>
            <div className="muted small">Private browser client. This page ships with no Core URL, token or private endpoint.</div>
          </div>
          <div className={connected ? "good" : "muted"}>{connected ? "CORE ONLINE" : "DISCONNECTED"}</div>
        </header>

        <div className="grid">
          <section className="card wide">
            <h2>CONNECT</h2>
            <div className="stack">
              <input className="field" value={base} onChange={(e) => setBase(e.target.value)} placeholder="Private HTTPS Core URL (not stored in site source)" />
              <input className="field" type="password" value={token} onChange={(e) => setToken(e.target.value)} placeholder="MAZ pairing token" />
              <div className="row"><button className="button primary" onClick={connect} disabled={busy}>CONNECT</button><button className="button" onClick={refresh} disabled={!connected}>REFRESH</button></div>
              <div className="notice small">URL is kept in this browser&apos;s localStorage; token is kept only in sessionStorage. Use a tailnet/private HTTPS endpoint for remote access.</div>
            </div>
          </section>

          <section className="card">
            <h2>CORE STATUS</h2>
            <div className="kv">
              <span>PC</span><strong>{core?.hostname || "-"}</strong>
              <span>Local AI</span><strong>{core?.ollama_model || "-"}</strong>
              <span>Ollama</span><strong className={core?.ollama?.online ? "good" : "bad"}>{core?.ollama?.online ? "ONLINE" : "OFF"}</strong>
              <span>Projects</span><strong>{core?.project_count ?? projects.length}</strong>
              <span>Bridge</span><strong className={bridge?.running ? "good" : "muted"}>{bridge?.running ? "RUNNING" : bridge?.enabled ? "WAITING" : "OFF"}</strong>
            </div>
          </section>

          <section className="card">
            <h2>CARDPUTER</h2>
            <div className="kv">
              <span>Reachable</span><strong className={deviceOnline ? "good" : "bad"}>{deviceOnline ? "YES" : "NO"}</strong>
              <span>Version</span><strong>{String(cardputer?.version || "-")}</strong>
              <span>App</span><strong>{String(cardputer?.app || "-")}</strong>
              <span>Wi-Fi</span><strong>{String(cardputer?.wifi_ssid || "-")}</strong>
              <span>IP</span><strong>{String(cardputer?.ip || "-")}</strong>
            </div>
          </section>

          <section className="card wide">
            <h2>LOCAL AI / CHAT</h2>
            <div className="chat">
              <input className="field" value={chat} onChange={(e) => setChat(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") void sendChat(); }} placeholder="Ask about your actual PC/projects/device state..." />
              <button className="button primary" onClick={sendChat} disabled={!connected || busy}>SEND</button>
            </div>
            {reply && <pre className="log" style={{ marginTop: 10 }}>{reply}</pre>}
          </section>

          <section className="card wide">
            <h2>PROJECTS / SAFE ACTIONS</h2>
            {projects.length === 0 ? <div className="muted">No projects returned yet.</div> : projects.map((project) => (
              <div className="project" key={project.name}>
                <div className="projectTitle"><strong>{project.name}</strong><span className="muted">{project.branch || project.kind || ""}{project.dirty ? ` · ${project.dirty} dirty` : ""}</span></div>
                <div className="chips">
                  <button className="button" onClick={() => startJob(project.name, "git_status")}>STATUS</button>
                  <button className="button" onClick={() => startJob(project.name, "tests")}>TEST</button>
                  <button className="button" onClick={() => startJob(project.name, "build")}>BUILD</button>
                  <button className="button" onClick={() => startJob(project.name, "git_fetch")}>FETCH</button>
                  <button className="button" onClick={() => startJob(project.name, "git_pull_ff")}>PULL FF</button>
                </div>
              </div>
            ))}
            {job && <div className="notice small">Job {job.id}: {job.project} / {job.action} / <strong>{job.state}</strong></div>}
          </section>

          <section className="card wide">
            <h2>LIVE CARDPUTER LCD</h2>
            <canvas ref={canvasRef} className="screen" width={240} height={135} />
            <div className="muted small">~2 FPS LCD mirror through MAZ Core. The Cardputer ADV has no built-in camera; external camera hardware would be a separate input.</div>
          </section>

          <section className="card wide">
            <h2>RESULT / EVENT LOG</h2>
            <pre className="log">{log}</pre>
          </section>
        </div>
      </div>
    </main>
  );
}
