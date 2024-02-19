window.onload = () => {
    handleGetTodoData();
    handleGetCompleteTodoData();
};

async function handleGetTodoData() {
    const todoContentList = document.querySelector(".todo-content-list");

    todoContentList.innerHTML = "";

    try {
        const response = await fetch("http://localhost:8080/todolist/getlist");

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
                    <button class="todo-content-check-button" onclick="handleClickedCompleteButton('${todo.todoListId}', '${todo.todoListDate}', '${todo.todoListContent}', '${todo.todoListComplete}',)">
                        <i class="fa-solid fa-check"></i>
                    </button>
                    <div class="todo-content-footer-container">
                        <button
                            class="todo-content-footer-button"
                            onclick="handleClickedEditButton('${todo.todoListId}', '${todo.todoListDate}', '${todo.todoListContent}', '${todo.todoListComplete}')"
                        >
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button
                            class="todo-content-footer-button"
                            onclick="handleClickedDeleteButton(${todo.todoListId})"
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

async function handleGetCompleteTodoData() {
    const todoContentList = document.querySelector(
        ".todo-content-complete-list"
    );

    todoContentList.innerHTML = "";

    try {
        const response = await fetch(
            "http://localhost:8080/todolist/getcompletelist"
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
                    <button class="todo-content-check-button" onclick="handleClickedCompleteButton('${todo.todoListId}', '${todo.todoListDate}', '${todo.todoListContent}', '${todo.todoListComplete}',)">
                        <i class="fa-solid fa-check"></i>
                    </button>
                    <div class="todo-content-footer-container">
                        <button
                            class="todo-content-footer-button"
                        >
                            <i
                                class="fa-solid fa-trash-can"
                                onclick="handleClickedDeleteButton(${todo.todoListId})"
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
        todoListComplete: 0,
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
            "http://localhost:8080/todolist/addition",
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

async function handleClickedCompleteButton(id, date, content, complete) {
    console.log(complete, id);

    let isConfirmed = confirm("ToDo를 완료하시겠습니까?");

    if (isConfirmed === true) {
        const todo = {
            todoListId: id,
            todoListDate: date,
            todoListContent: content,
            todoListComplete: 1,
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
                3;
            }

            const responseData = await response.json();

            console.log(responseData);

            alert("정상적으로 ToDo가 완료처리 되었습니다.");

            handleClickedCloseButton();

            handleGetTodoData();
            handleGetCompleteTodoData();
        } catch (error) {
            console.log(error);
        }
    } else {
        return;
    }
}

async function handleClickedDeleteButton(id) {
    console.log(id);

    const deleteTodo = {
        todoListId: id,
    };

    const jsonTodoData = JSON.stringify(deleteTodo);

    const option = {
        method: "post",
        Headers: {
            "Content-Type": "application/json",
        },
        body: jsonTodoData,
    };

    let isConfirmed = confirm("정말로 ToDo를 삭제하시겠습니까?");
    if (isConfirmed === true) {
        try {
            const response = await fetch(
                "http://localhost:8080/todolist/delete",
                option
            );

            if (!response.ok) {
                throw await response.json();
            }

            const responseData = await response.json();
            if (responseData.successCount === 1) {
                alert("성공적으로 삭제가 완료되었습니다.");
            }

            handleGetTodoData();
            handleGetCompleteTodoData();
        } catch (error) {
            console.log(error);
        }
    }

    console.log(deleteTodo);
}

async function handleClickedCompleteDeleteButton() {
    const option = {
        method: "post",
        Headers: {
            "Content-Type": "application/json",
        },
    };

    let isConfirmed = confirm("완료된 ToDo를 모두 삭제하시겠습니까?");

    if (isConfirmed === true) {
        try {
            const response = await fetch(
                "http://localhost:8080/todolist/completedelete",
                option
            );

            if (!response.ok) {
                throw await response.json();
            }

            const responseData = await response.json();

            alert(
                `성공적으로 완료된 ToDo ${responseData.successCount}건 삭제가 완료되었습니다.`
            );

            handleGetTodoData();
            handleGetCompleteTodoData();
        } catch (error) {
            console.log(error);
        }
    }
}
