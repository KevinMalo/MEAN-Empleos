const express = require('express');
const router = express.Router();

const emploCtrl = require('../controllers/employee.controller')

router.get('/', emploCtrl.getEmployees);
router.post('/', emploCtrl.createEmployees);
router.get('/:id', emploCtrl.getEmployee);
router.put('/:id', emploCtrl.editEmployee);
router.delete('/:id', emploCtrl.deleteEmployee);

module.exports = router;