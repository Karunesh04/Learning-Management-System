import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../config/axiosInstance";


const initialState = {
    lectures: [],
}

export const getCourseLecture = createAsyncThunk("/course/lecture/get", async (cid)=>{
    try{
        const response = axiosInstance.get(`/course/${cid}`);
        toast.promise(response, {
            loading: "Fetching course lectures!",
            success: "Fetched course lectures!",
            error: "Failed to load the lectures!"
        });
        return (await response).data;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
});

export const deleteCourseLecture = createAsyncThunk("/course/lecture/delete", async (data)=>{
    try{
        const response = axiosInstance.delete(`/course?courseId=${data.courseId}&lectureId=${data.lectureId}`);
        toast.promise(response, {
            loading: "Deleting course lecture",
            success: "Deleted course lecture",
            error: "Failed to delete the lecture"
        });
        return (await response).data;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
});

export const addCourseLecture = createAsyncThunk("/course/lecture/add", async (data)=>{
    try{
        const formData = new FormData();
        formData.append("lectures", data.lectures);
        formData.append("title", data.title);
        formData.append("description", data.description);

        const response = axiosInstance.post(`/course/${data.id}`, formData);
        toast.promise(response, {
            loading: "Adding course lectures!",
            success: "Added course lectures!",
            error: "Failed to add the lectures!"
        });
        return (await response).data;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
});

const lectureSlice = createSlice({
    name: "lecture",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getCourseLecture.fulfilled, (state, action)=>{
            state.lectures = action?.payload?.lectures;
        })
        builder.addCase(addCourseLecture.fulfilled, (state, action)=>{
            state.lectures = action?.payload?.lectures;
        })
        builder.addCase(deleteCourseLecture.fulfilled, (state, action)=>{
            state.lectures = action?.payload?.course?.lectures;
        })
    }
})

export default lectureSlice.reducer;