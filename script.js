// Get elements
const blogBtn = document.getElementById('blogBtn');
const donationBtn = document.getElementById("donationBtn");
const historyBtn = document.getElementById("historyBtn");
const donationSection = document.getElementById("donationSection");
const historySection = document.getElementById("historySection");
const donateBtn = document.getElementById("donateBtn");
const donateBtnDhaka = document.getElementById("donateBtnDhaka");
const donationModal = document.getElementById("donationModal");
const accountBalance = document.getElementById("accountBalance");
const donationAmountInput = document.getElementById("donationAmount");
const donationAmountDhakaInput = document.getElementById("donationAmountDhaka");
const historySectionDiv = document.getElementById("historySectionDiv");

// Initial balance
let balance = 10000;

// Update Balance Display
function updateBalanceDisplay() {
  accountBalance.textContent = balance + " BDT";
}

// Switch between donation and history sections
donationBtn.addEventListener("click", function () {
  donationSection.classList.remove("hidden"); // Show donation section
  historySection.classList.add("hidden"); // Hide history section

  // Update button styles
  donationBtn.classList.add("bg-lime-400");
  donationBtn.classList.remove("bg-gray-300");
  historyBtn.classList.add("bg-gray-300");
  historyBtn.classList.remove("bg-lime-400");
});

historyBtn.addEventListener("click", function () {
  historySection.classList.remove("hidden"); // Show history section
  donationSection.classList.add("hidden"); // Hide donation section

  // Update button styles
  historyBtn.classList.add("bg-lime-400");
  historyBtn.classList.remove("bg-gray-300");
  donationBtn.classList.add("bg-gray-300");
  donationBtn.classList.remove("bg-lime-400");
});

// Handle donation for Noakhali
donateBtn.addEventListener("click", function () {
  handleDonation(donationAmountInput, "Donate for Flood at Noakhali, Bangladesh");
});

// Handle donation for Dhaka Earthquake
donateBtnDhaka.addEventListener("click", function () {
  handleDonation(donationAmountDhakaInput, "Donate for Earthquake in Dhaka");
});

// Handle the donation process
function handleDonation(donationInput, description) {
  const donationAmount = parseInt(donationInput.value);

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
  donationInput.value = "";

  // Add donation to history
  addDonationToHistory(donationAmount, description);

  // Show success modal
  donationModal.showModal();
}

// Close the modal
donationModal.querySelector(".btn").addEventListener("click", function () {
  donationModal.close();
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
