const container = document.querySelector(".comment-section");

const renderComments = (comments) => {
  container.innerHTML = ''
  comments.forEach(comment=>{
    const commentSectionCard = document.createElement("div");
    const commentSectionUser = document.createElement("div");
    const commentSectionContent = document.createElement("div");
    const userImage = document.createElement("img");
    const userName = document.createElement("p");
    const timestamp = document.createElement("p");
    const content = document.createElement("p");
  
    commentSectionCard.className = "comment-section-card";
    commentSectionUser.className = "comment-section-user";
    commentSectionContent.className = "comment-section-content";
  
    userImage.src = "../../assets/logo.svg";
  
    userName.textContent = "u/" + comment.username;
    timestamp.textContent = comment.created_at;
    content.textContent = comment.body;
  
    commentSectionUser.appendChild(userImage);
    commentSectionUser.appendChild(userName);
    commentSectionUser.appendChild(timestamp);
    commentSectionContent.appendChild(content);
    commentSectionCard.appendChild(commentSectionUser);
    commentSectionCard.appendChild(commentSectionContent);
  
    container.appendChild(commentSectionCard);
  })

  
};
