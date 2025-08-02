let addBtn = document.querySelector("#addbtn");
let inp = document.querySelector("#inp");
let section1 = document.querySelector("#section1"); 
let section2 = document.querySelector("#section2"); 

let baseUrl = 'http://localhost:3000';

let taskToUpdate = null;

const createtask = (taskObj) => {
    const taskDiv = document.createElement("div");
    const task = document.createElement("span");
    const delBtn = document.createElement("button");
    const upBtn = document.createElement("button");
    const check = document.createElement("input");

    // DELETE
    delBtn.addEventListener('click', async function () {
        await fetch(`${baseUrl}/api/task/${taskObj._id}`, {
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
            const response = await fetch(`${baseUrl}/task/checkupdate/${taskObj._id}`, {
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
        const res = await fetch(`${baseUrl}`);
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
            const updatedTask = await fetch(`${baseUrl}/api/task/update/${taskToUpdate.id}`, {
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
        const response = await fetch(`${baseUrl}/api/task`, {
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







