const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
require("dotenv").config();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/", taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
