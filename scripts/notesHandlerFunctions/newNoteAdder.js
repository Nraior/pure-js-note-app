export class NewNoteAdder {
  createNewNote(noteTitle = "Note Title", noteBody = "Note Body") {
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
