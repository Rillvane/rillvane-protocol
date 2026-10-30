// Explicit operator command. Does not create mints, generate keys or reuse a private deployment.
import {existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {spawn} from 'node:child_process';
const payer=process.env.DEPLOYER_KEYPAIR_PATH,program=process.env.PROGRAM_KEYPAIR_PATH;
if(!payer||!program)throw new Error('Set DEPLOYER_KEYPAIR_PATH and PROGRAM_KEYPAIR_PATH to your own private keypair files.');
const artifact=resolve(process.env.PROGRAM_ARTIFACT||'programs/rillvane/target/deploy/rillvane.so');
for(const file of [payer,program,artifact])if(!existsSync(resolve(file)))throw new Error('Deployment input file is missing; build SBF and provision your own keypairs first.');
const child=spawn('solana',['program','deploy',artifact,'--url','https://api.devnet.solana.com','--keypair',resolve(payer),'--program-id',resolve(program)],{stdio:'inherit',shell:false});
child.on('error',()=>{console.error('Solana CLI could not start. Install the Solana toolchain.');process.exitCode=1;});
child.on('exit',code=>{process.exitCode=code??1;});
