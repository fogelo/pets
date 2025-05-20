import { Router, Request, Response } from "express";
import { emailAdapter } from "../../../adapters/email.adapter";

export const emailRouter: Router = Router({});
emailRouter.post("", async (req: Request, res: Response) => {
  try {
    const info = await emailAdapter.sendEmail(
      "fogelo@yandex.ru",
      "Hello ✔111",
      "Hello world?1231231"
    );
    res.json({ messageId: info.messageId });
    return;
  } catch (err) {
    console.error("Ошибка отправки почты:", err);
    res.status(500).json({ error: "Не удалось отправить письмо" });
    return;
  }
});
