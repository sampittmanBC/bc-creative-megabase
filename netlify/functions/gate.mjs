import fs from 'node:fs/promises';
import {authorised,loginPage,authHeaders} from '../../lib/auth.js';
export default async function gate(request){if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405,headers:{Allow:'GET, HEAD'}});const html=await fs.readFile('web/index.html','utf8');const body=await authorised(request,process.env)?html:loginPage(html,request,process.env);return new Response(request.method==='HEAD'?null:body,{headers:{...authHeaders,'Content-Type':'text/html; charset=utf-8'}})}
export const config={path:['/','/index.html']};
