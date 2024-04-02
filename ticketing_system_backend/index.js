const express = require("express");
const dbConnect = require("./config/db");
require("dotenv").config();
const cors = require('cors');
const app = express();
const UserRoutes=require("./routes/UserRoute")
const TicketRoutes=require("./routes/TicketRoute")
const PORT = process.env.PORT || 4000;

app.use(cors());
  app.use(express.json());

app.listen(PORT, () => {
    console.log(`THE SERVER IS UP AND RUNNING AT PORT ${PORT}`);
  });

  app.use("/api",UserRoutes );
  app.use("/ticket",TicketRoutes)
  
  
dbConnect();


