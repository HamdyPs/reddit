const userData = JSON.parse(localStorage.getItem("userData"));
const userSettings = document.querySelector('.userSettings');
const friendslistbtn = document.querySelector('.friends-list-btn');
const friendsrequestlistbtn = document.querySelector('.friends-request-list-btn');
const friendrequestlist = document.querySelector('#friend-request-list');
const friendslist = document.querySelector('#friends-list');
const createPostBtn = document.querySelector('.createPostBtn');
const createPostForm = document.querySelector('.createPostForm')
const selectElement = document.querySelector('.select');
const loadMoreBtn = document.querySelector("#load-more");
const friendRequestList = document.querySelector("#friend-request-list");
const friendsList = document.querySelector("#friends-list");
let currentPage = 1;

if (!userData) {
  window.location.href = "/signin";
} else {
  const postsContainer = document.querySelector("#main-posts-list");

  const getPosts = () => {
    axios
      .get(`/api/post/user/${userData.id}?page=${currentPage}`)
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
      .get(`/api/post/user/${userData.id}?page=${currentPage}`)
      .then(({ data }) => {
        data.posts.forEach((post) => {
          const postCard = renderPost(post);
          postsContainer.appendChild(postCard);
        });
      })
      .catch((err) => console.log(err));
  });

  createPostBtn.addEventListener('click', (e) => {
    e.preventDefault()
    createPostForm.style.display = 'flex'

    selectDiv(selectElement)

  })

  createPostForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const obj = new FormData(createPostForm);
    const data = Object.fromEntries(obj)
    axios.post('/api/post/', data).then(({ data }) => {
      getPosts();

    })



    createPostForm.style.display = 'none'

  })

  const selectDiv = (selectElement) => {
    selectElement.innerHTML = ''

    axios.get('/api/subreddit/').then(data => {
      data.data.subreddits.forEach(sub => {
        const optionElement = document.createElement('option');
        optionElement.textContent = sub.id;
        selectElement.appendChild(optionElement);
      })

    })
  }

  userSettings.addEventListener('click', () => {
    userSettings.href = `/setting/${userData.id}`
  })

  friendslistbtn.addEventListener('click', (e) => {
    e.preventDefault()
    friendslist.style.display = 'block'
  })
  friendsrequestlistbtn.addEventListener('click', (e) => {
    e.preventDefault()
    friendrequestlist.style.display = 'block'
  })

}

const getFriendRequests = () => {
  axios.get("/api/friend/requests").then((res) => {
    res.data.requests.forEach((frndReq) => {
      const friendItem = document.createElement("li");
      const friendName = document.createElement("span");
      friendName.innerText = frndReq.username;

      const acceptBtn = document.createElement("button");
      acceptBtn.innerText = "Accept";
      acceptBtn.addEventListener("click", () => {
        axios
          .post(`/api/friend/response`, {
            friendshipId: frndReq.id,
            accept: true,
          })
          .then((res) => {
          });
      });

      const rejectBtn = document.createElement("button");
      rejectBtn.innerText = "Reject";
      rejectBtn.addEventListener("click", () => {
        axios
          .post(`/api/friend/response`, {
            friendshipId: frndReq.id,
            accept: false,
          })
          .then((res) => {
            console.log(res.data);
          });
      });

      friendItem.appendChild(acceptBtn);
      friendItem.appendChild(rejectBtn);
      friendItem.appendChild(friendName);

      friendRequestList.appendChild(friendItem);
    });
  });
};

getFriendRequests();

// get friends list


const getFriends = () => {
  axios.get("/api/friend").then((res) => {
    res.data.friends.forEach((friend) => {
      const friendItem = document.createElement("li");
      const friendName = document.createElement("span");
      friendName.innerText = friend.username;
      friendItem.appendChild(friendName);
      if(friendName.innerText === userData.username){
        return
      }
      friendsList.appendChild(friendItem);
    });
  });
};

getFriends();





