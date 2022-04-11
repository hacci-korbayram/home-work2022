const express = require("express");
const cors = require("cors");
const router = require("./router.const");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

const PORT = process.env.PORT || 300;
const HOST = process.env.HOST || "0.0.0.0";

app.use("/api", router);
// app.use("/subapi", (req, res, next) => {
//     const numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//     const filteredArray = numberArray.filter((number) => {
//       if (number === 15) {
//         return true;
//       } else {
//         return false;
//       }
//     });
//     const result = {
//       filteredArray,
//       message: "This is your filtered array.",
//     };
//     res.status(200).json(result);
//   });

// app.get("/api", (req, res, next) => {
//   // 1. Read text from the database
//   const dbDataText = textService.readDataFromDb("store.json");
//   // 2. Convert text to JS object/array
//   let store = JSON.parse(dbDataText);
// //http://localhost:5000/animals?pageSize=5
//  req = {
//   method: "GET",
//   body: {},
//   query: {
//     pageSize: 5
//   }
// }

// if (req.query.pageSize) {
//   store = store.slice(0, parseInt(req.query.pageSize));
// }

// // We can send a query paramter from the front end
// // to define whether we want to receive the data sorted
// if (req.query.sortBy) {
//   store.sort((first, second) =>
//     first[req.query.sortBy].localeCompare(second[req.query.sortBy])
//   );
// }
// res.send(store);
// // res.status(200).json(item);
// });

app.listen(PORT, HOST, () => {
    console.log("Server is listening at http://localhost:300/");
  });