// Contract Details
const vnsContractAddress = "0xcf3794776075e8bF50Bd5E48Bc1EEf2070b787F8";
const vnsContractABI = [{"inputs":[{"internalType":"address","name":"_vnsToken","type":"address"},{"internalType":"address","name":"_usdtToken","type":"address"},{"internalType":"address","name":"_sellerWallet","type":"address"},{"internalType":"address","name":"_paymentReceiver","type":"address"},{"internalType":"uint256","name":"_pricePerVNS","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"PriceUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"vnsAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"usdtAmount","type":"uint256"}],"name":"TokensPurchased","type":"event"},{"inputs":[],"name":"CHANGE_DELAY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_PURCHASE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MIN_PURCHASE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"vnsAmount","type":"uint256"}],"name":"buyTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyWithdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastPriceChange","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paymentReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pricePerVNS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"recoverERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sellerWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"setPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usdtToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vnsToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];

const usdtAddress = "0x55d398326f99059fF775485246999027B3197955";
const usdtABI = [{
  "constant": false,
  "inputs": [
    {"name":"_spender","type":"address"},
    {"name":"_value","type":"uint256"}
  ],
  "name":"approve",
  "outputs": [{"name":"","type":"bool"}],
  "type":"function"
}];

// DOM Elements
const connectWalletBtn = document.getElementById("connectWallet");
const walletConnectSection = document.getElementById("walletConnectSection");
const purchaseSection = document.getElementById("purchaseSection");
const walletAddressSpan = document.getElementById("walletAddress");
const buyTokensBtn = document.getElementById("buyTokens");
const vnsAmountInput = document.getElementById("vnsAmount");
const statusMessage = document.getElementById("statusMessage");
const approveUsdtBtn = document.getElementById("approveUsdt");
const usdtApprovalDiv = document.getElementById("usdtApproval");

let web3, accounts, vnsContract, usdtContract;
let pricePerVNS = 0;

// Initialize on load
window.onload = async function() {
  // Check if wallet is already connected
  if (window.ethereum && window.ethereum.selectedAddress) {
    await initWeb3(window.ethereum);
  }
};

// Copy Contract Address
function copyContractAddress() {
  const contractAddress = document.getElementById("contractAddress").textContent;
  navigator.clipboard.writeText(contractAddress);
  statusMessage.textContent = "Contract address copied!";
  statusMessage.className = "success";
  setTimeout(() => {
    statusMessage.textContent = "";
    statusMessage.className = "";
  }, 2000);
}

// Connect Wallet
connectWalletBtn.onclick = async () => {
  if (window.ethereum) {
    try {
      await initWeb3(window.ethereum);
    } catch (error) {
      showError(error);
    }
  } else if (window.BinanceChain) {
    try {
      await initWeb3(window.BinanceChain);
    } catch (error) {
      showError(error);
    }
  } else if (window.web3) {
    try {
      await initWeb3(window.web3.currentProvider);
    } catch (error) {
      showError(error);
    }
  } else {
    showError("Please install MetaMask, Trust Wallet or a Web3 browser");
  }
};

// Initialize Web3
async function initWeb3(provider) {
  web3 = new Web3(provider);
  accounts = await web3.eth.requestAccounts();
  
  vnsContract = new web3.eth.Contract(vnsContractABI, vnsContractAddress);
  usdtContract = new web3.eth.Contract(usdtABI, usdtAddress);
  
  // Get VNS price
  pricePerVNS = await vnsContract.methods.pricePerVNS().call();
  
  // Update UI
  walletAddressSpan.textContent = `${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`;
  walletConnectSection.style.display = "none";
  purchaseSection.style.display = "block";
  
  // Check USDT approval
  await checkUsdtApproval();
}

// Check USDT Approval
async function checkUsdtApproval() {
  const approvedAmount = await usdtContract.methods.allowance(
    accounts[0], 
    vnsContractAddress
  ).call();
  
  if (approvedAmount > 0) {
    usdtApprovalDiv.style.display = "none";
    buyTokensBtn.style.display = "block";
  } else {
    usdtApprovalDiv.style.display = "block";
    buyTokensBtn.style.display = "none";
  }
}

// Approve USDT
approveUsdtBtn.onclick = async () => {
  try {
    statusMessage.textContent = "Approving USDT...";
    statusMessage.className = "";
    
    // Set approval to maximum (500 VNS worth)
    const maxAmount = 500 * pricePerVNS;
    
    await usdtContract.methods.approve(
      vnsContractAddress, 
      maxAmount
    ).send({ from: accounts[0] });
    
    statusMessage.textContent = "USDT Approved! You can now buy VNS";
    statusMessage.className = "success";
    
    // Hide approval section
    usdtApprovalDiv.style.display = "none";
    buyTokensBtn.style.display = "block";
    
  } catch (error) {
    showError(error);
  }
};

// Buy Tokens
buyTokensBtn.onclick = async () => {
  const vnsAmount = vnsAmountInput.value;
  
  // Validate amount
  if (!vnsAmount || isNaN(vnsAmount)) {
    showError("Please enter a valid VNS amount");
    return;
  }
  
  if (vnsAmount < 10) {
    showError("Minimum purchase is 10 VNS");
    return;
  }
  
  if (vnsAmount > 500) {
    showError("Maximum purchase is 500 VNS");
    return;
  }

  try {
    statusMessage.textContent = "Processing transaction...";
    statusMessage.className = "";
    
    await vnsContract.methods.buyTokens(vnsAmount).send({ 
      from: accounts[0],
      gas: 300000 
    });
    
    statusMessage.textContent = `Success! ${vnsAmount} VNS Tokens Purchased`;
    statusMessage.className = "success";
    
    // Reset input
    vnsAmountInput.value = "";
    
  } catch (error) {
    showError(error);
  }
};

// Show Error
function showError(error) {
  console.error(error);
  statusMessage.textContent = typeof error === 'string' ? error : error.message;
  statusMessage.className = "error";
}
