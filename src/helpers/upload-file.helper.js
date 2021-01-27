const multer = require('multer');
const path = require('path');

const pathStorage = path.join(__dirname, '..', 'public', 'upload')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, pathStorage);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

var upload = multer({ storage: storage });
module.exports = upload;
