const express = require('express');
const { createBucket, getAllBuckets, getBucketOfUser, getBucketById } = require('../controllers/Bucket');

const router = express.Router();

router.post('/create',createBucket)

router.get('/',getAllBuckets)

router.get('/user',getBucketOfUser)

router.get('/user/:id',getBucketById)

module.exports = router