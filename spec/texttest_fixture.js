const { Shop, GenericItem, AgedBrie, Sulfuras, BackstagePasses } = require("../src/gilded_rose");

const items = [
  new GenericItem("+5 Dexterity Vest", 10, 20),
    new GenericItem("Elixir of the Mongoose", 5, 7),
    new GenericItem("Elixir of youth", 0, 2),
    new GenericItem("Elixir of bravour", -2, 3),
    new AgedBrie("Aged Brie", 2, 0),
    new Sulfuras("Sulfuras, Hand of Ragnaros", 0, 80),
    new Sulfuras("Sulfuras, Hand of Ragnaros", -1, 80),
    new BackstagePasses("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    new BackstagePasses("Backstage passes to a TAFKAL80ETC concert", 10, 49),
    new BackstagePasses("Backstage passes to a TAFKAL80ETC concert", 5, 49),
    new GenericItem("Conjured Mana Cake", 3, 6),
    new GenericItem("Magical Monkey Conjured Poo", 6, 30),
];

const days = Number(process.argv[2]) || 2;
const gildedRose = new Shop(items);

console.log("-~={ !! Welcome to the Gilded Rose SCM system !!! }=~-");
for (let day = 0; day < days; day++) {
  console.log(`\n-------- DAY ${day} --------`);
  console.log("[Inventory quality status]");
  console.log("  |  Name  |  Sell In  |  Quality  |");
  items.forEach(item => console.log(`  |  ${item.name}  |  ${item.sellIn}  |  ${item.quality}  |`));
  console.log("[Inventory quality nightly update]");
  gildedRose.updateQualityOfAllShopItems();
}
