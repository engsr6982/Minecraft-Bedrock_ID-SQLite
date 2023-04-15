const fs = require('fs');

const minecraft = require('../JSON/minecraft-0.3.json');
const mcidOld = require('../JSON/mcid-old.json');

for (const itemOld of mcidOld.mcid) {
    for (const item of minecraft.RECORDS) {
        if (itemOld.id === item.id && itemOld.dv === item.dv) {
            item.path = itemOld.path;
        }
    }
}
fs.writeFile('./ok.json', JSON.stringify(minecraft), (err) => {
    if (err) throw err;
    console.log('更新成功');
});