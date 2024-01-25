import cors from "cors";
import express from "express";
import pkg from "pg";
/*
Postgres cluster makzip created
  Username:    postgres
  Password:    43TpuKgI3fYmZlT
  Hostname:    makzip.internal
  Flycast:     fdaa:5:35ca:0:1::f
  Proxy port:  5432
  Postgres port:  5433
  Connection string: postgres://postgres:43TpuKgI3fYmZlT@makzip.flycast:5432
*/
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  password: "43TpuKgI3fYmZlT",
  host: "makzip.internal",
  database: "postgres",
  port: 5432,
});

const app = express();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 다건조회
app.get("/api/v1/review", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Restaurant");
    const listrows = result.rows;

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
      error: error.toString(),
    });
  }
});

// 단건조회
app.get("/api/v1/review/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pool.query("SELECT * FROM Restaurant WHERE id = $1", [
      id,
    ]);
    const listrow = result.rows[0];

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
      error: error.toString(),
    });
  }
});

// 생성
app.post("/api/v1/review", async (req, res) => {
  try {
    const { title, contents, is_checked = false } = req.body;

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

    const result = await pool.query(
      "INSERT INTO Restaurant (title, contents, created_at, updated_at, is_checked) VALUES ($1, $2, NOW(), NOW(), $3) RETURNING *",
      [title, contents, is_checked]
    );
    const recordrow = result.rows[0];

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
      error: error.toString(),
    });
  }
});

// 수정
app.patch("/api/v1/review/:id", async (req, res) => {
  const { id } = req.params;
  const { title, contents, is_checked = 0 } = req.body;

  try {
    const checkResult = await pool.query(
      "SELECT * FROM Restaurant WHERE id = $1",
      [id]
    );
    const listrow = checkResult.rows[0];

    if (listrow === undefined) {
      res.status(404).json({
        resultCode: "F-1",
        msg: "not found",
      });
      return;
    }

    await pool.query(
      "UPDATE Restaurant SET title = $1, contents = $2, updated_at = NOW(), is_checked = $3 WHERE id = $4",
      [title, contents, is_checked, id]
    );

    // 수정된 데이터를 다시 조회하여 클라이언트로 전송
    const updatedResult = await pool.query(
      "SELECT * FROM Restaurant WHERE id = $1",
      [id]
    );  
    const updatedListrow = updatedResult.rows[0];
    
    res.json({
      resultCode: "S-1",
      msg: "성공",
      data: updatedListrow, // 수정된 데이터를 클라이언트로 전송
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      resultCode: "F-1",
      msg: "에러 발생",
      error: error.toString(),
    });
  }
});

//삭제
app.delete("/api/v1/review/:id", async (req, res) => {
  const { id } = req.params;

  const checkResult = await pool.query(
    "SELECT * FROM Restaurant WHERE id = $1",
    [id]
  );
  const listrow = checkResult.rows[0];

  if (listrow === undefined) {
    res.status(404).json({
      resultCode: "F-1",
      msg: "not found",
    });
    return;
  }

  try {
    await pool.query("DELETE FROM Restaurant WHERE id = $1", [id]);

    res.json({
      resultCode: "S-1",
      msg: `${id}번 리뷰가 삭제 되었습니다`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      resultCode: "F-1",
      msg: "에러 발생",
      error: error.toString(),
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});