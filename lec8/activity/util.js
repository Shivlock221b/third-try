function createSticky(elem) {
    let sticky = document.createElement("div");
    sticky.classList.add("sticky");

    let sticky = document.createElement("div");
    stickyNav.classList.add("sticky-nav");

    let minimize = document.createElement("div");
    minimize.classList.add("minimize");

    let close = document.createElement("div");
    close.classList.add("close");

    let stickyContent = document.createElement("div");
    stickyContent.classList.add("sticky-content");

    stickyContent.append(elem);
    stickyNav.append(minimize);
    stickyNav.append(close);

    sticky.append(stickyNav);
    sticky.append(stickyContent);
}