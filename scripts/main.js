import { NotesHandler } from "./notesHandlerFunctions/notesHandler.js";
const notesHandler = new NotesHandler();

const addNoteButton = document.querySelector(".saveNoteButton");
const addNoteOpenMenu = document.querySelector(".addNewNoteButton");
const addNewNoteHeaderButton = document.querySelector(
  ".addNewNoteHeaderButton"
);

const cancelAddNewNote = document.querySelector(".cancelAddNewNote");
const searchNotes = document.querySelector(".searchNoteSection");

addNoteButton.addEventListener("click", (e) => {
  notesHandler.addNewNote();
});

addNoteOpenMenu.addEventListener("click", (e) => {
  notesHandler.openCreateMenu();
  console.log(notesHandler);
});

addNewNoteHeaderButton.addEventListener("click", (e) => {
  notesHandler.openCreateMenu();
  console.log(notesHandler);
});

cancelAddNewNote.addEventListener("click", (e) => {
  notesHandler.closeCreateMenu();
});

searchNotes.addEventListener("input", (e) => {
  notesHandler.searchNotes(e.target.value);
});
