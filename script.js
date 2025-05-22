const contractABI = [{"inputs":[{"internalType":"address","name":"_vnstToken","type":"address"},{"internalType":"address","name":"_usdtToken","type":"address"},{"internalType":"address","name":"_sellerWallet","type":"address"},{"internalType":"address","name":"_usdtReceiver","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newMinBuy","type":"uint256"}],"name":"MinBuyUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"PriceUpdated","type":"event"},{"anonymous":false,"inputs":[],"name":"SwapPaused","type":"event"},{"anonymous":false,"inputs":[],"name":"SwapResumed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"usdtAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"vnstAmount","type":"uint256"}],"name":"TokensPurchased","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"uint256","name":"vnstAmount","type":"uint256"}],"name":"buyVNST","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"vnstAmount","type":"uint256"}],"name":"getQuote","outputs":[{"internalType":"uint256","name":"usdtRequired","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"buyer","type":"address"}],"name":"isApproved","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isSellerApproved","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minBuy","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pauseSwap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"resumeSwap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sellerWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalPurchased","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newMinBuy","type":"uint256"}],"name":"updateMinBuy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"updatePrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usdtReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"usdtToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vnstPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vnstToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}];

const usdtABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];

const vnstABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pauseContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpauseContract","outputs":[],"stateMutability":"nonpayable","type":"function"}];

// Contract addresses
const contractAddress = "0x937ECf80b29fca3876340106f49F4214783BfC18"; 
const usdtAddress = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd"; 
const vnstAddress = "0xaa27737655B672A9407Ba9e9DA6A5DDf50111CE4"; 

// Global variables
let web3;
let contract;
let accounts = [];
let chainId;

// Initialize the DApp
async function initDApp() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        
        try {
            // Request account access
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            chainId = await web3.eth.getChainId();
            
            // Initialize contract
            contract = new web3.eth.Contract(contractABI, contractAddress);
            
            // Update UI
            await updateUI();
            
            // Set up event listeners
            setupEventListeners();
            
            // Listen for account changes
            window.ethereum.on('accountsChanged', (newAccounts) => {
                accounts = newAccounts;
                updateUI();
            });
            
            // Listen for chain changes
            window.ethereum.on('chainChanged', () => {
                window.location.reload();
            });
            
        } catch (error) {
            console.error("Error initializing DApp:", error);
            showStatusMessage("Please connect your wallet to use this DApp", "error");
        }
    } else {
        showStatusMessage("Please install MetaMask or a Web3 compatible browser", "error");
    }
}

// Update UI with wallet and contract info
async function updateUI() {
    if (accounts.length) {
        // Display wallet address
        const shortAddress = `${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`;
        document.getElementById('walletAddress').textContent = shortAddress;
        
        // Display network name
        document.getElementById('networkName').textContent = getNetworkName(chainId);
        
        try {
            // Load contract data
            const vnstPrice = await contract.methods.vnstPrice().call();
            document.getElementById('vnstPrice').textContent = web3.utils.fromWei(vnstPrice, 'ether');
            
            const totalPurchased = await contract.methods.totalPurchased(accounts[0]).call();
            document.getElementById('totalPurchased').textContent = web3.utils.fromWei(totalPurchased, 'ether');
            
            // Get seller VNST balance
            const vnstContract = new web3.eth.Contract(vnstABI, vnstAddress);
            const sellerWallet = await contract.methods.sellerWallet().call();
            const sellerBalance = await vnstContract.methods.balanceOf(sellerWallet).call();
            document.getElementById('sellerVnstBalance').textContent = web3.utils.fromWei(sellerBalance, 'ether');
            
        } catch (error) {
            console.error("Error loading contract data:", error);
        }
    } else {
        document.getElementById('walletAddress').textContent = "Not connected";
    }
}

// Check USDT and seller approvals
async function checkApprovals() {
    if (!accounts.length) return;
    
    try {
        // Check USDT approval
        const isApproved = await contract.methods.isApproved(accounts[0]).call();
        const usdtApprovedElement = document.getElementById('usdtApprovedStatus');
        usdtApprovedElement.textContent = isApproved ? "Yes" : "No";
        usdtApprovedElement.style.color = isApproved ? "green" : "red";
        
        // Check seller approval
        const isSellerApproved = await contract.methods.isSellerApproved().call();
        const sellerApprovedElement = document.getElementById('sellerApprovedStatus');
        sellerApprovedElement.textContent = isSellerApproved ? "Yes" : "No";
        sellerApprovedElement.style.color = isSellerApproved ? "green" : "red";
        
    } catch (error) {
        console.error("Error checking approvals:", error);
    }
}

// Show status message
function showStatusMessage(message, type) {
    const statusElement = document.getElementById('statusMessage');
    statusElement.textContent = message;
    statusElement.className = `status-message ${type}`;
    
    // Clear message after 5 seconds
    setTimeout(() => {
        statusElement.className = 'status-message';
        statusElement.textContent = '';
    }, 5000);
}

// Get network name from chain ID
function getNetworkName(chainId) {
    switch (chainId.toString()) {
        case "1": return "Ethereum Mainnet";
        case "56": return "Binance Smart Chain";
        case "97": return "BSC Testnet";
        case "137": return "Polygon Mainnet";
        case "80001": return "Mumbai Testnet";
        default: return `Chain ID: ${chainId}`;
    }
}

// Set up event listeners
function setupEventListeners() {
    // Connect Wallet Button
    document.getElementById('connectWalletBtn').addEventListener('click', async () => {
        if (window.ethereum) {
            try {
                accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                await updateUI();
            } catch (error) {
                console.error("Error connecting wallet:", error);
                showStatusMessage("Error connecting wallet", "error");
            }
        } else {
            showStatusMessage("Please install MetaMask or a Web3 compatible browser", "error");
        }
    });

    // Paste VNST Token Address Button
    document.getElementById('pasteVnstBtn').addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            document.getElementById('vnstAmount').value = text;
        } catch (error) {
            console.error("Failed to read clipboard:", error);
            showStatusMessage("Failed to paste from clipboard", "error");
        }
    });

    // Check Quote Button
    document.getElementById('checkQuoteBtn').addEventListener('click', async () => {
        if (!accounts.length) {
            showStatusMessage("Please connect your wallet first", "error");
            return;
        }
        
        const vnstAmount = document.getElementById('vnstAmount').value;
        
        if (!vnstAmount || isNaN(vnstAmount)) {
            showStatusMessage("Please enter a valid VNST amount", "error");
            return;
        }
        
        try {
            const minBuy = await contract.methods.minBuy().call();
            if (Number(vnstAmount) < Number(web3.utils.fromWei(minBuy, 'ether'))) {
                showStatusMessage(`Amount below minimum buy limit (${web3.utils.fromWei(minBuy, 'ether')} VNST)`, "error");
                return;
            }
            
            const usdtRequired = await contract.methods.getQuote(web3.utils.toWei(vnstAmount, 'ether')).call();
            document.getElementById('usdtRequired').textContent = web3.utils.fromWei(usdtRequired, 'ether');
            
            // Check approvals
            await checkApprovals();
            
        } catch (error) {
            console.error("Error getting quote:", error);
            showStatusMessage("Error getting quote", "error");
        }
    });

    // Approve USDT Button
    document.getElementById('approveUsdtBtn').addEventListener('click', async () => {
        if (!accounts.length) {
            showStatusMessage("Please connect your wallet first", "error");
            return;
        }
        
        const vnstAmount = document.getElementById('vnstAmount').value;
        
        if (!vnstAmount || isNaN(vnstAmount)) {
            showStatusMessage("Please enter a valid VNST amount first", "error");
            return;
        }
        
        try {
            const usdtRequired = await contract.methods.getQuote(web3.utils.toWei(vnstAmount, 'ether')).call();
            const usdtContract = new web3.eth.Contract(usdtABI, usdtAddress);
            
            showStatusMessage("Approving USDT...", "success");
            
            await usdtContract.methods.approve(contractAddress, usdtRequired).send({ from: accounts[0] });
            
            showStatusMessage("USDT approved successfully!", "success");
            await checkApprovals();
            
        } catch (error) {
            console.error("Error approving USDT:", error);
            showStatusMessage("Error approving USDT", "error");
        }
    });

    // Buy VNST Button
    document.getElementById('buyVnstBtn').addEventListener('click', async () => {
        if (!accounts.length) {
            showStatusMessage("Please connect your wallet first", "error");
            return;
        }
        
        const vnstAmount = document.getElementById('vnstAmount').value;
        
        if (!vnstAmount || isNaN(vnstAmount)) {
            showStatusMessage("Please enter a valid VNST amount", "error");
            return;
        }
        
        try {
            const minBuy = await contract.methods.minBuy().call();
            if (Number(vnstAmount) < Number(web3.utils.fromWei(minBuy, 'ether'))) {
                showStatusMessage(`Amount below minimum buy limit (${web3.utils.fromWei(minBuy, 'ether')} VNST)`, "error");
                return;
            }
            
            const isApproved = await contract.methods.isApproved(accounts[0]).call();
            if (!isApproved) {
                showStatusMessage("Please approve USDT first", "error");
                return;
            }
            
            const isSellerApproved = await contract.methods.isSellerApproved().call();
            if (!isSellerApproved) {
                showStatusMessage("Seller has not approved VNST to contract", "error");
                return;
            }
            
            showStatusMessage("Processing VNST purchase...", "success");
            
            await contract.methods.buyVNST(web3.utils.toWei(vnstAmount, 'ether')).send({ from: accounts[0] });
            
            showStatusMessage("VNST purchased successfully!", "success");
            
            // Update UI
            await updateUI();
            
        } catch (error) {
            console.error("Error buying VNST:", error);
            showStatusMessage("Error buying VNST", "error");
        }
    });

    // Auto-check quote when VNST amount changes
    document.getElementById('vnstAmount').addEventListener('input', debounce(async () => {
        const vnstAmount = document.getElementById('vnstAmount').value;
        if (vnstAmount && !isNaN(vnstAmount)) {
            try {
                const usdtRequired = await contract.methods.getQuote(web3.utils.toWei(vnstAmount, 'ether')).call();
                document.getElementById('usdtRequired').textContent = web3.utils.fromWei(usdtRequired, 'ether');
                await checkApprovals();
            } catch (error) {
                console.error("Error updating quote:", error);
            }
        }
    }, 500));
}

// Debounce function to limit how often a function is called
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// Initialize when page loads
window.addEventListener('load', initDApp);
