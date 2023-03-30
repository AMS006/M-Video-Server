const cardModel = require('../models/Cards')
exports.createCard = async(req,res) =>{
    try {
        const {code,title,bucket} = req.body
        const card = await cardModel.create({code,title,bucket})

        return res.status(201).json({card});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
exports.getAllCards = async(req,res) =>{
    try {
        const {id} = req.params
        const cards = await cardModel.find({bucket:id})

        return res.status(200).json({cards});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
exports.updateCard = async(req,res) =>{
    try {
        const {id} = req.params
        const {code,title,bucket1} = req.body

        
        const card = await cardModel.findByIdAndUpdate(id,{$set:{code,title,bucket:bucket1}},{new:true})

        return res.status(200).json({card})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
exports.deleteCard = async(req,res) =>{
    try {
        const {id} = req.params
        const card = await cardModel.findByIdAndDelete(id);

        return res.status(200).json({message:"Deleted"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}