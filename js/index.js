window.addEventListener('DOMContentLoaded', function () {
  displayAccountName();
  setupLogoutHandler();
  loadBudgetForSelectedMonth();
  updateRemainingAmount();
  displayCategoriesForSelectedMonth();
  populateCategorySelect(); 
});

// Hiển thị tên tài khoản
function displayAccountName() {
  const accountNameEl = document.getElementById('account-name');
  const userData = localStorage.getItem('currentUser');

  if (accountNameEl) {
    if (userData) {
      const currentUser = JSON.parse(userData);
      accountNameEl.textContent = `Tài khoản (${currentUser.username})`;
    } else {
      accountNameEl.textContent = 'Tài khoản (Khách)';
    }
  }
}

// Xử lý logout
function setupLogoutHandler() {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
        localStorage.removeItem('currentUser');
        window.location.href = '../pages/login.html';
      }
    });
  }
}

// Lưu tháng được chọn
function saveMonthToLocalStorage() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    alert('Bạn chưa đăng nhập!');
    return;
  }

  const selectedMonth = document.querySelector('#monthInput').value;
  if (!selectedMonth) {
    alert('Vui lòng chọn tháng!');
    return;
  }

  const userDataKey = `userData_${currentUser.id}`;
  let userData = JSON.parse(localStorage.getItem(userDataKey)) || [];

  if (!userData.some(data => data.month === selectedMonth)) {
    userData.push({
      user_id: currentUser.id,
      month: selectedMonth,
      date: new Date().toISOString()
    });

    localStorage.setItem(userDataKey, JSON.stringify(userData));
    console.log('Đã lưu thông tin tháng.');
  }
}

// Lưu ngân sách
function saveBudgetToLocalStorage() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    alert('Bạn chưa đăng nhập!');
    return;
  }

  const selectedMonth = document.querySelector('#monthInput').value;
  const budget = document.querySelector('#money_month').value.trim();
  if (!selectedMonth || !budget || isNaN(budget)) {
    alert('Vui lòng chọn tháng và nhập ngân sách hợp lệ!');
    return;
  }

  const userDataKey = `userData_${currentUser.id}`;
  let userData = JSON.parse(localStorage.getItem(userDataKey)) || [];

  const monthIndex = userData.findIndex(data => data.month === selectedMonth);
  if (monthIndex !== -1) {
    userData[monthIndex].budget = parseFloat(budget);
    userData[monthIndex].date = new Date().toISOString();
  } else {
    userData.push({
      user_id: currentUser.id,
      month: selectedMonth,
      budget: parseFloat(budget),
      date: new Date().toISOString()
    });
  }

  localStorage.setItem(userDataKey, JSON.stringify(userData));
  updateRemainingAmount();
}

// Hiển thị ngân sách
function loadBudgetForSelectedMonth() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const selectedMonth = document.querySelector('#monthInput').value;
  if (!currentUser || !selectedMonth) return;

  const userDataKey = `userData_${currentUser.id}`;
  const userData = JSON.parse(localStorage.getItem(userDataKey)) || [];
  const monthData = userData.find(data => data.month === selectedMonth);

  if (monthData && monthData.budget) {
    document.querySelector('#money_month').value = monthData.budget;
  } else {
    document.querySelector('#money_month').value = '';
  }
}

// Tính tiền còn lại
function updateRemainingAmount() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const selectedMonth = document.querySelector('#monthInput').value;
  if (!currentUser || !selectedMonth) {
    document.querySelector('#remaining_amount').textContent = '0 VND';
    return;
  }

  const userDataKey = `userData_${currentUser.id}`;
  const userData = JSON.parse(localStorage.getItem(userDataKey)) || [];
  const monthData = userData.find(data => data.month === selectedMonth);
  const budget = (monthData && typeof monthData.budget === 'number') ? monthData.budget : 0;

  document.querySelector('#remaining_amount').textContent = `${budget} VND`;
}

// ----- Danh mục -----

let isEditing = false;
let editingIndex = null;

// Lưu danh mục
function saveCategoryToLocalStorage() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const selectedMonth = document.querySelector('#monthInput').value;
  const name = document.querySelector('#category-name').value.trim();
  const limit = parseFloat(document.querySelector('#category-limit').value.trim());

  if (!currentUser || !selectedMonth) {
    alert('Vui lòng đăng nhập và chọn tháng!');
    return;
  }

  if (!name || isNaN(limit)) {
    alert('Vui lòng nhập thông tin hợp lệ!');
    return;
  }

  const userDataKey = `userData_${currentUser.id}`;
  let userData = JSON.parse(localStorage.getItem(userDataKey)) || [];

  const monthIndex = userData.findIndex(item => item.month === selectedMonth);
  if (monthIndex === -1) {
    alert('Tháng chưa được tạo. Vui lòng nhập ngân sách trước!');
    return;
  }

  let categories = userData[monthIndex].categories || [];

  if (isEditing && editingIndex !== null) {
    categories[editingIndex] = { name, limit };
    isEditing = false;
    editingIndex = null;
  } else {
    categories.push({ name, limit });
  }

  userData[monthIndex].categories = categories;
  localStorage.setItem(userDataKey, JSON.stringify(userData));

  document.querySelector('#category-name').value = '';
  document.querySelector('#category-limit').value = '';
  document.getElementById('add-category-btn').textContent = 'Thêm danh mục';

  displayCategoriesForSelectedMonth();
  populateCategorySelect();
}

// Hiển thị danh mục
function displayCategoriesForSelectedMonth() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const selectedMonth = document.querySelector('#monthInput').value;
  const tbody = document.getElementById('category-list');
  tbody.innerHTML = '';

  if (!currentUser || !selectedMonth) return;

  const userDataKey = `userData_${currentUser.id}`;
  const userData = JSON.parse(localStorage.getItem(userDataKey)) || [];
  const monthData = userData.find(item => item.month === selectedMonth);

  if (!monthData || !monthData.categories) return;

  monthData.categories.forEach((category, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${category.name}</td>
      <td>${category.limit}</td>
      <td>
        <button id="edit-btn" onclick="editCategory(${index})">Sửa</button>
        <button id="delete-btn" onclick="deleteCategory(${index})">Xóa</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// function chooseCategory(categoryName) {
//   document.getElementById('name_moneySpend').textContent = categoryName;
// }

// Xóa danh mục
function deleteCategory(index) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const selectedMonth = document.querySelector('#monthInput').value;
  const userDataKey = `userData_${currentUser.id}`;
  let userData = JSON.parse(localStorage.getItem(userDataKey)) || [];

  const monthIndex = userData.findIndex(item => item.month === selectedMonth);
  if (monthIndex === -1) return;

  let categories = userData[monthIndex].categories || [];
  if (confirm('Bạn có chắc muốn xóa danh mục này không?')) {
    categories.splice(index, 1);
    userData[monthIndex].categories = categories;
    localStorage.setItem(userDataKey, JSON.stringify(userData));
    displayCategoriesForSelectedMonth();
    populateCategorySelect();
  }
}

// Sửa danh mục
function editCategory(index) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const selectedMonth = document.querySelector('#monthInput').value;
  const userDataKey = `userData_${currentUser.id}`;
  const userData = JSON.parse(localStorage.getItem(userDataKey)) || [];

  const monthData = userData.find(item => item.month === selectedMonth);
  if (!monthData || !monthData.categories) return;

  const category = monthData.categories[index];
  document.querySelector('#category-name').value = category.name;
  document.querySelector('#category-limit').value = category.limit;

  isEditing = true;
  editingIndex = index;

  document.getElementById('add-category-btn').textContent = 'Cập nhật danh mục';
}
function populateCategorySelect() {
  const selectEl = document.getElementById('chooseCategory');
  selectEl.innerHTML = '<option value="">-- Chọn danh mục --</option>'; // reset

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const selectedMonth = document.querySelector('#monthInput').value;

  if (!currentUser || !selectedMonth) return;

  const userDataKey = `userData_${currentUser.id}`;
  const userData = JSON.parse(localStorage.getItem(userDataKey)) || [];
  const monthData = userData.find(item => item.month === selectedMonth);

  if (!monthData || !monthData.categories) return;

  // Thêm các danh mục vào dropdown
  monthData.categories.forEach((cat) => {
    const option = document.createElement('option');
    option.value = cat.name;
    option.textContent = cat.name;
    selectEl.appendChild(option);
  });
}


document.getElementById('chooseCategory').addEventListener('change', function () {
  const selectedName = this.value;
  document.getElementById('name_moneySpend').textContent = selectedName || 'Mục chi tiêu';
});

function addTransaction() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const selectedMonth = document.querySelector('#monthInput').value;
  const amount = parseFloat(document.querySelector('#moneySpend').value.trim());
  const description = document.querySelector('#note_moneySpend').value.trim();
  const category = document.querySelector('#chooseCategory').value; // Lấy danh mục đã chọn

  if (!currentUser || !selectedMonth) {
    alert('Vui lòng đăng nhập và chọn tháng!');
    return;
  }

  if (!amount || isNaN(amount) || !description || !category) { // Kiểm tra nếu chưa chọn danh mục
    alert('Vui lòng nhập số tiền, ghi chú và chọn danh mục hợp lệ!');
    return;
  }

  const userDataKey = `userData_${currentUser.id}`;
  let userData = JSON.parse(localStorage.getItem(userDataKey)) || [];

  const monthIndex = userData.findIndex(item => item.month === selectedMonth);
  if (monthIndex === -1) {
    alert('Tháng chưa tồn tại. Vui lòng nhập ngân sách trước!');
    return;
  }

  if (!userData[monthIndex].transactions) {
    userData[monthIndex].transactions = [];
  }

  const transactions = userData[monthIndex].transactions;

  const newTransaction = {
    id: transactions.length + 1,
    date: selectedMonth,
    amount: amount,
    description: description,
    category: category // Lưu thông tin danh mục vào giao dịch
  };

  transactions.push(newTransaction);
  userData[monthIndex].transactions = transactions;
  localStorage.setItem(userDataKey, JSON.stringify(userData));

  document.querySelector('#moneySpend').value = '';
  document.querySelector('#note_moneySpend').value = '';
  document.querySelector('#chooseCategory').value = ''; // Reset chọn danh mục

  displayTransactionTable();
}




function displayTransactionTable() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const selectedMonth = document.querySelector('#monthInput').value;
  const userDataKey = `userData_${currentUser.id}`;
  const userData = JSON.parse(localStorage.getItem(userDataKey)) || [];

  const userMonthData = userData.find(data => data.month === selectedMonth);
  const tableBody = document.querySelector('.table_history_deal tbody');
  tableBody.innerHTML = ''; // Xóa bảng cũ

  if (!userMonthData || !userMonthData.transactions) return;

  // Đảm bảo ID tuần tự
  userMonthData.transactions.forEach((tx, idx) => {
    tx.id = idx + 1;
  });
  localStorage.setItem(userDataKey, JSON.stringify(userData)); // Lưu lại ID

  userMonthData.transactions.forEach((tx, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
     <tr>
  <td>${tx.category} - ${tx.description}</td>   <!-- Cột Nội dung -->
  <td>${Number(tx.amount).toLocaleString('vi-VN')} VND</td> <!-- Cột Giá -->
  <td><button class="delete-btn" data-index="${index}">Xóa</button></td> <!-- Cột Hành động -->
</tr>

    `;
    tableBody.appendChild(tr);
  });

  // Xử lý sự kiện nút Xóa
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const index = parseInt(this.getAttribute('data-index'));
      if (confirm('Bạn có chắc chắn muốn xóa giao dịch này?')) {
        userMonthData.transactions.splice(index, 1); // Xoá
        userMonthData.transactions.forEach((tx, i) => tx.id = i + 1); // Cập nhật lại ID
        localStorage.setItem(userDataKey, JSON.stringify(userData)); // Lưu
        displayTransactionTable(); // Hiển thị lại
      }
    });
  });
}

// ----- Sự kiện -----
document.querySelector('.money_spend button[type="submit"]').addEventListener('click', addTransaction);
document.addEventListener('DOMContentLoaded', displayTransactionTable);
document.querySelector('#monthInput').addEventListener('change', displayTransactionTable);

document.querySelector('#monthInput').addEventListener('change', () => {
  saveMonthToLocalStorage();
  loadBudgetForSelectedMonth();
  updateRemainingAmount();
  displayCategoriesForSelectedMonth();
  populateCategorySelect();
});


document.querySelector('#money_month').addEventListener('input', saveBudgetToLocalStorage);
document.getElementById('add-category-btn').addEventListener('click', saveCategoryToLocalStorage);
