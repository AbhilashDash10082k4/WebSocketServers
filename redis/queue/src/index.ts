import express from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());

const client = createClient();
client.connect();

app.post('/submit', async (req, res) => {
    const { project_id, userId, project_name, tech_stack } = req.body;

    //pushing into queues logic, pushing into project_data queue
    await client.lPush('project_data', JSON.stringify({ project_id, userId, project_name, tech_stack }));
    res.json({ message: "project details recieved" });
})

app.listen(3000, () => {
    console.log(`http://localhost:3000`);
})