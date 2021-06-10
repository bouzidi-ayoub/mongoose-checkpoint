const mongoose = require("mongoose");
require("dotenv").config();
// connecting
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connexion open");
  })
  .catch((err) => {
    console.log("error");
    console.log(err);
  });
//create Schema
const personeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: Number,
  favoriteFood: [
    {
      type: String,
    },
  ],
});
// create model
let person = mongoose.model("Person", personeSchema);
let personeOne = new person({
  name: "Neo",
  age: 44,
  favoriteFood: ["Pizza", "Lablabi"],
});
//saving
personeOne
  .save()
  .then((data) => {
    console.log("Saved");
    console.log(data);
  })
  .catch((err) => {
    console.log("error");
    console.log(err);
  });

// new users
person.create([
  { name: "John", age: 33, favoriteFood: ["Protien shakes", "Pasta"] },
  { name: "Mark", age: 24, favoriteFood: ["apple", "PenutButter"] },
  { name: "Lola", age: 14, favoriteFood: ["Cat food", "Tunna"] },
]);

// finding by name
person.find({ name: "lola" }, function (err, data) {
  if (err) console.log("error");
  else console.log(data);
});

// find by fav food

person.findOne({ favoriteFood: ["Lablabi"] }, function (err, data) {
  if (err) console.log("error");
  else console.log(data);
});

// finding by id
person.findById("6093c73b0c14d8209f42f1aa", (err, person) => {
  if (err) return err;
  return person;
});

// classic update
person.findById("6093c73b0c14d8209f42f1aa", (err, data) => {
  if (err) {
    console.log(err);
  }
  data.favoriteFood.push("Lasagne");
  data.save((err, data) => {
    if (err) {
      console.log(err);
    }

    console.log(data);
  });
});

// new update
const update = (personName) => {
  person.findOneAndUpdate(
    { name: personeName },
    { age: 20 },
    { new: true },
    function (err, data) {
      if (err) console.log("error");
      else console.log(data);
    }
  );
};
// delete by id
const remove = (personId) => {
  person.findOneAndRemove(personId, function (err, data) {
    if (err) console.log("err");
    else console.log(data);
  });
};

// delete many
person.remove({ name: "Lola" }, function (err, data) {
  if (err) console.log("err");
  else console.log(data);
});

// Chain search Queryy
person
  .find({ favotiteFood: { $all: ["lablabi"] } })
  .sort({ age: "asc" })
  .limit(4)
  .select({ name: true })
  .exec((eror, data) => {
    if (!error) {
      console.log(data);
    }
  });
