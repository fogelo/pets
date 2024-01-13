"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const user = {
    login: "admin",
    password: "qwerty",
};
const authMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;
    /* Простой вариант без декодирования
    if (authorization !== "Basic YWRtaW46cXdlcnR5") {
      res.sendStatus(401);
    }
  */
    if (!authorization) {
        res.sendStatus(401);
        return;
    }
    const [basic, token] = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ");
    if (basic !== "Basic") {
        res.sendStatus(401);
        return;
    }
    const decodedToken = Buffer.from(token, "base64").toString();
    const [login, password] = decodedToken.split(":");
    if (login !== user.login || password !== user.password) {
        res.sendStatus(401);
        return;
    }
    return next();
};
exports.authMiddleware = authMiddleware;
