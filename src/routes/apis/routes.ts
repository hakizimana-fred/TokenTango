import Router from "express";
import { Request, Response } from "express";
import { provider } from "../../helpers";
import { utils } from "ethers";
import { UNISWAP_ABI } from "../../constants/uniswap";
import { decode, decodeContract } from "../../exchange/decoded";
import { memPools } from "../../exchange/Pending";

const router = Router();

router.get("/pending-txns", (_req: Request, res: Response) => {
  try {
    const transactions: any[] = [];
    const pendingTxns = memPools.getPendingTxns();

    //  console.log(pendingTxns, "pending");

    // provider.on("pending", async (transaction): Promise<void> => {
    //   const transactionInfo = await provider.getTransaction(transaction); // It gets pending transactions
    //   if (transactionInfo) {
    //     const { hash, from, to, value, gasPrice, data } = transactionInfo;
    //     const byteCode = await provider.getCode(String(to));
    //     const sliced = utils.hexDataSlice(data, 0, 4).toLowerCase();
    //     if (sliced != "0x") {
    //       const decodedData = decode(data);
    //       if (decodedData) {
    //         console.log("Function Method Info: ", {
    //           name: decodedData.functionFragment.name,

    //           to,
    //         });
    //       }
    //       transactions.push({
    //         hash,

    //         to,
    //         byteCode,
    //         data,
    //         decoded: decodedData,
    //       });
    //     }
    //   }
    // });
    // setTimeout(() => {
    //   provider.removeAllListeners();
    //   if (transactions.length > 0)
    //     return res.status(200).json({ success: true, data: transactions });
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "No pending transactions found" });
    // }, 10000);
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, message: "something went wrong", e: e.message });
  }
});

//router.get("/decoded", decodeContract);
export default router;
