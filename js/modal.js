let today = new Date();

let year = today.getFullYear();
let month = today.getMonth();
let date = today.getDate();

let currentDate = year + "." + month + "." + date;

function handleClickedAddButton() {
    const rootModal = document.querySelector(".root-modal");
    const modalContentInput = document.querySelector(".modal-content-input");
    const modalHeader = document.querySelector(".modal-header");

    modalHeader.innerHTML = `
        <div class="modal-header-button">
            <div
                class="modal-mac-button"
                onclick="handleClickedCloseButton()"
            >
                <i class="fa-solid fa-xmark close"></i>
            </div>
            <div class="modal-mac-button"></div>
            <div class="modal-mac-button"></div>
        </div>
        <i class="fa-solid fa-calendar-days"></i>
        ${currentDate}
    `;

    modalContentInput.value = "";

    rootModal.classList.add("modal-show");
}

function handleClickedCloseButton() {
    const rootModal = document.querySelector(".root-modal");
    const modalContentInput = document.querySelector(".modal-content-input");

    modalContentInput.value = "";

    rootModal.classList.remove("modal-show");
}

function handleClickedAEditButton(id, date) {
    const modalContentInput = document.querySelector(".modal-content-input");

    if (modalContentInput.value === "") {
        alert("내용을 입력하세요");
        return;
    }

    const todo = {
        todoListid: id,
        todoListDate: date,
        todoListContent: modalContentInput.value,
        todoListLike: 0,
    };

    const jsonTodoData = JSON.stringify(todo);
}

function handleClickedEditButton(id, date, content) {
    const rootModal = document.querySelector(".root-modal");
    const modalContentInput = document.querySelector(".modal-content-input");
    const modalLayout = document.querySelector(".modal-layout");
    console.log(id);
    modalLayout.innerHTML = `
        <header class="modal-header">
            <div class="modal-header-button">
                <div
                    class="modal-mac-button"
                    onclick="handleClickedCloseButton()"
                >
                    <i class="fa-solid fa-xmark close"></i>
                </div>
                <div class="modal-mac-button"></div>
                <div class="modal-mac-button"></div>
            </div>
                <i class="fa-solid fa-calendar-days"></i>
                ${date}
        </header>
        <main class="modal-main">
            <textarea class="modal-content-input">${content}</textarea>
        </main>
        <footer class="modal-footer">
            <button
                class="modal-footer-button"
                onclick="handleClickedAEditButton('${id}', '${date}')"
            >
                확인
            </button>
            <button
                class="modal-footer-button"
                onclick="handleClickedCloseButton()"
            >
                취소
            </button>
        </footer>
    `;

    rootModal.classList.add("modal-show");

    const editData = modalContentInput.value;
    console.log(editData);
}
