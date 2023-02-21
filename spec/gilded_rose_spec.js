const { Shop, GenericItem, AgedBrie, Sulfuras, BackstagePasses } = require('../src/gilded_rose.js');

const testItems = [
  new GenericItem("+5 Dexterity Vest", 10, 20),
  new GenericItem("Elixir of the Mongoose", 5, 7),
  new GenericItem("Elixir of youth", 0, 2),
  new GenericItem("Elixir of bravour", -2, 3),
  new AgedBrie("Aged Brie", 2, 5),
  new AgedBrie("Aged Brie", 2, -5),
  new BackstagePasses("Backstage passes to a TAFKAL80ETC concert", 15, 49),
  new BackstagePasses("Backstage passes to a TAFKAL80ETC concert", 10, 48),
  new BackstagePasses("Backstage passes to a TAFKAL80ETC concert", 5, 47),
  new BackstagePasses("Backstage passes to a TAFKAL80ETC concert", 0, 50),
  new Sulfuras("Sulfuras, Hand of Ragnaros"),
  new Sulfuras("Sulfuras, Hand of Ragnaros", -99, 99),
  new Sulfuras("Sulfuras, Hand of Ragnaros", 0, 80),
  new Sulfuras("Sulfuras, Hand of Ragnaros", -1, -20),
  new GenericItem("Conjured Mana Cake", 3, 2),
  new GenericItem("Magical Monkey Conjured Poo", 0, 4),
];
const testGildedRose = new Shop(testItems);
const updatedTestItems = testGildedRose.updateQualityOfAllShopItems();
let myTest;

describe("Gilded Rose Test Bank", function() {

  it("Test type #1.a - Quality decreases by 1 point every day before deadline", function() {
    myTest = updatedTestItems[0];
    console.log(`\n - ${myTest.name}`);
    expect(updatedTestItems[0].sellIn).toBe(9);
    expect(updatedTestItems[0].quality).toBe(19);
  });

  it("Test type #1.b - Quality decreases by 1 point every day before deadline", function() {
    myTest = updatedTestItems[1];
    console.log(`\n - ${myTest.name}`);
    expect(myTest.sellIn).toBe(4);
    expect(myTest.quality).toBe(6);
  });

  it("Test type #2.a - Quality decreases by 2 points every day, once beyond deadline", function() {
    myTest = updatedTestItems[2];
    console.log(`\n - ${myTest.name}`);
    expect(myTest.sellIn).toBe(-1);
    expect(myTest.quality).toBe(0);
  });

  it("Test type #2.b - Quality decreases by 2 points every day, once beyond deadline", function() {
    myTest = updatedTestItems[3];
    console.log(`\n - ${myTest.name}`);
    expect(myTest.sellIn).toBe(-3);
    expect(myTest.quality).toBe(1);
  });

  it("Test type #3.a - Quality increases by 1 daily for Aged Brie", function() {
    myTest = updatedTestItems[4];
    console.log(`\n - ${myTest.name}`);
    expect(myTest.sellIn).toBe(1);
    expect(myTest.quality).toBe(6);
  });

  it("Test type #3.a - Quality cannot be less than 0 (from creation ahead) for Aged Brie", function() {
    myTest = updatedTestItems[5];
    console.log(`\n - ${myTest.name}`);
    expect(myTest.sellIn).toBe(1);
    expect(myTest.quality).toBe(1);
  });

  it("Test type #3.b - Quality increases by 1 daily for Backstage tickets when concert date in more than 10 days", function() {
    myTest = updatedTestItems[6];
    console.log(`\n - ${myTest.name}`);
    expect(myTest.sellIn).toBe(14);
    expect(myTest.quality).toBe(50);
  });

  it("Test type #4 - Quality increases by 2 daily for Backstage tickets when concert date between 10 and 6 days (included)", function() {
    myTest = updatedTestItems[7];
    console.log(`\n - ${myTest.name}`);
    expect(myTest.sellIn).toBe(9);
    expect(myTest.quality).toBe(50);
  });

  it("Test type #5 - Quality increases by 3 daily for Backstage tickets when concert date between 5 and actual show day (included)", function() {
    myTest = updatedTestItems[8];
    console.log(`\n - ${myTest.name}`);
    expect(myTest.sellIn).toBe(4);
    expect(myTest.quality).toBe(50);
  });

  it("Test type #6 - Quality of Backstage tickets falls down to 0 once beyond concert date", function() {
    myTest = updatedTestItems[9];
    console.log(`\n - ${myTest.name}`);
    expect(myTest.sellIn).toBe(-1);
    expect(myTest.quality).toBe(0);
  });

  it("Test type #7.a - Sulfuras quality and sell in values are 0 and 80 from creation even if no values are passed to the constructor", function() {
    myTest = updatedTestItems[10];
    console.log(`\n - ${myTest.name}`);
    expect(myTest.sellIn).toBe(0);
    expect(myTest.quality).toBe(80);
  });

  it("Test type #7.b - Sulfuras quality and sell in values are 0 and 80 from creation even if hazardous values are passed to the constructor", function() {
    myTest = updatedTestItems[11];
    console.log(`\n - ${myTest.name}`);
    expect(myTest.sellIn).toBe(0);
    expect(myTest.quality).toBe(80);
  });

  it("Test type #7.c - Sulfuras quality and sell in values remain 0 and 80 from creation", function() {
    myTest = updatedTestItems[12];
    console.log(`\n - ${myTest.name}`);
    expect(myTest.sellIn).toBe(0);
    expect(myTest.quality).toBe(80);
  });

  it("Test type #7.c - Sulfuras quality and sell in values are 0 and 80 from creation even if negative values are passed to the constructor", function() {
    myTest = updatedTestItems[13];
    console.log(`\n - ${myTest.name}`);
    expect(myTest.sellIn).toBe(0);
    expect(myTest.quality).toBe(80);
  });

  it("Test type #8 - Conjured object generally loose 2 quality points per day", function() {
    myTest = updatedTestItems[14];
    console.log(`\n - ${myTest.name}`);
    expect(myTest.sellIn).toBe(2);
    expect(myTest.quality).toBe(0);
  });

  it("Test type #9 - Conjured object loose 4 quality points per day, once their 'sell in' date overpassed", function() {
    myTest = updatedTestItems[15];
    console.log(`\n - ${myTest.name}`);
    expect(myTest.sellIn).toBe(-1);
    expect(myTest.quality).toBe(0);
  });

});

// Est-ce que, à chaque appel de "updateQualityOfAllShopItems()" :
//   1) La qualité (quality) baisse bien de 1 pour la plupart des items (GenericItems) tant que la date de vente n'est pas dépassée ?
//   2) La qualité (quality) de ces mêmes objets génériques baisse de 2 points par jour une fois la date de péremption dépassée ?
//   3) La qualité (quality) augmente bien de 1 pour les items concernés (ex: Aged Brie, Backstage tickets when concert date in more than 10 days) 
//   4) La qualité (quality) augmente par ailleurs de 2 quand il reste entre 10 et 6 jours (inclus) avant la date limite de vente (sellIn) pour certains items (ex: Backstage passes) ?
//   5) La qualité (quality) augmente encore de 3 quand il reste entre 5 et 0 jours (inclus) avant la date limite de vente (sellIn) pour certains items (ex: Backstage passes) ?
//   6) La qualité (quality) passe et reste à 0 quand la date limite de vente (sellIn) est dépassée pour certains items (ex: Backstage passes) ?
//   7) La qualité (quality) de l'objet "Sulfuras" ne change jamais (valorisée à 80 par défaut) ; pas plus que sa date limite de vente (valorisée à 0 jour) ?
//   8) La qualité des objets "conjured" encore vendables (sellIn >= 0) décroit 2 fois plus vite (i.e. -2 points par jour) que celle des autres objets
//   9) La qualité des objets "conjured" périmés (sellIn < 0) décroit 2 fois plus vite (i.e. -4 points par jour) que celle des autres objets
 