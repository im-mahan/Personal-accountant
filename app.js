let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense() {
  const desc = document.getElementById("desc").value;
  const amount = parseInt(document.getElementById("amount").value);
  const category = document.getElementById("category").value.trim();
  const timestamp = new Date().toLocaleString("fa-IR");

  if (!desc || !category || isNaN(amount)) return;

  expenses.push({ desc, amount, category, timestamp });
  saveAndRender();

  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("category").value = "";
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  saveAndRender();
}

function editExpense(index) {
  const newAmount = prompt("مبلغ جدید را وارد کنید:", expenses[index].amount);
  if (newAmount !== null && !isNaN(newAmount)) {
    expenses[index].amount = parseInt(newAmount);
    saveAndRender();
  }
}

function saveAndRender() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

function renderExpenses() {
  const container = document.getElementById("expenseContainer");
  container.innerHTML = "";

  // گروه‌بندی بر اساس دسته‌بندی
  const grouped = {};
  expenses.forEach((e, i) => {
    if (!grouped[e.category]) grouped[e.category] = [];
    grouped[e.category].push({ ...e, index: i });
  });

  let total = 0;

  for (const category in grouped) {
    const categoryList = grouped[category];
    let categoryTotal = 0;

    const section = document.createElement("div");
    section.className = "bg-gray-800 p-4 rounded-xl";

    const title = document.createElement("h2");
    title.className = "text-lg font-semibold mb-2 border-b border-gray-700 pb-1";
    title.textContent = `دسته: ${category}`;
    section.appendChild(title);

    categoryList.forEach(item => {
      categoryTotal += item.amount;
      total += item.amount;

      const div = document.createElement("div");
      div.className = "flex justify-between items-center bg-gray-700 p-2 rounded mt-2";

      div.innerHTML = `
        <div>
          <div class="font-medium">${item.desc}</div>
          <div class="text-sm text-gray-300">${item.timestamp}</div>
        </div>
        <div class="text-right">
          <div>${item.amount.toLocaleString()} تومان</div>
          <div class="flex gap-2 mt-1 justify-end">
            <button onclick="editExpense(${item.index})">✏️</button>
            <button onclick="deleteExpense(${item.index})">🗑️</button>
          </div>
        </div>
      `;
      section.appendChild(div);
    });

    // مجموع هر دسته
    const sum = document.createElement("div");
    sum.className = "text-sm text-right mt-2 text-yellow-300 font-bold";
    sum.textContent = `مجموع این دسته: ${categoryTotal.toLocaleString()} تومان`;
    section.appendChild(sum);

    container.appendChild(section);
  }

  document.getElementById("total").textContent = `مجموع کل: ${total.toLocaleString()} تومان`;
}

renderExpenses();


                                      // <!--    src : https://github.com/im-mahan -->