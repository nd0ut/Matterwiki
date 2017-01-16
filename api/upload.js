var multer  = require('multer');
var path = require('path');
var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './client/uploads/');
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname);
        }
    });
var upload = multer({ storage: storage }).single('upload');

module.exports = function(app) {

    app.post('/upload', function (req, res) {
      upload(req, res, function (err) {
          if(err) {
            res.json({
              error: {
                error: true,
                message: "There was a problem uploading file"
              },
              code: 'FILEDIDNTUPLOAD',
              data: {
              }
            });
          }
          else {
            res.json({
              error: {
                error: false,
                message: ''
              },
              code: 'FILEUPLOADED',
              data: {
                url: '/uploads/' + req.file.originalname
              }
            });
          }
      });
    });

}
