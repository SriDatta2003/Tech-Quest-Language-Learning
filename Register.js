document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    const registerMessage = document.getElementById('register-message');
    const loginButtonContainer = document.getElementById('login-button-container');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        
        // Get the username and password from the form
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Perform client-side validation
        if (!username || !password) {
            registerMessage.textContent = 'Please enter both username and password';
            return;
        }

        // Send a POST request to the server to register the user
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to register user');
            }
            return response.text();
        })
        .then(data => {
            console.log(data); // Log the response from the server
            registerMessage.textContent = 'User registered successfully';

            // Create a login button
            const loginButton = document.createElement('button');
            loginButton.textContent = 'Login';
            loginButton.style.padding = '10px 20px';
            loginButton.style.backgroundColor = '#007bff';
            loginButton.style.color = '#fff';
            loginButton.style.border = 'none';
            loginButton.style.borderRadius = '5px';
            loginButton.style.cursor = 'pointer';
            loginButton.addEventListener('click', function() {
                // Redirect to login page or show login form
                window.location.href = '/login.html'; // Example redirection to login page
            });

            // Append login button to container
            loginButtonContainer.appendChild(loginButton);
        })
        .catch(error => {
            console.error('Error registering user:', error);
            registerMessage.textContent = 'Failed to register user. Please try again later.';
        });
    });
});
