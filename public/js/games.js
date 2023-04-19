
    
    
    axios.get(`/api/posts/subreddit/gaming`).then(response=>{
     createPost(response.data);
    })

