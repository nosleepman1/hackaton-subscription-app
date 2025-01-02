import API from "@/api/api";
import type { ThemeRequest, ThemeResponse } from "@/types/theme";
import axios from "axios";

export const GET_THEMES = async (): Promise<{ data: ThemeResponse[] } & any> => {
    const response = await API.get(`/themes`);
    return response.data;
};

export const CREATE_THEME = async (data: ThemeRequest): Promise<ThemeResponse & any> => {
    const response = await API.post(`/themes`, data);
    return response.data;
};

export const UPDATE_THEME = async (id: number, data: ThemeRequest): Promise<ThemeResponse & any> => {
    const response = await API.put(`/themes/${id}`, data);
    return response.data;
};

export const DELETE_THEME = async (id: number): Promise<any> => {
    const response = await API.delete(`/themes/${id}`);
    return response.data;
};
