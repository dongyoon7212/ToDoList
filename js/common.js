function handleClickedSideRightButton() {
    const rootLayout = document.querySelectorAll(".root-layout");

    rootLayout[1].scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleClickedSideLeftButton() {
    const rootLayout = document.querySelectorAll(".root-layout");

    rootLayout[0].scrollIntoView({ behavior: "smooth", block: "start" });
}
