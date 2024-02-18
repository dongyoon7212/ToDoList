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

async function handleClickedAddEditButton(id, date, complete) {
    const modalContentInput = document.querySelector(".modal-content-input");

    if (modalContentInput.value === "") {
        alert("내용을 입력하세요");
        return;
    }

    const todo = {
        todoListId: id,
        todoListDate: date,
        todoListContent: modalContentInput.value,
        todoListComplete: complete,
    };

    console.log(todo);

    const jsonTodoData = JSON.stringify(todo);

    const option = {
        method: "post",
        Headers: {
            "Content-Type": "application/json",
        },
        body: jsonTodoData,
    };

    try {
        const response = await fetch(
            "http://localhost:8080/todolist/update",
            option
        );

        if (!response.ok) {
            throw await response.json();
        }

        const responseData = await response.json();

        console.log(responseData);

        alert("정상적으로 수정이 완료 되었습니다.");

        handleClickedCloseButton();

        handleGetTodoData();
    } catch (error) {
        console.log(error);
    }
}

function handleClickedEditButton(id, date, content, complete) {
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
                onclick="handleClickedAddEditButton('${id}', '${date}', '${complete}')"
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
}
