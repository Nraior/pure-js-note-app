import { MONTHS_NAMES } from "../constants/constants.js";

export class NoteVisualHandler {
  node = null;
  noteContainer = null;
  notesDOM = [];
  constructor(defaultNoteNode, defaultNoteCotainer) {
    this.node = defaultNoteNode;
    this.noteContainer = defaultNoteCotainer;
  }

  editVisualNote(note) {
    const dom = note.domObj;
    const contentObj = note.obj;
    dom.querySelector(".noteTitle").innerText = contentObj.noteTitle;
    dom.querySelector(".noteBody").innerText = contentObj.noteBody;
    dom.querySelector(".noteDate").innerText = `${
      MONTHS_NAMES[contentObj.date.month]
    } ${contentObj.date.day}`;
  }

  createVisualNote(noteObj) {
    const clonedNode = this.node.cloneNode(true);

    clonedNode.querySelector(".noteTitle").innerText = noteObj.noteTitle;
    clonedNode.querySelector(".noteBody").innerText = noteObj.noteBody;
    clonedNode.querySelector(".noteDate").innerText = `${
      MONTHS_NAMES[noteObj.date.month]
    } ${noteObj.date.day}`;
    clonedNode.classList.remove("hidden");

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

  hideNote(noteObj) {
    noteObj.domObj.classList.add("hidden");
  }

  showNote(noteObj) {
    noteObj.domObj.classList.remove("hidden");
  }
}
