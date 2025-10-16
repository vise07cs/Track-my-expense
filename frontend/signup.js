  const form = document.querySelector('form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (response.status === 201) {
        alert('✅ ' + data.message);
        form.reset(); // Clear form after success
         // Redirect to login page
         window.location.href = "login.html";

      } else {
        alert('⚠️ ' + data.message);
      }

    } catch (error) {
      console.error('Error:', error);
      alert('❌ Something went wrong. Check console.');
    }
  });
