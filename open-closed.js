/**
 *
 * SOLID Priciple: O - Open/Closed Principle
 * OCP states that a class should be open for extension but closed for modification.
 * In other words, we should be able to add new functionality to an object or class without altering its structure.
 * This is achieved by using inheritance and polymorphism.
 *
 * In the below example, we have a function called printQuiz that takes an array of questions
 * and prints them to the console.
 * The function is closed for modification because it does not need to be changed when a new question type is added.
 * Instead, we can create a new question type and add it to the questions array.
 * But if we had a new question type, we would have to modify the function to handle it. which violates the OCP.
 *
 */

// Principle Violation function
function printQuiz(questions) {
  questions.forEach((question) => {
    console.log(question.description);
    switch (question.type) {
      case "boolean":
        console.log("1. True");
        console.log("2. False");
        break;
      case "multipleChoice":
        question.options.forEach((option, index) => {
          console.log(`${index + 1}. ${option}`);
        });
        break;
      case "text":
        console.log("Answer: __________");
        break;
    }
  });
}

const questions = [
  {
    type: "boolean",
    description: "This video is useful.",
  },
  {
    type: "multipleChoice",
    description: "What is your favorite language?",
    options: ["CSS", "HTML", "JS", "Python"],
  },
  {
    type: "text",
    description: "Describe your favorite JS feature.",
  },
  {
    type: "range",
    description: "What is the spedd limit in your city?",
  },
];
// for the range type the function has to be modified to handle it. This violates the OCP.

printQuiz(questions);

// Refactored code
// We never have to touch printQuizRefactored function again.
// We can add new question types without modifying the function
// and add a new question type and add to the questions array.
// we avoid making mistake unknowingly modifying the function. so it doesnt break the existing code or flow.
console.log("\nRefactored code ----------------------------");
class BooleanQuestion {
  constructor(description) {
    this.description = description;
  }

  printQuestionChoices() {
    console.log("1. True");
    console.log("2. False");
  }
}

class MultipleChoiceQuestion {
  constructor(description, options) {
    this.description = description;
    this.options = options;
  }

  printQuestionChoices() {
    this.options.forEach((option, index) => {
      console.log(`${index + 1}. ${option}`);
    });
  }
}

class TextQuestion {
  constructor(description) {
    this.description = description;
  }

  printQuestionChoices() {
    console.log("Answer: __________");
  }
}

class RangeQuestion {
  constructor(description) {
    this.description = description;
  }

  printQuestionChoices() {
    console.log("Minimum: __________");
    console.log("Maximum: __________");
  }
}

function printQuizRefactored(questions) {
  questions.forEach((question) => {
    console.log(question.description);
    question.printQuestionChoices();
    console.log("");
  });
}

const questionsRefactored = [
  new BooleanQuestion("This video is useful."),
  new MultipleChoiceQuestion("What is your favorite language?", [
    "CSS",
    "HTML",
    "JS",
    "Python",
  ]),
  new TextQuestion("Describe your favorite JS feature."),
  new RangeQuestion("What is the spedd limit in your city?"),
];

printQuizRefactored(questionsRefactored);

// functional approach
// Factory function for BooleanQuestion
console.log("\nFunctional approach ----------------------------");
function createBooleanQuestion(description) {
  return {
    description: description,
    printQuestionChoices: function () {
      console.log("1. True");
      console.log("2. False");
    },
  };
}

// Factory function for MultipleChoiceQuestion
function createMultipleChoiceQuestion(description, options) {
  return {
    description: description,
    options: options,
    printQuestionChoices: function () {
      this.options.forEach((option, index) => {
        console.log(`${index + 1}. ${option}`);
      });
    },
  };
}

// Factory function for TextQuestion
function createTextQuestion(description) {
  return {
    description: description,
    printQuestionChoices: function () {
      console.log("Answer: __________");
    },
  };
}

// Factory function for RangeQuestion
function createRangeQuestion(description) {
  return {
    description: description,
    printQuestionChoices: function () {
      console.log("Minimum: __________");
      console.log("Maximum: __________");
    },
  };
}

// Function to print all questions
function printQuizFunc(questions) {
  questions.forEach((question) => {
    console.log(question.description);
    question.printQuestionChoices();
    console.log(""); // Print a blank line for better readability
  });
}

// Creating question instances using factory functions
const questionsFunc = [
  createBooleanQuestion("This video is useful."),
  createMultipleChoiceQuestion("What is your favorite language?", [
    "CSS",
    "HTML",
    "JS",
    "Python",
  ]),
  createTextQuestion("Describe your favorite JS feature."),
  createRangeQuestion("What is the speed limit in your city?"),
];

// Printing the quiz
printQuizFunc(questionsFunc);
