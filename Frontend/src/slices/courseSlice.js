import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../config/axiosInstance";

const initialState = {
  courseList: []
};

export const getAllCourses = createAsyncThunk("/course/getAllCourses", async (data) => {
  try {
    const response = axiosInstance.get("/course", data);
    toast.promise(response, {
      loading: "Wait! fetching all the courses",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to load courses!",
    });
    return (await response).data.courses;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const createNewCourse = createAsyncThunk("/course/creates", async (data, { rejectWithValue }) => {
  try {
    let formData = new FormData();
    formData.append("title", data?.title);
    formData.append("description", data?.description);
    formData.append("category", data?.category);
    formData.append("createdBy", data?.createdBy);
    formData.append("thumbnail", data?.thumbnail);

    const response = axiosInstance.post("/course", formData);
    await toast.promise(response, {
      loading: "Wait! Creating new course",
      success: (res) => {
        return res?.data?.message;
      },
      error: "Failed to create course!",
    });

    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to create course!");
    return rejectWithValue(error.response.data);
  }
});


const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
   builder.addCase(getAllCourses.fulfilled, (state, action)=>{
    if(action?.payload){
      state.courseList = [...action.payload];
    }
   })
  },
});

export default courseSlice.reducer;
