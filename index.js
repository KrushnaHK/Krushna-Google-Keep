let notesContainerEl = document.getElementById("notesContainer");
let archeivedListEl = document.getElementById("archeivedList");
let deleltedListEl = document.getElementById("deleltedList");

let saveNoteButton = document.getElementById("saveNoteButton");

function getNoteListFromLocalStorage() {
  let stringifiedNoteList = localStorage.getItem("noteList");
  let parsedNoteList = JSON.parse(stringifiedNoteList);

  if (parsedNoteList === null) {
    return [];
  } else {
    return parsedNoteList;
  }
}

let noteList = getNoteListFromLocalStorage();

saveNoteButton.onclick = function () {
  localStorage.setItem("noteList", JSON.stringify(noteList));
};

let notesCount = noteList.length;

function permanentDeleteNote(deletenoteId) {
  let deleteItemIndex = noteList.findIndex(function (eachNote) {
    let eachNoteId = "deletenote" + eachNote.uniqueNo;
    if (eachNoteId === deletenoteId) {
      return true;
    } else {
      return false;
    }
  });
  noteList.splice(deleteItemIndex, 1);
}

function restoreNote(deletenoteId, eachNote) {
  let deletedEl = document.getElementById(deletenoteId);
  deleltedListEl.removeChild(deletedEl);

  createAndAppendNote(eachNote);
}

//deleted Note
function deleteNote(noteId, eachNote) {
  let deletenoteId = "deletenote" + eachNote.uniqueNo;
  let noteElement = document.getElementById(noteId);
  notesContainerEl.removeChild(noteElement);

  let noteEl = document.createElement("li");
  noteEl.classList.add("note-container");
  noteEl.id = deletenoteId;
  deleltedListEl.appendChild(noteEl);

  let titleEl = document.createElement("h1");
  titleEl.classList.add("title");
  titleEl.textContent = eachNote.title;
  noteEl.appendChild(titleEl);

  let noteTextEl = document.createElement("p");
  noteTextEl.classList.add("note-text");
  noteTextEl.textContent = eachNote.text;
  noteEl.appendChild(noteTextEl);

  let resotreEl = document.createElement("i");
  resotreEl.classList.add(
    "fa-solid",
    "fa-trash-can-arrow-up",
    "archieved-icon"
  );
  resotreEl.onclick = function () {
    restoreNote(deletenoteId, eachNote);
  };
  noteEl.appendChild(resotreEl);

  let permanentDeleteIcon = document.createElement("i");
  permanentDeleteIcon.classList.add("fa", "fa-trash", "archieved-icon");
  permanentDeleteIcon.onclick = function () {
    permanentDeleteNote(deletenoteId);
  };
  noteEl.appendChild(permanentDeleteIcon);
}

//Unarchieved Note
function unArchieve(archievenoteId, eachNote) {
  let archievedElement = document.getElementById(archievenoteId);
  archeivedListEl.removeChild(archievedElement);

  createAndAppendNote(eachNote);
}

//Archieved Note

function archeiveFromNote(noteId, eachNote) {
  let archievenoteId = "archeivenote" + eachNote.uniqueNo;

  let noteElement = document.getElementById(noteId);
  notesContainerEl.removeChild(noteElement);

  let noteEl = document.createElement("li");
  noteEl.classList.add("note-container");
  noteEl.id = archievenoteId;
  archeivedListEl.appendChild(noteEl);

  let titleEl = document.createElement("h1");
  titleEl.classList.add("title");
  titleEl.textContent = eachNote.title;
  noteEl.appendChild(titleEl);

  let noteTextEl = document.createElement("p");
  noteTextEl.classList.add("note-text");
  noteTextEl.textContent = eachNote.text;
  noteEl.appendChild(noteTextEl);

  let unArcheivedEl = document.createElement("i");
  unArcheivedEl.classList.add("fa", "fa-archive", "archieved-icon");
  unArcheivedEl.onclick = function () {
    unArchieve(archievenoteId, eachNote);
  };
  noteEl.appendChild(unArcheivedEl);
}

//New Note

function createAndAppendNote(eachNote) {
  let noteId = "note" + eachNote.uniqueNo;

  let noteEl = document.createElement("li");
  noteEl.classList.add("note-container");
  noteEl.id = noteId;
  notesContainerEl.appendChild(noteEl);

  let titleEl = document.createElement("h1");
  titleEl.classList.add("title");
  titleEl.textContent = eachNote.title;
  noteEl.appendChild(titleEl);

  let noteTextEl = document.createElement("p");
  noteTextEl.classList.add("note-text");
  noteTextEl.textContent = eachNote.text;
  noteEl.appendChild(noteTextEl);

  let archeivedEl = document.createElement("i");
  archeivedEl.classList.add("fa", "fa-archive", "archieved-icon");
  archeivedEl.onclick = function () {
    archeiveFromNote(noteId, eachNote);
  };
  noteEl.appendChild(archeivedEl);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa", "fa-trash", "archieved-icon");
  deleteIcon.onclick = function () {
    deleteNote(noteId, eachNote);
  };
  noteEl.appendChild(deleteIcon);
}

for (let eachNote of noteList) {
  createAndAppendNote(eachNote);
}

let onAddNoteButton = document.getElementById("onAddNoteButton");

function onAddNote() {
  let noteInputTitelEl = document.getElementById("noteInputTitel");
  let noteInputTextEl = document.getElementById("noteInputText");

  let noteInputTitleValue = noteInputTitelEl.value;
  let noteInputTextValue = noteInputTextEl.value;

  notesCount = notesCount + 1;

  let newNote = {
    title: noteInputTitleValue,
    text: noteInputTextValue,
    uniqueNo: notesCount,
  };

  noteList.push(newNote);

  createAndAppendNote(newNote);
  noteInputTitelEl.value = "";
  noteInputTextEl.value = "";
}

onAddNoteButton.onclick = function () {
  onAddNote();
};

console.log(noteList);
