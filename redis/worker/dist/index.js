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
const express_1 = __importDefault(require("express"));
const redis_1 = require("redis");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const client = (0, redis_1.createClient)();
client.connect();
//WORKERS LOGIC - 
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        //workers will poll the queue (infinitely send request to the queue to ask for some data)
        while (1) {
            //take the data from the queue to the worker (rPop)
            const response = yield client.brPop("project_data", 0);
            console.log(response);
            //process the user code in some docker container(leetcode e.g)
            console.log("Website is ready");
        }
    });
}
main();
