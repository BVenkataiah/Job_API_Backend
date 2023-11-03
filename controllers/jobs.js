const Job = require('../models/Job')


const getAllJobs = async(req,res)=>{
    try {
        const jobs = await Job.find({}).populate("userId", '-password')
        return res.status(200).json(jobs)
    } catch (error) {
        return res.status(500).json(error)
    }
    
}

const getJob = async(req,res)=>{
    try {
        const job = await Job.findById(req.params.id).populate("userId", '-password')
        return res.status(200).json(job)
    } catch (error) {
        return res.status(500).json(error)
    }
}
const createjob = async(req,res)=>{
    try {
        const job = await Job.create({ ...req.body, userId: req.user.id })
        return res.status(201).json(job)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const updateJob = async(req,res)=>{
    try {
        const job = await Job.findById(req.params.id)
        if (job.userId.toString() !== req.user.id.toString()) {
            throw new Error("You can update only your own posts")
        }

        const updatedJob = await Job
            .findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .populate('userId', '-password')

        return res.status(200).json(updatedJob)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}
const deleteJob = async(req,res)=>{
    try {
        const job = await Job.findById(req.params.id)
        if(job.userId.toString() !== req.user.id.toString()){
            throw new Error("You can delete only your own posts")
        }
        
        await Job.findByIdAndDelete(req.params.id)

        return res.status(200).json({msg: "Successfully deleted the blog"})
    } catch (error) {
        return res.status(500).json(error)
    }
}



module.exports ={
    getAllJobs,
    getJob,
    createjob,
    updateJob,
    deleteJob

}