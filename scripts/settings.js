const sendRequest = (url, method, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) resolve(xhr.response);
      else reject(new Error("Oooopps!!!!"));
    };

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authentication", "");

    xhr.responseType = "json";

    if (method === "POST") {
      xhr.send(JSON.stringify(data));
    } else {
      xhr.send();
    }
  });

  return promise;
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

  document.getElementById("posts").appendChild(newPost);

  newPost.addEventListener("click", (e) => {
    e.preventDefault();

    let postId = e.currentTarget.id;

    sendRequest(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      "DELETE"
    ).then((data) => console.log(data));
  });
}

async function addPost() {
  try {
    const form = document.querySelector("form");
    let data = {
      title: form.querySelector("[name='title']").value,
      body: form.querySelector("[name='body']").value,
      userId: form.querySelector("[name='id']").value,
    };

    const promise = await sendRequest(
      "https://jsonplaceholder.typicode.com/postst4tt34t4",
      "POST",
      data
    );
  } catch (err) {
    console.log(err);
  }
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  addPost();
});

sendRequest("https://jsonplaceholder.typicode.com/posts", "GET")
  .then((data) => {
    data.forEach((item) => createPost(item.id, item.title, item.body));
  })
  .catch((err) => console.log(err));
