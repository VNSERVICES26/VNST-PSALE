// Import ABIs
import swapAbi from './abi/swapAbi.json';
import usdtAbi from './abi/usdtAbi.json';
import vnsAbi from './abi/vnsAbi.json';

// Contract Addresses
const swapAddress = '0x937ECf80b29fca3876340106f49F4214783BfC18';
const usdtAddress = '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd';
const vnsAddress = '0xaa27737655B672A9407Ba9e9DA6A5DDf50111CE4';

let provider;
let signer;
let swapContract;
let usdtContract;
let vnsContract;
let userAddress;

// Initialize Web3Modal
const web3Modal = new window.Web3Modal.default({
  cacheProvider: false,
  providerOptions: {}
});

document.getElementById('connectWallet').addEventListener('click', async () => {
  try {
    const instance = await web3Modal.connect();
    provider = new ethers.providers.Web3Provider(instance);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();
    document.getElementById('walletAddress').innerText = `Connected: ${userAddress}`;

    // Initialize Contracts
    swapContract = new ethers.Contract(swapAddress, swapAbi, signer);
    usdtContract = new ethers.Contract(usdtAddress, usdtAbi, signer);
    vnsContract = new ethers.Contract(vnsAddress, vnsAbi, signer);

    // Fetch Seller Wallet Balance
    const sellerWallet = await swapContract.sellerWallet();
    const balance = await vnsContract.balanceOf(sellerWallet);
    document.getElementById('sellerBalance').value = ethers.utils.formatUnits(balance, 18);
  } catch (error) {
    console.error('Connection Error:', error);
    alert('Failed to connect wallet.');
  }
});

document.getElementById('getQuote').addEventListener('click', async () => {
  try {
    const vnstAmount = document.getElementById('vnstAmount').value;
    if (!vnstAmount) return alert('Please enter VNST amount.');
    const amountInWei = ethers.utils.parseUnits(vnstAmount, 18);
    const usdtRequired = await swapContract.getQuote(amountInWei);
    document.getElementById('usdtRequired').value = ethers.utils.formatUnits(usdtRequired, 18);
  } catch (error) {
    console.error('Get Quote Error:', error);
    alert('Failed to get quote.');
  }
});

document.getElementById('approveUSDT').addEventListener('click', async () => {
  try {
    const usdtAmount = document.getElementById('usdtRequired').value;
    if (!usdtAmount) return alert('Please get quote first.');
    const amountInWei = ethers.utils.parseUnits(usdtAmount, 18);
    const tx = await usdtContract.approve(swapAddress, amountInWei);
    await tx.wait();
    alert('USDT Approved Successfully.');
  } catch (error) {
    console.error('Approve Error:', error);
    alert('Failed to approve USDT.');
  }
});

document.getElementById('buyVNST').addEventListener('click', async () => {
  try {
    const vnstAmount = document.getElementById('vnstAmount').value;
    if (!vnstAmount) return alert('Please enter VNST amount.');
    const amountInWei = ethers.utils.parseUnits(vnstAmount, 18);
    const tx = await swapContract.buyVNST(amountInWei);
    await tx.wait();
    alert('VNST Purchased Successfully.');
  } catch (error) {
    console.error('Buy Error:', error);
    alert('Failed to purchase VNST.');
  }
});

document.getElementById('copyAddress').addEventListener('click', async () => {
  try {
    const sellerWallet = await swapContract.sellerWallet();
    await navigator.clipboard.writeText(sellerWallet);
    alert('Seller address copied to clipboard.');
  } catch (error) {
    console.error('Copy Error:', error);
    alert('Failed to copy address.');
  }
});
