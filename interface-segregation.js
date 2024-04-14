/**
 *
 * SOLID - I - Interface Segregation Principle
 * The Interface Segregation Principle states that a class should not be forced to implement interfaces it does not use.
 * Instead of creating large interfaces that contain methods that may not be relevant to all classes,
 * we should create smaller, more specific interfaces that are implemented only by classes that actually need them.
 * This helps to keep the code clean and prevents unnecessary dependencies between classes.
 *
 * In the below example, we have an Entity interface that defines properties and methods for game entities.
 * We then have a Character class that implements the Entity interface and provides implementations for the methods.
 * So, when we implement Entity interface, we have to implement all the methods in it.
 * However, the Turret class also implements the Entity interface, but it does not need to move.
 * This violates the Interface Segregation Principle because the
 * Turret class is forced to implement a method that it does not use.
 */

// Principle Violation
// interface Entity {
//     attackDamage
//     health
//     name

//     move()
//     attack()
//     takeDamage(amount)
// }

// class Character extends Entity {
//     move() {
//         // Do Something
//     }

//     attack() {
//         // Do Something
//     }

//     takeDamage(amount) {
//         // Do Something
//     }
// }

// class Turret implements Entity {
//     move() {
//         // Error: Cannot move
//     }
// }

// In JS, we can do via class
// class Entity {
//   constructor(name, attackDamage, health) {
//     this.name = name;
//     this.attackDamage = attackDamage;
//     this.health = health;
//   }

//   move() {
//     console.log(`${this.name} moved`);
//   }

//   attack(targetEntity) {
//     console.log(
//       `${this.name} attacked ${targetEntity.name} for ${this.attackDamage} damage`
//     );
//     targetEntity.takeDamage(this.attackDamage);
//   }

//   takeDamage(amount) {
//     console.log(`${this.name} took ${amount} damage`);
//     this.health -= amount;
//     console.log(`${this.name} has ${this.health} health remaining`);
//   }
// }

// class Character extends Entity {}

// class Wall extends Entity {
//   constructor(name, health) {
//     super(name, 0, health);
//   }

//   move() {
//     return null;
//   }

//   attack() {
//     return null;
//   }
// }

// class Turret extends Entity {
//   constructor(name, attackDamage) {
//     super(name, attackDamage, -1);
//   }

//   move() {
//     return null;
//   }

//   takeDamage() {
//     return null;
//   }
// }

// const turret = new Turret("Turret", 5);
// const character = new Character("Character", 3, 100);
// const wall = new Wall("Wall", 200);

// turret.attack(character);
// character.move();
// character.attack(wall);

// Refactored code
class Entity {
  constructor(name) {
    this.name = name;
  }
}

const mover = {
  move() {
    console.log(`${this.name} moved`);
  },
};

const attacker = {
  attack(targetEntity) {
    console.log(
      `${this.name} attacked ${targetEntity.name} for ${this.attackDamage} damage`
    );
    targetEntity.takeDamage(this.attackDamage);
  },
};

const hasHealth = {
  takeDamage(amount) {
    console.log(`${this.name} took ${amount} damage`);
    this.health -= amount;
    console.log(`${this.name} has ${this.health} health remaining`);
  },
};

class Character extends Entity {
  constructor(name, attackDamage, health) {
    super(name);
    this.attackDamage = attackDamage;
    this.health = health;
  }
}

Object.assign(Character.prototype, mover);
Object.assign(Character.prototype, attacker);
Object.assign(Character.prototype, hasHealth);

class Wall extends Entity {
  constructor(name, health) {
    super(name);
    this.health = health;
  }
}

Object.assign(Wall.prototype, hasHealth);

class Turret extends Entity {
  constructor(name, attackDamage) {
    super(name);
    this.attackDamage = attackDamage;
  }
}

Object.assign(Turret.prototype, attacker);

const turretNew = new Turret("Turret", 5);
const characterNew = new Character("Character", 3, 100);
const wallNew = new Wall("Wall", 200);

turretNew.attack(characterNew);
characterNew.move();
characterNew.attack(wallNew);
