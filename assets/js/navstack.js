document.querySelectorAll(".toggle-section").forEach((section) => {
    const previewBtn = section.querySelector(".preview-btn");
    const codeBtn = section.querySelector(".code-btn");
    const previewContent = section.querySelector(".preview-content");
    const codeContent = section.querySelector(".code-content");
    const copyBtn = section.querySelector(".copy-btn");
    const codeBox = section.querySelector(".code-box");

    function setActiveToggle(type) {
        if (type === "preview") {
            previewBtn.classList.add("active-toggle");
            codeBtn.classList.remove("active-toggle");
            previewContent.classList.remove("hidden");
            codeContent.classList.add("hidden");
        } else if (type === "code") {
            codeBtn.classList.add("active-toggle");
            previewBtn.classList.remove("active-toggle");
            codeContent.classList.remove("hidden");
            previewContent.classList.add("hidden");
        }
    }

    previewBtn.addEventListener("click", () => setActiveToggle("preview"));
    codeBtn.addEventListener("click", () => setActiveToggle("code"));
});