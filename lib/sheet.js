import * as XLSX from 'xlsx/xlsx.mjs';
export const SHEET_ID='1M_rLNXPx0IgnJ47l1HRQvpp9A9gCKLEjNn6AvicMb40';
function text(c){return String(c?.v??'').trim()}
function safeUrl(value,email=false){let s=String(value||'').trim();if(email&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s))return 'mailto:'+s;if(s.startsWith('www.'))s='https://'+s;try{const u=new URL(s);return ['http:','https:'].includes(u.protocol)?u.href:null}catch{return null}}
export function parseWorkbook(bytes){const book=XLSX.read(bytes,{type:'array'});return book.SheetNames.map(name=>{
 const sheet=book.Sheets[name],range=XLSX.utils.decode_range(sheet['!ref']||'A1');let headerRow=-1,cols={};
 const cell=(r,c)=>sheet[XLSX.utils.encode_cell({r,c})];
 for(let r=range.s.r;r<=Math.min(range.e.r,range.s.r+20);r++){let h={};for(let c=range.s.c;c<=range.e.c;c++){let label=text(cell(r,c)).toUpperCase().replace(/\s+/g,' ');if(label)h[label]=c}if(h.NAME!==undefined){headerRow=r;cols=h;break}}
 if(headerRow<0)return {name,entries:[]};
 let section='',entries=[];const imageCol=cols['PORTFOLIO IMAGE'];const linkCols=Object.entries(cols).filter(([h])=>/^(LINK|WEBSITE|PORTFOLIO|EMAIL|CONTACT)/.test(h)&&h!=='PORTFOLIO IMAGE').map(([,c])=>c);
 for(let r=headerRow+1;r<=range.e.r;r++){
  let person=text(cell(r,cols.NAME));if(!person||person.startsWith('{:'))continue;
  const links=[...new Set(linkCols.map(c=>{let v=cell(r,c);return safeUrl(v?.l?.Target||text(v),true)}).filter(Boolean))];
  let ic=imageCol===undefined?null:cell(r,imageCol);let image=safeUrl(ic?.l?.Target||text(ic));
  const notes=Object.entries(cols).filter(([h,c])=>c!==cols.NAME&&c!==imageCol&&!linkCols.includes(c)&&!['`','X'].includes(h)).map(([h,c])=>{let v=text(cell(r,c));return v?h+': '+v:null}).filter(Boolean);
  if(!links.length&&!image&&!notes.length&&person===person.toUpperCase()&&person.length<80){section=person;continue}
  entries.push({name:person,url:links.find(u=>!u.startsWith('mailto:'))||null,links,notes,section,image,imageStatus:image?'Portfolio image':'No portfolio image supplied'});
 }
 return {name,entries};
})}
export async function loadSheet(){const response=await fetch(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=xlsx`,{signal:AbortSignal.timeout(20000),headers:{'Cache-Control':'no-cache'}});if(!response.ok)throw Error('Sheet is not accessible');const bytes=await response.arrayBuffer();const signature=new Uint8Array(bytes);if(signature[0]!==80||signature[1]!==75)throw Error('Sheet requires public viewing access');return {groups:parseWorkbook(bytes),updatedAt:new Date().toISOString()}}
