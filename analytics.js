// ================= HÀM QUẢN LÝ POPUP DÙNG CHUNG =================
/**
 * Thiết lập logic đóng/mở cho một cặp Nút bấm và Popup tương ứng
 * @param {string} triggerBtnId ID của nút bấm mở popup
 * @param {string} popupId ID của khung popup cần hiển thị
 */
// ================= HÀM QUẢN LÝ POPUP DÙNG CHUNG =================
function setupDropdown(triggerBtnId, popupId) {
    const triggerBtn = document.getElementById(triggerBtnId);
    const popup = document.getElementById(popupId);

    if (!triggerBtn || !popup) return;

    triggerBtn.addEventListener('click', (e) => {
        e.stopPropagation();

        document.querySelectorAll('.app-popup').forEach((el) => {
            if (el !== popup) {
                el.classList.add('hidden');
            }
        });

        popup.classList.toggle('hidden');
    });

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

// ================= KHỞI TẠO POPUP =================
document.addEventListener('DOMContentLoaded', () => {
    setupDropdown('accountBtn', 'accountPopup');
    setupDropdown('appsBtn', 'appsPopup');           // Popup 9 chấm Google Apps
    setupDropdown('helpBtn', 'helpPopup');           // Popup Trợ giúp (?)
    setupDropdown('profileBtn', 'profilePopup');     // Popup Tài khoản

    // GỌI THÊM POPUP CHỈ SỐ Ở ĐÂY:
    setupDropdown('metricDropdownBtn', 'metricDropdownMenu');
});

// ================= SIDEBAR TRÁI CẤP 2 (SUB-SIDEBAR) =================
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
            subSidebar.classList.remove('w-64', 'border-r');
            subSidebar.classList.add('w-0');
            subSidebarContent.classList.add('opacity-0', 'pointer-events-none');
            toggleArrow.classList.add('rotate-180');
        } else {
            subSidebar.classList.remove('w-0');
            subSidebar.classList.add('w-64', 'border-r');
            subSidebarContent.classList.remove('opacity-0', 'pointer-events-none');
            toggleArrow.classList.remove('rotate-180');
        }
    });
}

// ================= SLIDER MẪU KHÁM PHÁ (TEMPLATE SLIDER) =================
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('templateSlider');
    const prevBtn = document.getElementById('prevSlideBtn');
    const nextBtn = document.getElementById('nextSlideBtn');

    function updateSliderButtons() {
        if (!slider || !prevBtn || !nextBtn) return;
        const scrollLeft = slider.scrollLeft;
        const maxScroll = slider.scrollWidth - slider.clientWidth;

        if (scrollLeft <= 10) {
            prevBtn.classList.add('hidden');
            prevBtn.classList.remove('flex');
        } else {
            prevBtn.classList.remove('hidden');
            prevBtn.classList.add('flex');
        }

        if (scrollLeft >= maxScroll - 10) {
            nextBtn.classList.add('hidden');
            nextBtn.classList.remove('flex');
        } else {
            nextBtn.classList.remove('hidden');
            nextBtn.classList.add('flex');
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: 320, behavior: 'smooth' });
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -320, behavior: 'smooth' });
        });
    }

    if (slider) {
        slider.addEventListener('scroll', updateSliderButtons);
        window.addEventListener('resize', updateSliderButtons);
        updateSliderButtons();
    }
});

// ================= CHUYỂN TAB CƠ BẢN (TAB-BTN) =================
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

// ================= TRANG NHIỆM VỤ (ACCORDION & SUB-ITEMS) =================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Tự động đóng/mở khối accordion cha
    const accordionCards = document.querySelectorAll('.accordion-card');
    accordionCards.forEach(card => {
        const header = card.querySelector('.accordion-header');
        const body = card.querySelector('.accordion-body');
        const arrow = card.querySelector('.accordion-arrow');

        if (header && body) {
            header.addEventListener('click', () => {
                const isHidden = body.classList.toggle('hidden');
                if (arrow) {
                    if (isHidden) {
                        arrow.classList.remove('rotate-180');
                    } else {
                        arrow.classList.add('rotate-180');
                    }
                }
            });
        }
    });

    // 2. Chuyển đổi giữa các sub-items
    const subItems = document.querySelectorAll('.sub-item');
    subItems.forEach(item => {
        const collapsed = item.querySelector('.sub-collapsed');
        const expanded = item.querySelector('.sub-expanded');

        if (collapsed && expanded) {
            collapsed.addEventListener('click', () => {
                const parentCard = item.closest('.accordion-card');
                if (parentCard) {
                    const siblingSubItems = parentCard.querySelectorAll('.sub-item');
                    siblingSubItems.forEach(sib => {
                        sib.querySelector('.sub-collapsed')?.classList.remove('hidden');
                        sib.querySelector('.sub-expanded')?.classList.add('hidden');
                    });
                }
                collapsed.classList.add('hidden');
                expanded.classList.remove('hidden');
            });
        }
    });

    // 3. Đồng bộ thanh navbar theo data-target
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);

            navTabs.forEach(t => {
                t.classList.remove('text-[#1a73e8]', 'border-[#1a73e8]', 'font-semibold');
                t.classList.add('text-zinc-600', 'border-transparent');
            });
            tab.classList.add('text-[#1a73e8]', 'border-[#1a73e8]', 'font-semibold');
            tab.classList.remove('text-zinc-600', 'border-transparent');

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

// ================= CÂY MENU SIDEBAR (TREEVIEW) =================
document.addEventListener('DOMContentLoaded', () => {
    const toggles = document.querySelectorAll('.tree-toggle');

    toggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const content = toggle.nextElementSibling;
            const arrow = toggle.querySelector('.tree-arrow');

            if (content && content.classList.contains('tree-content')) {
                const isHidden = content.classList.toggle('hidden');

                if (arrow) {
                    if (arrow.innerHTML.includes('M8 5v14l11-7z')) {
                        arrow.classList.toggle('rotate-90', !isHidden);
                    } else {
                        arrow.classList.toggle('-rotate-90', isHidden);
                    }
                }
            }
        });
    });
});

// ================= THANH CUỘN CÁC TAB CHỈ SỐ (CARD 1) =================
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('tabsContainer');
    const btnLeft = document.getElementById('scrollTabsLeft');
    const btnRight = document.getElementById('scrollTabsRight');

    if (!container || !btnLeft || !btnRight) return;

    const scrollStep = 220;

    function updateScrollButtons() {
        const maxScrollLeft = container.scrollWidth - container.clientWidth;

        if (container.scrollLeft <= 5) {
            btnLeft.classList.add('text-zinc-300');
            btnLeft.classList.remove('text-zinc-600');
            btnLeft.disabled = true;
        } else {
            btnLeft.classList.remove('text-zinc-300');
            btnLeft.classList.add('text-zinc-600');
            btnLeft.disabled = false;
        }

        if (container.scrollLeft >= maxScrollLeft - 5) {
            btnRight.classList.add('text-zinc-300');
            btnRight.classList.remove('text-zinc-600');
            btnRight.disabled = true;
        } else {
            btnRight.classList.remove('text-zinc-300');
            btnRight.classList.add('text-zinc-600');
            btnRight.disabled = false;
        }
    }

    btnLeft.addEventListener('click', () => {
        container.scrollBy({ left: -scrollStep, behavior: 'smooth' });
    });

    btnRight.addEventListener('click', () => {
        container.scrollBy({ left: scrollStep, behavior: 'smooth' });
    });

    container.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
    updateScrollButtons();
});