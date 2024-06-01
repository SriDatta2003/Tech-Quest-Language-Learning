document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const username = formData.get('username');
    const password = formData.get('password');
    
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    .then(response => {
      if (response.ok) {
        window.location.href = '/i.html'; // Redirect to index.html on successful login
      } else {
        throw new Error('Invalid credentials');
      }
    })
    .catch(error => {
      document.getElementById('login-message').textContent = error.message;
    });
  });
});
