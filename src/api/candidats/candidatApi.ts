import type { Candidat } from "../../data/models/candidat.model";
import axiosInstance from "../axios_instance";


export const candidatApi = {
  getAll: async (): Promise<Candidat[]> => {
    const response = await axiosInstance.get('/tasks');
    return response.data;
  },
  create: async (formData: FormData): Promise<Candidat[]> => {
    const response = await axiosInstance.post('/tasks', formData);
    return response.data;
  },
  update: async (taskId: number, formData: FormData): Promise<Candidat[]> => {
    const response = await axiosInstance.put(`/tasks${taskId}`, formData);
    return response.data;
  },
  read: async (id: number): Promise<Candidat> => {
    const response = await axiosInstance.get(`/tasks${id}`);
    return response.data;
  },
  destroy: async (taskId: number | string): Promise<null> => {
    await axiosInstance.delete(`/tasks/${taskId}`);
    return null;
  },
}
