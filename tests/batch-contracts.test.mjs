import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs/promises';
import ts from 'typescript';
const modules = {};
for (const name of ['offers','systems']) {
 const source = await fs.readFile(`app/${name}.ts`,'utf8');
 modules[name]={};new Function('exports','require',ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText)(modules[name],()=>modules.offers);
}
test('all twelve systems map to an actual offer or extra and explain 3–4 steps',()=>{
 assert.equal(modules.systems.SYSTEMS.length,12);
 for(const system of modules.systems.SYSTEMS){assert.ok([...modules.offers.ALL_OFFERS,...modules.offers.EXTRAS].some(offer=>offer.name===system.offerName));assert.ok(system.steps.length>=3&&system.steps.length<=4);assert.ok(system.headache&&system.result&&system.trades.length);}
});
test('all exported pages meet title, description and skip-target budgets',async()=>{
 const files=(await fs.readdir('out',{recursive:true})).filter(file=>file.endsWith('.html')&&!/404|500|_not-found/.test(file));
 const decode=text=>text.replace(/&amp;/g,'&').replace(/&#x27;/g,"'").replace(/&quot;/g,'"');
 for(const file of files){const html=await fs.readFile('out/'+file,'utf8');const title=decode(html.match(/<title>(.*?)<\/title>/)[1]);const desc=decode(html.match(/<meta name="description" content="([^"]*)/)[1]);assert.ok(title.length<=60,`${file}: title ${title.length}`);assert.ok(desc.length<=155,`${file}: description ${desc.length}`);if(html.includes('href="#main-content"'))assert.match(html,/<[^>]*id="main-content"[^>]*tabindex="-1"/,file);}
});
test('trade guides carry no broken-website examples (conversion fixes, 2 Oct: they read as a repair shop)',async()=>{
 const source=await fs.readFile('app/for/niches.ts','utf8');
 assert.doesNotMatch(source,/examples: \[|selfCheck: \[/);
 assert.match(source,/Add a second task: /);
});
test('no lime or cream left from the old palette (30 Sep orange swap)',async()=>{
 const files=(await fs.readdir('app',{recursive:true})).map(file=>'app/'+file).concat((await fs.readdir('public',{recursive:true})).map(file=>'public/'+file)).filter(file=>/\.(css|svg|tsx?)$/.test(file));
 for(const file of files){const text=await fs.readFile(file,'utf8');assert.doesNotMatch(text,/#(dfff2f|e6ff38|f3f0e8|f4f1e8|f4f1e9|fbfaf5)\b/i,file);}
});
