const { Router } = require('express');
const {
  saveDocument,
  deleteDocument,
  getDocument,
} = require('../controllers/files.controller');

const router = Router();

router.post('/document', saveDocument);
router.delete('/document/:documentName/:documentType', deleteDocument);
router.get('/document/:documentName/:documentType', getDocument);

module.exports = router;
