let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const ctx = document.getElementById('chart').getContext('2d');

const chart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Income', 'Expense'],
    datasets: [{
      data: [0, 0]
    }]
  }
});

function addTransaction() {
  const desc = document.getElementById('desc').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const isExpense = document.getElementById('toggleType').checked;

  if (!desc || !amount) return alert("Fill all fields");

  const type = isExpense ? "expense" : "income";

  transactions.push({desc, amount, type});
  localStorage.setItem("transactions", JSON.stringify(transactions));

  updateUI();
}

function updateUI() {
  let income = 0, expense = 0;
  const table = document.getElementById('tableBody');
  table.innerHTML = "";

  transactions.forEach(t => {
    if (t.type === "income") income += t.amount;
    else expense += t.amount;

    const row = `<tr>
      <td>${t.desc}</td>
      <td>₹${t.amount}</td>
      <td>${t.type}</td>
    </tr>`;
    table.innerHTML += row;
  });

  document.getElementById('income').innerText = income;
  document.getElementById('expense').innerText = expense;
  document.getElementById('balance').innerText = income - expense;

  chart.data.datasets[0].data = [income, expense];
  chart.update();
}

updateUI();
