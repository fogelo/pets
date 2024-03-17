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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDb = exports.postsCollection = exports.blogsCollection = exports.db = exports.client = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Connection URL
// const url = "mongodb://localhost:27017";
// const uri = "mongodb+srv://admin:admin@cluster0.0xxdbix.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = process.env.MONGO_URI;
if (!uri) {
    throw new Error("uri is undefined");
}
exports.client = new mongodb_1.MongoClient(uri);
// Database Name
const dbName = "inc-hw";
exports.db = exports.client.db(dbName);
exports.blogsCollection = exports.db.collection("blogs");
exports.postsCollection = exports.db.collection("posts");
function runDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.client.connect();
            console.log("Connected successfully to server");
        }
        catch (e) {
            console.error(e);
            exports.client.close();
        }
    });
}
exports.runDb = runDb;
