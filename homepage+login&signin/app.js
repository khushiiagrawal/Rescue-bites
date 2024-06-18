firebase.initializeApp({
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
});

const db = firebase.firestore();

function addTask() {
    const foodAmount = document.getElementById("food-amount").value.trim();
    const restaurantName = document.getElementById("restaurant-name").value.trim();
    const phoneNumber = document.getElementById("phone-number").value.trim();
    const address = document.getElementById("address").value.trim();

    if (foodAmount !== "" && restaurantName !== "" && phoneNumber !== "" && address !== "") {
        db.collection("tasks").add({
            foodAmount: foodAmount,
            restaurantName: restaurantName,
            phoneNumber: phoneNumber,
            address: address,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        document.getElementById("food-amount").value = "";
        document.getElementById("restaurant-name").value = "";
        document.getElementById("phone-number").value = "";
        document.getElementById("address").value = "";
    }
}

function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.setAttribute("data-id", doc.id);
    taskItem.innerHTML = `
        <div class="task-content">
            <h3>Amount of food: ${doc.data().foodAmount} kgs</h3>
            <p>Restaurant: ${doc.data().restaurantName}</p>
            <p>Phone: ${doc.data().phoneNumber}</p>
            <p>Address: ${doc.data().address}</p>
            <button onclick="deleteTask('${doc.id}')">Delete</button>
        </div>
    `;
    taskList.appendChild(taskItem);
}

function searchTasks() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    db.collection("tasks")
        .orderBy("timestamp", "desc")
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                const data = doc.data();
                if (data.restaurantName.toLowerCase().includes(searchInput)) {
                    renderTasks(doc);
                }
            });
        });
}

db.collection("tasks")
    .orderBy("timestamp", "desc")
    .onSnapshot(snapshot => {
        const changes = snapshot.docChanges();
        changes.forEach(change => {
            if (change.type === "added") {
                renderTasks(change.doc);
            } else if (change.type === "removed") {
                removeTaskFromDOM(change.doc.id);
            }
        });
    });

function deleteTask(id) {
    db.collection("tasks").doc(id).delete();
}

function removeTaskFromDOM(id) {
    const taskItem = document.querySelector(`li[data-id='${id}']`);
    if (taskItem) {
        taskItem.remove();
    }
}
