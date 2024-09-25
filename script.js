// Get elements
const blogBtn = document.getElementById('blogBtn');
const donationBtn = document.getElementById("donationBtn");
const historyBtn = document.getElementById("historyBtn");
const donationSection = document.getElementById("donationSection");
const historySection = document.getElementById("historySection");
const donateBtn = document.getElementById("donateBtn");
const donationModal = document.getElementById("donationModal");
const accountBalance = document.getElementById("accountBalance");
const donationAmountInput = document.getElementById("donationAmount");
const historySectionDiv = document.getElementById("historySection");

// Initial balance
let balance = 10000;

// Update Balance Display
function updateBalanceDisplay() {
  accountBalance.textContent = balance + " BDT";
}

// Switch between donation and history sections
donationBtn.addEventListener("click", function () {
  donationSection.classList.remove("hidden");
  historySection.classList.add("hidden");

  donationBtn.classList.add("active-tab");
  donationBtn.classList.remove("inactive-tab");

  historyBtn.classList.add("inactive-tab");
  historyBtn.classList.remove("active-tab");
});

historyBtn.addEventListener("click", function () {
  donationSection.classList.add("hidden");
  historySection.classList.remove("hidden");

  historyBtn.classList.add("active-tab");
  historyBtn.classList.remove("inactive-tab");

  donationBtn.classList.add("inactive-tab");
  donationBtn.classList.remove("active-tab");
});

// Handle donation
donateBtn.addEventListener("click", function () {
  const donationAmount = parseInt(donationAmountInput.value);

  if (isNaN(donationAmount) || donationAmount <= 0) {
    alert("Please enter a valid donation amount.");
    return;
  }

  if (donationAmount > balance) {
    alert("Insufficient balance.");
    return;
  }

  // Deduct the donation amount
  balance -= donationAmount;
  updateBalanceDisplay();

  // Reset the input
  donationAmountInput.value = "";

  // Add donation to history
  addDonationToHistory(donationAmount, "Donate for Flood at Noakhali, Bangladesh");

  // Show success modal
  donationModal.showModal();
});

// Close the modal
donationModal.querySelector(".btn").addEventListener("click", function () {
  donationModal.close();
});

// Blog button (Example redirect)
blogBtn.addEventListener("click", function () {
  window.location.href = "https://example.com/blog"; // Change this to your actual blog page
});

// Add donation to history
function addDonationToHistory(amount, description) {
  const donationDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" });

  // Create history item
  const historyItem = document.createElement('div');
  historyItem.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'p-4', 'mb-4');
  
  historyItem.innerHTML = `
    <p class="font-bold">${amount} Taka is donated for ${description}</p>
    <p class="text-sm text-gray-500">Date: ${donationDate} (Bangladesh Standard Time)</p>
  `;

  // Append the history item to the history section
  historySectionDiv.appendChild(historyItem);
}

// Initial balance update
updateBalanceDisplay();