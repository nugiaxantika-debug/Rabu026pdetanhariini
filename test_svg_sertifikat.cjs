const sharp = require('sharp');
async function test() {
   const svg = `
   <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="600" fill="#fcfcfc" />
      <rect x="20" y="20" width="760" height="560" fill="none" stroke="#d4af37" stroke-width="15" />
      <rect x="30" y="30" width="740" height="540" fill="none" stroke="#d4af37" stroke-width="2" />
      
      <text x="400" y="120" font-family="Arial" font-size="50" font-weight="bold" fill="#333" text-anchor="middle">SERTIFIKAT</text>
      <text x="400" y="170" font-family="Arial" font-size="20" fill="#666" text-anchor="middle">DIBERIKAN KEPADA</text>
      
      <text x="400" y="270" font-family="Georgia" font-size="60" font-weight="bold" font-style="italic" fill="#000" text-anchor="middle">NAMA_DISINI</text>
      <line x1="150" y1="290" x2="650" y2="290" stroke="#000" stroke-width="2" />
      
      <text x="400" y="350" font-family="Arial" font-size="24" fill="#333" text-anchor="middle">Sebagai Orang Paling</text>
      <text x="400" y="420" font-family="Arial" font-size="50" font-weight="bold" fill="#d4af37" text-anchor="middle">BAIK</text>
      
      <text x="400" y="520" font-family="Arial" font-size="16" fill="#999" text-anchor="middle">Resmi Dikeluarkan oleh Bot WhatsApp</text>
   </svg>
   `;
   await sharp(Buffer.from(svg)).webp().toFile('sertifikat.webp');
   console.log("Generated sertifikat.webp");
}
test();
