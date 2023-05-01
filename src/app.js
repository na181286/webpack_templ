import { sendRequest } from "./utils/requests";
import { createPost, addPost } from "./post/post";

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(45);
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
