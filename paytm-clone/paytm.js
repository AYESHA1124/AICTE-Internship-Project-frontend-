let walletBalance = 5000;
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("user-name")) {
        document.getElementById("user-name").innerText = localStorage.getItem("username") || "User";
    }
    updateWalletDisplay();
});

function signIn() {
    const username = document.getElementById("username").value;
    if (username) {
        localStorage.setItem("username", username);
        window.location.href = "paytm.html"; // Redirect to Paytm wallet page
    } else {
        alert("Please enter your name");
    }
}

function logout() {
    localStorage.removeItem("username");
    window.location.href = "index.html"; // Redirect to sign-in page
}

function updateWalletDisplay() {
    if (document.getElementById("wallet-balance")) {
        document.getElementById("wallet-balance").innerText = walletBalance;
    }
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addMoney() {
    let amount = prompt("Enter amount to add:");
    amount = parseInt(amount);
    if (!isNaN(amount) && amount > 0) {
        walletBalance += amount;
        transactions.push(`Credited: ₹${amount}`);
        updateWalletDisplay();
    } else {
        alert("Invalid amount");
    }
}

function makePayment() {
    let amount = prompt("Enter amount to pay:");
    amount = parseInt(amount);
    if (!isNaN(amount) && amount > 0 && amount <= walletBalance) {
        walletBalance -= amount;
        transactions.push(`Debited: ₹${amount}`);
        updateWalletDisplay();
    } else {
        alert("Invalid or insufficient funds");
    }
}

function showTransactionHistory() {
    document.getElementById("wallet-container").style.display = "none";
    document.getElementById("transaction-container").style.display = "block";
    let historyList = document.getElementById("transaction-history");
    historyList.innerHTML = transactions.length ? transactions.map(t => `<li class="transaction-item">${t}</li>`).join("") : "<p>No transactions found.</p>";
}

function showWallet() {
    document.getElementById("home-container").style.display = "none";
    document.getElementById("wallet-container").style.display = "block";
    document.getElementById("transaction-container").style.display = "none";
}

function showHome() {
    document.getElementById("wallet-container").style.display = "none";
    document.getElementById("transaction-container").style.display = "none";
    document.getElementById("home-container").style.display = "block";
}
