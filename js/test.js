
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
