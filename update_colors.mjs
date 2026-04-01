import fs from 'fs';
import path from 'path';

const SRC_DIR = './src';

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      filelist = walkSync(filePath, filelist);
    } else {
      if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
        filelist.push(filePath);
      }
    }
  });
  return filelist;
};

const mappings = [
  { from: /blue-500/g, to: 'red-600' },
  { from: /blue-400/g, to: 'red-500' },
  { from: /cyan-400/g, to: 'red-400' },
  { from: /cyan-500/g, to: 'red-500' },
  { from: /purple-500/g, to: 'rose-600' },
  { from: /purple-400/g, to: 'rose-500' },
  { from: /rose-500/g, to: 'red-500' }, // Map rose-500 back to red-500 just in case
  { from: /#060810/g, to: '#050000' },
  { from: /#0c1020/g, to: '#0a0000' },
  { from: /#111627/g, to: '#0f0000' },
  { from: /rgba\(15, 20, 40, 0\.55\)/g, to: 'rgba(25, 0, 0, 0.55)' }, // Global css bg glass
  { from: /#f0f3ff/g, to: '#ffe5e5' }, // Text primary
  { from: /#8e9cbf/g, to: '#b38080' }, // Text secondary
  { from: /#5b6a91/g, to: '#805555' }, // Text muted
  // Globals.css vars
  { from: /--color-accent-blue: #3b82f6/g, to: '--color-accent-blue: #dc2626' }, // map to red
  { from: /--color-accent-cyan: #06b6d4/g, to: '--color-accent-cyan: #ef4444' }, // map to lighter red
  { from: /--color-accent-purple: #8b5cf6/g, to: '--color-accent-purple: #e11d48' }, // map to rose
];

const files = walkSync(SRC_DIR);
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  mappings.forEach(map => {
    content = content.replace(map.from, map.to);
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${file}`);
  }
});
