/**
 * SOLID priciple - L - Liskov Substitution Principle
 * LSP states that objects of a superclass should be replaceable with objects
 * of its subclasses without affecting the correctness of the program.
 *
 * If S is a subtype of T, then objects of type T may be replaced with objects of type S
 * without altering any of the desirable properties of the program.
 *
 * In the below example, we have a Rectangle class with a width and height property
 * and a method to calculate the area of the rectangle.
 *
 * We then create a Square class that extends the Rectangle class.
 * The Square class overrides the setWidth and setHeight methods to ensure that the width and height
 * are always the same.
 *
 * However, the increaseRectangleWidth function takes a Rectangle object as an argument
 * and increases the width of the rectangle by 1.
 *
 * When we call the function with a Rectangle object, it works as expected.
 * But when we call it with a Square object, the width and height are not updated correctly,
 * and the area is calculated incorrectly.
 *
 * This violates the Liskov Substitution Principle because the Square class is not a true subtype of the Rectangle class.
 * The increaseRectangleWidth function expects a Rectangle object, but it does not work correctly with a Square object.
 *
 */

// Principle Violation function
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  setWidth(width) {
    this.width = width;
  }

  setHeight(height) {
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  setWidth(width) {
    this.width = width;
    this.height = width;
  }

  setHeight(height) {
    this.width = height;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

function increaseRectangleWidth(rectangle) {
  rectangle.setWidth(rectangle.width + 1);
}

const rectangle1 = new Rectangle(10, 5);
const rectangle2 = new Rectangle(4, 8);

increaseRectangleWidth(rectangle1);
increaseRectangleWidth(rectangle2);

console.log(rectangle1.area()); // 55
console.log(rectangle2.area()); // 40

// Another Example
// Principle Violation function
console.log("\nAnother Example Bird ----------------------------");
class Bird {
  fly() {
    console.log("Flying...");
  }
}

class Duck extends Bird {
  quack() {
    console.log("Quacking...");
  }
}

class Penguin extends Bird {
  fly() {
    console.log("Penguins cannot fly");
  }
  swim() {
    console.log("Swimming...");
  }
}

function makeBirdFly(bird) {
  bird.fly();
}

const duck = new Duck();
const penguin = new Penguin();

makeBirdFly(duck); // Flying...
makeBirdFly(penguin); // Error: Penguins cannot fly

// Refactored code
console.log("\nRefactored code Bird ----------------------------");
class FlyingBird {
  fly() {
    console.log("Flying...");
  }
}

class SwimmingBird {
  swim() {
    console.log("Swimming...");
  }
}

class DuckRefactored extends FlyingBird {
  quack() {
    console.log("Quacking...");
  }
}

class PenguinRefactored extends SwimmingBird {}

function makeBirdFlyRefactored(bird) {
  bird.fly();
}

function makeBirdSwim(bird) {
  bird.swim();
}

const duckRefactored = new DuckRefactored();
const penguinRefactored = new PenguinRefactored();

makeBirdFlyRefactored(duckRefactored); // Flying...
makeBirdSwim(penguinRefactored); // Swimming...

// Functional approach
// Function that adds flying behavior
console.log("\nFunctional approach Bird ----------------------------");
function canFly(bird) {
  return {
    ...bird,
    fly: () => console.log("Flying..."),
  };
}

// Function that adds swimming behavior
function canSwim(bird) {
  return {
    ...bird,
    swim: () => console.log("Swimming..."),
  };
}

// Function that adds quacking behavior
function canQuack(bird) {
  return {
    ...bird,
    quack: () => console.log("Quacking..."),
  };
}

// Create a duck using composition of behaviors
function createDuck(name) {
  let duck = { name };
  duck = canFly(duck);
  duck = canQuack(duck);
  return duck;
}

// Create a penguin using composition of behaviors
function createPenguin(name) {
  let penguin = { name };
  penguin = canSwim(penguin);
  return penguin;
}

// Function to make a bird fly
function makeBirdFly1(bird) {
  if (bird.fly) {
    bird.fly();
  } else {
    console.log(`${bird.name} can't fly.`);
  }
}

// Function to make a bird swim
function makeBirdSwim1(bird) {
  if (bird.swim) {
    bird.swim();
  } else {
    console.log(`${bird.name} can't swim.`);
  }
}

// Creating instances of birds
const duck1 = createDuck("Daffy");
const penguin1 = createPenguin("Pingu");

// Making the birds perform actions
makeBirdFly1(duck1); // Outputs: Flying...
makeBirdSwim1(penguin1); // Outputs: Swimming...
