import { NoteVisualHandler } from "./noteVisualHandler.js";

export class Note {
  identifier = null;
  domObj = null;
  noteVisualHandler = new NoteVisualHandler(
    document.querySelector(".note"),
    document.querySelector(".noteElements")
  );

  constructor(title, body) {
    this.obj = this.createNewNoteObject(title, body);
    this.identifier = this.generateId(this.obj.timestamp);
  }

  assignDOMObject(domObj) {
    this.domObj = domObj;
  }

  generateId(id) {
    return id.toString();
  }

  createNewNoteObject(noteTitle = "Note Title", noteBody = "Note Body") {
    const currentDate = new Date();
    return {
      noteTitle,
      noteBody,
      timestamp: currentDate.getTime(),
      date: {
        day: currentDate.getDate(),
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(),
      },
    };
  }
}
