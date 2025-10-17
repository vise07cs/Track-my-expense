const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');

const buyPremiumBtn = document.getElementById('buyPremiumBtn');


// Get token from localStorage
const token = localStorage.getItem('token');
if (!token) {
  alert('Please log in first.');
  window.location.href = 'login.html';
}

// Fetch expenses on page load
async function fetchExpenses() {
  try {
    const res = await fetch('http://localhost:5000/api/expenses', {
      headers: {
        'Authorization': `Bearer ${token}` // send token in header
      }
    });

    if (!res.ok) {
      // Handle unauthorized or other errors
      const errorData = await res.json();
      console.error('Failed to fetch expenses:', errorData.message);
      alert(errorData.message);
      return;
    }

    const data = await res.json();

    // Defensive: check if data.expenses exists
    if (!data.expenses || data.expenses.length === 0) {
      expenseList.innerHTML = '<tr><td colspan="5">No expenses found.</td></tr>';
      return;
    }

    // Render expenses
    expenseList.innerHTML = '';
    data.expenses.forEach(exp => {
      const row = `<tr>
        <td>${exp.amount}</td>
        <td>${exp.description}</td>
        <td>${exp.category}</td>
        <td>${new Date(exp.createdAt).toLocaleString()}</td>
        <td><button class="deleteBtn" data-id="${exp.id}">Delete</button></td>
      </tr>`;
      expenseList.innerHTML += row;
    });

    // Attach delete functionality
    document.querySelectorAll('.deleteBtn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const expenseId = e.target.dataset.id;
        console.log('Deleting expense with ID:', expenseId);
        try {
          const delRes = await fetch(`http://localhost:5000/api/expenses/${expenseId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const delData = await delRes.json();
          if (delRes.ok) {
            alert(delData.message);
            fetchExpenses(); // Refresh list
          } else {
            alert(delData.message);
          }
        } catch (err) {
          console.error(err);
        }
      });
    });

  } catch (err) {
    console.error(err);
  }
}

// Call on page load
fetchExpenses();

// Add new expense
expenseForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const amount = document.getElementById('amount').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;

  if (!amount || !description || !category) {
    alert('All fields are required');
    return;
  }

  try {
    const res = await fetch('http://localhost:5000/api/expenses/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ amount, description, category }) // no userId here
    });

    const data = await res.json();

    if (res.status === 201) {
      alert(data.message);
      expenseForm.reset();
      fetchExpenses(); // Refresh list
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
  }
});

buyPremiumBtn.addEventListener('click',async  () => {
  // For now, just open a placeholder / alert
  // alert("Premium Membership feature coming soon! Cashfree integration will be added later.");

  try {
    // 1️⃣ Call backend to create an order and get payment_session_id
    const response = await fetch('http://localhost:5000/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // logged-in user token
      },
      body: JSON.stringify({ amount: 500 }) // example amount
    });
    const data = await response.json();
    const paymentSessionId = data.paymentSessionId;

    // 2️⃣ Initialize checkout options
    const checkoutOptions = {
      paymentSessionId: paymentSessionId,
      redirectTarget: "_self" // stays on same page after payment
    };

    // 3️⃣ Trigger Cashfree checkout
    await cashfree.checkout(checkoutOptions);

  } catch (err) {
    console.error("Error:", err);
    alert("Failed to start payment. Try again.");
  }









  // Optional: open a placeholder page or modal
  // window.location.href = 'premium.html';
});


