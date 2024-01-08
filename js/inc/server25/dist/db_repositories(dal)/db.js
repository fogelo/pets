"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDb = exports.coursesCollection = exports.client = void 0;
const mongodb_1 = require("mongodb");
// url для подключения к бд
const url = process.env.mongoURL || "mongodb://localhost:27017";
// создаем клиента для mongodb, наша программа является клиентом для mongodb
exports.client = new mongodb_1.MongoClient(url);
// Database Name
const dbName = "inc";
exports.coursesCollection = exports.client
    .db(dbName)
    .collection("courses");
function runDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Use connect method to connect to the server
            yield exports.client.connect();
            console.log("Подключен к mongo серверу");
            //   const collection = db.collection("documents");
        }
        catch (_a) {
            exports.client.close();
        }
    });
}
exports.runDb = runDb;
// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());
