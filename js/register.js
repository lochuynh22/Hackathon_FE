// Khởi tạo dữ liệu mẫu nếu chưa có
if (!localStorage.getItem('userList')) {
  let userList = [
    {
      id: 1,
      username: "user1",
      password: "password123",
      email: "user1@gmail.com",
      monthlyCategories: [] // thêm monthlyCategories
    },
    {
      id: 2,
      username: "user2",
      password: "password456",
      email: "user2@gmail.com",
      monthlyCategories: []
    }
  ];
  localStorage.setItem('userList', JSON.stringify(userList));
}

const form = document.querySelector('.register-box');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const username = form.username.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value;
  const confirmPassword = form.confirmPassword.value;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    alert('Email không được để trống');
    return;
  }

  if (!emailRegex.test(email)) {
    alert('Email phải đúng định dạng');
    return;
  }

  if (!password) {
    alert('Mật khẩu không được để trống');
    return;
  }

  if (password.length < 6) {
    alert('Mật khẩu tối thiểu 6 ký tự trở lên');
    return;
  }

  if (!confirmPassword) {
    alert('Mật khẩu xác nhận không được để trống');
    return;
  }

  if (password !== confirmPassword) {
    alert('Mật khẩu xác nhận phải trùng khớp mật khẩu khi đăng ký');
    return;
  }

  let userList = JSON.parse(localStorage.getItem('userList')) || [];

  const exists = userList.some(user => user.username === username || user.email === email);
  if (exists) {
    alert('Tên tài khoản hoặc email đã tồn tại!');
    return;
  }

  const newUser = {
    id: Date.now(),
    username,
    email,
    password,
    monthlyCategories: [] // thêm mảng rỗng lúc đăng ký
  };

  userList.push(newUser);
  localStorage.setItem('userList', JSON.stringify(userList));

  alert('Đăng ký thành công!');

  // Ghi lại thông tin user đăng nhập hiện tại
  localStorage.setItem('currentUserId', newUser.id);

  window.location.href = 'login.html'; // hoặc chuyển hướng tuỳ ý
});
