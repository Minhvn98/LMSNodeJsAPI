const Course = require('../models/Course');
const Document = require('../models/detais_course/Document');

//[POST] /documents
const createDocument = async function (req, res, next) {
  const coursePromise = Course.findById(req.value.body.course);
  const file = req.file;

  req.value.body.filePath = file ? file.path.split('public')[1] : '#';

  const document = new Document(req.value.body);
  await document.save();

  const course = await coursePromise;
  course.documents.push(document._id);
  await course.save();

  res.status(200).json({ document });
};

//[DELETE] /documents/:id
const deleteDocument = async function (req, res, next) {
  const document = await Document.findById(req.value.id);
  document.remove();

  const course = await Course.findById(document.course);
  course.documents.pull(document._id);
  course.save();

  res.status(200).json({ success: true });
};

//[GET] /documents/:id
const getDocument = async function (req, res, next) {
  const document = await Document.findById(req.value.id);

  if (!document)
    return res.status(400).json({ message: 'Document not found!' });

  res.status(200).json({ document });
};

//[GET] /documents
const index = async function (req, res, next) {
  const documents = await Document.find({});
  res.status(200).json({ documents });
};

//[PUT] /documents/:id
const replaceDocument = async function (req, res, next) {
  const documentId = req.value.id;
  const file = req.file;

  if (file) req.value.body.filePath = file.path.split('public')[1];

  await Document.findByIdAndUpdate(documentId, req.value.body);

  res.status(200).json({ success: true });
};

//[PATCH] /documents/:id
const updateDocument = async function (req, res, next) {
  const documentId = req.value.id;
  const file = req.file;

  if (file) req.value.body.filePath = file.path.split('public')[1];

  await Document.findByIdAndUpdate(documentId, req.value.body);

  res.status(200).json({ success: true });
};

module.exports = {
  createDocument,
  deleteDocument,
  getDocument,
  index,
  replaceDocument,
  updateDocument,
};
