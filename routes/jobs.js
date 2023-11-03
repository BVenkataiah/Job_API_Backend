const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authentication')

const {getAllJobs, getJob, createjob, updateJob, deleteJob} = require('../controllers/jobs');

router.get('/', getAllJobs)

router.get('/:id',getJob)

router.post('/', verifyToken, createjob)

router.put('/:id', verifyToken, updateJob)

router.delete('/:id', verifyToken, deleteJob)

module.exports = router;