class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

}

// AGED BRIE
// Daily increases its quality by 1 point, never exceeding 50 though
class AgedBrie extends Item {

  constructor(name="Aged Brie", sellIn, quality){
    super(name,sellIn,quality);
    this.quality < 0 ? this.quality = 0 : (this.quality > 50 ? this.quality = 50 : null);
    console.log(`  > Creating a '${this.name}' item (${this.sellIn}, ${this.quality})`);
  }

  updateItemQuality() {
    console.log(`  > Using 'AgedBrie' quality calculation with '${this.name}'`);
    this.sellIn--;
    (this.quality < 50) ? (this.quality++) : (this.quality = 50);
  }

}

// SULFURAS
// As a legendary artefact, it has no "sell in" (valued to 0 by default) and its quality never decreases (valued to 80 by default)
class Sulfuras extends Item {

  constructor(name="Sulfuras, Hand of Ragnaros", sellIn=0, quality=80){
    super(name, 0, 80);
    console.log(`  > Creating a '${this.name}' item`);
  }

  updateItemQuality() {
    console.log(`  > Using 'Sulfuras' quality calculation (i.e. nothing changes!) with '${this.name}'`);
    // Does nothing (except logging) as Sulfuras has no expiration date, nor any decrease in quality
    // However keeping this method in case any update in the rules was needed
  }

}

// BACKSTAGE PASSES
// Increases its quality by :
//   +1 point till the 11 day (included) before concert is held, 
//   +2 points between 10 and 6 days (included) before concert takes place,
//   +3 points between 5 and 0 days (included) before music band plays.
// Its quality falls down and stay at 0 (never lower) once the concert date overpassed, though.
class BackstagePasses extends Item {

  constructor(name="Backstage passes for the upcoming TAFKAL80ETC concert", sellIn, quality){
    super(name,sellIn,quality);
    this.quality < 0 ? this.quality = 0 : this.quality > 50 ? this.quality = 50 : null;
    console.log(`  > Creating a '${this.name}' item`);
  }

  updateItemQuality() {
    console.log(`  > Using 'BackstagePasses' quality calculation with '${this.name}'`);
    this.sellIn--;
    if (this.sellIn > 10) {
      (this.quality < 50) ? (this.quality++) : (this.quality = 50);
    }
    if (this.sellIn < 11 && this.sellIn > 5) {
      (this.quality <= 48) ? (this.quality += 2) : (this.quality = 50);
    }
    if (this.sellIn < 6 && this.sellIn >= 0) {
      (this.quality <= 47) ? (this.quality += 3) : (this.quality = 50);
    }
    if (this.sellIn < 0) {
      this.quality = 0;  // Could maybe be optimized by testing if already equal to 0 (cost of this "===0" test vs. systematic allocation cost ?)
    }
  }

}

// GENERIC ITEMS (aka "All other items, be they conjured or not)
// See their quality decrease by 1 point daily - before "sell in" deadline - and by 2 points once the "sell in" overdued
// The quality decrease rate is twice faster when it comes to "conjured" items
// Whatever generic item type (conjured or not) is concerned, none can see its quality get lower than 0
class GenericItem extends Item {

  constructor(name, sellIn, quality){
    super(name,sellIn,quality);
    this.quality < 0 ? this.quality = 0 : this.quality > 50 ? this.quality = 50 : null;
    this.isConjured = (this.name.indexOf("Conjured") !== -1);
    this.isConjured ? console.log(`  > Creating a conjured '${this.name}' item`) : console.log(`  > Creating a '${this.name}' item`);
  }

  // Used for all generic (conjured or not) items (hence so far excluding "Aged Brie", Sulfuras, and Backstage Passes...)
  updateItemQuality() {
    this.sellIn--;
    let qualityDecreaseSpeed = 1;
    if (this.isConjured) {
      console.log(`  > Using 'Conjured Item' quality calculation (i.e. decreasing 2x faster) with '${this.name}'`);
      qualityDecreaseSpeed = 2;
    } else {
      console.log(`  > Using 'Generic Item' quality calculation with '${this.name}'`);
    }
    this.sellIn < 0 
        ? (this.quality >= 2*qualityDecreaseSpeed ? this.quality -= 2*qualityDecreaseSpeed : this.quality = 0)
        : (this.quality >= qualityDecreaseSpeed ? this.quality -= qualityDecreaseSpeed : this.quality = 0);
  }

}

class Shop {
  
  constructor(items=[]){
    this.items = items;
  }
  
  updateQualityOfAllShopItems() {
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].updateItemQuality();
    }

    return this.items;
  }
}

module.exports = {
  Item,
  GenericItem,
  AgedBrie, 
  Sulfuras, 
  BackstagePasses,
  Shop
}
