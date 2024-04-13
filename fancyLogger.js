// export default class FancyLogger {
//   constructor() {
//     this.logs = [];
//   }

//   log(message) {
//     this.logs.push(message);
//     console.log(`FANCY: ${message}`);
//   }

//   printLogCount() {
//     console.log(`${this.logs.length} Logs`);
//   }
// }

// Singleton Pattern
// class FancyLogger {
//   constructor() {
//     if (FancyLogger.instance == null) {
//       this.logs = [];
//       FancyLogger.instance = this;
//     }
//   }

//   log(message) {
//     this.logs.push(message);
//     console.log(`FANCY: ${message}`);
//   }

//   printLogCount() {
//     console.log(`${this.logs.length} Logs`);
//   }
// }

// const logger = new FancyLogger();
// Object.freeze(logger);
// export default logger;

// Functional Programming
let logs = []; // This array holds all log messages, similar to the instance property in the class version.

const log = (message) => {
  logs.push(message);
  console.log(`FANCY: ${message}`);
};

const printLogCount = () => {
  console.log(`${logs.length} Logs`);
};

const logger = {
  log,
  printLogCount,
};

Object.freeze(logger); // Freeze the logger object to prevent modifications.
export default logger; // Export the singleton logger instance.
