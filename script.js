const connectWalletBtn = document.getElementById("connectWallet");
const walletInfoDiv = document.getElementById("walletInfo");
const walletAddressSpan = document.getElementById("walletAddress");
const buyTokensBtn = document.getElementById("buyTokens");
const vnsAmountInput = document.getElementById("vnsAmount");
const statusMessage = document.getElementById("statusMessage");

// Contract Details
const vnsContractAddress = "0xcf3794776075e8bF50Bd5E48Bc1EEf2070b787F8";
const vnsContractABI = [{"inputs":[{"internalType":"address","name":"_vnsToken","type":"address"},{"internalType":"address","name":"_usdtToken","type":"address"},{"internalType":"address","name":"_sellerWallet","type":"address"},{"internalType":"address","name":"_paymentReceiver","type":"address"},{"internalType":"uint256","name":"_pricePerVNS","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"PriceUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"vnsAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"usdtAmount","type":"uint256"}],"name":"TokensPurchased","type":"event"},{"inputs":[],"name":"CHANGE_DELAY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_PURCHASE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MIN_PURCHASE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"vnsAmount","type":"uint256"}],"name":"buyTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyWithdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastPriceChange","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paymentReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pricePerVNS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"recoverERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sellerWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"setPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usdtToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vnsToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];

// USDT Contract (BSC)
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

let web3, accounts, vnsContract, usdtContract;

// Connect Wallet
connectWalletBtn.onclick = async () => {
    if (window.ethereum) {
        try {
            web3 = new Web3(window.ethereum);
            accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            
            vnsContract = new web3.eth.Contract(vnsContractABI, vnsContractAddress);
            usdtContract = new web3.eth.Contract(usdtABI, usdtAddress);
            
            walletAddressSpan.textContent = `${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`;
            walletInfoDiv.style.display = "block";
            connectWalletBtn.style.display = "none";
            
            statusMessage.textContent = "Wallet Connected! Enter VNS Amount";
        } catch (error) {
            statusMessage.textContent = "Error: " + error.message;
        }
    } else {
        statusMessage.textContent = "Please install MetaMask/Trust Wallet!";
    }
};

// Buy Tokens
buyTokensBtn.onclick = async () => {
    const vnsAmount = vnsAmountInput.value;
    if (!vnsAmount || isNaN(vnsAmount)) {
        statusMessage.textContent = "Please enter a valid VNS amount";
        return;
    }

    try {
        statusMessage.textContent = "Processing... Please wait";
        
        // 1. USDT Approval
        const pricePerVNS = await vnsContract.methods.pricePerVNS().call();
        const usdtAmount = vnsAmount * pricePerVNS;
        
        await usdtContract.methods.approve(
            vnsContractAddress, 
            usdtAmount
        ).send({ from: accounts[0] });
        
        // 2. Buy VNS Tokens
        await vnsContract.methods.buyTokens(vnsAmount).send({ 
            from: accounts[0] 
        });
        
        statusMessage.textContent = `Success! ${vnsAmount} VNS Tokens Purchased`;
    } catch (error) {
        statusMessage.textContent = "Error: " + error.message;
    }
};
