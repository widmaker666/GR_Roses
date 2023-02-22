const { Shop, GenericItem, AgedBrie, Sulfuras, BackstagePasses } = require("../src/gilded_rose");

const items = [
  new GenericItem("+5 Dexterity Vest", 10, 20),
    new GenericItem("Elixir of the Mongoose", 5, 7),
    new GenericItem("Elixir of youth", 0, 2),
    new GenericItem("Elixir of bravour", -2, 3),
    new AgedBrie("Aged Brie", 2, 0),
    new Sulfuras("Sulfuras, la main de Ragnaros", 0, 80),
    new Sulfuras("Sulfuras, la main de Ragnaros", -1, 80),
    new BackstagePasses("Des laissez-passer pour les coulisses d'un concert de TAFKAL80ETC.", 15, 20),
    new BackstagePasses("Des laissez-passer pour les coulisses d'un concert de TAFKAL80ETC.", 10, 49),
    new BackstagePasses("Des laissez-passer pour les coulisses d'un concert de TAFKAL80ETC.", 5, 49),
    new GenericItem("Conjured Mana Cake", 3, 6),
    new GenericItem("Singe Magique Conjuré Poo", 6, 30),
];

const days = Number(process.argv[2]) || 2;
const gildedRose = new Shop(items);

console.log("-~={ !! Bienvenue au système SCM de la Rose dorée !!! }=~-");
for (let day = 0; day < days; day++) {
  console.log(`\n-------- JOUR ${day} --------`);
  console.log("[État de la qualité des stocks]");
  console.log("  | Nom | Vendre en | Qualité |");
  items.forEach(item => console.log(`  |  ${item.name}  |  ${item.sellIn}  |  ${item.quality}  |`));
  console.log("[Mise à jour nocturne de la qualité de l'inventaire]");
  gildedRose.updateQualityOfAllShopItems();
}
