//   Dropdown with Data-id

function setupAllDropdowns(scope = document) {
    const buttons = scope.querySelectorAll("[data-dropdown-button]");
    const dropdowns = scope.querySelectorAll("[data-dropdown-menu]");

    buttons.forEach((button) => {
        const dropdownId = button.getAttribute("data-dropdown-button");
        const dropdown = scope.querySelector(
            `[data-dropdown-menu="${dropdownId}"]`
        );

        button.addEventListener("click", (e) => {
            e.stopPropagation();
            const isHidden = dropdown.classList.contains("hidden");

            // Close All Dropdown
            dropdowns.forEach((dd) => {
                if (!dd.classList.contains("hidden")) {
                    dd.classList.remove("opacity-100", "scale-y-100");
                    dd.classList.add("opacity-0", "scale-y-95");
                    setTimeout(() => {
                        dd.classList.add("hidden");
                    }, 200);
                }
            });

            if (isHidden) {
                dropdown.classList.remove("hidden");
                setTimeout(() => {
                    dropdown.classList.add("opacity-100", "scale-y-100");
                    dropdown.classList.remove("opacity-0", "scale-y-95");
                }, 10);
            }
        });
    });

    // function Close Dropdown
    document.addEventListener("click", (e) => {
        const isInsideDropdown = Array.from(dropdowns).some((dd) =>
            dd.contains(e.target)
        );
        const isButtonClick = Array.from(buttons).some((btn) =>
            btn.contains(e.target)
        );
        if (!isInsideDropdown && !isButtonClick) {
            dropdowns.forEach((dd) => {
                dd.classList.remove("opacity-100", "scale-y-100");
                dd.classList.add("opacity-0", "scale-y-95");
                setTimeout(() => {
                    dd.classList.add("hidden");
                }, 200);
            });
        }
    });
}
setupAllDropdowns();

// Sub Dropdown 

const toggles = document.querySelectorAll(".subdropdown-toggle");

toggles.forEach((toggle) => {
    const dropdownMenu = toggle.nextElementSibling;
    const chevron = toggle.querySelector("svg");

    toggle.addEventListener("click", function (e) {
        e.preventDefault();

        const isOpen = dropdownMenu.classList.contains("opacity-100");

        // Close all dropdown menus before toggling
        closeAllDropdowns();

        if (!isOpen) {
            openDropdown(toggle, dropdownMenu, chevron);
        }
    });
});

function openDropdown(toggle, menu, chevron) {
    menu.classList.remove("opacity-0", "pointer-events-none");
    menu.classList.add("opacity-100", "pointer-events-auto");
    toggle.setAttribute("aria-expanded", "true");
    chevron.classList.remove("rotate-0");
    chevron.classList.add("rotate-90");
}

function closeDropdown(toggle, menu, chevron) {
    menu.classList.add("opacity-0", "pointer-events-none");
    menu.classList.remove("opacity-100", "pointer-events-auto");
    toggle.setAttribute("aria-expanded", "false");
    chevron.classList.remove("rotate-90");
    chevron.classList.add("rotate-0");
}

function closeAllDropdowns() {
    toggles.forEach((toggle) => {
        const menu = toggle.nextElementSibling;
        const chevron = toggle.querySelector("svg");
        closeDropdown(toggle, menu, chevron);
    });
}

// Close dropdowns on outside click
document.addEventListener("click", function (event) {
    if (
        ![...toggles].some(
            (toggle) =>
                toggle.contains(event.target) ||
                toggle.nextElementSibling.contains(event.target)
        )
    ) {
        closeAllDropdowns();
    }
});

// Close dropdowns on Escape key press
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeAllDropdowns();
    }
});

// Mobile Dropdown

document.querySelectorAll(".mobiledropdown-btn").forEach((button) => {
    button.addEventListener("click", () => {
        const expanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!expanded));
        // Find the next sibling mobiledropdown-menu ul
        const dropdownMenu = button.nextElementSibling;
        dropdownMenu.classList.toggle("hidden");
        // Find the svg icon in button to rotate
        const icon = button.querySelector(".mobiledropdown-icon");
        icon.classList.toggle("rotate-180");
    });
});