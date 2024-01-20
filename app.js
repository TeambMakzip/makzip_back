// app.js
import express from "express";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: "localhost",
    user: "alsrl6678",
    password: "alsrl1004",
    database: "makzip",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    dateStrings: true
  });


const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 다건조회
app.get("/list", async (req, res) => {
    try {
        const [ listrows ] = await pool.query(
            `
            SELECT * FROM Restaurant
            `
        );

        res.json({
            resultCode: "S-1",
            msg: "성공",
            data: listrows,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            resultCode: "F-1",
            msg: "에러 발생",
        });
    }
});

// 단건조회
app.get("/list/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const [listrow] = await pool.query(
            `
            SELECT * FROM Restaurant
            WHERE id = ?
            `,
        [ id ]);

        res.json({
            resultCode: "S-1",
            msg: "성공",
            data: listrow,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            resultCode: "F-1",
            msg: "에러 발생",
        });
    }
});

// 생성 
app.post("/list", async (req, res) => {
    try {
        const { title, contents, is_checked = 0 } = req.body;

        if (!title) {
            res.status(400).json({
                resultCode: "F-1",
                msg: "title required",
            });
            return;
        }

        if (!contents) {
            res.status(400).json({
                resultCode: "F-1",
                msg: "contents required",
            });
            return;
        }

        const [recordrow] = await pool.query(
            `
            INSERT INTO Restaurant
            SET created_at = NOW(),
            updated_at = NOW(),
            title = ?,
            contents = ?,
            is_checked = ?
            `,
            [title, contents, is_checked]
        );

        res.json({
            resultCode: "S-1",
            msg: "성공",
            data: recordrow,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            resultCode: "F-1",
            msg: "에러 발생",
        });
    }
});



// 수정
app.patch("/list/:id", async (req, res) => {
    const { id } = req.params;
  
    const [listrow] = await pool.query(
      `
      SELECT *
      FROM Restaurant
      WHERE id = ?
      `,
      [id]
    );

    if (listrow === undefined) {
      res.status(404).json({
        resultCode: "F-1",
        msg: "not found",
      });
      return;
    }
  

    const { title, contents, is_checked = 0 } = req.body;

    await pool.query(
      `
      UPDATE Restaurant
      SET created_at = NOW(),
      updated_at = NOW(),
      title = ?,
      contents = ?,
      is_checked = ?
      `,
      [title, contents, is_checked]
    );
  
    const [mdlistrow] = await pool.query(
      `
      SELECT *
      FROM Restaurant
      WHERE id = ?
      `,
      [id]
    );
  
    res.json({
      resultCode: "S-1",
      msg: "성공",
      data: mdlistrow,
    });
  });


//삭제
app.delete("/list/:id", async (req, res) => {
    const { id } = req.params;
  
    const [listrow] = await pool.query(
        `
        SELECT *
        FROM Restaurant
        WHERE id = ?
        `,
        [id]
      );
  
    if (listrow === undefined) {
      res.status(404).json({
        resultCode: "F-1",
        msg: "not found",
      });
      return;
    }
  
    await pool.query(
      `
      DELETE FROM Restaurant
      WHERE id = ?
      `,
      [id]
    );
  
    res.json({
      resultCode: "S-1",
      msg: `${id}번 할일을 삭제하였습니다`,
    });
  });  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});