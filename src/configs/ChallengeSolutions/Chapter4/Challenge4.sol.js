class Human {
  constructor() {
    this.health_bar = 100;
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
