
// // Lấy thông tin người dùng hiện tại từ localStorage
// const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
// const userList = JSON.parse(localStorage.getItem('userList')) || [];

// const userIndex = userList.findIndex(user => user.id === currentUser?.id);

// // Hàm hiển thị tên người dùng
// function displayUserName() {
//   if (currentUser && currentUser.username) {
//     // Hiển thị tên người dùng trên trang
//     document.getElementById('account-name').innerText = currentUser.username;
//   } else {
//     // Nếu không có thông tin người dùng (người dùng chưa đăng nhập)
//     document.getElementById('account-name').innerText = 'Tài khoản chưa đăng nhập';
//   }
// }

// // Hàm xử lý đăng xuất
// function handleLogout() {
//   const logoutButton = document.getElementById('logout-btn');

//   logoutButton.addEventListener('click', function () {
//     const confirmLogout = window.confirm('Bạn có chắc muốn đăng xuất không?');

//     if (confirmLogout) {
//       // Xóa thông tin người dùng trong localStorage
//       localStorage.removeItem('currentUser');

//       // Chuyển hướng về trang đăng nhập
//       window.location.href = '../pages/login.html';
//     } else {
//       console.log('Hủy đăng xuất');
//     }
//   });
// }

// // Gọi các hàm khi trang được tải
// displayUserName();
// handleLogout();

// // Hàm thêm danh mục vào categories và lưu vào localStorage
// function addCategory() {
//   const categoryName = document.getElementById('category-name').value.trim();
//   const categoryLimit = document.getElementById('category-limit').value.trim();

//   if (categoryName && categoryLimit) {
//     const selectedMonth = document.getElementById('monthInput').value;
//     let monthlyCategories = JSON.parse(localStorage.getItem('monthlyCategories')) || {};

//     if (!monthlyCategories[selectedMonth]) {
//       monthlyCategories[selectedMonth] = {
//         month: selectedMonth,
//         categories: []
//       };
//     }

//     const newCategory = {
//       name: categoryName,
//       limit: categoryLimit
//     };

//     monthlyCategories[selectedMonth].categories.push(newCategory); // Thêm danh mục vào tháng

//     localStorage.setItem('monthlyCategories', JSON.stringify(monthlyCategories));

//     // Hiển thị lại danh sách danh mục
//     renderCategoryList(selectedMonth);

//     // Xóa giá trị input sau khi thêm
//     document.getElementById('category-name').value = '';
//     document.getElementById('category-limit').value = '';
//   } else {
//     alert('Vui lòng nhập đầy đủ tên danh mục và giới hạn!');
//   }
// }

// // Hàm hiển thị danh sách danh mục theo tháng
// function renderCategoryList(month) {
//   const categoryListElement = document.getElementById('category-list');
//   categoryListElement.innerHTML = ''; // Xóa danh sách cũ

//   let monthlyCategories = JSON.parse(localStorage.getItem('monthlyCategories')) || {};

//   if (monthlyCategories[month]) {
//     const categories = monthlyCategories[month].categories;

//     categories.forEach(function(category, index) {
//       const listItem = document.createElement('li');
//       listItem.innerHTML = `
//         ${category.name} - ${category.limit} VND
//         <button class="edit-category-btn" data-index="${index}">Sửa</button>
//         <button class="delete-category-btn" data-index="${index}">Xóa</button>
//       `;

//       // Thêm sự kiện cho nút "Sửa"
//       listItem.querySelector('.edit-category-btn').addEventListener('click', function() {
//         editCategory(index, month);
//       });

//       // Thêm sự kiện cho nút "Xóa"
//       listItem.querySelector('.delete-category-btn').addEventListener('click', function() {
//         deleteCategory(index, month);
//       });

//       // Thêm phần tử li vào danh sách
//       categoryListElement.appendChild(listItem);
//     });
//   }
// }

// // Hàm sửa danh mục
// function editCategory(index, month) {
//   let monthlyCategories = JSON.parse(localStorage.getItem('monthlyCategories')) || {};

//   if (monthlyCategories[month]) {
//     const category = monthlyCategories[month].categories[index];

//     // Điền lại thông tin vào các input để sửa
//     document.getElementById('category-name').value = category.name;
//     document.getElementById('category-limit').value = category.limit;

//     // Thay đổi nút thêm thành nút cập nhật
//     const saveButton = document.getElementById('add-category-btn');
//     saveButton.innerText = 'Cập nhật danh mục';

//     // Lắng nghe sự kiện cập nhật
//     saveButton.onclick = function() {
//       const updatedCategoryName = document.getElementById('category-name').value.trim();
//       const updatedCategoryLimit = document.getElementById('category-limit').value.trim();

//       if (updatedCategoryName && updatedCategoryLimit) {
//         // Cập nhật danh mục
//         monthlyCategories[month].categories[index] = {
//           name: updatedCategoryName,
//           limit: updatedCategoryLimit
//         };

//         // Lưu lại vào localStorage
//         localStorage.setItem('monthlyCategories', JSON.stringify(monthlyCategories));

//         // Hiển thị lại danh sách danh mục
//         renderCategoryList(month);

//         // Reset lại form và thay đổi nút về "Thêm danh mục"
//         document.getElementById('category-name').value = '';
//         document.getElementById('category-limit').value = '';
//         saveButton.innerText = 'Thêm danh mục';
//         saveButton.onclick = addCategory;
//       } else {
//         alert('Vui lòng nhập đầy đủ thông tin!');
//       }
//     };
//   }
// }

// // Hàm xóa danh mục
// function deleteCategory(index, month) {
//   let monthlyCategories = JSON.parse(localStorage.getItem('monthlyCategories')) || {};

//   if (monthlyCategories[month]) {
//     // Xóa danh mục khỏi mảng
//     monthlyCategories[month].categories.splice(index, 1);

//     // Lưu lại vào localStorage
//     localStorage.setItem('monthlyCategories', JSON.stringify(monthlyCategories));

//     // Hiển thị lại danh sách danh mục
//     renderCategoryList(month);
//   }
// }

// // Lắng nghe sự kiện khi người dùng nhấn nút "Thêm danh mục"
// document.getElementById('add-category-btn').addEventListener('click', function(e) {
//   e.preventDefault();
//   addCategory(); // Gọi hàm thêm danh mục
// });

// // Lắng nghe sự kiện khi người dùng chọn tháng
// document.getElementById('monthInput').addEventListener('change', function() {
//   const selectedMonth = this.value;
//   renderCategoryList(selectedMonth);  // Hiển thị danh mục của tháng được chọn
// });

// // Khi trang được tải, hiển thị danh mục của tháng hiện tại
// window.addEventListener('load', function() {
//   const selectedMonth = document.getElementById('monthInput').value;
//   renderCategoryList(selectedMonth);  // Hiển thị danh mục của tháng hiện tại khi tải trang
// });

// // Hàm lấy thông tin ngân sách của một tháng từ localStorage
// function getBudgetForMonth(month) {
//   const monthlyCategories = JSON.parse(localStorage.getItem('monthlyCategories')) || {};
//   return monthlyCategories[month] ? monthlyCategories[month].budget : 0;
// }

// // Hàm lưu ngân sách vào localStorage cho một tháng
// function saveBudgetForMonth(month, budget) {
//   let monthlyCategories = JSON.parse(localStorage.getItem('monthlyCategories')) || {};

//   if (!monthlyCategories[month]) {
//     monthlyCategories[month] = { categories: [] };
//   }

//   monthlyCategories[month].budget = budget;
//   localStorage.setItem('monthlyCategories', JSON.stringify(monthlyCategories));
// }

// // Hàm cập nhật số tiền còn lại khi chọn tháng
// function renderMoney(month) {
//   const remainingAmount = document.getElementById('remaining-amount');
//   const budget = getBudgetForMonth(month);
//   remainingAmount.textContent = `${budget} VND`;
// }

// function initializeEventListeners() {
//   const monthInput = document.getElementById('monthInput');
//   const saveButton = document.getElementById('save-btn');
//   const moneyInput = document.getElementById('money-month');

//   monthInput.addEventListener('change', function () {
//     const selectedMonth = this.value;
//     renderMoney(selectedMonth);
//   });

//   saveButton.addEventListener('click', function () {
//     const moneyValue = moneyInput.value.trim();

//     if (moneyValue) {
//       const selectedMonth = monthInput.value;
//       saveBudgetForMonth(selectedMonth, moneyValue);
//       renderMoney(selectedMonth);
//     } else {
//       alert('Vui lòng nhập ngân sách!');
//     }
//   });
// }

// function initializePage() {
//   const selectedMonth = document.getElementById('monthInput').value;
//   renderMoney(selectedMonth);
//   initializeEventListeners();
// }

// document.addEventListener('DOMContentLoaded', initializePage);

window.addEventListener('DOMContentLoaded', function () {
  displayAccountName();
  setupLogoutHandler();
});

// Hàm 1: Hiển thị tên tài khoản
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

// Hàm 2: Xử lý nút logout
function setupLogoutHandler() {
  const logoutBtn = document.getElementById('logout-btn');

  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      const confirmLogout = confirm('Bạn có chắc chắn muốn đăng xuất?');
      if (confirmLogout) {
        localStorage.removeItem('currentUser');
        window.location.href = '../pages/login.html';
      }
    });
  }
}
// Hàm để lưu thông tin tháng vào localStorage
function saveMonthToLocalStorage() {
  // Lấy thông tin người dùng hiện tại từ localStorage
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // Kiểm tra xem người dùng đã đăng nhập chưa
  if (!currentUser) {
    alert('Bạn chưa đăng nhập!');
    return;
  }

  // Lấy thông tin tháng từ input
  const selectedMonth = document.querySelector('#monthInput').value;

  // Kiểm tra xem người dùng đã chọn tháng hay chưa
  if (!selectedMonth) {
    alert('Vui lòng chọn tháng!');
    return;
  }

  // Lấy thông tin tháng từ localStorage (nếu có)
  const userDataKey = `userData_${currentUser.id}`;
  let userData = JSON.parse(localStorage.getItem(userDataKey)) || [];

  // Thêm thông tin tháng vào danh sách
  userData.push({
    user_id: currentUser.id,
    month: selectedMonth,
    date: new Date().toISOString()  // Thêm thời gian lưu
  });

  // Lưu lại thông tin vào localStorage
  localStorage.setItem(userDataKey, JSON.stringify(userData));

  // Thông báo đã lưu thành công
  console.log('Thông tin tháng đã được lưu thành công!');
}

// Lắng nghe sự kiện khi người dùng thay đổi tháng
document.querySelector('#monthInput').addEventListener('change', saveMonthToLocalStorage);
// Hàm để lưu ngân sách vào localStorage khi giá trị thay đổi
function saveBudgetToLocalStorage() {
  // Lấy thông tin người dùng hiện tại từ localStorage
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // Kiểm tra xem người dùng đã đăng nhập chưa
  if (!currentUser) {
    alert('Bạn chưa đăng nhập!');
    return;
  }

  // Lấy thông tin tháng từ input (tháng người dùng chọn)
  const selectedMonth = document.querySelector('#monthInput').value;

  // Lấy ngân sách tháng từ input
  const budget = document.querySelector('#money_month').value.trim();

  // Kiểm tra xem người dùng đã chọn tháng và nhập ngân sách chưa
  if (!selectedMonth) {
    alert('Vui lòng chọn tháng!');
    return;
  }

  if (!budget || isNaN(budget)) {
    alert('Vui lòng nhập ngân sách hợp lệ!');
    return;
  }

  // Lấy thông tin tháng từ localStorage (nếu có)
  const userDataKey = `userData_${currentUser.id}`;
  let userData = JSON.parse(localStorage.getItem(userDataKey)) || [];

  // Kiểm tra nếu đã có ngân sách cho tháng này
  const monthDataIndex = userData.findIndex(data => data.month === selectedMonth);

  if (monthDataIndex !== -1) {
    // Nếu đã có ngân sách cho tháng này, cập nhật lại ngân sách
    userData[monthDataIndex].budget = parseFloat(budget);
    userData[monthDataIndex].date = new Date().toISOString();  // Cập nhật thời gian lưu
  } else {
    // Nếu chưa có ngân sách cho tháng này, tạo mới đối tượng ngân sách tháng
    userData.push({
      user_id: currentUser.id,
      month: selectedMonth,
      budget: parseFloat(budget),   // Chuyển đổi ngân sách sang kiểu số
      date: new Date().toISOString()  // Thêm thời gian lưu
    });
  }

  // Lưu lại thông tin vào localStorage
  localStorage.setItem(userDataKey, JSON.stringify(userData));

  // Cập nhật lại số tiền còn lại
  updateRemainingAmount();
}

// Lắng nghe sự kiện khi người dùng thay đổi ngân sách (input)
document.querySelector('#money_month').addEventListener('input', saveBudgetToLocalStorage);

// Hàm để hiển thị ngân sách cho tháng đã chọn
function loadBudgetForSelectedMonth() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const selectedMonth = document.querySelector('#monthInput').value;

  if (!currentUser || !selectedMonth) return;

  const userDataKey = `userData_${currentUser.id}`;
  const userData = JSON.parse(localStorage.getItem(userDataKey)) || [];

  // Tìm ngân sách cho tháng đã chọn
  const monthData = userData.find(data => data.month === selectedMonth);

  if (monthData) {
    // Hiển thị ngân sách vào ô nhập
    document.querySelector('#money_month').value = monthData.budget;
  } else {
    // Nếu không có ngân sách, làm trống ô nhập ngân sách
    document.querySelector('#money_month').value = '';
  }
}

// Lắng nghe sự kiện khi thay đổi tháng
document.querySelector('#monthInput').addEventListener('change', loadBudgetForSelectedMonth);

// Gọi hàm để tải ngân sách khi lần đầu trang được tải
document.addEventListener('DOMContentLoaded', loadBudgetForSelectedMonth);

// Hàm để tính và hiển thị số tiền còn lại
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

  const budget = monthData ? monthData.budget : 0;  // Nếu chưa có ngân sách, coi như 0

  const historyKey = `history_user_${currentUser.id}`;
  const transactionHistory = JSON.parse(localStorage.getItem(historyKey)) || [];

  let totalSpent = 0;
  transactionHistory.forEach(transaction => {
    if (transaction.time.includes(selectedMonth)) {
      totalSpent += transaction.amount;
    }
  });

  const remainingAmount = budget - totalSpent;

  document.querySelector('#remaining_amount').textContent = `${remainingAmount} VND`;
}

// Khi chọn tháng mới
document.querySelector('#monthInput').addEventListener('change', updateRemainingAmount);

// Khi trang vừa tải
document.addEventListener('DOMContentLoaded', updateRemainingAmount);
