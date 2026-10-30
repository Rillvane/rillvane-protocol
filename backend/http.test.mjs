import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,writeFile,mkdir,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createApplication} from './server.mjs';
test('API-only service does not expose frontend or filesystem content',async t=>{
 const app=createApplication({dbPath:':memory:',keys:null,workerEnabled:false});
 await new Promise(r=>app.server.listen(0,'127.0.0.1',r));t.after(()=>app.close());
 const base='http://127.0.0.1:'+app.server.address().port;
 assert.equal((await fetch(base+'/api/health')).status,200);
 for(const path of ['/','/.env','/app/','/assets/mark.svg'])assert.equal((await fetch(base+path)).status,404);
});
test('explicit frontend root supports the sibling app at /',async t=>{
 const root=await mkdtemp(join(tmpdir(),'rillvane-public-http-'));await mkdir(join(root,'app'));await writeFile(join(root,'app/index.html'),'<main>Workspace</main>');
 const app=createApplication({dbPath:':memory:',keys:null,workerEnabled:false,staticRoot:root,siteMode:'app'});
 await new Promise(r=>app.server.listen(0,'127.0.0.1',r));
 t.after(async()=>{await app.close();await rm(root,{recursive:true,force:true});});
 const base='http://127.0.0.1:'+app.server.address().port;
 assert.match(await(await fetch(base+'/')).text(),/Workspace/);
 const legacy=await fetch(base+'/app/?ref=old',{redirect:'manual'});assert.equal(legacy.status,308);assert.equal(legacy.headers.get('location'),'/?ref=old');
});
