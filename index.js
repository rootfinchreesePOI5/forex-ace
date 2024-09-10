// Get all posts from the backend API
fetch('/api/posts')
 .then(response => response.json())
 .then(posts => {
    // Render the posts in the UI
    const postList = document.getElementById('post-list');
    posts.forEach(post => {
      const postHTML = `
        <div class="post">
          <div class="post-header">
            <img src="${post.user.profilePicture}" alt="User Profile Picture">
            <h3>${post.user.username}</h3>
            <span>Posted ${post.createdAt}</span>
          </div>
          <p>${post.content}</p>
          <div class="post-actions">
            <button class="like-btn" data-post-id="${post.id}">Like</button>
            <button class="comment-btn" data-post-id="${post.id}">Comment</button>
          </div>
        </div>
      `;
      postList.innerHTML += postHTML;
    });
  });

// Add event listeners to the like and comment buttons
document.addEventListener('click', event => {
  if (event.target.classList.contains('like-btn')) {
    const postId = event.target.dataset.postId;
    fetch(`/api/posts/${postId}/like`, { method: 'POST' })
     .then(response => response.json())
     .then(data => {
        // Update the UI with the new like count
        const likeCountElement = document.getElementById(`like-count-${postId}`);
        likeCountElement.textContent = `Likes: ${data.likes}`;
      });
  } else if (event.target.classList.contains('comment-btn')) {
    const postId = event.target.dataset.postId;
    const commentInput = document.getElementById(`comment-input-${postId}`);
    const commentText = commentInput.value;
    fetch(`/api/posts/${postId}/comments`, { method: 'POST', body: JSON.stringify({ comment: commentText }) })
     .then(response => response.json())
     .then(data => {
        // Update the UI with the new comment
        const commentList = document.getElementById(`comment-list-${postId}`);
        const commentHTML = `
          <div class="comment">
            <p>${data.comment}</p>
          </div>
        `;
        commentList.innerHTML += commentHTML;
      });
  }
});