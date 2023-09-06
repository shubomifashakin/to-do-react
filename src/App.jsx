import { useState } from "react";
import "./css/app.css";

export default function App() {
  const [notes, updateNotes] = useState([]);
  const totalNotes = notes.length;
  const activeNotes = notes.filter((c) => c.active).length;
  const inactiveNotes = totalNotes - activeNotes;
  return (
    <div
      className={`container ${
        inactiveNotes === totalNotes ? "all-inactive" : ""
      }`}
    >
      <Header />
      <Form updateNotes={updateNotes} />
      <Container notes={notes} updateNotes={updateNotes} />
      <Footer notes={notes} />
    </div>
  );
}

function Header() {
  return (
    <>
      <h1 className="header">TO DO LIST</h1>
    </>
  );
}

function Form({ updateNotes }) {
  const [note, setNote] = useState("");

  //when we submit the note, add this note info to the global state
  function HandleSubmit(e, note) {
    e.preventDefault();
    if (!note) return;
    const noteInfo = {
      text: note,
      id: Date.now(),
      active: true,
      dragging: false,
    };
    updateNotes((c) => [...c, noteInfo]);

    //clear the input field
    setNote("");
  }

  return (
    <form onSubmit={(e) => HandleSubmit(e, note)}>
      <div className="input-group">
        <input
          type="text"
          value={note}
          placeholder="Enter a note"
          onChange={(e) =>
            e.target.value.split("").length < 50
              ? setNote(e.target.value)
              : null
          }
        />
        <button>Add</button>
      </div>
    </form>
  );
}

function Container({ notes, updateNotes }) {
  //when the user double clicks the note, the active status becomes the opposite of what it was(i.e if it was active, becomes inactive and vice versa)

  function HandleDblClick(id) {
    updateNotes((c) =>
      c.map((ci) => (ci.id === id ? { ...ci, active: !ci.active } : ci))
    );
  }

  function HandleDeleteNote(id) {
    //when the user clicks the delete button, create a new array containing all the note excluding the one with thesame id of the note clicked
    updateNotes((c) => c.filter((ci) => ci.id !== id));
  }

  return (
    <div className="added-notes">
      {/* create a paragraph for each note in the array */}
      {notes.map((note, i) => (
        <p
          draggable="true"
          className={`${note.active ? "note" : "note inactive"} ${
            i + 1 === 10 ? "no-border" : ""
          }`}
          key={i}
          //when the user double clicks on a note, change to inactive
          onDoubleClick={(e) => HandleDblClick(note.id)}
          //if the note is active give it a color red, else a color blue
        >
          <span className="note-id">{i + 1}</span>
          <span className="note-text">{note.text} </span>
          <span
            className="delete-note"
            onClick={() => HandleDeleteNote(note.id)}
          >
            X
          </span>
        </p>
      ))}
    </div>
  );
}

function Footer({ notes }) {
  if (!notes.length) return <footer>Please add some notes</footer>;

  const totalNotes = notes.length;
  const activeNotes = notes.filter((c) => c.active).length;
  const inactiveNotes = totalNotes - activeNotes;

  return (
    <footer>
      You added {totalNotes} tasks(s), {activeNotes}{" "}
      {activeNotes <= 1 ? "" : "are"} active and {inactiveNotes}{" "}
      {inactiveNotes <= 1 ? "" : "are"} inactive
    </footer>
  );
}
