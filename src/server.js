const express = require('express');
const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken'); // 如果你需要创建一个真实的 JWT
const cors = require('cors'); // 引入cors包


const app = express();
const PORT = 5000;

// 使用 bodyParser 中间件解析 JSON 请求体
app.use(cors()); // 使用cors中间件允许所有跨域请求
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the server. Use POST /authorization to login.');
  });
  

app.post('/authorization', (req, res) => {
    // 这里是硬编码的示例验证。在实际应用中，你应该查询数据库。
    const { username, password } = req.body;
    if (username === "admin" && password === "password") {
      // 生成一个模拟的 JWT 令牌
      // const token = jwt.sign({ username }, 'your-secret-key', { expiresIn: '1h' });
      const token = "fake-jwt-token"; // 这里使用一个静态值作为示例
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });


  app.get('/data', (req, res) => {
    
    const data = {
        users: [
            { id: 1, name: 'User One' },
            { id: 2, name: 'User Two' }
        ],
        message: 'This is a GET request response data'
    };
    res.json(data);
});
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });