    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.status === 200) {
          
        localStorage.setItem('token', data.token);


          alert('✅ ' + data.message);
          // Redirect to dashboard or homepage after login
          window.location.href = "dashboard.html";
        } else {
          alert('⚠️ ' + data.message);
        }

      } catch (error) {
        console.error('Error:', error);
        alert('❌ Something went wrong. Check console.');
      }
    });
