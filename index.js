const express = require("express");
const userData = require("./db/UserDb");
const app = express();
app.use(express.json());
const {
  createNote,
  findNotesById,
  findeNotesByTitle,
  findeNotesByTitleDescription,
  updateTitle,
  updateTitleDecripition,
  delteNote,
} = require("./controllers/NotesController");
const {
  deleteUser,
  findUserById,
  updateName,
  updatePassword,
} = require("./controllers/UserController");

const addDummyUser = (req, res, next) => {
  (req.body.name = "admin"),
    (req.body.password = "admin"),
    (req.body.email = "admin@admin.com");
  next();
};

//user update password
app.put("/api/v1/update-password", (req, res) => {
  const { email, password, newPassword } = req.body;
  updatePassword(email, password, newPassword);
  res.json({ message: "Password Change", data: { userData } });
});

//update user name
app.put("/api/v1/update-username", (req, res) => {
  const { email, password, newName } = req.body;
  updateName(email, password, newName);
  res.json({ message: "username Changed", data: { userData } });
});

//get user by id
app.get("/api/v1/user", (req, res) => {
  const { userid } = req.query;
  const user = findUserById(userid);

  res.json({ message: "Found", data: { user } });
});

// delete user
app.delete("/api/v1/delete-user", (req, res) => {
  const { userid } = req.query;
  const new_user = deleteUser(userid);
  res.json({ message: "User Delete", data: { new_user } });
});

//createing notes
app.post("/api/v1/create-notes", addDummyUser, (req, res) => {
  const { name, password, email, note } = req.body;
  const { title, decripition } = note;
  let new_note = createNote({ title, decripition });

  res.json({ message: "Notes save", data: { new_note } });
});

//getting notes by id
app.get("/api/v1/note", addDummyUser, (req, res) => {
  const { name, password, email, note } = req.body;
  const { noteid } = req.query;

  const new_note = findNotesById(noteid, email);

  res.json({ message: "Found", data: { new_note } });
});

//get notes by title
app.get("/api/v1/note-title", addDummyUser, (req, res) => {
  const { email } = req.body;
  const { title } = req.query;
  const new_note = findeNotesByTitle(email, title);

  res.json({ message: "Found", data: { new_note } });
});

//get notes by title and description
app.get("/api/v1/note-title-description", addDummyUser, (req, res) => {
  const { email } = req.body;
  const { title, decripition } = req.query;
  const new_note = findeNotesByTitleDescription(email, title, decripition);

  res.json({ message: "Found", data: { new_note } });
});

//upadte note title
app.put("/api/v1/update-title", addDummyUser, (req, res) => {
  const { email, noteid, title } = req.body;
  const new_data = updateTitle(email, noteid, title);
  res.json({ message: "Title Updated", data: { new_data } });
});

//update title and discription
app.put("/api/v1/update-note", addDummyUser, (req, res) => {
  const { email, noteid, title, decripition } = req.body;
  const new_data = updateTitleDecripition(email, noteid, title, decripition);
  res.json({ message: "updated", data: { new_data } });
});

//delete note
app.delete("/api/v1/delete-note", addDummyUser, (req, res) => {
  const { email, noteid } = req.body;
  const new_note = delteNote(email, noteid);
  res.json({ message: "Deleted", data: { new_note } });
});

app.listen(3000, () => {
  console.log("listening on 3000");
});
