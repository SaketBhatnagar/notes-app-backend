const { v4 } = require("uuid");
const userData = require("../db/UserDb");

const createNote = ({ title, decripition }) => {
  const date = new Date();
  return {
    noteid: v4(),
    title,
    decripition,
    createdAt: date,
    updateAt: null,
  };
};

const findNotesById = (noteid, email) => {
  let new_note = null;
  userData.map((user) => {
    if (user.email === email) {
      new_note = user.notes.filter((n) => n.noteid == +noteid);
    }
  });
  return new_note;
};

const findeNotesByTitle = (email, title) => {
  let new_note = null;
  userData.map((user) => {
    if (user.email == email) {
      new_note = user.notes.filter((n) => n.title == title);
    }
  });
  return new_note;
};

const findeNotesByTitleDescription = (email, title, decripition) => {
  let new_note = null;
  userData.map((user) => {
    if (user.email == email) {
      new_note = user.notes.filter(
        (n) => n.title == title && n.decripition == decripition
      );
    }
  });
  return new_note;
};

const updateTitle = (email, noteid, title) => {
  userData.map((user) => {
    if (user.email === email) {
      user.notes.map((note) => {
        if (note.noteid === noteid) {
          note.title = title;
        }
      });
    }
  });
  return userData;
};

const updateTitleDecripition = (email, noteid, title, decripition) => {
  userData.map((user) => {
    if (user.email === email) {
      user.notes.map((note) => {
        if (note.noteid === noteid) {
          note.title = title;
          note.decripition = decripition;
        }
      });
    }
  });
  return userData;
};

const delteNote = (email, noteid) => {
  let new_note = null;
  userData.map((user) => {
    if (user.email === email) {
      new_note = user.notes.filter((note) => note.noteid !== noteid);
    }
  });
  return new_note;
};

module.exports = {
  createNote,
  findNotesById,
  findeNotesByTitle,
  findeNotesByTitleDescription,
  updateTitle,
  updateTitleDecripition,
  delteNote,
};
