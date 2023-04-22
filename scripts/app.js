const sendRequest = (url, method, data) => {
  return fetch(url);
};

function createPost(id, name, text) {
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

function addPost() {
  const form = document.querySelector("form");

  // const formData = new FormData();

  // formData.append('title', form.querySelector("[name='title']").value)
  // formData.append('body',  form.querySelector("[name='body']").value)
  // formData.append('userId',   form.querySelector("[name='id']").value)

  const formData = new FormData(form);
  createPost(
    form.querySelector("[name='id']").value,
    form.querySelector("[name='body']").value,
    form.querySelector("[name='title']").value
  );
  // let data = {
  //   title: form.querySelector("[name='title']").value,
  //   body: form.querySelector("[name='body']").value,
  //   userId: form.querySelector("[name='id']").value,
  // };

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  addPost();
});

sendRequest("https://jsonplaceholder.typicode.com/posts", "GET")
  .then((data) => {
    return data.json(); // data.blob();//data.text();
    //data.forEach((item) => createPost(item.id, item.title, item.body));
  })
  .then((response) => {
    response.forEach((item) => createPost(item.id, item.title, item.body));
  })
  .catch((err) => console.log(err));
