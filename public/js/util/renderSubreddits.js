const renderSubreddits = () => {
  axios.get("/api/subreddit").then(({ data }) => {
    data.subreddits.forEach((sub) => {
      const ul = document.querySelector("#main-subreddit-list-ul");
      const li = document.createElement("li");
      const a = document.createElement("a");
      const img = document.createElement("img");

      a.href = "/subreddit/" + sub.id;
      img.src = "../assets/logo.svg";
      a.appendChild(img);
      a.appendChild(document.createTextNode(sub.name));
      
      li.appendChild(a);
      ul.appendChild(li);
    });
  });
};

renderSubreddits();
