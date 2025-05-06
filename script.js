// Replace with your contract addresses
const presaleAddress = "0xcf3794776075e8bF50Bd5E48Bc1EEf2070b787F8";
const vnsTokenAddress = "0x151CC30953207379a6124F96B995E27ed4B56aF9";
const usdtTokenAddress = "0x55d398326f99059fF775485246999027B3197955";

// Replace with your contract ABI
const presaleAbi = [ [{"inputs":[{"internalType":"address","name":"_vnsToken","type":"address"},{"internalType":"address","name":"_usdtToken","type":"address"},{"internalType":"address","name":"_sellerWallet","type":"address"},{"internalType":"address","name":"_paymentReceiver","type":"address"},{"internalType":"uint256","name":"_pricePerVNS","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"PriceUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"vnsAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"usdtAmount","type":"uint256"}],"name":"TokensPurchased","type":"event"},{"inputs":[],"name":"CHANGE_DELAY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_PURCHASE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MIN_PURCHASE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"vnsAmount","type":"uint256"}],"name":"buyTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyWithdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastPriceChange","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paymentReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pricePerVNS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"recoverERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sellerWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"setPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usdtToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vnsToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}] ];

let web3;
let account;
let presaleContract;

window.addEventListener("load", async () => {
  if (typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum);
    presaleContract = new web3.eth.Contract(presaleAbi, presaleAddress);
  } else {
    alert("Please install a Web3 wallet like MetaMask to use this DApp.");
  }
});

document.getElementById("connectWallet").addEventListener("click", async () => {
  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    account = accounts[0];
    document.getElementById("status").innerText = `Connected: ${account}`;
  } catch (error) {
    console.error(error);
    document.getElementById("status").innerText = "Connection failed.";
  }
});

document.getElementById("buyVNS").addEventListener("click", async () => {
  const vnsAmountInput = document.getElementById("vnsAmount").value;
  const vnsAmount = Number(vnsAmountInput);

  const min = 10;
  const max = 500;

  if (!vnsAmount || vnsAmount < min || vnsAmount > max) {
    alert(`Please enter a valid amount between ${min} and ${max} VNS.`);
    return;
  }

  try {
    const pricePerVNS = await presaleContract.methods.pricePerVNS().call();

    const usdtDecimals = 6;
    const vnsDecimals = 8;

    const usdtAmount = BigInt(vnsAmount) * BigInt(pricePerVNS) * BigInt(10 ** usdtDecimals) / (BigInt(10 ** vnsDecimals) * BigInt(1e6));

    const usdtContract = new web3.eth.Contract([
      {
        "constant": false,
        "inputs": [
          { "name": "_spender", "type": "address" },
          { "name": "_value", "type": "uint256" }
        ],
        "name": "approve",
        "outputs": [{ "name": "", "type": "bool" }],
        "type": "function"
      }
    ], usdtTokenAddress);

    document.getElementById("status").innerText = "Approving USDT...";
    await usdtContract.methods.approve(presaleAddress, usdtAmount.toString()).send({ from: account });

    document.getElementById("status").innerText = "Buying VNS tokens...";
    await presaleContract.methods.buyTokens(vnsAmount * 10 ** vnsDecimals).send({ from: account });

    document.getElementById("status").innerText = "Purchase successful!";
  } catch (error) {
    console.error(error);
    document.getElementById("status").innerText = "Purchase failed. Check console.";
  }
});

document.getElementById("copyAddress").addEventListener("click", () => {
  const tokenAddress = document.getElementById("tokenAddress").innerText;
  navigator.clipboard.writeText(tokenAddress).then(() => {
    alert("VNS Token address copied to clipboard!");
  });
});
