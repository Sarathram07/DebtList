import {
  deleteCompany,
  getCompanies,
  addCompany,
  updateCompany,
} from "../../api/user/companyApi";
import { showSuccessToast } from "../../utils/toastUtils";
import {
  fetchCompaniesRequest,
  fetchCompaniesSuccess,
  fetchCompaniesFail,
  addCompanyRequest,
  addCompanySuccess,
  addCompanyFail,
  updateCompanyRequest,
  updateCompanySuccess,
  updateCompanyFail,
  deleteCompanyRequest,
  deleteCompanySuccess,
  deleteCompanyFail,
} from "../reducer/companySlice";

// --------------------------------------------------FETCH COMPANIES---------------------------------------------------
export const fetchCompanies = async (dispatch) => {
  try {
    dispatch(fetchCompaniesRequest());
    const { data } = await getCompanies();
    dispatch(fetchCompaniesSuccess(data));
  } catch (error) {
    console.log("Error while fetching", error.message);

    dispatch(fetchCompaniesFail(error?.message));
  }
};

// --------------------------------------------------ADD COMPANY---------------------------------------------------

export const addNewCompany = (datatoAdd) => async (dispatch) => {
  try {
    dispatch(addCompanyRequest());
    // console.log("add company", datatoAdd);
    await addCompany(datatoAdd);
    dispatch(addCompanySuccess(datatoAdd));
    showSuccessToast("Data added successfully");
  } catch (error) {
    dispatch(addCompanyFail(error?.message));
  }
};

// --------------------------------------------------UPDATE COMPANY---------------------------------------------------
export const updateCompanyById = (data) => async (dispatch) => {
  try {
    dispatch(updateCompanyRequest());
    //console.log("update company", data);
    await updateCompany(data);
    dispatch(updateCompanySuccess(data));
    showSuccessToast("Data updated successfully");
  } catch (error) {
    console.log(error);
    dispatch(updateCompanyFail(error?.message));
  }
};

// --------------------------------------------------DELETE_COMPANY---------------------------------------------------

export const deleteCompanyById = (id) => async (dispatch) => {
  try {
    dispatch(deleteCompanyRequest());
    await deleteCompany(id);
    dispatch(deleteCompanySuccess(id));
    showSuccessToast("Data deleted successfully");
  } catch (error) {
    dispatch(deleteCompanyFail(error?.message));
  }
};
