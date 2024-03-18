function addItem() {
    var description = document.getElementById("descriptionInput").value;
    var expense = parseFloat(document.getElementById("expenseInput").value);
    var date = document.getElementById("dateInput").value;
    var newRow = document.createElement("tr");
    newRow.innerHTML = "<td>" + description + "</td><td>" + expense.toFixed(2) + "</td><td>" + date + 
                        "</td><td><button onclick='editItem(this)'>Edit</button> <button onclick='deleteItem(this)'>Delete</button></td>";
    var expenseTable = document.getElementById("expenseList");
    expenseTable.appendChild(newRow);

    var total = calculateTotal();
    document.getElementById("totalAmount").innerText = total.toFixed(2);

    var data = {
        description: description,
        expense: expense,
        date: date
    };
    var expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push(data);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    document.getElementById("descriptionInput").value = "";
    document.getElementById("expenseInput").value = "";
    document.getElementById("dateInput").value = "";
}

function calculateTotal() {
    var total = 0;
    var rows = document.querySelectorAll("#expenseList td:nth-child(2)"); // Select expense column
    rows.forEach(function(row) {
        total += parseFloat(row.innerText);
    });
    return total;
}

function deleteItem(button) {
    var row = button.parentNode.parentNode;
    var description = row.cells[0].innerText;
    var expenses = JSON.parse(localStorage.getItem("expenses")) || [];
   
    var index = expenses.findIndex(item => item.description === description);
    if (index !== -1) {
        expenses.splice(index, 1);
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    row.parentNode.removeChild(row);

    var total = calculateTotal();
    document.getElementById("totalAmount").innerText = total.toFixed(2);
}

function editItem(button) {
    var row = button.parentNode.parentNode;
    var description = row.cells[0].innerText;
    var expense = row.cells[1].innerText;
    var date = row.cells[2].innerText;

    document.getElementById("descriptionInput").value = description;
    document.getElementById("expenseInput").value = expense;
    document.getElementById("dateInput").value = date;
    deleteItem(button);
}
