function loadThemeCSS() {
    const themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const cssFile = document.documentElement.getAttribute("data-css-file");

    const link = document.createElement("link");
    link.rel = "stylesheet";

    if (themeMediaQuery.matches) {
        link.href = `style/${cssFile}_dark.css`;
    } else {
        link.href = `style/${cssFile}_light.css`;
    }

    document.head.appendChild(link);
}

loadThemeCSS();

const themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
themeMediaQuery.addEventListener("change", loadThemeCSS);