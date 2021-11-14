import express from "express";
import cors from "cors";

import ROUTES from "./routes";

// app setup
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Hello!'));

ROUTES.forEach(route => {
    app.use(route.path, route.router);
})

const PORT : string|number = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`server started at http://localhost:${PORT}`))