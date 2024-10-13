import { NotesHandler } from "./notesHandlerFunctions/NotesHandler.js";
const notesHandler = new NotesHandler();

const addNoteButton = document.querySelector(".saveNoteButton");
const addNoteOpenMenu = document.querySelector(".addNewNoteButton");
const cancelAddNewNote = document.querySelector(".cancelAddNewNote");
const searchNotes = document.querySelector(".searchNoteSection");
const addNewNoteHeaderButton = document.querySelector(
  ".addNewNoteHeaderButton"
);

addNoteButton.addEventListener("click", (e) => {
  notesHandler.addNewNote();
});

addNoteOpenMenu.addEventListener("click", (e) => {
  notesHandler.openCreateMenu();
});

cancelAddNewNote.addEventListener("click", (e) => {
  notesHandler.cancelAddNewNote();
});

searchNotes.addEventListener("input", (e) => {
  notesHandler.searchNotes(e.target.value);
});
addNewNoteHeaderButton.addEventListener("click", (e) => {
  notesHandler.openCreateMenu();
});
