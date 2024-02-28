const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()
const PORT = 5000

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Welcome to the server. Use POST /authorization to login.')
  });
  

app.post('/authorization', (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "password") {
      const token = "fake-jwt-token"
      res.json({ token })
    } else {
      res.status(401).json({ error: "Invalid credentials" })
    }
  })


  app.get('/data', (req, res) => {
    
    const data = {
        users: [
            { id: 1, name: 'User One' },
            { id: 2, name: 'User Two' }
        ],
        message: 'This is a GET request response data'
    };
    res.json(data);
})
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  })