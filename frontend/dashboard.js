    // Example: User ID hardcoded (replace with actual logged-in user id)
    const userId = 1; // You will replace with login user id

    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');

    // Fetch expenses on page load
    async function fetchExpenses() {
      try {
        const res = await fetch(`http://localhost:5000/api/expenses/${userId}`);
        const data = await res.json();
        expenseList.innerHTML = '';
        data.expenses.forEach(exp => {
          const row = `<tr>
            <td>${exp.amount}</td>
            <td>${exp.description}</td>
            <td>${exp.category}</td>
            <td>${new Date(exp.createdAt).toLocaleString()}</td>
          </tr>`;
          expenseList.innerHTML += row;
        });
      } catch (err) { console.error(err); }
    }

    fetchExpenses();

    // Add new expense
    expenseForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const amount = document.getElementById('amount').value;
      const description = document.getElementById('description').value;
      const category = document.getElementById('category').value;

      try {
        const res = await fetch('http://localhost:5000/api/expenses/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, amount, description, category })
        });
        const data = await res.json();
        if (res.status === 201) {
          alert(data.message);
          expenseForm.reset();
          fetchExpenses(); // Refresh list
        } else {
          alert(data.message);
        }
      } catch (err) { console.error(err); }
    });
