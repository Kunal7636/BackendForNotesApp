const express = require('express')
const router = express.Router()
const { validateNoteArray } = require('../utils/validators')
const mysql = require('mysql');
/* ------------------------ TODO-3 - Fetch All Notes ------------------------ */

router.get('/', (req, res) => {
  console.log(`[GET] http://localhost:${global.port}/notes - Fetching all notes`)
  var sql = 'SELECT * FROM notes';
         connection.query(sql, function (err, notes) {
            if (err){ throw err;}
            console.log("Fetched All Data");
            if (!validateNoteArray(notes)) {
              res.status(500).send('Invalid data type')
            }
            res.send({notes});
        });
  /* 
    TODO-3:
      Fetch all notes from the database
      Return an array of note objects

      Your return object should be something similar to this:
        [{ id, text, dateCreated, lastModified }]
  */
})
/* -------------------------------------------------------------------------- */

/* ------------------------- TODO-7 - Search Notes -------------------------- */
router.get('/search/:searchKey', (req, res) => {
  console.log(`[GET] http://localhost:${global.port}/notes/search - Searching notes`)

  /*
    TODO-7:
      Given a search key
      Fetch all notes from the database that contains the search key in the note content
      Return an array of matching note objects

      Search key is sotred in variable searchKey

      Your notes object should be something similar to this:
        [{ id, text, dateCreated, lastModified }]
  */
  const searchKey = req.params.searchKey
  var sql = "SELECT * FROM notes WHERE text like"+"\'"+"%"+searchKey+"%"+"\'";
         connection.query(sql, function (err, notes) {
            if (err){ throw err;}
            console.log("searched data");
            if (!validateNoteArray(notes)) {
              res.status(500).send('Invalid data type')
            }
            res.send({notes});
        });
  console.log(searchKey)
})
/* -------------------------------------------------------------------------- */

/* ----------------------- TODO-8 - Delete All Notes ------------------------ */
router.delete('/', (req, res) => {
  console.log(`[DELETE] http://localhost:${global.port}/notes - Deleting all notes`)

  /*
    TODO-8:
      Delete all notes from the database
  */
      var sql = "DELETE FROM notes";
             connection.query(sql, function (err, notes) {
                if (err){ throw err;}
                console.log("deleted data");
                res.send();
            });
})
/* -------------------------------------------------------------------------- */

module.exports = router