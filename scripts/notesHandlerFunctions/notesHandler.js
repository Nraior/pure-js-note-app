import { LayoutHandler } from "./layoutHandler.js";
import { Note } from "./Note.js";
export class NotesHandler {
  notes = {};
  layoutHandler = new LayoutHandler(this.notes);
  currentlyEditedNote = null;
  searchText = "";

  handleAddEditNote() {
    this.currentlyEditedNote ? this.handleEditing() : this.addNewNote();
  }

  handleEditing() {
    const note = this.currentlyEditedNote;

    this.layoutHandler.handleLayoutChange();
    note.noteVisualHandler.showNote(note);
    note.obj.noteTitle = document.querySelector("input.defaultInput").value;
    note.obj.noteBody = document.querySelector("textarea.defaultInput").value;
    note.noteVisualHandler.editVisualNote(note);

    this.currentlyEditedNote = null;
    this.currentlyDeletedNote = null;
    this.layoutHandler.closeCreateMenu();
  }

  addNewNote() {
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
      this.openEditNoteMenu.bind(this),
      this.askForRemoveNote.bind(this)
    );

    this.layoutHandler.closeCreateMenu();
    this.layoutHandler.handleLayoutChange();
    this.currentlyEditedNote = null;
    this.searchNotes(this.searchText);
  }

  askForRemoveNote(obj) {
    this.currentlyDeletedNote = obj;
    this.layoutHandler.showHideDeleteConfirmation(true);
  }

  confirmRemoveNote() {
    this.removeNote(this.currentlyDeletedNote);
    this.layoutHandler.showHideDeleteConfirmation(false);
  }

  removeNote(noteObj) {
    delete this.notes[noteObj.identifier];
    noteObj.domObj.remove();
    this.layoutHandler.handleLayoutChange();
  }

  searchNotes(searchText) {
    this.searchText = searchText;
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
        note.noteVisualHandler.showNote(note);
      } else {
        note.noteVisualHandler.hideNote(note);
      }
    });
  }

  openEditNoteMenu(noteObj) {
    if (this.currentlyEditedNote) {
      this.cancelAddNewNote();
    }

    this.isEditing = true;
    this.layoutHandler.handleOpenNoteCreator(this.isEditing);
    this.layoutHandler.updateEditMenuContent("Edit note", noteObj);
    noteObj.noteVisualHandler.hideNote(noteObj);

    this.currentlyEditedNote = noteObj;
  }

  openCreateNoteMenu() {
    if (this.currentlyEditedNote) {
      this.cancelAddNewNote();
    }

    this.layoutHandler.handleOpenNoteCreator(true);
    this.layoutHandler.updateEditMenuContent();
  }

  cancelAddNewNote() {
    if (this.currentlyEditedNote) {
      this.currentlyEditedNote.noteVisualHandler.showNote(
        this.currentlyEditedNote
      );
      this.currentlyEditedNote = null;
    }
    this.layoutHandler.closeCreateMenu();
  }
}
