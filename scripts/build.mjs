import {mkdir,copyFile,rm} from 'node:fs/promises';
await rm('public',{recursive:true,force:true});await mkdir('public',{recursive:true});
for(const file of ['index.html','style.css','app.js'])await copyFile('web/'+file,'public/'+file);
console.log('Netlify frontend built; live data is served by the directory function.');
