
const allUserPosts = document.querySelector('.allUserPosts')
const userNameProfile = document.querySelector('.userNameProfile')
const userNameAcoount = document.querySelector('.userNameAcoount')
const profileuser = document.querySelector('.profileuser')
const addFriendEvent = document.querySelector('.addFriendEvent')
const userId = window.location.pathname.split("/").pop();
console.log(userId);
const accessToken = document.cookie.split('=').pop()

axios.get(`/api/post/user/${userId}`).then(response => {
  renderPost(response.data.posts)
})

if (accessToken) {

  axios.get('/api/auth/userdata').then(response => {
    userNameAcoount.textContent = response.data.data.username;
    userNameProfile.textContent = response.data.data.username;
  })

}

profileuser.addEventListener('click', () => {
  profileuser.href = `/profile/${JSON.parse(userData.id)}`
})

const renderPost = (posts) => {
  allUserPosts.innerHTML = ''
  posts.forEach(post => {
    const blogPost = document.createElement('div');
    blogPost.classList.add('blog_post');

    const imgPod = document.createElement('div');
    imgPod.classList.add('img_pod');
    blogPost.appendChild(imgPod);

    const userImg = document.createElement('img');
    userImg.classList.add('user-img');
    userImg.src = 'https://pbs.twimg.com/profile_images/890901007387025408/oztASP4n.jpg';
    userImg.alt = 'user image';
    imgPod.appendChild(userImg);

    const containerCopy = document.createElement('div');
    containerCopy.classList.add('container_copy');
    blogPost.appendChild(containerCopy);

    const userPost = document.createElement('div');
    userPost.classList.add('userPost');
    containerCopy.appendChild(userPost);

    const userName = document.createElement('h3');
    userName.textContent = post.username;
    userNameAcoount.textContent = post.username;
    userNameProfile.textContent = post.username;
    userPost.appendChild(userName);

    const postDate = document.createElement('h3');
    postDate.textContent = post.created_at;
    userPost.appendChild(postDate);

    const postTitle = document.createElement('h1');
    postTitle.textContent = post.title;
    containerCopy.appendChild(postTitle);

    const postsContent = document.createElement('div');
    postsContent.classList.add('postsContent');
    containerCopy.appendChild(postsContent);

    const postContent = document.createElement('p');
    postContent.classList.add('post-content');
    postContent.textContent = post.decription;
    postsContent.appendChild(postContent);

    const imgPost = document.createElement('div');
    imgPost.classList.add('img-post');
    blogPost.appendChild(imgPost);

    const postImg = document.createElement('img');
    postImg.classList.add('post-img');
    postImg.src = 'https://pbs.twimg.com/profile_images/890901007387025408/oztASP4n.jpg';
    postImg.alt = 'post img';
    imgPost.appendChild(postImg);

    const inputsPost = document.createElement('div');
    inputsPost.classList.add('inputs-post');
    blogPost.appendChild(inputsPost);

    const votes = document.createElement('div');
    votes.classList.add('votes');
    inputsPost.appendChild(votes);

    const leftArrowBtn = document.createElement('button');
    votes.appendChild(leftArrowBtn);

    const leftArrowIcon = document.createElement('i');
    leftArrowIcon.classList.add('fa-solid', 'fa-arrow-left');
    leftArrowBtn.appendChild(leftArrowIcon);

    const votesCount = document.createElement('p');
    votesCount.classList.add('vote-count')
    votesCount.textContent = +post.upvotes - +post.downvotes

    votes.appendChild(votesCount);

    const rightArrowBtn = document.createElement('button');
    votes.appendChild(rightArrowBtn);

    const rightArrowIcon = document.createElement('i');
    rightArrowIcon.classList.add('fa-solid', 'fa-arrow-right');
    rightArrowBtn.appendChild(rightArrowIcon);


    const commentsBtnPost = document.createElement('div');
    commentsBtnPost.classList.add('commentsBtnPost');
    inputsPost.appendChild(commentsBtnPost);

    const commentsBtn = document.createElement('button');
    commentsBtn.textContent = 'comments';
    commentsBtnPost.appendChild(commentsBtn);


    const commentsCount = document.createElement('p');
    commentsCount.classList.add('comments-nums');
    commentsCount.textContent = '20';

    rightArrowBtn.addEventListener('click', () => {
      const data = {
        vote: true,
        postId: post.id,
      }
      axios.post(`/api/vote/`, data).then(response => {
        axios.get(`/api/post/user/${userId}`).then(response => {
          renderPost(response.data.posts)
        })
      })

    })

    leftArrowBtn.addEventListener('click', () => {
      const data = {
        vote: false,
        postId: post.id,
      }
      axios.post(`/api/vote/`, data).then(response => {
        axios.get(`/api/post/user/${userId}`).then(response => {
          renderPost(response.data.posts)
        })
      })
    })


    const commentsDiv = document.createElement("div");
    commentsDiv.classList.add("comments");
    blogPost.appendChild(commentsDiv)

    allUserPosts.appendChild(blogPost)

    commentsBtn.addEventListener('click', () => {

      axios.get(`/api/comment/${post.id}`).then(response => {
        showComments(response.data.comments, commentsDiv, post.id)
      })
    })


  });
}

const showComments = (data, commentsDiv, postId) => {
  commentsDiv.innerHTML = ''
  const commentDivParent = document.createElement("div");
  commentDivParent.classList.add("commentDivParent");
  data.forEach(comment => {

    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");

    const commentHeadDiv = document.createElement("div");
    commentHeadDiv.classList.add("comment-head");

    const img = document.createElement("img");
    img.classList.add("comment-user-photo");
    img.src = "../../logo.png";

    const userName = document.createElement("p");
    userName.classList.add("comment-user-name");
    userName.textContent = comment.username;

    const time = document.createElement("p");
    time.classList.add("comment-time");
    time.textContent = comment.created_at;

    commentHeadDiv.appendChild(img);
    commentHeadDiv.appendChild(userName);
    commentHeadDiv.appendChild(time);

    const commentContentDiv = document.createElement("div");
    commentContentDiv.classList.add("comment-content");

    const userContent = document.createElement("p");
    userContent.classList.add("comment-user-content");
    userContent.textContent = comment.body;

    commentContentDiv.appendChild(userContent);

    const closeComments = document.createElement("i");
    closeComments.classList.add("fa-solid", "fa-circle-xmark")

    closeComments.addEventListener('click', () => {
      commentsDiv.style.display = 'none'

    })

    commentDiv.appendChild(commentHeadDiv);
    commentDiv.appendChild(commentContentDiv);
    commentDiv.appendChild(closeComments)
    commentDivParent.appendChild(commentDiv)

    commentsDiv.appendChild(commentDivParent);

    commentsDiv.style.display = 'flex'
  })

  const inputCommentDiv = document.createElement('div')
  inputCommentDiv.classList.add('inputCommentDiv')


  const inputComment = document.createElement('input')
  inputComment.classList.add('inputComment')

  const subComment = document.createElement('i')
  subComment.classList.add('fa-solid', 'fa-paper-plane')

  subComment.addEventListener('click', () => {
    if (inputComment.value === '') {
      return
    }

    const data = inputComment.value
    console.log(data);
    axios.post(`/api/comment/${postId}`, { body: data }).then(response => {
      console.log(response);
    })


    axios.get(`/api/comment/${postId}`).then(response => {
      console.log(response.data);
      showComments(response.data.comments, commentsDiv, postId)
    })

  })

  inputCommentDiv.appendChild(inputComment)
  inputCommentDiv.appendChild(subComment)
  commentsDiv.appendChild(inputCommentDiv);

}


addFriendEvent.addEventListener('click', () => {
  axios.post(`/api/friend/${userId}`).then(response => {
    console.log(response);
  })
})

