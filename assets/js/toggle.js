    // Toggle For Navbar Mobile
        document.querySelectorAll(".menu-toggle").forEach((toggle) => {
            toggle.addEventListener("click", () => {
                const targetId = toggle.getAttribute("data-target");
                const menu = document.getElementById(targetId);
                if (menu) {
                    menu.classList.toggle("hidden");
                }
            });
        });