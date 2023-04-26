const postsContainer = document.querySelector("#main-posts-list");
const loadMoreBtn = document.querySelector("#load-more");
const countrySelect = document.querySelector('.country')
const createSub = document.querySelector('.createSub')
const others = document.querySelector('#main-subreddit-list-ul')

let currentPage = 1;

const getPosts = () => {
  axios
    .get(`/api/post/?page=${currentPage}`)
    .then(({ data }) => {
      data.posts.forEach((post) => {
        if(data.posts.length > 0){
          const postCard = renderPost(post);
          postsContainer.appendChild(postCard);
        }else{
          loadMoreBtn.style.display = 'none'

        }
      });
    })
    .catch((err) => console.log(err));
};

getPosts();


loadMoreBtn.addEventListener("click", () => {
  currentPage++;

  axios
    .get(`/api/post/?page=${currentPage}`)
    .then(({ data }) => {
      data.posts.forEach((post) => {
        const postCard = renderPost(post);
        postsContainer.appendChild(postCard);
      });
    })
    .catch((err) => console.log(err));
});

countrySelect.addEventListener('change', (e) => {
  console.log(e.target.value);
  axios.get(`/api/post/country/${e.target.value}/?page=${currentPage}`).then(({data} )=> {
    console.log(data);
    if(data.post.length >0){

      data.post.forEach((post) => {
        const postCard = renderPost(post);
        postsContainer.appendChild(postCard);
      });
    
    }else{
      postsContainer.innerHTML = ''
      loadMoreBtn.style.display = 'none'
    }
  })
})


createSub.addEventListener('submit', (e) => {
    e.preventDefault()
    const obj = new FormData(createSub);
    const data = Object.fromEntries(obj)
    if (data.name === '' || data.description === '') {
      return
    }
    axios.post('/api/subreddit', data).then(response => {
      const renderSubreddits = () => {
        others.innerHTML = ''
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
            others.appendChild(li);
          });
        });
      };
      
      renderSubreddits();
    })



  })



