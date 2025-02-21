const express = require("express");
const app = express();
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:4000",
];

app.use(express.json());


app.use(
  "*",
  cors({
    origin: function (origin, callback) {
      // if (origin === undefined) return callback(new Error("Not allowed"), false);
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Hardcoded response details
const USER_ID = "john_doe_17091999"; // Format: full_name_ddmmyyyy
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

// GET /bfhl: Returns a hardcoded operation_code
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST /bfhl: Processes incoming JSON payload
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    // Validate the input: 'data' must exist and be an array
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "'data' field is required and must be an array.",
      });
    }

    const numbers = [];
    const alphabets = [];

    // Iterate over each item in the 'data' array
    data.forEach((item) => {
      const itemStr = String(item);

      if (/^\d+$/.test(itemStr)) {
        numbers.push(itemStr);
      }

      else if (/^[A-Za-z]$/.test(itemStr)) {
        alphabets.push(itemStr);
      }
    });


    let highest_alphabet = [];
    if (alphabets.length > 0) {
      const highest = alphabets.reduce((a, b) =>
        a.toUpperCase() > b.toUpperCase() ? a : b
      );
      highest_alphabet.push(highest);
    }


    const response = {
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      numbers: numbers,
      alphabets: alphabets,
      highest_alphabet: highest_alphabet,
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      is_success: false,
      message: "An error occurred: " + error.message,
    });
  }
});

module.exports = app;
