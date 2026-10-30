import {readdir} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {existsSync} from 'node:fs';
async function check(dir){for(const item of await readdir(dir,{withFileTypes:true})){const file=dir+'/'+item.name;if(item.isDirectory())await check(file);else if(/\.m?js$/.test(file)){const result=spawnSync(process.execPath,['--check',file],{stdio:'inherit'});if(result.status!==0)process.exit(result.status||1);}}}
for(const dir of ['backend','scripts','tools'])if(existsSync(dir))await check(dir);
console.log('JavaScript syntax checks passed.');
