const { Router } = require('express');
const router = Router();
const {
  saveDocument,
  deleteDocument,
  getDocument,
} = require('../controllers/files.controller');
const { checkAuth } = require('../middleware/auth');

router.post('/document', checkAuth, saveDocument);
router.delete('/document', checkAuth, deleteDocument);
router.get('/document', checkAuth, getDocument);

module.exports = router;
