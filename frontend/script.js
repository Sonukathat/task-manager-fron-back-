let addBtn = document.querySelector("#addbtn");
let inp = document.querySelector("#inp");
let section1 = document.querySelector("#section1"); 
let section2 = document.querySelector("#section2"); 

let taskToUpdate = null;

const createtask = (taskObj) => {
    const taskDiv = document.createElement("div");
    const task = document.createElement("span");
    const delBtn = document.createElement("button");
    const upBtn = document.createElement("button");
    const check = document.createElement("input");

    // DELETE
    delBtn.addEventListener('click', async function () {
        await fetch(`http://localhost:3000/api/task/${taskObj._id}`, {
            method: "DELETE"
        });
        taskDiv.remove();
    });

    // UPDATE (frontend)
    upBtn.addEventListener('click', function () {
        addBtn.textContent = "Updated";
        inp.value = task.textContent;
        taskToUpdate = {
            element: task,
            id: taskObj._id
        };
    });

    
    check.addEventListener("change", async function () {
        if (check.checked) {
            section2.appendChild(taskDiv);
        } else {
            section1.appendChild(taskDiv);
        }

        try {
            const response = await fetch(`http://localhost:3000/task/checkupdate/${taskObj._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ completed: check.checked })
            });

            const data = await response.json();
            console.log("Task updated in backend:", data);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    });

    task.textContent = taskObj.title;
    delBtn.textContent = "DELETE";
    upBtn.textContent = "UPDATE";
    check.type = "checkbox";
    check.checked = taskObj.completed;

    taskDiv.append(check, task, delBtn, upBtn);

    
    if (taskObj.completed) {
        section2.appendChild(taskDiv);
    } else {
        section1.appendChild(taskDiv);
    }
};

// GET tasks from backend
const getData = async () => {
    try {
        const res = await fetch("http://localhost:3000");
        const data = await res.json();
        data.map((ele) => createtask(ele));
    } catch (error) {
        console.log(error);
    }
};
getData();

// ADD / UPDATE task
addBtn.addEventListener("click", async () => {
    if (inp.value === "") {
        alert("Please enter a task.");
        return;
    }

    // UPDATE existing task
    if (addBtn.textContent === "Updated") {
        try {
            const updatedTask = await fetch(`http://localhost:3000/api/task/update/${taskToUpdate.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title: inp.value })
            });

            if (!updatedTask.ok) throw new Error("Update failed");

            const data = await updatedTask.json();

            taskToUpdate.element.textContent = data.title;
            inp.value = "";
            addBtn.textContent = "Add Task";
            taskToUpdate = null;
            return;
        } catch (error) {
            alert("Error updating task");
            console.log(error);
            return;
        }
    }

    // ADD new task
    const taskData = { title: inp.value };

    try {
        const response = await fetch("http://localhost:3000/api/task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskData)
        });

        if (!response.ok) throw new Error("Failed to save task");

        const newTask = await response.json();
        createtask(newTask);
        inp.value = "";
    } catch (error) {
        alert("Error saving task");
    }
});







//Delete
// delBtn.addEventListener('click', function () {
//     console.log("bnm,mnb njkjnjk");

// })


// let arr = [];
// let id = 0;

// // Load from localStorage on page load
// window.addEventListener("load", () => {
//     const data = JSON.parse(localStorage.getItem("Task")) || [];
//     arr = data;
//     if (arr.length > 0) id = arr[arr.length - 1].id + 1;
//     arr.forEach(createTaskElement);
// });

// // Add Task
// addBtn.addEventListener("click", () => {
//     if (inp.value.trim() === "") return alert("Please Enter Task...");

//     const taskObj = {
//         id: id++,
//         task: inp.value,
//         completed: false,
//     };

//     arr.push(taskObj);
//     createTaskElement(taskObj);
//     inp.value = "";
// });

// // Create Task Element Function
// function createTaskElement(obj) {
//     const taskDiv = document.createElement("div");
//     const task = document.createElement("span");
//     const delBtn = document.createElement("button");
//     const upBtn = document.createElement("button");
//     const check = document.createElement("input");

//     task.textContent = obj.task;
//     delBtn.textContent = "DELETE";
//     upBtn.textContent = "UPDATE";
//     check.type = "checkbox";
//     check.checked = obj.completed;

//     taskDiv.append(check, task, delBtn, upBtn);
//     (obj.completed ? section2 : section1).appendChild(taskDiv);

//     if (obj.completed) task.classList.add("textdec");

//     // DELETE
//     delBtn.addEventListener("click", () => {
//         taskDiv.remove();
//         arr = arr.filter((ele) => ele.id !== obj.id);
//     });

//     // UPDATE
//     upBtn.addEventListener("click", () => {
//         const newVal = prompt("Update Task", obj.task);
//         if (newVal) {
//             task.textContent = newVal;
//             obj.task = newVal;
//         }
//     });

//     // COMPLETE
//     check.addEventListener("change", () => {
//         obj.completed = check.checked;
//         task.classList.toggle("textdec", obj.completed);
//         (obj.completed ? section2 : section1).appendChild(taskDiv);
//     });
// }

// // SAVE
// saveBtn.addEventListener("click", () => {
//     localStorage.setItem("Task", JSON.stringify(arr));
//     saveBtn.style.backgroundColor = "#22c55e";
//     saveBtn.innerText = "Saved";

//     setTimeout(() => {
//         saveBtn.style.backgroundColor = "#3b82f6";
//         saveBtn.innerText = "Save";
//     }, 500);
// });