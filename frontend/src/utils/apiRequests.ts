import axios from "axios";
import { errorHandler } from "./errorHandler";
import type { AppError } from "../dto/AppError";



export const login = async (data: { name: string, phone: string }) => {
    try {
        const response = await axios.post(`http://localhost:3000/instructors/login`, data);
        return await response.data;
    } catch (error: any) {
        errorHandler(error as AppError);
    }
}

export const getAllData = async (data:string) => {
    try {
        const response = await axios.get(`http://localhost:3000/${data}`);
        if(response.status === 200){
            return await response.data;
        } else {
            throw new Error("response.data.message");
        }
    } catch (error: any) {
        errorHandler(error as AppError);
    }
}
