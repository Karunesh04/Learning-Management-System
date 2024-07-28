import Course from '../models/course.model.js'
import AppError from "../utils/appError.js";

export const getAllCourses = async (req, res, next)=>{
    try{
        const courses = await Course.find({}).select('-lectures');
        res.status(200).json({
            success: true,
            message: 'All courses',
            courses, 
        })
    }catch(e){
        return next(new AppError(e.message, 500));
    }
}