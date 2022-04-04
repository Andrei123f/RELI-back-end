class Human {
  constructor() {
    this.health_bar = 100;
  }

  setHp(hp) {
    this.health_bar = hp;
  }
}

class Warrior extends Human {
  constructor() {
    super();
    this.weapon = "axe";
  }
}

class Soldier extends Human {
  constructor() {
    super();
    this.weapon = "sword";
  }
}

let warrior = new Warrior();
let soldier = new Soldier();

warrior.setHp(0);
soldier.setHp(30);
