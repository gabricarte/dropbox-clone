var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs'); //a native node module, deals with system files 

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.delete('/file', (req, res) => {

  let form = new formidable.IncomingForm({
    uploadDir: './upload',
    keepExtensions: true //to help opening the file 
  });


  //separate data, fields and file 
  form.parse(req, (err, fields, files) => {

    console.log(fields)

    let path = './' + fields.path;

    //verify if the file we want to delete exists 
    if (fs.existsSync(path)) {

      fs.unlink(path, err => {

        if (err) {
          res.status(400).json({
            err
          })
        } else {
          res.json({ fields });
        }

      }); //unlink its a command to remove physical file. Parameters are path of the file, and the error 

    }



  });


});


router.post('/upload', (req, res) => {

  let form = new formidable.IncomingForm({
    uploadDir: './upload',
    keepExtensions: true //to help opening the file 
  });


  //separate data, fields and file 
  form.parse(req, (err, fields, files) => {

    res.json({ files: files }) //or 'files', identical names 

  });

});

module.exports = router;
