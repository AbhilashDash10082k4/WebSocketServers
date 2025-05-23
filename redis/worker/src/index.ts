import express from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());

const client = createClient();
client.connect();

//WORKERS LOGIC - 
async function main() {

    //workers will poll the queue (infinitely send request to the queue to ask for some data)
    while (1) {
        //take the data from the queue to the worker (rPop)
        const response = await client.brPop("project_data", 0);
        console.log(response);
        //process the user code in some docker container(leetcode e.g)
        console.log("Website is ready");
    }

}
main();