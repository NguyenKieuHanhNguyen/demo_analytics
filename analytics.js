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

    // 1. TỰ ĐỘNG ĐÓNG / MỞ TẤT CẢ CÁC KHỐI ACCORDION CHA
    const accordionCards = document.querySelectorAll('.accordion-card');

    accordionCards.forEach(card => {
        const header = card.querySelector('.accordion-header');
        const body = card.querySelector('.accordion-body');
        const arrow = card.querySelector('.accordion-arrow');

        header.addEventListener('click', () => {
            const isHidden = body.classList.toggle('hidden');
            if (isHidden) {
                arrow.classList.remove('rotate-180');
            } else {
                arrow.classList.add('rotate-180');
            }
        });
    });

    // 2. TỰ ĐỘNG CHUYỂN ĐỔI GIỮA CÁC NHIỆM VỤ CON (SUB-TASKS) NẰM TRONG CÁC KHỐI
    const subItems = document.querySelectorAll('.sub-item');

    subItems.forEach(item => {
        const collapsed = item.querySelector('.sub-collapsed');
        const expanded = item.querySelector('.sub-expanded');

        if (collapsed && expanded) {
            collapsed.addEventListener('click', () => {
                // Tìm toàn bộ anh em sub-item trong cùng 1 khối accordion cha
                const parentCard = item.closest('.accordion-card');
                const siblingSubItems = parentCard.querySelectorAll('.sub-item');

                siblingSubItems.forEach(sib => {
                    sib.querySelector('.sub-collapsed')?.classList.remove('hidden');
                    sib.querySelector('.sub-expanded')?.classList.add('hidden');
                });

                // Mở sub-task vừa được bấm
                collapsed.classList.add('hidden');
                expanded.classList.remove('hidden');
            });
        }
    });

    // 3. ĐIỀU KHIỂN ĐỒNG BỘ THANH NAVBAR VỚI CÁC KHỐI THEO DATA-TARGET
    const navTabs = document.querySelectorAll('.nav-tab');

    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);

            // Đổi màu gạch chân xanh tab đang chọn
            navTabs.forEach(t => {
                t.classList.remove('text-[#1a73e8]', 'border-[#1a73e8]', 'font-semibold');
                t.classList.add('text-zinc-600', 'border-transparent');
            });
            tab.classList.add('text-[#1a73e8]', 'border-[#1a73e8]', 'font-semibold');
            tab.classList.remove('text-zinc-600', 'border-transparent');

            // Cuộn mượt đến khối mục tiêu và tự động mở nội dung
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

                const body = targetElement.querySelector('.accordion-body');
                const arrow = targetElement.querySelector('.accordion-arrow');

                if (body && body.classList.contains('hidden')) {
                    body.classList.remove('hidden');
                    if (arrow) arrow.classList.add('rotate-180');
                }
            }
        });
    });

});

document.addEventListener('DOMContentLoaded', () => {
    // 1. XỬ LÝ ĐÓNG / MỞ TẤT CẢ CÁC CÂY THƯ MỤC TRONG MENU (TREEVIEW)
    const toggles = document.querySelectorAll('.tree-toggle');

    toggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();

            // Tìm phần tử nội dung liền kề ngay sau nút
            const content = toggle.nextElementSibling;
            const arrow = toggle.querySelector('.tree-arrow');

            if (content && content.classList.contains('tree-content')) {
                const isHidden = content.classList.toggle('hidden');

                if (arrow) {
                    // Nếu là mũi tên tam giác quay ngang ▶ (M8 5v14l11-7z)
                    if (arrow.innerHTML.includes('M8 5v14l11-7z')) {
                        arrow.classList.toggle('rotate-90', !isHidden);
                    } else {
                        // Nếu là mũi tên tam giác quay xuống ▼ hoặc chevron ^
                        arrow.classList.toggle('-rotate-90', isHidden);
                    }
                }
            }
        });
    });

    // 2. XỬ LÝ NÚT THU GỌN TOÀN BỘ SIDEBAR BÊN TRÁI
    const toggleBtn = document.getElementById('toggleSidebarBtn');
    const sidebar = document.getElementById('subSidebar');
    const sidebarContent = document.getElementById('subSidebarContent');
    const toggleArrow = document.getElementById('toggleArrowIcon');

    if (toggleBtn && sidebar && sidebarContent) {
        let isCollapsed = false;

        toggleBtn.addEventListener('click', () => {
            isCollapsed = !isCollapsed;

            if (isCollapsed) {
                sidebar.classList.remove('w-64');
                sidebar.classList.add('w-0', 'border-r-0');
                sidebarContent.classList.add('opacity-0', 'pointer-events-none');
                if (toggleArrow) toggleArrow.classList.add('rotate-180');
            } else {
                sidebar.classList.add('w-64');
                sidebar.classList.remove('w-0', 'border-r-0');
                sidebarContent.classList.remove('opacity-0', 'pointer-events-none');
                if (toggleArrow) toggleArrow.classList.remove('rotate-180');
            }
        });
    }
});