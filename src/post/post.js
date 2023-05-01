import { sendRequest } from "../utils/requests";

export function createPost(id, name, text) {
  let newPost = document.createElement("div");
  newPost.className = "post-item";
  newPost.id = id;

  let title = document.createElement("div");
  title.className = "post-title";
  title.innerHTML = name;

  let descr = document.createElement("div");
  descr.className = "post-text";
  descr.innerHTML = text;

  newPost.appendChild(title);
  newPost.appendChild(descr);

  if (document.getElementById("posts").children.length > 0)
    document
      .getElementById("posts")
      .insertBefore(newPost, document.getElementById("posts").firstChild);
  else document.getElementById("posts").appendChild(newPost);
  newPost.addEventListener("click", (e) => {
    e.preventDefault();

    let postId = e.currentTarget.id;

    sendRequest(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      "DELETE"
    ).then((data) => console.log(data));
  });
}

export function addPost() {
  const form = document.querySelector("form");

  const formData = new FormData(form);
  createPost(
    form.querySelector("[name='id']").value,
    form.querySelector("[name='body']").value,
    form.querySelector("[name='title']").value
  );

  sendRequest("https://jsonplaceholder.typicode.com/posts", "POST", formData)
    .then((response) => {
      return response.json();
    })
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
}
