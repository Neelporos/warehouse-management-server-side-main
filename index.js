const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
//

// DB Connect
const uri = `mongodb+srv://assingmentdb:vYaLbI0UJ5BYzNdE@cluster0.zeg0g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1, 
});
//

console.log(uri);

async function run() {
  try {
    await client.connect();

    const productsCollection = client.db("inventory").collection("items");

    app.get("/products", async (req, res) => {
      const query = {};
      const cursor = productsCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });
  } 
  finally {
    
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World! Im Ready For Assignment 11");
});

app.listen(port, () => {
  console.log(`connected with mongodb ${port}`);
});
