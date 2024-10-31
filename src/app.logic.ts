
import fs from 'fs';
import { yarg } from './config/plugins/args.plugin';

console.log(yarg);

let outputMessage = '';
const {b: base, l: limit, s: showTable} = yarg;
const headerMessage = `
================================================
        Tabla del ${base}
================================================
`;

for (let i = 1; i <= limit; i++) {
    outputMessage += `${base} x ${i} = ${base*i}\n`; 
}

outputMessage = headerMessage + outputMessage; 
if(showTable) console.log(outputMessage);

const outputPath = 'ejemplo';

fs.mkdirSync(outputPath, {recursive: true});
fs.writeFileSync(`${outputPath}/table-${base}.txt`, outputMessage);
console.log("The File was created");

