/**
 * Dependency Inversion Principle
 * High-level modules should not depend on low-level modules.
 * Both should depend on abstractions.
 * Abstract Concept
 * Abstractions should not depend on details.
 * Details should depend on abstractions.
 *
 * In the below example, the Store class is dependent on
 * the Stripe class. So in the future if there is a need to change
 * the payment gateway, then the Store class will have to be modified.
 * To fix this, we can create an interface for the payment gateway.
 * This way the Store class will not be
 * dependent on the Stripe class and can use any payment gateway.
 */

// Principle Violation
class Store {
  constructor(user) {
    this.stripe = new Stripe(user);
  }

  purchasedBike(quantity) {
    this.stripe.makePayment(200 * quantity * 100);
  }

  purchaseHelmet(quantity) {
    this.stripe.makePayment(15 * quantity * 100);
  }
}

class Stripe {
  constructor(user) {
    this.user = user;
  }

  makePayment(amountInCents) {
    console.log(
      `${this.user} made payment of $${amountInCents / 100} via Stripe payment`
    );
  }
}

const store = new Store("Robin");
store.purchasedBike(2);
store.purchaseHelmet(2);

// Principle Adhered
console.log("\nPrinciple Adhered ----------\n");
class NewStore {
  constructor(user, paymentProcessor) {
    this.paymentProcessor = paymentProcessor;
    this.user = user;
  }

  purchasedBike(quantity) {
    this.paymentProcessor.makePayment(this.user, 200 * quantity * 100, "bike");
  }

  purchaseHelmet(quantity) {
    this.paymentProcessor.makePayment(this.user, 15 * quantity * 100, "helmet");
  }
}

class StripePaymentProcessor {
  makePayment(user, amountInCents, product) {
    console.log(
      `${user} made payment of $${
        amountInCents / 100
      } via Stripe payment for ${product}`
    );
  }
}

class PaypalPaymentProcessor {
  makePayment(user, amountInDollars, product) {
    console.log(
      `${user} made payment of $${amountInDollars} via Paypal payment for ${product}`
    );
  }
}

const stripePayment = new NewStore("Robin", new StripePaymentProcessor());
stripePayment.purchasedBike(2);
stripePayment.purchaseHelmet(2);

const paypalPayment = new NewStore("John", new PaypalPaymentProcessor());
paypalPayment.purchasedBike(1);
paypalPayment.purchaseHelmet(2);

// Functional Programming
console.log("\nFunctional Programming ----------\n");
// Function to create a payment processor for Stripe
function createStripePaymentProcessor() {
  return {
    makePayment: (user, amountInCents, product) => {
      console.log(
        `${user} made payment of $${
          amountInCents / 100
        } via Stripe payment for ${product}`
      );
    },
  };
}

// Function to create a payment processor for PayPal
function createPaypalPaymentProcessor() {
  return {
    makePayment: (user, amountInDollars, product) => {
      console.log(
        `${user} made payment of $${amountInDollars} via Paypal payment for ${product}`
      );
    },
  };
}

// Function to create a store
function createStore(user, paymentProcessor) {
  return {
    purchasedBike: (quantity) => {
      paymentProcessor.makePayment(user, 200 * quantity * 100, "bike");
    },
    purchaseHelmet: (quantity) => {
      paymentProcessor.makePayment(user, 15 * quantity * 100, "helmet");
    },
  };
}

// Example of creating stores with different payment processors
const stripeProcessor = createStripePaymentProcessor();
const stripeStore = createStore("Robin", stripeProcessor);
stripeStore.purchasedBike(2);
stripeStore.purchaseHelmet(2);

const paypalProcessor = createPaypalPaymentProcessor();
const paypalStore = createStore("John", paypalProcessor);
paypalStore.purchasedBike(1);
paypalStore.purchaseHelmet(2);
