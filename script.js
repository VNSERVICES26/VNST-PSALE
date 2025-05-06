// script.js

const vnsSaleAddress = "0xcf3794776075e8bF50Bd5E48Bc1EEf2070b787F8";
const vnsTokenAddress = "0x151CC30953207379a6124F96B995E27ed4B56aF9";
const usdtAddress = "0x55d398326f99059fF775485246999027B3197955";

const vnsAbi = [
  {"inputs":[{"internalType":"uint256","name":"vnsAmount","type":"uint256"}],"name":"buyTokens","outputs":[],"stateMutability":"nonpayable","type":"function"}
];

let web3;
let account;

async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      account = accounts[0];
      document.getElementById("message").innerText = `✅ Connected: ${account}`;
    } catch (error) {
      document.getElementById("message").innerText = "❌ Connection failed.";
    }
  } else {
    document.getElementById("message").innerText = "⚠️ Please use a Web3 enabled wallet browser.";
  }
}

async function buyVNS() {
  const amount = parseFloat(document.getElementById("vnsAmount").value);

  if (!account) {
    return document.getElementById("message").innerText = "❌ Connect your wallet first.";
  }

  if (isNaN(amount) || amount < 10 || amount > 500) {
    return document.getElementById("message").innerText = "⚠️ Enter amount between 10 and 500 VNS.";
  }

  const contract = new web3.eth.Contract(vnsAbi, vnsSaleAddress);
  const decimals = web3.utils.toWei(amount.toString(), 'ether');

  try {
    await contract.methods.buyTokens(decimals).send({ from: account });
    document.getElementById("message").innerText = `✅ Success! You bought ${amount} VNS.`;
  } catch (err) {
    document.getElementById("message").innerText = `❌ Transaction failed: ${err.message}`;
  }
}

function copyAddress() {
  const copyText = document.getElementById("contractAddress");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  document.getElementById("message").innerText = "✅ Address copied!";
}
