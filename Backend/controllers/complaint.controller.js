import complaintModel from "../models/complaint.model.js"

async function get(req, res){
    const user = req.user;
    const userId = user._id   
    try{
        const complaints = await complaintModel.find({userId})
        console.log(complaints)
        return res.status(201)
            .json({
                data: complaints
            })
    }catch(err){
        console.error("Error during fetching complaint:", err)
        return res.status(500).json({
            message: "Error during fetching complaint:",
            error: err.message
        });
    }
}

async function register(req, res){
    const userId = req.user._id;
    const {title, description} = req.body
    try{
        const complaint = await complaintModel.create({userId, title, description})
        return res.status(201)
            .json({
                complaintId: complaint._id,
                title: complaint.title
            })
    }catch(err){
        console.error("Error during registering complaint:", err)
        return res.status(500).json({
            message: "Error during registering complaint:",
            error: err.message
        });
    }
}

async function getAll(req, res){
    try{
        const complaints = await complaintModel.find({})
        return res.status(201)
            .json({
                count: complaints.length,
                complaints: complaints
            })
    }catch(err){
        console.error("Error during fetching complaint:", err)
        return res.status(500).json({
            message: "Error during fetching complaint:",
            error: err.message
        });
    }
}

async function update(req, res){

}

export {get, register, getAll, update}