import { LayoutHandler } from "./layoutHandler.js";
import { Note } from "./Note.js";
export class NotesHandler {
  notes = {};
  layoutHandler = new LayoutHandler(this.notes);

  currentlyEditedNote = null;

  handleEditing() {
    const note = this.currentlyEditedNote;

    this.layoutHandler.handleLayoutChange();

    note.domObj.classList.remove("hidden");

    note.obj.noteTitle = document.querySelector("input.defaultInput").value;
    note.obj.noteBody = document.querySelector("textarea.defaultInput").value;
    note.noteVisualHandler.editVisualNote(note);

    this.currentlyEditedNote = null;
    this.closeCreateMenu();
  }

  addNewNote() {
    if (this.currentlyEditedNote) {
      this.handleEditing();
      return;
    }
    const noteTitleEditable = document.querySelector("input.defaultInput");
    const noteContentEditable = document.querySelector("textarea.defaultInput");

    if (!noteTitleEditable.value && !noteContentEditable.value) {
      return;
    }

    const createdNoteObject = new Note(
      noteTitleEditable.value,
      noteContentEditable.value
    );

    const createdNoteDOM = createdNoteObject.noteVisualHandler.createVisualNote(
      createdNoteObject.obj
    );
    createdNoteObject.assignDOMObject(createdNoteDOM);

    this.notes[createdNoteObject.identifier] = createdNoteObject;
    createdNoteObject.noteVisualHandler.addEditAndRemoveHandlers(
      createdNoteObject,
      this.editNote.bind(this),
      this.removeNote.bind(this)
    );

    this.closeCreateMenu();
    this.layoutHandler.handleLayoutChange();
    this.currentlyEditedNote = null;
  }

  searchNotes(searchText) {
    Object.keys(this.notes).forEach((noteKey) => {
      const note = this.notes[noteKey];
      if (!note) {
        return;
      }
      const textToSearchIn = `${note.obj.noteTitle} ${note.obj.noteBody}`;

      if (
        textToSearchIn.toLowerCase().includes(searchText.toLowerCase()) &&
        note !== this.currentlyEditedNote
      ) {
        note.domObj.classList.remove("hidden");
      } else {
        note.domObj.classList.add("hidden");
      }
    });
  }

  editNote(noteObj) {
    this.isEditing = true;
    this.layoutHandler.handleOpenNoteCreator(this.isEditing);
    this.layoutHandler.updateEditMenuContent(noteObj);
    //this.removeNote(noteObj);
    this.hideNote(noteObj);
    this.currentlyEditedNote = noteObj;
  }

  hideNote(noteObj) {
    noteObj.domObj.classList.add("hidden");
  }

  showNote(noteObj) {
    noteObj.domObj.classList.remove("hidden");
  }

  removeNote(noteObj) {
    delete this.notes[noteObj.identifier];

    noteObj.domObj.remove();

    this.layoutHandler.handleLayoutChange();
  }

  openCreateMenu() {
    this.layoutHandler.handleOpenNoteCreator(true);
  }

  cancelAddNewNote() {
    if (this.currentlyEditedNote) {
      this.showNote(this.currentlyEditedNote);
      this.currentlyEditedNote = null;
    }
    this.closeCreateMenu();
  }

  closeCreateMenu() {
    const noteTitleEditable = document.querySelector("input.defaultInput");
    const noteContentEditable = document.querySelector("textarea.defaultInput");

    noteTitleEditable.value = "";
    noteContentEditable.value = "";
    this.layoutHandler.handleOpenNoteCreator(false);
  }
}
