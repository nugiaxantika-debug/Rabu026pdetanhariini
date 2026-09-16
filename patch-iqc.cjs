const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, 'node_modules/iqc-canvas/dist/cjs/index.cjs'),
  path.join(__dirname, 'node_modules/iqc-canvas/dist/esm/index.js')
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    content = content.replace(
      /ctx\.fillStyle = '#1a1a1a';/g,
      "ctx.fillStyle = ctx.bubbleColor || '#1a1a1a';"
    );
    
    content = content.replace(
      /ctx\.fillStyle = '#ffffff';\n\tlet y = bubbleY \+ \(reply \? 30 : 40\) \+ REPLY_H;/g,
      "ctx.fillStyle = ctx.textColor || '#ffffff';\n\tlet y = bubbleY + (reply ? 30 : 40) + REPLY_H;"
    );
    content = content.replace(
      /ctx\.fillStyle = '#ffffff';\n\t\t\t\tctx\.fillText\(segment\.value, x, y\);/g,
      "ctx.fillStyle = ctx.textColor || '#ffffff';\n\t\t\t\tctx.fillText(segment.value, x, y);"
    );
    
    content = content.replace(
      /const ctx = canvas\.getContext\('2d'\);/g,
      "const ctx = canvas.getContext('2d');\n\tctx.bubbleColor = opts.bubbleColor;\n\tctx.textColor = opts.textColor;"
    );

    fs.writeFileSync(file, content);
  }
}
console.log("iqc-canvas patched successfully!");
