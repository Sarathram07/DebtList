import {
  deleteCompany,
  getCompanies,
  addCompany,
} from "../../api/user/companyApi";
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
  clearUpdateBoolean,
  clearError,
} from "../reducer/companySlice";

// --------------------------------------------------FETCH COMPANIES---------------------------------------------------
export const fetchCompanies = async (dispatch) => {
  try {
    dispatch(fetchCompaniesRequest());
    const { data } = await getCompanies();
    // console.log(data);
    dispatch(fetchCompaniesSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(fetchCompaniesFail(error.response.data.message));
  }
};

// --------------------------------------------------ADD COMPANY---------------------------------------------------

export const addNewCompany = (datatoAdd) => async (dispatch) => {
  try {
    dispatch(addCompanyRequest());
    console.log("add company", datatoAdd);
    //const { data } = await addCompany(datatoAdd);
    await addCompany(datatoAdd);
    dispatch(addCompanySuccess(datatoAdd));
  } catch (error) {
    dispatch(addCompanyFail(error.response.data.message));
  }
};

// --------------------------------------------------UPDATE COMPANY---------------------------------------------------
export const updateCompany = (data) => async (dispatch) => {
  try {
    updateCompanyRequest();
    console.log("update company", data);
    // const { data } = await updateCompany(company);
    // dispatch(updateCompanySuccess(data));
  } catch (error) {
    dispatch(updateCompanyFail(error.response.data.message));
  }
};

// --------------------------------------------------DELETE_COMPANY---------------------------------------------------

export const deleteCompanyById = (id) => async (dispatch) => {
  try {
    dispatch(deleteCompanyRequest());
    await deleteCompany(id);
    dispatch(deleteCompanySuccess(id));
  } catch (error) {
    dispatch(deleteCompanyFail(error.response.data.message));
  }
};
