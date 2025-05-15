import axios from "axios";
import { errorHandler } from "./errorHandler";
import type { AppError } from "../dto/AppError";
import { useToast } from "vue-toastification";

const toast = useToast();


export const login = async (data: { name: string, phone: string }) => {
    try {
        const response = await axios.post(`http://localhost:3000/instructors/login`, data);
        if(response.status === 200){
            return await response.data;
        }
        else{
            errorHandler({message: response.data.message, status: response.status});
        }
    } catch (error: any) {
        errorHandler(error as AppError);
    }
}

export const getAllData = async (data:string) => {
    try {
        const response = await axios.get(`http://localhost:3000/${data}`);
        if(response.status === 200){
            return await response.data;
        }
        else{
           errorHandler({message: response.data.message, status: response.status});
        } 

    } catch (error: any) {
        errorHandler(error);
    }
}

export const postData = async (data: any, url: string) => {
    try {
        const response = await axios.post(`http://localhost:3000/${url}`, data);
        if(response.status === 201){
            return await response.data;
        } else {
            errorHandler({message: response.data.message, status: response.status});
            return;
        }
    } catch (error: any) {
        errorHandler(error as AppError);
    }
}