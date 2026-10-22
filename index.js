
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { createRemoteJWKSet, jwtVerify } = require("jose-cjs");

dotenv.config();

const uri = process.env.MONGODB_URI;

console.log("MongoDB URI exists:", !!uri);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const JWKS = createRemoteJWKSet(
  new URL(`${process.env.CLIENT_URL}/api/auth/jwks`)
)

const verifyToken = async (req, res, next) => {
  const authHeader = req?.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { payload } = await jwtVerify(token, JWKS);
    console.log(payload);
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden" });
  }
};
async function run() {
  try {
    await client.connect();

    const db = client.db("wanderlust");
    const destinationCollection = db.collection("destinations");
    const bookingCollection = db.collection("bookings");

    console.log("MongoDB connected successfully!");

    // await client.db("admin").command({ ping: 1 });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    app.get('/destination', async (req, res) => {
      const result = await destinationCollection.find().toArray()
      res.json(result)

    })

    // Add a new destination
    app.post("/destinations", verifyToken, async (req, res) => {
      try {
        const destinationData = req.body;

        const result = await destinationCollection.insertOne(
          destinationData
        );

        res.status(201).json({
          success: true,
          message: "Destination added successfully!",
          insertedId: result.insertedId,
        });
      } catch (error) {
        console.error("Error adding destination:", error);

        res.status(500).json({
          success: false,
          message: "Failed to add destination",
        });
      }
    });

    app.get('/destination/:id', verifyToken, async (req, res) => {
      const { id } = req.params

      const result = await destinationCollection.findOne({ _id: new ObjectId(id) })
      res.json(result)
    });

    app.patch("/destination/:id", verifyToken, async (req, res) => {
      try {
        const { id } = req.params;

        const result = await destinationCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: req.body }
        );

        res.json({
          success: true,
          message: "Destination updated successfully!",
          result,
        });
      } catch (error) {
        console.error("PATCH error:", error);
        res.status(500).json({ message: "Update failed" });
      }
    });

    app.delete('/destination/:id', async (req, res) => {
      const { id } = req.params;
      const result = await destinationCollection.deleteOne({ _id: new ObjectId(id) })
      res.json(result)
    });

    app.get('/booking/:userId', async (req, res) => {
      const { userId } = req.params
      const result = await bookingCollection.find({ userId: userId }).toArray();
      res.json(result);
    })

    app.post("/booking", verifyToken, async (req, res) => {
      const bookingData = req.body;
      const result = await bookingCollection.insertOne(bookingData);

      res.json(result);
    });
    app.delete('/booking/:bookingId', verifyToken, async (req, res) => {
      const { bookingId } = req.params
      const result = await bookingCollection.deleteOne({ _id: new ObjectId(bookingId) })
      res.json(result)
    });

  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

app.get("/", (req, res) => {
  res.send("Server is running fine!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

run();
