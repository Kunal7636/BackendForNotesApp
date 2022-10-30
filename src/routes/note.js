const express = require('express')
const router = express.Router()
const { validateNote } = require('../utils/validators')
const notes = require('../config/connection.js')
const d = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');  
const mysql = require('mysql');
/* ------------------------ TODO-4 - Create New Note ------------------------ */
router.post('/', (req, res) => {
  console.log(`[POST] http://localhost:${global.port}/note - Storing a new note`)
  
  const addnote ={
    text: req.body.text,
};   

var sql = 'INSERT INTO notes(text,dateCreated,lastModified) VALUES ("'+addnote.text+ '","'+d+'","'+d+'")';
   connection.query(sql, function (err, results) {
      if (err){ throw err;}
      console.log("row inserted");
      var sql = "select * from notes where id  = '"+results.insertId+"'";
      connection.query(sql, function (err, newNote ) {
        if (err){ 
          throw err;
        }
        res.status(201).send(newNote);
    });
  });

  /*
  	TODO-4:
  		Given node content
  		Create a new node and store the node to the database,
  		Return the newly created note object

  		Note content is stored in variable newText
  */
})

/* -------------------------------------------------------------------------- */

/* ------------------------- TODO-5 - Update A Note ------------------------- */
router.put('/', (req, res) => {
  console.log(`[PUT] http://localhost:${global.port}/note - Updating note`)

  /*
		TODO-5:
			Given note id and content
			Update the note's content with the given id in the database
			Return the updated note object

			Note id is stored in variable noteId
			Note content is stored in variable newText

			Your return object should be something similar to this:
        { id, text, dateCreated, lastModified }
	*/
	const noteId = req.body.id
	const newText = req.body.text
  var sql = "UPDATE notes SET text = '" +newText+"',"+"lastModified = '"+d+"'"+"WHERE id  = '"+noteId+"'";
  connection.query(sql, function (err,updatedNote) {
     if (err){ throw err;}
     console.log("Modified");
     var sql = "select * from notes where id  = '"+noteId+"'";
     connection.query(sql, function (err, updatedNote ) {
      if (err){ 
        throw err;
      }
      res.send({ updatedNote })
  });
 });
})
/* -------------------------------------------------------------------------- */

/* ------------------------- TODO-6 - Delete A Note ------------------------- */
router.delete('/', (req, res) => {
  console.log(`[DELETE] http://localhost:${global.port}/note - Deleting note`)

  /*
	  TODO-6:
      Given a note id
		  Delete note with the given id from the database

		  Note id is stored in variable noteId 
	*/
	const noteId = req.body.id
  var sql = "DELETE FROM notes WHERE id  = '"+noteId+"'";
  connection.query(sql, function (err,updatedNote) {
      res.send()
 });
})
/* -------------------------------------------------------------------------- */

module.exports = router
