const userId = location.pathname.split("/")[2];
const postsContainer = document.querySelector("#main-posts-list");
const loadMoreBtn = document.querySelector("#load-more");
const navActions = document.querySelector("#nav-actions");
let currentPage = 1;


const getPosts = () => {
  axios
    .get(`/api/post/user/${userId}?page=${currentPage}`)
    .then(({ data }) => {
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
    .get(`/api/post/user/${userId}?page=${currentPage}`)
    .then(({ data }) => {
      data.posts.forEach((post) => {
        const postCard = renderPost(post);
        postsContainer.appendChild(postCard);
      });
    })
    .catch((err) => console.log(err));
});

const addFriendBtn = document.createElement("button");
addFriendBtn.textContent = "Add Friend";
addFriendBtn.classList.add('add-friend')
addFriendBtn.addEventListener("click", () => {
  axios.post(`/api/friend/${userId}`).then((res) => {
    
  });
});

navActions.prepend(addFriendBtn);
