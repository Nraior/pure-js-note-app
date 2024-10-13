import { NO_NOTES } from "../constants/constants.js";

export class LayoutHandler {
  notes = {};

  constructor(notesReference) {
    this.notes = notesReference;
  }

  handleLayoutChange() {
    if (Object.keys(this.notes).length > NO_NOTES) {
      this.handleAtLeastOneNote();
    } else {
      this.handleNoNotesYet();
    }
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
    noNewNoteWrapper.classList.remove("hidden");
    addNewNotePrimaryButton.classList.add("hidden");
  }

  handleOpenNoteCreator(open) {
    const noteCreatorWindow = document.querySelector(".addNewNoteContainer");
    open
      ? noteCreatorWindow.classList.remove("hidden")
      : noteCreatorWindow.classList.add("hidden");
  }

  updateEditMenuContent(noteHeader = "Add new note", noteObj) {
    const addNewNoteHeader = document.querySelector(".addNewNoteHeaderLabel");
    const noteTitle = document.querySelector(".addNewNoteContainer input");
    const noteBody = document.querySelector(".addNewNoteContainer textarea");

    addNewNoteHeader.innerText = noteHeader;
    noteTitle.value = noteObj ? noteObj.obj.noteTitle : "";
    noteBody.value = noteObj ? noteObj.obj.noteBody : "";
  }

  closeCreateMenu() {
    const noteTitleEditable = document.querySelector("input.defaultInput");
    const noteContentEditable = document.querySelector("textarea.defaultInput");

    noteTitleEditable.value = "";
    noteContentEditable.value = "";
    this.handleOpenNoteCreator(false);
  }

  showHideDeleteConfirmation(show) {
    const modal = document.querySelector(".deleteNoteModal");

    if (show) {
      modal.classList.remove("hidden");
    } else {
      modal.classList.add("hidden");
    }
  }

  addEventListenersOnModal(onCancel, onDelete) {
    const cancelButton = document.querySelector(
      ".deleteNoteModalButtons .buttonSecondary"
    );
    const deleteButton = document.querySelector(
      ".deleteNoteModalButtons .buttonPrimary"
    );

    cancelButton.addEventListener("click", (e) => {
      onCancel();
    });

    deleteButton.addEventListener("click", (e) => {
      onDelete();
    });
  }
}
