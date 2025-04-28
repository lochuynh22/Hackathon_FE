  document.querySelector('.login-box').addEventListener('submit', function (e) {
    e.preventDefault();

    const usernameInput = document.querySelector('#username').value.trim();
    const passwordInput = document.querySelector('#password').value;

    let userList = JSON.parse(localStorage.getItem('userList')) || [];

    const foundUser = userList.find(
      user => user.username === usernameInput && user.password === passwordInput
    );

    if (foundUser) {
      alert('Đăng nhập thành công!');
      localStorage.setItem('currentUser', JSON.stringify(foundUser));

      // Redirect to the main page
      window.location.href = '../index.html';
    } else {
      alert('Sai tên đăng nhập hoặc mật khẩu!');
    }
  }); 
