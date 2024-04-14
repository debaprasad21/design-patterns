// SOLID Principles
// S - Single Responsibility Principle
// O - Open/Closed Principle
// L - Liskov Substitution Principle
// I - Interface Segregation Principle
// D - Dependency Inversion Principle

/**
 *
 * Single Responsibility Principle -
 * A class should have only one reason to change,
 * meaning that a class should have only one job.
 *
 * In the example below, the CalorieTracker class has two responsibilities:
 * 1. Track calories
 * 2. Log calorie surplus
 *
 * This violates the Single Responsibility Principle.
 * So we can refactor the code to separate the two responsibilities.
 *
 * Maintainability - When a class has multiple responsibilities, it becomes harder to maintain.
 * For example, if the calorie tracking logic changes, it may affect the logging logic as well.
 * Separating the responsibilities makes the code easier to maintain.
 *
 */
// class CalorieTracker {
//   constructor(maxCalories) {
//     this.maxCalories = maxCalories;
//     this.currentCalories = 0;
//   }

//   trackCalories(calorieCount) {
//     this.currentCalories += calorieCount;
//     if (this.currentCalories > this.maxCalories) {
//       this.logCalorieSurplus();
//     }
//   }

//   logCalorieSurplus() {
//     console.log("Max calories exceeded");
//   }
// }

// const calorieTracker = new CalorieTracker(2000);
// calorieTracker.trackCalories(500);
// calorieTracker.trackCalories(1000);
// calorieTracker.trackCalories(700);

// Refactored code
// import logger from "./logger.js";

// class CalorieTracker {
//   constructor(maxCalories) {
//     this.maxCalories = maxCalories;
//     this.currentCalories = 0;
//   }

//   trackCalories(calorieCount) {
//     this.currentCalories += calorieCount;
//     if (this.currentCalories > this.maxCalories) {
//       logger("Max calories exceeded");
//     }
//   }
// }

// const calorieTracker = new CalorieTracker(2000);
// calorieTracker.trackCalories(500);
// calorieTracker.trackCalories(1000);
// calorieTracker.trackCalories(700);

// functional programming
/**
 * Factory Function (createCalorieTracker):
 * This function initializes the currentCalories state internally and
 * takes maxCalories as an argument to set the maximum calorie limit.
 * It returns an object with a method trackCalories which is used to
 * add calories and check if the total exceeds the maximum allowed.
 * If it does, it logs a message using the logger.
 *
 * Encapsulation:
 * The currentCalories variable is encapsulated within the closure of the factory function,
 * preventing external access directly to this state.
 * This maintains the privacy of the state similar to private members in a class.
 */
import logger from "./logger.js";

// CalorieTracker factory function
function createCalorieTracker(maxCalories) {
  let currentCalories = 0;

  return {
    trackCalories: function (calorieCount) {
      currentCalories += calorieCount;
      if (currentCalories > maxCalories) {
        logger("Max calories exceeded");
      }
    },
  };
}

// Creating an instance of CalorieTracker
const calorieTracker = createCalorieTracker(2000);
calorieTracker.trackCalories(500); // Tracks 500 calories
calorieTracker.trackCalories(1000); // Tracks 1000 calories
calorieTracker.trackCalories(700); // Tracks 700 calories, exceeds max
