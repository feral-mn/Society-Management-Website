import announcmentModel from "../models/announcment.model.js";

async function get(req, res){
    try{
        const announcment = await announcmentModel.find({})
        return res.status(201)
            .json({
                count: announcment.length,
                announcment: announcment
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
        const announcment = await announcmentModel.create({userId, title, description})
        return res.status(201)
            .json({
                announcmentId: announcment._id,
                title: announcment.title
            })
    }catch(err){
        console.error("Error during registering complaint:", err)
        return res.status(500).json({
            message: "Error during registering complaint:",
            error: err.message
        });
    }
}

async function update(req, res){

}

export {get, register, update}