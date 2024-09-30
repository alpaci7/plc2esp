const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();


app.use(express.json());

// Define the Arduino code as a string
const arduinoCode = `
#define BUILTIN_LED 13
void setup() {
  pinMode(BUILTIN_LED, OUTPUT);
}

void loop() {
  digitalWrite(BUILTIN_LED, !digitalRead(BUILTIN_LED));
  delay(1000);
}
`;

app.get('/', (req, res)=>{
  res.status(200).json({message : "hello"});
});

app.post('/upload', (req, res) => {
  const sketchDir = path.join(__dirname, 'sketches');

  // Create a directory for the sketch if it doesn't exist
  if (!fs.existsSync(sketchDir)) {
    fs.mkdirSync(sketchDir);
  }

  const inoFilePath = path.join(sketchDir, 'sketch.ino');

  // Write the Arduino code to a .ino file
  fs.writeFile(inoFilePath, arduinoCode, (err) => {
    if (err) {
      return res.status(500).send('Error writing Arduino code to file');
    }

    // Path to the Arduino IDE (adjust based on your OS)
    const arduinoPath = '/usr/bin/arduino';  // e.g., /Applications/Arduino.app/Contents/MacOS/Arduino for MacOS

    // Use Arduino IDE to compile and upload the sketch
    const board = 'arduino:avr:mega'; // Fully Qualified Board Name (FQBN)
    const port = '/dev/ttyUSB0'; // The port where Arduino Mega is connected (adjust for your OS)

    const command = `"${arduinoPath}" --upload --port ${port} --board ${board} ${inoFilePath}`;

    exec(command, (compileErr, stdout, stderr) => {
      if (compileErr) {
        console.error('Compile/Upload error:', stderr);
        return res.status(500).send('Compilation or Upload failed');
      }

      console.log('Compilation/Upload output:', stdout);
      res.status(200).json({message : 'Arduino code uploaded successfully to Arduino', stdout: stdout});
    });
  });
});

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
