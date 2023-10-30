const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const db = require('./db');
const queries = require('./queries');
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
  extended: true,
}));

const PORT = process.env.PORT || 3000;

app.post("/registration", (req, res) => {
  // รับข้อมูลจากแบบฟอร์มที่ส่งมาผ่าน POST
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const nickname = req.body.nickname;
  const category = req.body.category;
  const drinkingLevel = req.body.drinkingLevel;
  const foodPreferences = req.body.foodPreferences;

  // ดำเนินการกับข้อมูลตามต้องการ
  // ยกตัวอย่างเช่นบันทึกในฐานข้อมูล

  // ส่งตอบรับกลับไปยังผู้ใช้
  res.json({ message: "ลงทะเบียนสำเร็จ" });
});
app.get("/", (req, res)=>{
    res.send("API Homecoming");
  });
  

app.post('/register', async (req, res) => {
    try {
      const { firstName, lastName, nickname, category, drinkingLevel, foodPreferences } = req.body;
      const pool = await db.connectDB();

      const insertUserQuery = queries.insertuser(firstName, lastName, nickname, category, drinkingLevel, foodPreferences);
      const insertResult = await pool.request().query(insertUserQuery);
  
      if (insertResult.rowsAffected[0] === 1) {
        return res.json({ "status": 'successful' });
      } else {
        res.status(500).json({ error: 'Failed to register' });
      }
    } catch (err) {
      console.error('Error during registration:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      sql.close();
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
