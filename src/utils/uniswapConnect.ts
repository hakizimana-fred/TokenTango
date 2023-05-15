//import { abi as ABI } from "@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json";
import { ethers } from "ethers";
import { CONFIGS } from "../config";
import { UNISWAP_ABI, UNISWAP_ROUTER_ADDRESS } from "../constants";
import { ChainId, WETH } from "@uniswap/sdk";
//import { abi } from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";

const provider = new ethers.providers.JsonRpcProvider(CONFIGS.provider);

const uniswapContract = new ethers.Contract(
  "0x1F98431c8aD98523631AE4a59f267346ea31F984",
  UNISWAP_ABI,
  provider
);

const chainId = ChainId.MAINNET;

export const fetchCoinInfo = async () => {
  const pool = await uniswapContract.filters;

  //   uniswapContract.on('PoolCreated', ('0x6B175474E89094C44Da98b954EedeAC495271d0F', '0x6B175474E89094C44Da98b954EedeAC495271d0F', ) => {

  //   })
};
