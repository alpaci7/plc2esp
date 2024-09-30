const axios = require('axios');
const express = require('express');
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


app.get('/',(req, res)=>{
  res.status(200).json({message : "hello ESP"});
});
// Route to control the ESP32 LED
app.post('/control-led', async (req, res) => {
  try {
    const action = req.body.action; // 'on' or 'off'
    const esp32Url = `http://192.168.11.102/led/${action}`; 

    // Send request to ESP32 to toggle LED
    const response = await axios.get(esp32Url);

    res.status(200).json({
      message: `LED turned ${action}`,
      response: response.data
    });
  } catch (error) {
    console.error('Error controlling ESP32:', error);
    res.status(500).send('Failed to control ESP32');
  }
});

// Start the Vercel server
app.listen(3000, () => {
  console.log('Vercel server running on port 3000');
});
