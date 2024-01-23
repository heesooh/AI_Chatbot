import app from './app.js';
import { connectToDatabase } from './db/connection.js';

// Connections & Listeners
const PORT = process.env.PORT || 5000;
connectToDatabase().then(() => {
    app.listen(PORT, ()=>console.log("Server Opened on port: " + PORT))
  }).catch((err) => 
    console.log(err)
  );

