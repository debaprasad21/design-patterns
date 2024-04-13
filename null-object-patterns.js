class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  hasAccess() {
    return this.name === "Bob" || this.name === "John";
  }
}

const users = [new User(1, "Bob"), new User(2, "John")];

function getUser(id) {
  return users.find((user) => user.id === id);
}

function printUser(id) {
  const user = getUser(id);

  /**
   * We need to explicitly tell the console.log to print 'Guest'
   * if the user does not have a name
   *
   * This is probematic because we need to remember to always put
   * this every time we use the users name.
   *
   * It is also bad because if we want to print 'unknown user'
   * instead we need to change every place that we put 'Guest'
   * which will most likely be in multiple places
   */
  let name = "Guest";
  if (user != null && user.name != null) {
    name = user.name;
  }

  console.log("Hello " + name);

  /**
   * This will throw an error if we dont first check that the user
   * object has this fucntion available and isnt null.
   *
   * This is lot if extra code to add in every time we want to check
   * user access, and could cause bugs if we forget to add null checks.
   */
  if (user != null && user.hasAccess != null && user.hasAccess()) {
    console.log("You have access");
  } else {
    console.log("You are not allowed here");
  }
}
