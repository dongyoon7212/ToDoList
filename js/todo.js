window.onload = () => {
    handleGetTodoData();
};

async function handleGetTodoData() {
    const todoContentList = document.querySelector(".todo-content-list");

    todoContentList.innerHTML = "";

    try {
        const response = await fetch(
            "http://localhost:8080/todolist/todolist/getlist"
        );

        if (!response.ok) {
            throw await response.json();
        }

        const responseData = await response.json();
        console.log(responseData);

        for (let todo of responseData) {
            todoContentList.innerHTML += `
            <li class="todo-content-box">
                <div class="todo-content-header">
                    <h3 class="todo-content-date">
                        <i
                            class="fa-solid fa-calendar-days"
                        ></i>
                        ${todo.todoListDate}
                    </h3>
                </div>
                <div class="todo-content-main">
                    <div class="todo-content">
                        ${todo.todoListContent}
                    </div>
                </div>
                <div class="todo-content-footer">
                <input type="checkbox" onclick=handleCheckboxClick(${
                    todo.todoListId
                }) class="checkbox" ${
                todo.todoListLike === 1 ? "checked" : ""
            } />
                    <div class="todo-content-footer-container">
                        <button
                            class="todo-content-footer-button"
                            onclick="handleClickedEditButton('${
                                todo.todoListId
                                }', '${todo.todoListDate}', '${
                                todo.todoListContent
                                }')"
                        >
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button
                            class="todo-content-footer-button"
                        >
                            <i
                                class="fa-solid fa-trash-can"
                            ></i>
                        </button>
                    </div>
                </div>
            </li>
            `;
        }
    } catch (error) {
        console.log(error);
    }
}

async function handleClickedModalAddButton() {
    const modalContentInput = document.querySelector(".modal-content-input");

    let today = new Date();

    let year = today.getFullYear();
    let month = today.getMonth();
    let date = today.getDate();

    let currentDate = year + "." + (month + 1) + "." + date;

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

        handleGetTodoData();
    } catch (error) {
        console.log(error);
    }
}

async function handleCheckboxClick(id) {
    console.log(id);
}
