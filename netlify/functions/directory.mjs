import { loadSheet } from '../../lib/sheet.js';
let cached = null;
let pending = null;
export default async function directory(request) {
  if (!['GET', 'HEAD'].includes(request.method)) return new Response('Method not allowed', {status:405,headers:{Allow:'GET, HEAD'}});
  try {
    if (!cached || Date.now() - cached.time >= 45000) {
      if (!pending) pending = loadSheet().then(data => {cached={data,time:Date.now()};return {...data,stale:false}}).catch(error => {if(cached)return {...cached.data,stale:true};throw error}).finally(()=>pending=null);
      const data=await pending;
      return reply(data,request.method);
    }
    return reply({...cached.data,stale:false},request.method);
  } catch {
    return reply({error:'The live sheet could not be read. Check its viewing permissions and try again.'},request.method,503);
  }
}
function reply(data,method,status=200){return new Response(method==='HEAD'?null:JSON.stringify(data),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','Netlify-CDN-Cache-Control':'no-store'}})}
export const config = { path: '/api/directory' };
