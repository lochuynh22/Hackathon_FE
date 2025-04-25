document.getElementById('logout-btn').addEventListener('click', function () {
    // Xóa thông tin đăng nhập nếu có (tuỳ thuộc vào cách bạn lưu, ví dụ localStorage)
    localStorage.removeItem('user'); // nếu bạn lưu user trong localStorage

    // Điều hướng về trang login, kiểm tra đường dẫn tương đối
    window.location.href = '../pages/login.html'; // Đảm bảo đường dẫn đúng
});
document.getElementById('logout-btn').addEventListener('click', function () {
    // Hiển thị hộp thoại xác nhận khi người dùng nhấn "Đăng xuất"
    const confirmLogout = window.confirm('Bạn có chắc chắn muốn đăng xuất?');
  
    if (confirmLogout) {
      // Nếu người dùng nhấn "OK", thực hiện đăng xuất
      localStorage.removeItem('user');  // Xóa thông tin đăng nhập từ localStorage
  
      // Điều hướng về trang đăng nhập
      window.location.href = '../pages/login.html';
    } else {
      // Nếu người dùng nhấn "Cancel", không làm gì cả
      console.log('Đăng xuất bị hủy');
    }
  });
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (currentUser) {
  document.getElementById('account-name').innerText = currentUser.username;
} else {
  document.getElementById('account-name').innerText = 'Tài khoản chưa đăng nhập';
}

  