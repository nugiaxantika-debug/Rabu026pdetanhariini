const fs = require('fs');

let code = fs.readFileSync('src/services/whatsapp.ts', 'utf8');

const oldStkBaik = `             const cleanName = text.substring(0, 20).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
             const svg = \`
               <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                  <rect width="800" height="600" fill="#fcfcfc" />
                  <rect x="20" y="20" width="760" height="560" fill="none" stroke="#d4af37" stroke-width="15" />
                  <rect x="30" y="30" width="740" height="540" fill="none" stroke="#d4af37" stroke-width="2" />
                  <text x="400" y="120" font-family="Arial" font-size="50" font-weight="bold" fill="#333" text-anchor="middle">SERTIFIKAT</text>
                  <text x="400" y="170" font-family="Arial" font-size="20" fill="#666" text-anchor="middle">DIBERIKAN KEPADA</text>
                  <text x="400" y="270" font-family="Georgia" font-size="60" font-weight="bold" font-style="italic" fill="#000" text-anchor="middle">\${cleanName}</text>
                  <line x1="150" y1="290" x2="650" y2="290" stroke="#000" stroke-width="2" />
                  <text x="400" y="350" font-family="Arial" font-size="24" fill="#333" text-anchor="middle">Sebagai Orang Paling</text>
                  <text x="400" y="420" font-family="Arial" font-size="50" font-weight="bold" fill="#d4af37" text-anchor="middle">\${type}</text>
                  <text x="400" y="520" font-family="Arial" font-size="16" fill="#999" text-anchor="middle">Resmi Dikeluarkan oleh Bot WhatsApp</text>
               </svg>\`;`;

const newStkBaik = `             const cleanName = text.substring(0, 20);
             const TextToSVG = (await import('text-to-svg')).default;
             const fontPath = await this.getValidFontPath();
             const textToSVG = TextToSVG.loadSync(fontPath);

             let svgPaths = '';
             svgPaths += textToSVG.getPath('SERTIFIKAT', { fontSize: 50, anchor: 'center baseline', attributes: { fill: '#333' }, x: 400, y: 120 });
             svgPaths += textToSVG.getPath('DIBERIKAN KEPADA', { fontSize: 20, anchor: 'center baseline', attributes: { fill: '#666' }, x: 400, y: 170 });
             svgPaths += textToSVG.getPath(cleanName, { fontSize: 60, anchor: 'center baseline', attributes: { fill: '#000' }, x: 400, y: 270 });
             svgPaths += textToSVG.getPath('Sebagai Orang Paling', { fontSize: 24, anchor: 'center baseline', attributes: { fill: '#333' }, x: 400, y: 350 });
             svgPaths += textToSVG.getPath(type, { fontSize: 50, anchor: 'center baseline', attributes: { fill: '#d4af37' }, x: 400, y: 420 });
             svgPaths += textToSVG.getPath('Resmi Dikeluarkan oleh Bot WhatsApp', { fontSize: 16, anchor: 'center baseline', attributes: { fill: '#999' }, x: 400, y: 520 });

             const svg = \`
               <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                  <rect width="800" height="600" fill="#fcfcfc" />
                  <rect x="20" y="20" width="760" height="560" fill="none" stroke="#d4af37" stroke-width="15" />
                  <rect x="30" y="30" width="740" height="540" fill="none" stroke="#d4af37" stroke-width="2" />
                  <line x1="150" y1="290" x2="650" y2="290" stroke="#000" stroke-width="2" />
                  \${svgPaths}
               </svg>\`;`;

if (code.includes(oldStkBaik)) {
    code = code.replace(oldStkBaik, newStkBaik);
    fs.writeFileSync('src/services/whatsapp.ts', code);
    console.log("Patched stkbaik successfully.");
} else {
    console.log("Failed to find stkbaik block.");
}
