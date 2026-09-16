const fs = require('fs');
const file = 'src/services/whatsapp.ts';
let code = fs.readFileSync(file, 'utf8');
const menus = [
  'downloadmenu', 'groupmenu', 'gamemenu', 'ownermenu', 'funmenu', 'margamenu',
  'videomenu', 'stickermenu', 'cecanmenu', 'primbonmenu', 'animemenu', 'kristenmenu',
  'islammenu', 'sertifikatmenu', 'rpgmenu', 'storemenu', 'beritamenu', 'sulapmenu',
  'hentaimenu', 'hantumenu', 'bokepmenu', 'aimenu', 'postermenu', 'coganmenu',
  'toolsmenu', 'devicemenu', 'tiketmenu', 'karyawanmenu', 'hewanmenu', 'cdramamenu',
  'fakecallmenu', 'iqcmenu'
];
for(const menu of menus) {
  const match = code.match(new RegExp(`(} else if \\(body === "${menu}"[^\\)]+\\) \\{\\s+await this\\.sendLoadingAnimation)`));
  if (!match) console.log("Missing:", menu);
}
