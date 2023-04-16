const posts_container = document.querySelector('.posts-container')

const createPost = (data) => {
  data.forEach(post => {
    // create the div element
    const blogPost = document.createElement('div');
    blogPost.classList.add('blog_post');

    // create the img_pod div element
    const imgPod = document.createElement('div');
    imgPod.classList.add('img_pod');
    blogPost.appendChild(imgPod);

    // create the user-img img element
    const userImg = document.createElement('img');
    userImg.classList.add('user-img');
    userImg.src = 'https://pbs.twimg.com/profile_images/890901007387025408/oztASP4n.jpg';
    userImg.alt = 'user image';
    imgPod.appendChild(userImg);

    // create the container_copy div element
    const containerCopy = document.createElement('div');
    containerCopy.classList.add('container_copy');
    blogPost.appendChild(containerCopy);

    // create the userPost div element
    const userPost = document.createElement('div');
    userPost.classList.add('userPost');
    containerCopy.appendChild(userPost);

    // create the user name and date h3 elements
    const userName = document.createElement('h3');
    userName.textContent = post.username;
    userPost.appendChild(userName);

    const postDate = document.createElement('h3');
    postDate.textContent = post.created_at;
    userPost.appendChild(postDate);

    // create the post title h1 element
    const postTitle = document.createElement('h1');
    postTitle.textContent = post.title;
    containerCopy.appendChild(postTitle);

    // create the postsContent div element
    const postsContent = document.createElement('div');
    postsContent.classList.add('postsContent');
    containerCopy.appendChild(postsContent);

    // create the post-content p element
    const postContent = document.createElement('p');
    postContent.classList.add('post-content');
    postContent.textContent = post.decription;
    postsContent.appendChild(postContent);

    // create the img-post div element
    const imgPost = document.createElement('div');
    imgPost.classList.add('img-post');
    blogPost.appendChild(imgPost);

    // create the post-img img element
    const postImg = document.createElement('img');
    postImg.classList.add('post-img');
    postImg.src = 'https://pbs.twimg.com/profile_images/890901007387025408/oztASP4n.jpg';
    postImg.alt = 'post img';
    imgPost.appendChild(postImg);

    // create the inputs-post div element
    const inputsPost = document.createElement('div');
    inputsPost.classList.add('inputs-post');
    blogPost.appendChild(inputsPost);

    // create the votes div element
    const votes = document.createElement('div');
    votes.classList.add('votes');
    inputsPost.appendChild(votes);

    // create the left arrow button element
    const leftArrowBtn = document.createElement('button');
    votes.appendChild(leftArrowBtn);

    const leftArrowIcon = document.createElement('i');
    leftArrowIcon.classList.add('fa-solid', 'fa-arrow-left');
    leftArrowBtn.appendChild(leftArrowIcon);

    // create the votes count p element
    const votesCount = document.createElement('p');
    votesCount.textContent = '20';
    votes.appendChild(votesCount);

    // create the right arrow button element
    const rightArrowBtn = document.createElement('button');
    votes.appendChild(rightArrowBtn);

    const rightArrowIcon = document.createElement('i');
    rightArrowIcon.classList.add('fa-solid', 'fa-arrow-right');
    rightArrowBtn.appendChild(rightArrowIcon);

    // create the commentsBtnPost div element
    const commentsBtnPost = document.createElement('div');
    commentsBtnPost.classList.add('commentsBtnPost');
    inputsPost.appendChild(commentsBtnPost);

    // create the comments button element
    const commentsBtn = document.createElement('button');
    commentsBtn.textContent = 'comments';
    commentsBtnPost.appendChild(commentsBtn);


    // create the comments count p element
    const commentsCount = document.createElement('p');
    commentsCount.classList.add('comments-nums');
    commentsCount.textContent = '20';
        // create outermost div element with class "comments"
const commentsDiv = document.createElement("div");
commentsDiv.classList.add("comments");
blogPost.appendChild(commentsDiv)

    posts_container.appendChild(blogPost)

    commentsBtn.addEventListener('click', () => {
     
      axios.get(`/api/comments/post/${post.id}`).then(response => {
        showComments(response.data,commentsDiv)
      })
    })


  });

}


const showComments = (data,commentsDiv) => {
  console.log(data);
  data.forEach(comment=>{
    console.log(comment);


// create comment div element with class "comment"
const commentDiv = document.createElement("div");
commentDiv.classList.add("comment");

// create comment-head div element with class "comment-head"
const commentHeadDiv = document.createElement("div");
commentHeadDiv.classList.add("comment-head");

// create img element with class "comment-user-photo"
const img = document.createElement("img");
img.classList.add("comment-user-photo");
img.src = "logo.png";

// create p element with class "comment-user-name"
const userName = document.createElement("p");
userName.classList.add("comment-user-name");
userName.textContent = comment.username;

// create p element with class "comment-time"
const time = document.createElement("p");
time.classList.add("comment-time");
time.textContent = comment.created_at;

// append img, userName and time elements to comment-head div element
commentHeadDiv.appendChild(img);
commentHeadDiv.appendChild(userName);
commentHeadDiv.appendChild(time);

// create comment-content div element with class "comment-content"
const commentContentDiv = document.createElement("div");
commentContentDiv.classList.add("comment-content");

// create p element with class "comment-user-content"
const userContent = document.createElement("p");
userContent.classList.add("comment-user-content");
userContent.textContent = comment.content;

// append userContent element to comment-content div element
commentContentDiv.appendChild(userContent);

const closeComments = document.createElement("i");
closeComments.classList.add("fa-solid","fa-circle-xmark")

closeComments.addEventListener('click',()=>{
  commentsDiv.style.visibility = 'hidden'

})

// append comment-head and comment-content div elements to comment div element
commentDiv.appendChild(commentHeadDiv);
commentDiv.appendChild(commentContentDiv);
commentDiv.appendChild(closeComments)

// append comment div element to comments div element
commentsDiv.appendChild(commentDiv);
commentsDiv.style.visibility = 'visible'
  })
}

axios.get('/api/posts/').then(response => {
  createPost(response.data)
})
