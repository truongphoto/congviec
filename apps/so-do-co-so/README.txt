GPP Sơ đồ - bản PWA

Các file:
- index.html: ứng dụng chính
- manifest.webmanifest: cấu hình cài ứng dụng
- service-worker.js: offline + phát hiện cập nhật
- icons/: icon cho tab, desktop, taskbar, mobile

Lưu ý quan trọng:
PWA chỉ hiện nút Cài đặt khi chạy qua HTTPS hoặc localhost. Nếu mở index.html trực tiếp bằng file:// thì Service Worker/PWA không hoạt động.

Khi phát hành bản mới:
1. Sửa nội dung index.html (hoặc file khác).
2. Tăng APP_VERSION trong service-worker.js, ví dụ 1.1.0 -> 1.1.1.
3. Upload lại toàn bộ thư mục lên hosting HTTPS.
4. Người dùng đang mở app sẽ thấy nút “Cập nhật” khi trình duyệt tải được Service Worker mới.


BẢN 1.1.1:
- Nút Cài đặt luôn hiển thị khi mở trong trình duyệt.
- Nếu mở trực tiếp file://, bấm Cài đặt sẽ giải thích cần HTTPS/localhost.
- Khi đủ điều kiện PWA, nút sẽ gọi hộp cài đặt của Chrome/Edge.


BẢN 1.1.4:
- Tạo nút / Xóa nút là chức năng quản lý nút tự tạo trong Thư viện.
- Nút tự tạo được lưu trên trình duyệt và dùng lại ở lần sau.
- Xóa nút thư viện không xóa các vật thể đã đặt trên sơ đồ.
- Chuyển Quản lý thư viện và Sơ đồ đã lưu sang cột phải.
- Tối ưu cột phải gọn trong chiều cao màn hình, không dùng thanh cuộn trang ở chế độ desktop.

BẢN 1.1.5:
- Cho phép xóa cả nút thư viện mặc định và ghi nhớ trạng thái đã xóa.
- Bỏ biểu tượng trong các nút thư viện, giảm chiều cao để hiển thị gọn.
- Thư viện tự đổi 2/3 cột, tự co chữ/khoảng cách theo số nút và không dùng thanh cuộn.

BẢN 1.1.6:
- Khôi phục icon nét đơn sắc, kích thước nhỏ cho các nút thư viện.
- Xóa nút: bật chế độ rồi click trực tiếp nút cần xóa, không hiện hộp xác nhận.
- Thêm Khôi phục mặc định: phục hồi các nút gốc đã xóa, không xóa nút tự tạo.
- Tối ưu 2/3 cột, icon/chữ/khoảng cách tự co để thư viện không dùng thanh cuộn.
