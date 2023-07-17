let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expnese-table-body');
const totalAmountCell = document.getElementById('total-amount');

// Retrieve expenses from local storage if available
if (localStorage.getItem('expenses')) {
  expenses = JSON.parse(localStorage.getItem('expenses'));
  updateExpensesTable();
  updateTotalAmount();
}

addBtn.addEventListener('click', function () {
  const category = categorySelect.value;
  const amount = Number(amountInput.value);
  const date = dateInput.value;

  if (category === '') {
    alert('Please select a category');
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid amount');
    return;
  }
  if (date === '') {
    alert('Please select a date');
    return;
  }

  const newExpense = { category, amount, date };
  expenses.push(newExpense);

  totalAmount += amount;
  totalAmountCell.textContent = totalAmount;

  updateExpensesTable();
  updateTotalAmount();
  saveExpensesToLocalStorage();

  // Clear input fields
  categorySelect.value = '';
  amountInput.value = '';
  dateInput.value = '';
});

function updateExpensesTable() {
  // Clear table body
  expensesTableBody.innerHTML = '';

  for (const expense of expenses) {
    const newRow = expensesTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
      removeExpense(expense);

      expensesTableBody.removeChild(newRow);
    });

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);
  }
}

function updateTotalAmount() {
  totalAmountCell.textContent = totalAmount;
}

function removeExpense(expense) {
  const index = expenses.indexOf(expense);
  if (index !== -1) {
    totalAmount -= expense.amount;
    expenses.splice(index, 1);
    updateTotalAmount();
    saveExpensesToLocalStorage();
  }
}

function saveExpensesToLocalStorage() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}
