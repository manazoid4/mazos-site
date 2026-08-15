"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type DeviceStatus = {
  ok?: boolean;
  version?: string;
  app?: string;
  wifi_ssid?: string;
  ip?: string;
  battery?: number;
};

type Health = {
  version?: string;
  core?: { hostname?: string; cardputer_url?: string };
  bridge?: { enabled?: boolean; running?: boolean; repo?: string };
};

const cleanBase = (value: string) => value.trim().replace(/\/+$/, "");

function parseHash() {
  if (typeof window === "undefined") return { core: "", token: "" };
  const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  return {
    core: params.get("core") || "",
    token: params.get("token") || "",
  };
}

export default function MazPocketAiBridge() {
  const [core, setCore] = useState("");
  const [token, setToken] = useState("");
  const [health, setHealth] = useState<Health | null>(null);
  const [device, setDevice] = useState<DeviceStatus | null>(null);
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState("This page contains no endpoint or secret until you supply them.");
  const [shareUrl, setShareUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const fromHash = parseHash();
    setCore(fromHash.core || localStorage.getItem("mazPocketAiCore") || "");
    setToken(fromHash.token || "");
  }, []);

  const headers = useMemo(
    () => ({ Authorization: `Bearer ${token}` }),
    [token],
  );

  const api = useCallback(
    async (path: string, init: RequestInit = {}) => {
      const response = await fetch(`${cleanBase(core)}${path}`, {
        cache: "no-store",
        ...init,
        headers: { ...headers, ...(init.headers || {}) },
      });
      if (!response.ok) throw new Error(`${response.status} ${await response.text()}`);
      return response;
    },
    [core, headers],
  );

  const refresh = useCallback(async () => {
    if (!core || !token) return;
    try {
      const [h, d] = await Promise.all([
        api("/health").then((r) => r.json()),
        api("/core/cardputer/status").then((r) => r.json()),
      ]);
      setHealth(h);
      setDevice(d);
      setConnected(true);
      setMessage("MAZ Core and Cardputer capability bridge are reachable.");
    } catch (error) {
      setConnected(false);
      setMessage(`Bridge unavailable: ${String(error)}`);
    }
  }, [api, core, token]);

  async function connect() {
    if (!core || !token) {
      setMessage("Private MAZ Core HTTPS URL and token are required.");
      return;
    }
    localStorage.setItem("mazPocketAiCore", cleanBase(core));
    await refresh();
  }

  function buildCapabilityLink() {
    if (!core || !token) {
      setMessage("Connect details are required before making a capability link.");
      return;
    }
    const hash = new URLSearchParams({ core: cleanBase(core), token }).toString();
    const url = `${window.location.origin}/maz-pocket-ai/#${hash}`;
    setShareUrl(url);
    setMessage("Capability link created. Treat it like a password: the token is in the URL fragment and is not sent to Maz Works, but anyone you give the full link to can use your MAZ Core allow-list while the token remains valid.");
  }

  async function copyCapabilityPack() {
    if (!core || !token) return;
    const pack = {
      kind: "maz-pocket-capability",
      version: 1,
      endpoint: cleanBase(core),
      authentication: { type: "bearer", token },
      safe_endpoints: {
        health: "GET /health",
        cardputer_status: "GET /core/cardputer/status",
        cardputer_screen: "GET /core/cardputer/screen (RGB565LE 240x135)",
        session_start: "POST /session/start",
        text_turn: "POST /turn/text",
        project_jobs: "POST /core/job and GET /core/job/{id}",
      },
      github_bridge: health?.bridge?.enabled
        ? { repo: health.bridge.repo, mode: "private [MAZ CORE] issue queue" }
        : { enabled: false },
      constraints: [
        "Use only the documented MAZ Core allow-list.",
        "Do not attempt arbitrary shell execution.",
        "Do not expose or log the bearer token.",
        "Cardputer firmware installation remains owned by M5Launcher.",
      ],
    };
    await navigator.clipboard.writeText(JSON.stringify(pack, null, 2));
    setMessage("AI access pack copied. Paste it only into an AI/agent you trust with this capability token.");
  }

  async function copyChatGptBridgePrompt() {
    const repo = health?.bridge?.repo?.trim();
    if (!health?.bridge?.enabled || !repo) {
      setMessage("The private GitHub bridge is not enabled in MAZ Core. Configure the private bridge first.");
      return;
    }
    const prompt = `You have GitHub access. Use the private repository ${repo} as my MAZ Core command queue. To reach my local PC/Cardputer, inspect the current manazoid4/maz-pocket MAZ Core bridge contract, then create a private issue titled [MAZ CORE] <short request> whose body is a JSON object using only a currently supported MazCore.dispatch command. Never request or invent arbitrary shell execution, secret-file reads, destructive git operations, or firmware partition writes. MAZ Core will process the issue locally, post factual JSON evidence, and close it. Read that result before taking another action. For live Cardputer status/screen or synchronous chat, use the separate authenticated MAZ Pocket capability pack when your environment supports bearer HTTPS. M5Launcher remains the only firmware-install owner.`;
    await navigator.clipboard.writeText(prompt);
    setMessage(`ChatGPT/GitHub bridge prompt copied for ${repo}. It uses the existing private issue queue rather than exposing MAZ Core publicly.`);
  }

  useEffect(() => {
    if (!connected) return;
    const timer = window.setInterval(refresh, 8000);
    return () => window.clearInterval(timer);
  }, [connected, refresh]);

  useEffect(() => {
    if (!connected || !canvasRef.current) return;
    let stopped = false;
    const draw = async () => {
      if (stopped || !canvasRef.current) return;
      try {
        const response = await api("/core/cardputer/screen");
        const bytes = new Uint8Array(await response.arrayBuffer());
        if (bytes.length !== 240 * 135 * 2) return;
        const context = canvasRef.current.getContext("2d");
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
        // Device can be offline while MAZ Core remains reachable.
      }
    };
    void draw();
    const timer = window.setInterval(draw, 1000);
    return () => {
      stopped = true;
      window.clearInterval(timer);
    };
  }, [api, connected]);

  return (
    <main className="aiBridgePage">
      <div className="aiBridgeShell">
        <header>
          <p className="eyebrow">MAZ WORKS / PRIVATE TOOL</p>
          <h1>MAZ Pocket AI Bridge</h1>
          <p className="lede">A private capability link from an AI-capable browser or agent to MAZ Core and the Cardputer. Maz Works never receives your token.</p>
        </header>

        <section className="bridgeCard">
          <h2>Connect</h2>
          <input value={core} onChange={(e) => setCore(e.target.value)} placeholder="Private HTTPS MAZ Core URL" />
          <input type="password" value={token} onChange={(e) => setToken(e.target.value)} placeholder="MAZ bearer token" />
          <div className="buttons">
            <button onClick={connect}>Connect</button>
            <button onClick={refresh} disabled={!connected}>Refresh</button>
          </div>
          <p className="notice">Use a private HTTPS endpoint you control. A capability link is a secret and should be revoked by rotating the MAZ token if it is exposed.</p>
        </section>

        <section className="bridgeGrid">
          <div className="bridgeCard">
            <h2>Core</h2>
            <dl>
              <dt>Status</dt><dd>{connected ? "ONLINE" : "OFFLINE"}</dd>
              <dt>Version</dt><dd>{health?.version || "-"}</dd>
              <dt>PC</dt><dd>{health?.core?.hostname || "-"}</dd>
              <dt>GitHub bridge</dt><dd>{health?.bridge?.enabled ? (health.bridge.repo || "ENABLED") : "OFF"}</dd>
            </dl>
          </div>
          <div className="bridgeCard">
            <h2>Cardputer</h2>
            <dl>
              <dt>Reachable</dt><dd>{device?.ok === false || !device ? "NO" : "YES"}</dd>
              <dt>Version</dt><dd>{device?.version || "-"}</dd>
              <dt>Surface</dt><dd>{device?.app || "-"}</dd>
              <dt>Wi-Fi</dt><dd>{device?.wifi_ssid || "-"}</dd>
              <dt>IP</dt><dd>{device?.ip || "-"}</dd>
            </dl>
          </div>
        </section>

        <section className="bridgeCard">
          <h2>AI capability</h2>
          <p>Create a private link for a trusted AI-capable client, copy a machine-readable bearer-HTTPS pack, or copy the private GitHub queue instructions for ChatGPT with GitHub access.</p>
          <div className="buttons">
            <button onClick={buildCapabilityLink}>Create private link</button>
            <button onClick={copyCapabilityPack}>Copy AI access pack</button>
            <button onClick={copyChatGptBridgePrompt} disabled={!health?.bridge?.enabled}>Copy ChatGPT bridge prompt</button>
          </div>
          {shareUrl && <textarea readOnly value={shareUrl} rows={4} />}
        </section>

        <section className="bridgeCard">
          <h2>Live Cardputer LCD</h2>
          <canvas ref={canvasRef} className="cardputerScreen" width={240} height={135} />
        </section>

        <pre className="statusLog">{message}</pre>
      </div>
    </main>
  );
}
