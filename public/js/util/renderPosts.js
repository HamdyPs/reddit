

const upvoteDownVote = ({ vote, postId }) => {
  const votedPosts = JSON.parse(localStorage.getItem("votedPosts") || "[]");

  axios
    .post(`/api/vote/`, {
      vote,
      postId,
    })
    .then(({ data }) => {
      const countId = "card-post-count" + postId;

      if (data.message.includes("created")) {
        votedPosts.push({
          postId,
          vote,
        });
        localStorage.setItem("votedPosts", JSON.stringify(votedPosts));

        const iconId = vote ? "card-post-upvote" : "card-post-downvote";

        const countElement = document.querySelector(`#${countId}`);

        const count = parseInt(countElement.textContent);
        const newCount = vote ? count + 1 : count - 1;

        countElement.textContent = newCount;

        const icon = document.querySelector(`#${iconId + postId}`);
        icon.classList.add("active");
      } else {
        const removedVote = votedPosts.filter((pst) => pst.postId !== postId);

        const countElement = document.querySelector(`#${countId}`);

        const count = parseInt(countElement.textContent);
        const newCount = !vote ? count + 1 : count - 1;

        countElement.textContent = newCount;

        const iconId = vote ? "card-post-upvote" : "card-post-downvote";
        const icon = document.querySelector(`#${iconId + postId}`);
        icon.classList.remove("active");

        localStorage.setItem("votedPosts", JSON.stringify(removedVote));
      }
    });
};

const renderPost = ({
  body,
  comments_count,
  created_at,
  downvotes,
  id,
  image,
  subreddit_id,
  title: postTitle,
  upvotes,
  user_id,
  username,
}) => {
  
  const votedPosts = JSON.parse(localStorage.getItem("votedPosts") || "[]");

  const postCard = document.createElement("div");
  postCard.classList.add("post-card");

  const postCardVote = document.createElement("div");
  postCardVote.classList.add("post-card-vote");

  const upVoteBtn = document.createElement("button");
  const upVoteIcon = document.createElement("i");
  upVoteIcon.classList.add("fas", "fa-arrow-up");
  upVoteIcon.setAttribute("id", "card-post-upvote" + id);
  upVoteBtn.appendChild(upVoteIcon);
  postCardVote.appendChild(upVoteBtn);

  const voteCount = document.createElement("span");
  voteCount.setAttribute("id", "card-post-count" + id);
  voteCount.textContent = upvotes - downvotes;
  postCardVote.appendChild(voteCount);

  const downVoteBtn = document.createElement("button");

  const downVoteIcon = document.createElement("i");
  downVoteIcon.setAttribute("id", "card-post-downvote" + id);

  downVoteBtn.addEventListener("click", () => {
    upvoteDownVote({
      vote: false,
      postId: id,
      voteBtn: downVoteBtn,
      voteCount: upvotes - downvotes,
      voteElement: voteCount,
    });
  });

  upVoteBtn.addEventListener("click", () => {
    upvoteDownVote({
      vote: true,
      postId: id,
      voteBtn: downVoteBtn,
      voteCount: upvotes - downvotes,
      voteElement: voteCount,
    });
  });

  downVoteIcon.classList.add("fas", "fa-arrow-down");
  downVoteBtn.appendChild(downVoteIcon);

  votedPosts.find((pst) => {
    if (pst.postId === id) {
      if (pst.vote) {
        upVoteIcon.classList.add("active");
      } else {
        downVoteIcon.classList.add("active");
      }
    }
  });

  postCardVote.appendChild(downVoteBtn);

  postCard.appendChild(postCardVote);

  const postCardContent = document.createElement("div");
  postCardContent.classList.add("post-card-content");

  const postCardHeader = document.createElement("div");
  postCardHeader.classList.add("post-card-content-header");

  const avatar = document.createElement("img");
  avatar.classList.add("post-card-content-avatar");
  avatar.alt = "logo";
  avatar.src = "../assets/logo.svg";
  postCardHeader.appendChild(avatar);

  const subredditLink = document.createElement("a");
  subredditLink.classList.add("post-card-content-subreddit");
  subredditLink.href = `/subreddit/${subreddit_id}`;
  subredditLink.textContent = `r/${subreddit_id}`;
  postCardHeader.appendChild(subredditLink);

  const userLink = document.createElement("a");
  userLink.classList.add("post-card-content-user");
  if(user_id === userDatas?.id){
    userLink.href = `/profile/${userDatas?.id}`;

  }else{
    userLink.href = `/user/${user_id}`;

  }
  userLink.textContent = "Posted by" + " " + username;
  postCardHeader.appendChild(userLink);

  postCardContent.appendChild(postCardHeader);

  const postCardPreview = document.createElement("div");
  postCardPreview.classList.add("post-card-content-preview");

  const titleLink = document.createElement("a");
  const title = document.createElement("h2");
  title.textContent = postTitle;
  titleLink.href = `/post/${id}`;
  titleLink.appendChild(title);
  postCardPreview.appendChild(titleLink);

  const paragraph = document.createElement("p");
  paragraph.textContent = body;
  postCardPreview.appendChild(paragraph);

  if (image) {
    const cardImage = document.createElement("img");
    cardImage.classList.add("post-card-content-preview-image");
    cardImage.src = image;
    postCardPreview.appendChild(cardImage);
  }

  const postCardActions = document.createElement("div");
  postCardActions.classList.add("post-card-content-actions");

  const commentLink = document.createElement("a");
  commentLink.classList.add("post-card-content-actions-comment");
  commentLink.href = `/post/${id}`;

  const commentIcon = document.createElement("i");
  commentIcon.classList.add("fa", "fa-comment-alt");
  commentLink.appendChild(commentIcon);

  const commentCount = document.createTextNode(
    " " + comments_count + " " + "comments"
  );
  commentLink.appendChild(commentCount);
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('deletePost');
  deleteBtn.textContent = 'delete';

  deleteBtn.addEventListener('click', () => {
    axios.delete(`/api/post/${id}`).then(response => {
      location.reload()
    })
  })

  postCardActions.appendChild(commentLink);
  if(user_id === userDatas?.id){
    postCardActions.appendChild(deleteBtn);

  }
  postCardPreview.appendChild(postCardActions);

  postCardContent.appendChild(postCardPreview);
  postCard.appendChild(postCardContent);

  return postCard;
};
