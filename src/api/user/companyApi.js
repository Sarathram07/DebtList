import axiosInstance from "./axiosInstance";
import { COMPANY_API } from "../constants/apiPaths";

export const getCompanies = () => {
  return axiosInstance.get(COMPANY_API.GET);
};

export const deleteCompany = (id) => {
  return axiosInstance.delete(`${COMPANY_API.DELETE}/${id}`);
};

export const addCompany = (data) => {
  return axiosInstance.post(COMPANY_API.CREATE, data);
};

export const updateCompany = (data) => {
  return axiosInstance.put(`${COMPANY_API.UPDATE}/${data.id}`, data);
};
