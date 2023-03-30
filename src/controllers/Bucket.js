const bucketModel = require('../src/models/Buckets')
const jwt = require('jsonwebtoken')
exports.createBucket = async(req,res) =>{
    try {
        const {title,img} = req.body
        const {token} = req.cookies
        const {_id} = jwt.verify(token,process.env.SECRET_KEY)
        const bucket = await bucketModel.create({title,img,user:_id})

        return res.status(201).json({bucket})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
exports.getAllBuckets = async(req,res) =>{
    try {
        const buckets = await bucketModel.find();
        if(!buckets || buckets.length == 0)
            return res.status(200).json({message:"No Buckets Found"})
        
        return res.status(200).json({buckets})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
exports.getBucketOfUser = async(req,res) =>{
    try {
        const {token} = req.cookies
        const {_id} = await jwt.verify(token,process.env.SECRET_KEY)
        
        const userBuckets = await bucketModel.find({user:_id})
        return res.status(200).json({userBuckets})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
exports.getBucketById = async(req,res) =>{
    try {
        const {id} = req.params
        if(!id)
            return res.status(404).json({message:"Invalid Request"})
        const bucket = await bucketModel.findById(id)
        return res.status(200).json({bucket})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}