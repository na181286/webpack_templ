import { sendRequest } from "./utils/requests.js";
import { createPost, addPost } from "./post/post.js";

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  addPost();
});

sendRequest("https://jsonplaceholder.typicode.com/posts", "GET")
  .then((data) => {
    return data.json();
  })
  .then((response) => {
    response.forEach((item) => createPost(item.id, item.title, item.body));
  })
  .catch((err) => console.log(err));
