// // Lấy thông tin người dùng hiện tại từ localStorage
// const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
// const userList = JSON.parse(localStorage.getItem('userList')) || [];

// const userIndex = userList.findIndex(user => user.id === currentUser?.id);

// // Hàm hiển thị tên người dùng
// function displayUserName() {
//   const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

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
//       // Nếu người dùng bấm Cancel → không làm gì cả
//       console.log('Hủy đăng xuất');
//     }
//   });
// }

// // Gọi các hàm khi trang được tải
// displayUserName();
// handleLogout();


// // // Xử lý chọn tháng và lưu vào monthlyCategories
// // const monthInput = document.getElementById('monthInput');

// // monthInput.addEventListener('change', function () {
// //   const selectedMonth = this.value;
// //   console.log('Tháng được chọn:', selectedMonth);

// //   if (currentUser) {
// //     // Nếu monthlyCategories chưa tồn tại thì khởi tạo
// //     currentUser.monthlyCategories = currentUser.monthlyCategories || [];

// //     // Tìm xem tháng đã có trong monthlyCategories chưa
// //     const existingMonthIndex = currentUser.monthlyCategories.findIndex(category => category.month === selectedMonth);

// //     if (existingMonthIndex !== -1) {
// //       // Nếu đã có tháng đó, chỉ cần cập nhật giá trị của nó
// //       currentUser.monthlyCategories[existingMonthIndex] = {
// //         month: selectedMonth,
// //         categories: [] // Hoặc giá trị bạn muốn cập nhật vào đây
// //       };

// //       console.log('Cập nhật tháng hiện tại:', currentUser.monthlyCategories);
// //     } else {
// //       // Nếu chưa có tháng này, thêm vào
// //       currentUser.monthlyCategories.push({
// //         month: selectedMonth,
// //         categories: [] // Mảng rỗng hoặc giá trị mới
// //       });

// //       console.log('Thêm tháng mới vào monthlyCategories:', currentUser.monthlyCategories);
// //     }

// //     // Cập nhật lại userList trong localStorage
// //     userList[userIndex] = currentUser;
// //     localStorage.setItem('userList', JSON.stringify(userList));

// //     // Cập nhật lại currentUser trong localStorage
// //     localStorage.setItem('currentUser', JSON.stringify(currentUser));

// //     console.log('Đã cập nhật thành công vào localStorage!');
// //   } else {
// //     console.log('Không tìm thấy thông tin người dùng!');
// //   }
// // });

// // // Lấy các phần tử từ DOM
// // const saveButton = document.getElementById('save-btn');
// // const moneyInput = document.querySelector('input[type="number"]');
// // const notificationDiv = document.getElementById('notification');
// // const notificationTableBody = document.querySelector('#notification-table tbody');

// // // Lắng nghe sự kiện khi người dùng nhấn nút "Lưu"
// // saveButton.addEventListener('click', function (e) {
// //   e.preventDefault(); // Ngăn không cho form được gửi đi

// //   const moneyValue = moneyInput.value; // Lấy giá trị từ ô nhập liệu

// //   // Kiểm tra nếu người dùng đã nhập ngân sách
// //   if (moneyValue) {
// //     console.log('Ngân sách tháng:', moneyValue);
// //     // Lưu giá trị ngân sách vào đối tượng monthlyCategories
// //     const selectedMonth = monthInput.value;
// //     const monthIndex = currentUser.monthlyCategories.findIndex(category => category.month === selectedMonth);
    
// //     if (monthIndex !== -1) {
// //       currentUser.monthlyCategories[monthIndex].budget = moneyValue;
// //     }

// //     // Nếu có giá trị ngân sách, ẩn bảng thông báo nếu nó đang hiển thị
// //     notificationDiv.style.display = 'none';

// //     // Cập nhật lại currentUser và userList trong localStorage
// //     localStorage.setItem('currentUser', JSON.stringify(currentUser));
// //     localStorage.setItem('userList', JSON.stringify(userList));

// //   } else {
// //     console.log('Vui lòng nhập ngân sách!');
    
// //     // Kiểm tra xem bảng thông báo đã có dòng thông báo hay chưa
// //     if (notificationTableBody.children.length === 0) {
// //       // Cập nhật bảng thông báo
// //       const row = document.createElement('tr');  // Tạo một dòng mới trong bảng

// //       // Tạo các ô cho bảng
// //       const headerCell = document.createElement('td');
// //       const contentCell = document.createElement('td');
// //       const actionCell = document.createElement('td'); // Thêm ô cho nút "Tắt"
      
// //       // Cập nhật nội dung cho các ô
// //       headerCell.textContent = 'Lỗi';
// //       contentCell.textContent = 'Vui lòng nhập ngân sách tháng!';
// //       actionCell.textContent = 'Tắt';  // Thêm nội dung cho ô "Tắt"
      
// //       // Thêm sự kiện cho ô "Tắt"
// //       actionCell.style.cursor = 'pointer';  // Làm cho ô có thể nhấn
// //       actionCell.addEventListener('click', function () {
// //         // Xóa dòng khi nhấn vào "Tắt"
// //         row.remove();
// //         notificationDiv.style.display = 'none'; // Ẩn bảng khi xóa
// //       });

// //       // Thêm các ô vào dòng (tr)
// //       row.appendChild(headerCell);
// //       row.appendChild(contentCell);
// //       row.appendChild(actionCell);  // Thêm ô "Tắt" vào dòng

// //       // Thêm dòng mới vào bảng
// //       notificationTableBody.appendChild(row);

// //       // Hiển thị phần thông báo
// //       notificationDiv.style.display = 'block';
// //     }
// //   }
// // });

// // // Lấy các phần tử từ DOM để thêm danh mục
// // const addCategoryButton = document.getElementById('add-category-btn');
// // const categoryNameInput = document.getElementById('category-name');
// // const categoryLimitInput = document.getElementById('category-limit');
// // const categoryList = document.getElementById('category-list');

// // // Mảng lưu trữ các danh mục
// // let categories = currentUser?.monthlyCategories.find(category => category.month === monthInput.value)?.categories || [];

// // // Lắng nghe sự kiện khi nhấn nút "Thêm danh mục"
// // addCategoryButton.addEventListener('click', function() {
// //   const categoryName = categoryNameInput.value.trim(); // Lấy tên danh mục
// //   const categoryLimit = categoryLimitInput.value.trim(); // Lấy giới hạn chi tiêu

// //   // Kiểm tra xem các giá trị có hợp lệ không
// //   if (categoryName && categoryLimit) {
// //     // Thêm danh mục vào mảng categories
// //     const category = {
// //       name: categoryName,
// //       limit: categoryLimit
// //     };
// //     categories.push(category);

// //     // Hiển thị lại danh sách các danh mục
// //     renderCategoryList();

// //     // Lưu lại danh mục vào currentUser
// //     const selectedMonth = monthInput.value;
// //     const monthIndex = currentUser.monthlyCategories.findIndex(category => category.month === selectedMonth);
// //     if (monthIndex !== -1) {
// //       currentUser.monthlyCategories[monthIndex].categories = categories;
// //     }

// //     // Cập nhật lại userList trong localStorage
// //     localStorage.setItem('currentUser', JSON.stringify(currentUser));
// //     localStorage.setItem('userList', JSON.stringify(userList));

// //     // Xóa giá trị trong ô nhập liệu sau khi thêm
// //     categoryNameInput.value = '';
// //     categoryLimitInput.value = '';
// //   } else {
// //     alert("Vui lòng nhập đầy đủ thông tin danh mục và giới hạn!");
// //   }
// // });

// // // Hàm hiển thị danh sách danh mục
// // function renderCategoryList() {
// //   // Xóa danh sách cũ
// //   categoryList.innerHTML = '';

// //   // Duyệt qua mảng categories và tạo các phần tử li cho mỗi danh mục
// //   categories.forEach(function(category, index) {
// //     const listItem = document.createElement('li');
// //     listItem.innerHTML = `
// //       ${category.name} -   ${category.limit} VND
// //       <button class="edit-category-btn" data-index="${index}">Sửa</button>
// //       <button class="delete-category-btn" data-index="${index}">Xóa</button>
// //     `;

// //     // Thêm sự kiện cho nút "Sửa"
// //     listItem.querySelector('.edit-category-btn').addEventListener('click', function() {
// //       editCategory(index);
// //     });

// //     // Thêm sự kiện cho nút "Xóa"
// //     listItem.querySelector('.delete-category-btn').addEventListener('click', function() {
// //       deleteCategory(index);
// //     });

// //     // Thêm phần tử li vào danh sách
// //     categoryList.appendChild(listItem);
// //   });
// // }

// // // Hàm sửa danh mục
// // function editCategory(index) {
// //   const category = categories[index];
// //   categoryNameInput.value = category.name;
// //   categoryLimitInput.value = category.limit;

// //   // Xóa danh mục cũ sau khi chỉnh sửa để có thể lưu lại danh mục đã sửa
// //   categories.splice(index, 1);
// //   renderCategoryList();
// // }

// // // Hàm xóa danh mục
// // function deleteCategory(index) {
// //   // Xóa danh mục khỏi mảng
// //   categories.splice(index, 1);
// //   renderCategoryList();
// //   // Cập nhật lại currentUser và localStorage
// //   const selectedMonth = monthInput.value;
// //   const monthIndex = currentUser.monthlyCategories.findIndex(category => category.month === selectedMonth);
// //   if (monthIndex !== -1) {
// //     currentUser.monthlyCategories[monthIndex].categories = categories;
// //   }

// //   localStorage.setItem('currentUser', JSON.stringify(currentUser));
// //   localStorage.setItem('userList', JSON.stringify(userList));
// // }

// // // Hiển thị danh sách danh mục khi trang được tải
// // renderCategoryList();
// // console.log(localStorage.getItem('currentUser'));  // Kiểm tra dữ liệu của người dùng hiện tại
// // console.log(localStorage.getItem('userList'));


// // Hàm lưu dữ liệu vào monthlyCategories trong localStorage
// function saveMonthData() {
//   // Lấy giá trị tháng từ ô nhập liệu
//   const monthInput = document.getElementById('monthInput');
//   const selectedMonth = monthInput.value;

//   // Khởi tạo đối tượng monthlyCategories từ localStorage, nếu có
//   let monthlyCategories = JSON.parse(localStorage.getItem('monthlyCategories')) || {};

//   // Kiểm tra xem tháng đã có trong monthlyCategories chưa
//   if (!monthlyCategories[selectedMonth]) {
//     // Nếu chưa có, tạo một đối tượng mới cho tháng này
//     monthlyCategories[selectedMonth] = {
//       month: selectedMonth,
//       categories: [],  // Mảng các danh mục chi tiêu
//       budget: 0         // Ngân sách mặc định cho tháng
//     };
//     console.log('Thêm tháng mới vào monthlyCategories:', monthlyCategories);
//   } else {
//     console.log('Tháng này đã có trong monthlyCategories:', monthlyCategories[selectedMonth]);
//   }

//   // Lưu lại đối tượng monthlyCategories vào localStorage
//   localStorage.setItem('monthlyCategories', JSON.stringify(monthlyCategories));
// }

// // Gọi hàm khi người dùng thay đổi tháng
// document.getElementById('monthInput').addEventListener('change', saveMonthData);

// // Hàm thêm danh mục vào categories và lưu vào localStorage
// function addCategory() {
//   // Lấy thông tin từ input
//   const categoryName = document.getElementById('category-name').value.trim();
//   const categoryLimit = document.getElementById('category-limit').value.trim();

//   // Kiểm tra nếu tên danh mục và giới hạn có hợp lệ không
//   if (categoryName && categoryLimit) {
//     const selectedMonth = document.getElementById('monthInput').value; // Lấy tháng đang được chọn
//     let monthlyCategories = JSON.parse(localStorage.getItem('monthlyCategories')) || {};

//     // Kiểm tra xem tháng đã có trong monthlyCategories chưa
//     if (!monthlyCategories[selectedMonth]) {
//       // Nếu chưa có tháng này, tạo mới
//       monthlyCategories[selectedMonth] = {
//         month: selectedMonth,
//         categories: []  // Mảng danh mục rỗng
//       };
//     }

//     // Thêm danh mục vào mảng categories của tháng đã chọn
//     const newCategory = {
//       name: categoryName,
//       limit: categoryLimit
//     };

//     monthlyCategories[selectedMonth].categories.push(newCategory); // Thêm danh mục vào tháng

//     // Lưu lại vào localStorage
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

//     categories.forEach(function(category) {
//       const listItem = document.createElement('li');
//       listItem.innerHTML = `${category.name} - ${category.limit} VND`;
//       categoryListElement.appendChild(listItem);
//     });
//   }
// }

// // Lắng nghe sự kiện khi người dùng nhấn nút "Thêm danh mục"
// document.getElementById('add-category-btn').addEventListener('click', function(e) {
//   e.preventDefault();  // Ngăn không cho form gửi đi
//   addCategory();  // Gọi hàm thêm danh mục
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

// // Hàm khởi tạo sự kiện cho các phần tử
// function initializeEventListeners() {
//   const monthInput = document.getElementById('monthInput');
//   const saveButton = document.getElementById('save-btn');
//   const moneyInput = document.getElementById('money-month');

//   // Khi chọn tháng
//   monthInput.addEventListener('change', function () {
//     const selectedMonth = this.value;
//     renderMoney(selectedMonth);
//   });

//   // Khi nhấn nút "Lưu"
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

// // Hàm khởi tạo trang
// function initializePage() {
//   const selectedMonth = document.getElementById('monthInput').value;
//   renderMoney(selectedMonth);
//   initializeEventListeners();
// }

// // Khi trang được tải
// document.addEventListener('DOMContentLoaded', initializePage);


// Lấy thông tin người dùng hiện tại từ localStorage
const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
const userList = JSON.parse(localStorage.getItem('userList')) || [];

const userIndex = userList.findIndex(user => user.id === currentUser?.id);

// Hàm hiển thị tên người dùng
function displayUserName() {
  if (currentUser && currentUser.username) {
    // Hiển thị tên người dùng trên trang
    document.getElementById('account-name').innerText = currentUser.username;
  } else {
    // Nếu không có thông tin người dùng (người dùng chưa đăng nhập)
    document.getElementById('account-name').innerText = 'Tài khoản chưa đăng nhập';
  }
}

// Hàm xử lý đăng xuất
function handleLogout() {
  const logoutButton = document.getElementById('logout-btn');

  logoutButton.addEventListener('click', function () {
    const confirmLogout = window.confirm('Bạn có chắc muốn đăng xuất không?');

    if (confirmLogout) {
      // Xóa thông tin người dùng trong localStorage
      localStorage.removeItem('currentUser');

      // Chuyển hướng về trang đăng nhập
      window.location.href = '../pages/login.html';
    } else {
      console.log('Hủy đăng xuất');
    }
  });
}

// Gọi các hàm khi trang được tải
displayUserName();
handleLogout();

// Hàm thêm danh mục vào categories và lưu vào localStorage
function addCategory() {
  const categoryName = document.getElementById('category-name').value.trim();
  const categoryLimit = document.getElementById('category-limit').value.trim();

  if (categoryName && categoryLimit) {
    const selectedMonth = document.getElementById('monthInput').value;
    let monthlyCategories = JSON.parse(localStorage.getItem('monthlyCategories')) || {};

    if (!monthlyCategories[selectedMonth]) {
      monthlyCategories[selectedMonth] = {
        month: selectedMonth,
        categories: []
      };
    }

    const newCategory = {
      name: categoryName,
      limit: categoryLimit
    };

    monthlyCategories[selectedMonth].categories.push(newCategory); // Thêm danh mục vào tháng

    localStorage.setItem('monthlyCategories', JSON.stringify(monthlyCategories));

    // Hiển thị lại danh sách danh mục
    renderCategoryList(selectedMonth);

    // Xóa giá trị input sau khi thêm
    document.getElementById('category-name').value = '';
    document.getElementById('category-limit').value = '';
  } else {
    alert('Vui lòng nhập đầy đủ tên danh mục và giới hạn!');
  }
}

// Hàm hiển thị danh sách danh mục theo tháng
function renderCategoryList(month) {
  const categoryListElement = document.getElementById('category-list');
  categoryListElement.innerHTML = ''; // Xóa danh sách cũ

  let monthlyCategories = JSON.parse(localStorage.getItem('monthlyCategories')) || {};

  if (monthlyCategories[month]) {
    const categories = monthlyCategories[month].categories;

    categories.forEach(function(category, index) {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        ${category.name} - ${category.limit} VND
        <button class="edit-category-btn" data-index="${index}">Sửa</button>
        <button class="delete-category-btn" data-index="${index}">Xóa</button>
      `;

      // Thêm sự kiện cho nút "Sửa"
      listItem.querySelector('.edit-category-btn').addEventListener('click', function() {
        editCategory(index, month);
      });

      // Thêm sự kiện cho nút "Xóa"
      listItem.querySelector('.delete-category-btn').addEventListener('click', function() {
        deleteCategory(index, month);
      });

      // Thêm phần tử li vào danh sách
      categoryListElement.appendChild(listItem);
    });
  }
}

// Hàm sửa danh mục
function editCategory(index, month) {
  let monthlyCategories = JSON.parse(localStorage.getItem('monthlyCategories')) || {};

  if (monthlyCategories[month]) {
    const category = monthlyCategories[month].categories[index];

    // Điền lại thông tin vào các input để sửa
    document.getElementById('category-name').value = category.name;
    document.getElementById('category-limit').value = category.limit;

    // Thay đổi nút thêm thành nút cập nhật
    const saveButton = document.getElementById('add-category-btn');
    saveButton.innerText = 'Cập nhật danh mục';

    // Lắng nghe sự kiện cập nhật
    saveButton.onclick = function() {
      const updatedCategoryName = document.getElementById('category-name').value.trim();
      const updatedCategoryLimit = document.getElementById('category-limit').value.trim();

      if (updatedCategoryName && updatedCategoryLimit) {
        // Cập nhật danh mục
        monthlyCategories[month].categories[index] = {
          name: updatedCategoryName,
          limit: updatedCategoryLimit
        };

        // Lưu lại vào localStorage
        localStorage.setItem('monthlyCategories', JSON.stringify(monthlyCategories));

        // Hiển thị lại danh sách danh mục
        renderCategoryList(month);

        // Reset lại form và thay đổi nút về "Thêm danh mục"
        document.getElementById('category-name').value = '';
        document.getElementById('category-limit').value = '';
        saveButton.innerText = 'Thêm danh mục';
        saveButton.onclick = addCategory;
      } else {
        alert('Vui lòng nhập đầy đủ thông tin!');
      }
    };
  }
}

// Hàm xóa danh mục
function deleteCategory(index, month) {
  let monthlyCategories = JSON.parse(localStorage.getItem('monthlyCategories')) || {};

  if (monthlyCategories[month]) {
    // Xóa danh mục khỏi mảng
    monthlyCategories[month].categories.splice(index, 1);

    // Lưu lại vào localStorage
    localStorage.setItem('monthlyCategories', JSON.stringify(monthlyCategories));

    // Hiển thị lại danh sách danh mục
    renderCategoryList(month);
  }
}

// Lắng nghe sự kiện khi người dùng nhấn nút "Thêm danh mục"
document.getElementById('add-category-btn').addEventListener('click', function(e) {
  e.preventDefault();
  addCategory(); // Gọi hàm thêm danh mục
});

// Lắng nghe sự kiện khi người dùng chọn tháng
document.getElementById('monthInput').addEventListener('change', function() {
  const selectedMonth = this.value;
  renderCategoryList(selectedMonth);  // Hiển thị danh mục của tháng được chọn
});

// Khi trang được tải, hiển thị danh mục của tháng hiện tại
window.addEventListener('load', function() {
  const selectedMonth = document.getElementById('monthInput').value;
  renderCategoryList(selectedMonth);  // Hiển thị danh mục của tháng hiện tại khi tải trang
});

// Hàm lấy thông tin ngân sách của một tháng từ localStorage
function getBudgetForMonth(month) {
  const monthlyCategories = JSON.parse(localStorage.getItem('monthlyCategories')) || {};
  return monthlyCategories[month] ? monthlyCategories[month].budget : 0;
}

// Hàm lưu ngân sách vào localStorage cho một tháng
function saveBudgetForMonth(month, budget) {
  let monthlyCategories = JSON.parse(localStorage.getItem('monthlyCategories')) || {};

  if (!monthlyCategories[month]) {
    monthlyCategories[month] = { categories: [] };
  }

  monthlyCategories[month].budget = budget;
  localStorage.setItem('monthlyCategories', JSON.stringify(monthlyCategories));
}

// Hàm cập nhật số tiền còn lại khi chọn tháng
function renderMoney(month) {
  const remainingAmount = document.getElementById('remaining-amount');
  const budget = getBudgetForMonth(month);
  remainingAmount.textContent = `${budget} VND`;
}

function initializeEventListeners() {
  const monthInput = document.getElementById('monthInput');
  const saveButton = document.getElementById('save-btn');
  const moneyInput = document.getElementById('money-month');

  monthInput.addEventListener('change', function () {
    const selectedMonth = this.value;
    renderMoney(selectedMonth);
  });

  saveButton.addEventListener('click', function () {
    const moneyValue = moneyInput.value.trim();

    if (moneyValue) {
      const selectedMonth = monthInput.value;
      saveBudgetForMonth(selectedMonth, moneyValue);
      renderMoney(selectedMonth);
    } else {
      alert('Vui lòng nhập ngân sách!');
    }
  });
}

function initializePage() {
  const selectedMonth = document.getElementById('monthInput').value;
  renderMoney(selectedMonth);
  initializeEventListeners();
}

document.addEventListener('DOMContentLoaded', initializePage);
