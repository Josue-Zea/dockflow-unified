const { Router } = require('express');
const router = Router();
const {
  saveDocument,
  deleteDocument,
  getDocument,
} = require('../controllers/files.controller');


router.post('/document', saveDocument);
router.delete('/document/:documentName/:documentType', deleteDocument);
router.get('/document/:documentName/:documentType', getDocument);

module.exports = router;
