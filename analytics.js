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

const subSidebar = document.getElementById('subSidebar');
const subSidebarContent = document.getElementById('subSidebarContent');
const toggleBtn = document.getElementById('toggleSidebarBtn');
const toggleArrow = document.getElementById('toggleArrowIcon');

if (toggleBtn && subSidebar && subSidebarContent && toggleArrow) {
    let isCollapsed = false;

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isCollapsed = !isCollapsed;

        if (isCollapsed) {
            // 1. Thu chiều rộng aside về 0 và gỡ border-r để phẳng hoàn toàn
            subSidebar.classList.remove('w-64', 'border-r');
            subSidebar.classList.add('w-0');

            // 2. Ẩn nội dung chữ (mờ dần và không nhận sự kiện click)
            subSidebarContent.classList.add('opacity-0', 'pointer-events-none');

            // 3. Xoay ngược mũi tên chỉ sang phải (>)
            toggleArrow.classList.add('rotate-180');
        } else {
            // 1. Mở lại sidebar về w-64 và bật lại border-r
            subSidebar.classList.remove('w-0');
            subSidebar.classList.add('w-64', 'border-r');

            // 2. Hiện lại khối nội dung
            subSidebarContent.classList.remove('opacity-0', 'pointer-events-none');

            // 3. Xoay mũi tên về lại hướng cũ (<)
            toggleArrow.classList.remove('rotate-180');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('templateSlider');
    const prevBtn = document.getElementById('prevSlideBtn');
    const nextBtn = document.getElementById('nextSlideBtn');

    function updateSliderButtons() {
        if (!slider || !prevBtn || !nextBtn) return;
        const scrollLeft = slider.scrollLeft;
        const maxScroll = slider.scrollWidth - slider.clientWidth;

        // Trạng thái nút trái (<)
        if (scrollLeft <= 10) {
            prevBtn.classList.add('hidden');
            prevBtn.classList.remove('flex');
        } else {
            prevBtn.classList.remove('hidden');
            prevBtn.classList.add('flex');
        }

        // Trạng thái nút phải (>)
        if (scrollLeft >= maxScroll - 10) {
            nextBtn.classList.add('hidden');
            nextBtn.classList.remove('flex');
        } else {
            nextBtn.classList.remove('hidden');
            nextBtn.classList.add('flex');
        }
    }

    nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: 320, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -320, behavior: 'smooth' });
    });

    slider.addEventListener('scroll', updateSliderButtons);
    window.addEventListener('resize', updateSliderButtons);
    updateSliderButtons();
});

document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => {
                b.classList.remove('text-[#1a73e8]', 'border-[#1a73e8]', 'font-semibold');
                b.classList.add('text-zinc-600', 'border-transparent');
            });
            btn.classList.add('text-[#1a73e8]', 'border-[#1a73e8]', 'font-semibold');
            btn.classList.remove('text-zinc-600', 'border-transparent');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const headerBtn = document.getElementById('accordionHeaderBtn');
    const body = document.getElementById('accordionBody');
    const arrow = document.getElementById('accordionArrow');

    if (headerBtn && body && arrow) {
        let isOpen = true; // Mặc định trong ảnh là đang mở

        headerBtn.addEventListener('click', () => {
            isOpen = !isOpen;

            if (isOpen) {
                body.classList.remove('hidden');
                // Mũi tên quay lên (^)
                arrow.classList.remove('rotate-180');
            } else {
                body.classList.add('hidden');
                // Mũi tên quay xuống (v)
                arrow.classList.add('rotate-180');
            }
        });
    }
});