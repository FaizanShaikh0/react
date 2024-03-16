import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Table from "react-bootstrap/Table";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);

  async function getNotes() {
    try {
      const response = await axios.get("http://localhost:8080/notes");
      setNotes(response.data.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  async function addNotes() {
    try {
      await axios.post("http://localhost:8080/add", {
        id: Math.random().toString(),
        title: title,
        content: content,
      });
      setTitle("");
      setContent("");
      // After adding a note, fetch notes again to update the list
      getNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <div className="form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
        />
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          type="text"
          placeholder="Content"
        />
        <button onClick={addNotes}>Add</button>
      </div>

      <div className="notes">
        <Table style={{ border: "1px solid grey" }}>
          <thead>
            <tr>
              <th>id</th>
              <th>Title</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((element) => (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td>{element.title}</td>
                <td>{element.content}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default App;
