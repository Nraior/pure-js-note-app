import { NO_NOTES } from "../constants/constants.js";

export class LayoutHandler {
  notes = {};

  constructor(notesReference) {
    this.notes = notesReference;
  }

  handleLayoutChange(layoutWithNotes, noNotesLayout) {
    if (Object.keys(this.notes).length > NO_NOTES) {
      console.log("Rearrange layout for one note");
      layoutWithNotes?.();
    } else {
      noNotesLayout?.();
      console.log("No new notes layout");
    }
  }

  updateLayout() {
    this.handleLayoutChange(
      () => {
        this.handleAtLeastOneNote();
      },
      () => {
        this.handleNoNotesYet();
      }
    );
  }

  handleAtLeastOneNote() {
    const addNewNotePrimaryButton = document.querySelector(
      ".addNewNoteHeaderButton"
    );
    const noNewNoteWrapper = document.querySelector(".noNewNoteWrapper");

    addNewNotePrimaryButton.classList.remove("hidden");
    noNewNoteWrapper.classList.add("hidden");
  }

  handleNoNotesYet() {
    const addNewNotePrimaryButton = document.querySelector(
      ".addNewNoteHeaderButton"
    );
    const noNewNoteWrapper = document.querySelector(".noNewNoteWrapper");
    console.log("nonewNotewrapper", noNewNoteWrapper);
    noNewNoteWrapper.classList.remove("hidden");
    addNewNotePrimaryButton.classList.add("hidden");
  }

  handleOpenNoteCreator(open) {
    const noteCreatorWindow = document.querySelector(".addNewNoteContainer");
    console.log(open);
    open
      ? noteCreatorWindow.classList.remove("hidden")
      : noteCreatorWindow.classList.add("hidden");
    console.log("open note creator");
  }

  updateEditMenuContent(noteObj) {
    const addNewNoteHeader = document.querySelector(".addNewNoteHeaderLabel");
    const noteTitle = document.querySelector(".addNewNoteContainer input");
    const noteBody = document.querySelector(".addNewNoteContainer textarea");

    addNewNoteHeader.innerText = "Edit node";
    noteTitle.value = noteObj.obj.noteTitle;
    noteBody.value = noteObj.obj.noteBody;
    console.log("noteObj", noteObj);
  }
}
