const fs = require('fs');
let code = fs.readFileSync('src/services/whatsapp.ts', 'utf8');

const oldIQC = `             const iqcPkg = await import('iqc-canvas');
             const generateIQC = iqcPkg.default?.generateIQC || iqcPkg.generateIQC || require('iqc-canvas').generateIQC;`;

const newIQC = `             const iqcPkg = require('iqc-canvas');
             const generateIQC = iqcPkg.generateIQC || iqcPkg.default?.generateIQC;`;

if (code.includes(oldIQC)) {
    code = code.replace(oldIQC, newIQC);
    fs.writeFileSync('src/services/whatsapp.ts', code);
    console.log("Patched iqc import successfully.");
} else {
    console.log("Failed to find iqc import.");
}
