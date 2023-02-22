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

  it("Test type #1.a -La qualité diminue d'un point chaque jour avant l'échéance.", function() {
    myTest = updatedTestItems[0];
    console.log(`\n - ${myTest.name}`);
    expect(updatedTestItems[0].sellIn).toBe(9);
    expect(updatedTestItems[0].quality).toBe(19);
  });

  it("Test type #1.b - La qualité diminue d'un point chaque jour avant l'échéance.", function() {
    myTest = updatedTestItems[1];
    console.log(`\n - ${myTest.name}`);
    expect(myTest.sellIn).toBe(4);
    expect(myTest.quality).toBe(6);
  });

  it("Test type #2.a - La qualité diminue de 2 points par jour, une fois le délai dépassé.", function() {
    myTest = updatedTestItems[2];
    console.log(`\n - ${myTest.name}`);
    expect(myTest.sellIn).toBe(-1);
    expect(myTest.quality).toBe(0);
  });

  it("Test type #2.b - La qualité diminue de 2 points par jour, une fois le délai dépassé.", function() {
    myTest = updatedTestItems[3];
    console.log(`\n - ${myTest.name}`);
    expect(myTest.sellIn).toBe(-3);
    expect(myTest.quality).toBe(1);
  });

  it("Test type #3.a - La qualité augmente de 1 par jour pour le brie vieilli.", function() {
    myTest = updatedTestItems[4];
    console.log(`\n - ${myTest.name}`);
    expect(myTest.sellIn).toBe(1);
    expect(myTest.quality).toBe(6);
  });

  it("Test type #3.a - La qualité ne peut pas être inférieure à 0 (de la création à venir) pour le Brie vieilli.", function() {
    myTest = updatedTestItems[5];
    console.log(`\n - ${myTest.name}`);
    expect(myTest.sellIn).toBe(1);
    expect(myTest.quality).toBe(1);
  });

  it("Test type #3.b - La qualité augmente de 1 par jour pour les billets Backstage lorsque la date du concert est supérieure à 10 jours.", function() {
    myTest = updatedTestItems[6];
    console.log(`\n - ${myTest.name}`);
    expect(myTest.sellIn).toBe(14);
    expect(myTest.quality).toBe(50);
  });

  it("Test type #4 - La qualité augmente de 2 par jour pour les billets Backstage lorsque la date du concert se situe entre 10 et 6 jours (inclus).", function() {
    myTest = updatedTestItems[7];
    console.log(`\n - ${myTest.name}`);
    expect(myTest.sellIn).toBe(9);
    expect(myTest.quality).toBe(50);
  });

  it("Test type #5 - La qualité augmente de 3 par jour pour les billets Backstage lorsque la date du concert se situe entre 5 et le jour du spectacle (inclus).", function() {
    myTest = updatedTestItems[8];
    console.log(`\n - ${myTest.name}`);
    expect(myTest.sellIn).toBe(4);
    expect(myTest.quality).toBe(50);
  });

  it("Test type #6 - La qualité des billets Backstage tombe à zéro une fois la date du concert dépassée.", function() {
    myTest = updatedTestItems[9];
    console.log(`\n - ${myTest.name}`);
    expect(myTest.sellIn).toBe(-1);
    expect(myTest.quality).toBe(0);
  });

  it("Test type #7.a - Les valeurs de qualité et de vente des sulfuras sont de 0 et 80 dès la création, même si aucune valeur n'est passée au constructeur.", function() {
    myTest = updatedTestItems[10];
    console.log(`\n - ${myTest.name}`);
    expect(myTest.sellIn).toBe(0);
    expect(myTest.quality).toBe(80);
  });

  it("Test type #7.b - Les valeurs de qualité et de vente des sulfuras sont de 0 et 80 dès la création, même si des valeurs dangereuses sont passées au constructeur.", function() {
    myTest = updatedTestItems[11];
    console.log(`\n - ${myTest.name}`);
    expect(myTest.sellIn).toBe(0);
    expect(myTest.quality).toBe(80);
  });

  it("Test type #7.c - Les valeurs de qualité et de vente de Sulfuras restent 0 et 80 depuis la création.", function() {
    myTest = updatedTestItems[12];
    console.log(`\n - ${myTest.name}`);
    expect(myTest.sellIn).toBe(0);
    expect(myTest.quality).toBe(80);
  });

  it("Test type #7.c - Les valeurs de qualité et de vente des sulfuras sont de 0 et 80 dès la création, même si des valeurs négatives sont transmises au constructeur.", function() {
    myTest = updatedTestItems[13];
    console.log(`\n - ${myTest.name}`);
    expect(myTest.sellIn).toBe(0);
    expect(myTest.quality).toBe(80);
  });

  it("Test type #8 - Les objets conjurés perdent généralement 2 points de qualité par jour.", function() {
    myTest = updatedTestItems[14];
    console.log(`\n - ${myTest.name}`);
    expect(myTest.sellIn).toBe(2);
    expect(myTest.quality).toBe(0);
  });

  it("Test type #9 - Les objets conjurés perdent 4 points de qualité par jour, une fois leur date de péremption dépassée.", function() {
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
 