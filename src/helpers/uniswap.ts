import { ethers, utils } from "ethers";
import { UNISWAP_ABI } from "../constants/uniswap";
import { CONFIGS } from "../config";

export const abiInterface = new utils.Interface(UNISWAP_ABI);

export const provider = new ethers.providers.JsonRpcProvider(
  CONFIGS.provider
);
export const signer = new ethers.Wallet(CONFIGS.privateKey);
const account = signer.connect(provider);

export const ethContract = new ethers.Contract(
  CONFIGS.uniswapV2Router,
  UNISWAP_ABI,
  account
);

const wallet = new ethers.Wallet(CONFIGS.privateKey, provider);

const ethContract2 = new ethers.Contract(
  CONFIGS.wethAddress,
  ["function balanceOf(address owner) external view returns (uint)"],
  provider
);

/* BUYING */
export const buyToken = async (tokenInAndTokenOut: string[]) => {
  try {
    const value = ethers.utils.parseEther("0.00001");
    const deadline = Math.floor(Date.now() / 1000) + 60 * 2; // 20 minutes from now
    const amountOutMin = ethers.utils.parseUnits("0", 18);
    const txn = await ethContract.swapExactETHForTokens(
      amountOutMin,
      tokenInAndTokenOut,
      wallet.address,
      deadline,
      {
        value: value,
        gasLimit: 400000,
        maxFeePerGas: ethers.utils.parseUnits("20", "gwei"),
        maxPriorityFeePerGas: ethers.utils.parseUnits("5", "gwei"),
      }
    );

    return txn.hash;
  } catch (error) {
    console.log("Error swapping exact ETH for token  ", error);
    return { success: false, data: error };
  }
};

// get account balance
export const walletBalance = async () => {
  const wallet = new ethers.Wallet(CONFIGS.privateKey, provider);
  const balance = await wallet.getBalance();
  const readableBalance = ethers.utils.formatEther(balance);
  console.log("Readable Balance: ", parseFloat(readableBalance).toFixed(4));

  return readableBalance;
};

/* SELLING */
export const sellToken = async (path: string[]) => {
  try {
    let deadline = Math.floor(Date.now() / 1000) + 60 * 4;

    let amountIn = ethers.utils.parseEther("0.00001");
    const amountOut = ethers.utils.parseEther("0");

    const tx =
      await ethContract.swapExactTokensForETHSupportingFeeOnTransferTokens(
        amountIn,
        amountOut,
        path,
        wallet.address,
        deadline,
        {
          gasLimit: 400000,
          maxFeePerGas: ethers.utils.parseUnits("20", "gwei"),
          maxPriorityFeePerGas: ethers.utils.parseUnits("5", "gwei"),
        }
      );
    console.log("\n\n\n ************** SELL ***************\n");

    return tx.hash;
  } catch (error) {
    console.log("Error swapping exact token for ETH", error);
    return { success: false, data: error };
  }
};

// Check for Liquidity of pair
export const checkLiquidity = async (tokenPair: string[]) => {
  const [tokenA, tokenB] = tokenPair;

  const uniswapFactoryAddress = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";

  const uniswapFactory = new ethers.Contract(
    uniswapFactoryAddress,
    [
      "function getPair(address tokenA, address tokenB) external view returns (address)",
    ],
    provider
  );
  // Get the pair address for the token pair
  const pairAddress = await uniswapFactory.getPair(tokenA, tokenB);

  const pairContract = new ethers.Contract(
    pairAddress,
    [
      "function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
    ],
    provider
  );

  // Get the reserves of the pair
  const reserves = await pairContract.getReserves();

  //Format Reserves to ETH
  const formattedReserve1 = Number(
    ethers.utils.formatUnits(reserves.reserve1, 18)
  );

  if (formattedReserve1 > 1) return true;
  return false;
};

// Approve Allowance
export const approve = async (token: string) => {
  const abi = [
    "function approve(address _spender, uint256 _value) public returns (bool success)",
  ];

  try {
    const contract = new ethers.Contract(token, abi, account);
    const tx = await contract.approve(CONFIGS.uniswapV2Router, CONFIGS.maxInt, {
      gasLimit: 600000,
      maxFeePerGas: ethers.utils.parseUnits("20", "gwei"),
      maxPriorityFeePerGas: ethers.utils.parseUnits("5", "gwei"),
    });

    console.log("Approve tx", tx.hash);
    return { success: true, data: `${tx.hash}` };
  } catch (error) {
    console.log("error approving token", error);
    return { success: false, data: `error approving token ${error}` };
  }
};
