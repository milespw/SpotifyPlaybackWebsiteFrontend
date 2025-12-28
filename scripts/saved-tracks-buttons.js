function nextPage() {
    const pageNo = getPageNo();
    window.location.href = "/saved-tracks?page=" + String(Number(pageNo) + 1);
}

function previousPage() {
    const pageNo = getPageNo();
    if (pageNo === 0) {
        return;
    }
    window.location.href = "/saved-tracks?page=" + String(Number(pageNo) - 1);
}

function getPageNo() {
    const params = new URLSearchParams((new URL(window.location.href)).search);
    return Number.isNaN(parseInt(params.get("page"), 10)) ? 0 : parseInt(params.get("page"), 10);
}

window.addEventListener("load", function () {
    const pageNo = getPageNo();

    if (pageNo === 0) {
        const previousPageButton = document.getElementById("previousPageButton");
        previousPageButton.style.visibility = "hidden";
    }
})

window.previousPage = previousPage;
window.nextPage = nextPage;