const subredditId = location.pathname.split("/")[2];
const postsContainer = document.querySelector("#main-posts-list");
const loadMoreBtn = document.querySelector("#load-more");
let currentPage = 1;

const getPosts = () => {
  axios
    .get(`/api/post/subreddit/${subredditId}?page=${currentPage}`)
    .then(({ data }) => {
      console.log(data);
      data.posts.forEach((post) => {
        const postCard = renderPost(post);
        postsContainer.appendChild(postCard);
      });
    })
    .catch((err) => console.log(err));
};

getPosts();


loadMoreBtn.addEventListener("click", () => {
  currentPage++;

  axios
    .get(`/api/post/subreddit/${userId}?page=${currentPage}`)
    .then(({ data }) => {
      data.posts.forEach((post) => {
        const postCard = renderPost(post);
        postsContainer.appendChild(postCard);
      });
    })
    .catch((err) => console.log(err));
});
