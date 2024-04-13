class Address {
  constructor(zip, street) {
    this.zip = zip;
    this.street = street;
  }
}

class User {
  constructor(name, age, phone, address) {
    this.name = name;
    this.age = age;
    this.phone = phone;
    this.address = address;
  }
}

const user = new User("Bob");
console.log(user); // {name: 'Bob', age: undefined, phone: undefined, address: undefined}
// if we need to pass only address we need to send as a parameter then
const userAddress = new User(
  "Bob",
  undefined,
  undefined,
  new Address("12345", "Main St.")
);
console.log(userAddress);
// {name: 'Bob', age: undefined, phone: undefined, address: Address {zip: '12345', street: 'Main St.'}}

// Builder Pattern
// This pattern is useful when we need to create an object with many parameters
// and we don't want to send all the parameters every time.
// We can create a builder class that will have all the parameters and we can set
// Traditional way to create a user
// the default values for the parameters that we don't want to send are undefined
class UserBuilder {
  constructor(name) {
    this.user = new User(name);
  }

  setAge(age) {
    this.user.age = age;
    return this;
  }

  setPhone(phone) {
    this.user.phone = phone;
    return this;
  }

  setAddress(address) {
    this.user.address = address;
    return this;
  }

  build() {
    return this.user;
  }
}

let builder = new UserBuilder("Bob").build();
let userTwo = new UserBuilder("Bob").setAge(37).setPhone("1234567890").build();
console.log(builder); // {name: 'Bob', age: undefined, phone: undefined, address: undefined}
console.log(userTwo); // {name: 'Bob', age: 37, phone: "1234567890", address: undefined}

// New way to create a user
class User {
  // benefit is that we can pass on the default values in the constructor
  constructor(name, { age, phone = "1234567890", address } = {}) {
    this.name = name;
    this.age = age;
    this.phone = phone;
    this.address = address;
  }
}

let userThree = new User("Bob", {
  age: 40,
  address: new Address("12345", "Main St."),
});
console.log(userThree); // {name: 'Bob', age: 40, phone: "1234567890", address: Address {zip: '12345', street: 'Main St.'}}

// Functional version of New Builder Pattern
// Functional version of Address
function createAddress(zip, street) {
  return {
    zip: zip,
    street: street,
  };
}

// Functional version of User
function createUser(name, { age, phone = "1234567890", address } = {}) {
  return {
    name: name,
    age: age,
    phone: phone,
    address: address,
  };
}

// Usage example
const user4 = createUser("Bob", {
  age: 40,
  address: createAddress("12345", "Main St."),
});

console.log(user4); // {name: 'Bob', age: 40, phone: "1234567890", address: {zip: '12345', street: 'Main St.'}}
