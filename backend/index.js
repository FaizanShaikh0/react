const express = require("express");
const { Client } = require("pg");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

async function getclient() {
  const client = new Client(
    "postgresql://note_owner:bm0A7gHpRQiK@ep-snowy-darkness-a5czh5u9.us-east-2.aws.neon.tech/note?sslmode=require"
  );
  await client.connect();
  return client;
}

app.post("/add", async function (req, res) {
  try {
    const note = req.body;
    const client = await getclient();
    addNoteQuery =
      "insert into notes(id , title , content) values($1 ,$2 , $3)";
    values = [note.id, note.title, note.content];
    await client.query(addNoteQuery, values);
    return res.json({
      msg: "note added",
    });
  } catch (error) {
    return res.json({
      msg: "internal server error",
    });
  }
});

app.get("/notes", async function (req, res) {
  try {
    const client = await getclient();
    const selectQuery = "select * from notes";
    const response = await client.query(selectQuery);
    return res.json({
      data: response.rows,
    });
  } catch (error) {
    return res.json({
      data: "somthing went wrong",
    });
  }
});

app.listen(8080, function () {
  console.log("App Woking");
});
