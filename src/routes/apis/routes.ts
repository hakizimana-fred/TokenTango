import Router from "express";
import { Request, Response } from "express";
import { provider } from "../../helpers";

const router = Router();

router.get("/pending-txns", (_req: Request, res: Response) => {
  try {
    const transactions: any[] = [];
    provider.on("pending", async (transaction): Promise<void> => {
      const transactionInfo = await provider.getTransaction(transaction); // It gets pending transactions
      if (transactionInfo) {
        const { hash, from, to, value, gasPrice } = transactionInfo;
        console.log(hash, from, to, value, gasPrice);
        transactions.push({ hash, from, to, value, gasPrice });
      } else {
        console.log("not found");
      }
    });
    //return res.status(200).json(transactions);
    setTimeout(() => {
      provider.removeAllListeners();
      if (transactions.length > 0)
        return res.status(200).json({ success: true, data: transactions });
      return res
        .status(400)
        .json({ success: false, message: "No pending transactions found" });
    }, 5000);
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, message: "something went wrong", e: e.message });
  }
});

export default router;
