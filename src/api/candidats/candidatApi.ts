import type { Candidat, CandidatFormData, CandidatSubmitData } from "../../data/models/candidat.model";
import axiosInstance from "../axios_instance";

export const candidatApi = {
  getAll: async (): Promise<Candidat[]> => {
    const response = await axiosInstance.get('/candidates');
    return response.data;
  },

  create: async (data: FormData | CandidatSubmitData): Promise<Candidat[]> => {
    if (data instanceof FormData) {
      const response = await axiosInstance.post('/candidates', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } else {
      const response = await axiosInstance.post('/candidates', data);
      return response.data;
    }
  },

  update: async (taskId: number, data: FormData | CandidatSubmitData): Promise<Candidat[]> => {
    if (data instanceof FormData) {
      const response = await axiosInstance.post(`/candidates/${taskId}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } else {
      const response = await axiosInstance.put(`/candidates/${taskId}`, data);
      return response.data;
    }
  },

  read: async (id: number): Promise<Candidat> => {
    const response = await axiosInstance.get(`/candidates/${id}`);
    return response.data;
  },

  destroy: async (taskId: number | string): Promise<null> => {
    await axiosInstance.delete(`/candidates/${taskId}`);
    return null;
  },
}