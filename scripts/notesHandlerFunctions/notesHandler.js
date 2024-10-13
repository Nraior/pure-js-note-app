import { NewNoteAdder } from "./newNoteAdder.js";
import { NoteVisualHandler } from "./noteVisualHandler.js";
import { LayoutHandler } from "./layoutHandler.js";
import { Note } from "./Note.js";
export class NotesHandler {
  notes = {};
  noteAdder = new NewNoteAdder();
  layoutHandler = new LayoutHandler(this.notes);
  noteVisualHandler = new NoteVisualHandler(
    document.querySelector(".note"),
    document.querySelector(".noteElements")
  );

  isCreateNoteOpen = false;

  currentlyEditedNote = null;

  getNoteName(title, timestamp) {
    return `${title}-${timestamp}`;
  }

  addNewNote(fromObj) {
    const noteTitleEditable = document.querySelector("input.defaultInput");
    const noteContentEditable = document.querySelector("textarea.defaultInput");

    if (!noteTitleEditable.value && !noteContentEditable.value && !fromObj) {
      // early return for no title no text
      return;
    }

    const createdNoteObj = fromObj
      ? fromObj
      : this.noteAdder.createNewNote(
          noteTitleEditable.value,
          noteContentEditable.value
        );

    const createdNoteName = this.getNoteName(
      createdNoteObj.noteTitle,
      createdNoteObj.timestamp
    );
    const createdNote = this.noteVisualHandler.createVisualNote(createdNoteObj);
    this.notes[createdNoteName] = new Note(
      createdNoteName,
      createdNoteObj,
      createdNote
    );

    this.noteVisualHandler.addEditAndRemoveHandlers(
      this.notes[createdNoteName],
      this.editNote.bind(this),
      this.removeNote.bind(this)
    );

    this.closeCreateMenu();
    this.layoutHandler.updateLayout();
  }

  searchNotes(searchText) {
    Object.keys(this.notes).forEach((noteKey) => {
      const note = this.notes[noteKey];
      const textToSearchIn = `${note.obj.noteTitle} ${note.obj.noteBody}`;

      if (textToSearchIn.includes(searchText)) {
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

    this.layoutHandler.updateLayout();
  }

  openCreateMenu() {
    this.isCreateNoteOpen = true;
    this.layoutHandler.handleOpenNoteCreator(this.isCreateNoteOpen);
  }

  cancelAddNewNote() {
    // if we are editing
    if (this.currentlyEditedNote) {
      this.showNote(this.currentlyEditedNote);
    }
    this.closeCreateMenu();
  }

  closeCreateMenu() {
    const noteTitleEditable = document.querySelector("input.defaultInput");
    const noteContentEditable = document.querySelector("textarea.defaultInput");

    noteTitleEditable.value = "";
    noteContentEditable.value = "";
    this.isCreateNoteOpen = false;
    this.layoutHandler.handleOpenNoteCreator(this.isCreateNoteOpen);
  }
}
