const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");




//dot en configuration
dotenv.config();

//DB connection
connectDb();

//rest object
const app = express()
app.use(express.json());

//route//URL =>http://localhost:125
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/resturent", require("./routes/resturentRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));
app.use("/api/v1/food", require("./routes/foodRoutes"));
app.get("/", (req, res) => {
    return res.status(200).send("<h1>Welcome to food server</h1>");
});

//PORT
const PORT = process.env.PORT;

//listen
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});