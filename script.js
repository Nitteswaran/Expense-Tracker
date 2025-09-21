
    const form = document.getElementById("expense-form");
    const titleInput = document.getElementById("title");
    const amountInput = document.getElementById("amount");
    const expenseList = document.getElementById("expense-list");
    const balanceEl = document.getElementById("balance");

    let transactions = [];

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = titleInput.value.trim();
      const amount = parseFloat(amountInput.value);

      if (title === "" || isNaN(amount)) {
        alert("Please enter a valid title and amount.");
        return;
      }

      const transaction = {
        id: Date.now(),
        title,
        amount
      };

      transactions.push(transaction);
      renderTransactions();
      updateBalance();

      form.reset();
    });

    function renderTransactions() {
      expenseList.innerHTML = "";
      transactions.forEach((tx) => {
        const li = document.createElement("li");

        const sign = tx.amount >= 0 ? "+" : "-";
        const cls = tx.amount >= 0 ? "positive" : "negative";

        li.innerHTML = `
          ${tx.title} 
          <span class="${cls}">${sign}RM${Math.abs(tx.amount).toFixed(2)}</span>
          <span class="remove" onclick="removeTransaction(${tx.id})">✖</span>
        `;
        expenseList.appendChild(li);
      });
    }

    function updateBalance() {
      const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);
      balanceEl.textContent = `RM ${total.toFixed(2)}`;
      balanceEl.style.color = total < 0 ? "#e74c3c" : "#27ae60";
    }

    function removeTransaction(id) {
      transactions = transactions.filter((tx) => tx.id !== id);
      renderTransactions();
      updateBalance();
    }