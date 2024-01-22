import express from 'express'

const app = express();

// Middlewares
app.use(express.json());

// Connections & Listeners
app.listen(5000, ()=>console.log("Server Opened"));

// Sample Codes
app.post("/post", (req, res, next)=> {
  // next() allow the next middleware to be ran
  // next() comes back after execution, add return after to prevent return
  console.log(req.body.name);
  return res.send("POST test success.");
})

// dynamic routing
app.delete("/delete/:userid", (req, res, next)=> {
  // input link's value following `/delete/` will be stored in the `userid`
  console.log(req.params.userid);
  return res.send("DELETE test success.");
})

app.get("/get", (req, res, next)=> {
  return res.send("GET test success.");
})
