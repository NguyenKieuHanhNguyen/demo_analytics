// ================= HÀM QUẢN LÝ POPUP DÙNG CHUNG =================
/**
 * Thiết lập logic đóng/mở cho một cặp Nút bấm và Popup tương ứng
 * @param {string} triggerBtnId - ID của nút bấm mở popup
 * @param {string} popupId - ID của khung popup cần hiển thị
 */
function setupDropdown(triggerBtnId, popupId) {
    // Đổi tên biến chứa element để không bị trùng với tham số truyền vào
    const triggerBtn = document.getElementById(triggerBtnId);
    const popup = document.getElementById(popupId);

    // Nếu không tìm thấy nút hoặc popup thì dừng
    if (!triggerBtn || !popup) return;

    // Bấm vào nút: Đóng tất cả popup khác và bật/tắt popup hiện tại
    triggerBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Thêm tham số 'e' để chặn nổi bọt sự kiện

        // 1. Đóng tất cả các popup khác đang mở trên màn hình
        document.querySelectorAll('.app-popup').forEach((el) => {
            if (el !== popup) {
                el.classList.add('hidden');
            }
        });

        // 2. Bật / Tắt popup của nút này
        popup.classList.toggle('hidden');
    });

    // Ngăn sự kiện click bên trong nội dung popup làm đóng nhầm popup
    popup.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Khi người dùng bấm ra bất kỳ vùng trống nào ngoài màn hình -> Tự động đóng tất cả popup
document.addEventListener('click', () => {
    document.querySelectorAll('.app-popup').forEach((popup) => {
        popup.classList.add('hidden');
    });
});

// ================= KHỞI TẠO =================
// Chạy hàm setupDropdown sau khi DOM đã tải xong
document.addEventListener('DOMContentLoaded', () => {
    setupDropdown('accountBtn', 'accountPopup');
    setupDropdown('appsBtn', 'appsPopup');       // Popup 9 chấm Google Apps
    setupDropdown('helpBtn', 'helpPopup');       // Popup Trợ giúp (?)
    setupDropdown('profileBtn', 'profilePopup'); // Popup Tài khoản
});