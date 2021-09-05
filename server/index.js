const express = require("express");
const mongoose = require("mongoose");
const FriendModel = require("./models/Friends");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); // always needed when connect frontend to backend

mongoose.connect(
  "mongodb://localhost:27017/tutorialmern?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
  { useNewUrlParser: true }
);

app.post("/addfriend", async (req, res) => {
  let name = req.body.name;
  let age = req.body.age;

  let friend = new FriendModel({ name: name, age: age });
  await friend.save();
 
});

app.put("/update", async (req, res) => {
  let newAge = req.body.age;
  let id = req.body.id;
  try {
    await FriendModel.findById( id, (error, friendToUpdate) => {
      friendToUpdate.age = Number(newAge);
      friendToUpdate.save();
    });
  } catch (err) {
    console.log(err);
  }

});

app.get("/read", (req, res) => {
  FriendModel.find({}, (err, details) => {
    if (err) {
      res.send(err);
    } else {
      res.send(details);
    }
  });
});

app.delete('/delete/:id', async (req,res) => {
  const id = req.params.id; 
  await FriendModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});

app.listen(3001, () => {
  console.log("Server running at port 3001");
});
