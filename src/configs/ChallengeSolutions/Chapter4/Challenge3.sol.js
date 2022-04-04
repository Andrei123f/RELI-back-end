class Character {
  constructor(name) {
    this.health_bar = 100;
    this.weapon = "sword";
    this.name = name;
  }

  getName() {
    return this.name;
  }
  setName(name) {
    this.name = name;
  }
}

let character1 = new Character("Robert");
let character2 = new Character("Andrei");

let name1 = character1.getName();
let name2 = character2.getName();

character1.setName(name2);
character2.setName(name1);
