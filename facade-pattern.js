/**
 * Facade Code - The idea is to you create a facade between your complex code and actual business code.
 * Ex - Fetch API is a facade between your code and actual HTTP request.
 */

function getUsers() {
  //   return fetch("https://jsonplaceholder.typicode.com/users", {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   }).then((response) => response.json());

  // facade pattern
  return getFetch("https://jsonplaceholder.typicode.com/users");
}

function getUserPosts(userId) {
  //   return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   }).then((response) => response.json());

  // facade pattern
  return getFetch("https://jsonplaceholder.typicode.com/posts", { userId });
}

getUsers().then((users) => {
  users.forEach((user) => {
    getUserPosts(user.id).then((posts) => {
      console.log(user.name, "=", posts.length);
    });
  });
});

// Created the facade function
// This function will take the URL and params and return the response
// Tomorrow if we have to change the fetch API to Axios, we can change it in one place
// helps us in Error Handling, Logging, and other common functionalities at global level
// Refactoring the code is really easy
function getFetch(url, params = {}) {
  const queryString = Object.entries(params)
    .map((param) => `${param[0]}=${param[1]}`)
    .join("&");
  return fetch(`${url}?${queryString}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((response) => response.json());
}
