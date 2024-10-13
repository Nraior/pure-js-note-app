import { MONTHS_NAMES } from "../constants/constants.js";

export class NoteVisualHandler {
  node = null;
  noteContainer = null;
  notesDOM = [];
  // I18N possibility
  constructor(defaultNoteNode, defaultNoteCotainer) {
    this.node = defaultNoteNode;
    this.noteContainer = defaultNoteCotainer;
  }

  createVisualNote(noteObj) {
    console.log("try to add note");
    const clonedNode = this.node.cloneNode(true);

    console.log(noteObj);

    clonedNode.querySelector(".noteTitle").innerText = noteObj.noteTitle;
    clonedNode.querySelector(".noteBody").innerText = noteObj.noteBody;
    clonedNode.querySelector(".noteDate").innerText = `${
      MONTHS_NAMES[noteObj.date.month]
    } ${noteObj.date.day}`;
    clonedNode.classList.toggle("hidden");

    this.notesDOM.push(clonedNode);
    this.noteContainer.prepend(clonedNode);

    return clonedNode;
  }

  addEditAndRemoveHandlers(note, onEdit, onRemove) {
    const editNote = note.domObj.querySelector(".editNote");
    const removeNote = note.domObj.querySelector(".removeNote");

    editNote.addEventListener("click", (e) => {
      onEdit(note);
    });

    removeNote.addEventListener("click", (e) => {
      onRemove(note);
    });
  }

  removeVisualNote(noteObj) {
    console.log("try to remove note");
  }
}
