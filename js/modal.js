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

async function handleClickedModalAddButton() {
    const modalContentInput = document.querySelector(".modal-content-input");

    if (modalContentInput.value === "") {
        alert("내용을 입력하세요");
        return;
    }

    const todo = {
        todoListDate: currentDate,
        todoListContent: modalContentInput.value,
        todoListLike: 0,
    };

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
            "http://localhost:8080/todolist/todolist/addition",
            option
        );

        if (!response.ok) {
            throw await response.json();
        }

        const responseData = await response.json();
        console.log(responseData);

        alert("정상적으로 등록이 완료 되었습니다.");

        handleClickedCloseButton();
    } catch (error) {
        console.log(error);
    }
}
