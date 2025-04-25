document.querySelector('.login-box').addEventListener('submit', function (e) {
  e.preventDefault();

  const usernameInput = document.querySelector('input[placeholder="Tên đăng nhập"]').value.trim();
  const passwordInput = document.querySelector('input[placeholder="Mật khẩu"]').value;

  let userList = JSON.parse(localStorage.getItem('userList')) || [];

  const foundUser = userList.find(
    user => user.username === usernameInput && user.password === passwordInput
  );

  if (foundUser) {
    alert('Đăng nhập thành công!');
    localStorage.setItem('currentUser', JSON.stringify(foundUser));

    // Chuyển hướng sang trang chính
    window.location.href = '../index.html';
  } else {
    alert('Sai tên đăng nhập hoặc mật khẩu!');
  }
});
