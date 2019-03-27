const EntryExit      = require('../models/task');
const express   = require('express');
const router    = express.Router();

router.post('/new', (req, res) =>{
    EntryExit.create({
        entryExit: req.body.entryExit;
    }, (err, entryExit) => {
      if(err){
        console.log(`Create Error: ${err}`);
        res.status(500).send('Error');
      } else {
        res.status(200).json(entryExit);    
      }
          
     } 
});

      
router.route('/:id')
    .delete((req, res) =? {
        EntryExit.findById(req.params.id, (err, foundEntryExit) => {
            if(err) {
                console.log(`Delete error: ${err}`);
                res.status(500).send('Error');
            } else if(foundEntryExit) {
                foundEntryExit.remove( () => {
                    res.status(200).json(foundEntryExit);
                });
            } else {
                res.status(404).send('Not Found');
            }
        })
    })
    
module.exports = router;

    
    