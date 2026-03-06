import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "companies",
  initialState: {
    companies: [],
    isLoading: false,
    isUpdated: false,
    error: null,
  },
  reducers: {
    // --------------------------------------------------FETCH COMPANIES---------------------------------------------------
    fetchCompaniesRequest(state) {
      return { ...state, isLoading: true, error: null };
    },
    fetchCompaniesSuccess(state, action) {
      return { ...state, isLoading: false, companies: action.payload };
    },
    fetchCompaniesFail(state, action) {
      return { ...state, isLoading: false, error: action.payload };
    },

    // --------------------------------------------------ADD COMPANY---------------------------------------------------
    addCompanyRequest(state) {
      return { ...state, isLoading: true, isUpdated: false, error: null };
    },
    addCompanySuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        companies: [...state.companies, action.payload],
        isUpdated: true,
      };
    },
    addCompanyFail(state, action) {
      return { ...state, isLoading: false, error: action.payload };
    },

    // --------------------------------------------------UPDATE COMPANY---------------------------------------------------
    updateCompanyRequest(state) {
      return { ...state, isLoading: true, isUpdated: false, error: null };
    },
    updateCompanySuccess(state, action) {
      const updatedCompanies = state.companies.map((c) =>
        c.id === action.payload.id ? action.payload : c,
      );
      return {
        ...state,
        isLoading: false,
        companies: updatedCompanies,
        isUpdated: true,
      };
    },
    updateCompanyFail(state, action) {
      return { ...state, isLoading: false, error: action.payload };
    },

    // --------------------------------------------------DELETE COMPANY---------------------------------------------------
    deleteCompanyRequest(state) {
      return { ...state, isLoading: true, isUpdated: false, error: null };
    },
    deleteCompanySuccess(state, action) {
      const filteredCompanies = state.companies.filter(
        (c) => c.id !== action.payload,
      );
      console.log("Filtered Companies:", filteredCompanies);
      return {
        ...state,
        isLoading: false,
        companies: filteredCompanies,
        isUpdated: true,
      };
    },
    deleteCompanyFail(state, action) {
      return { ...state, isLoading: false, error: action.payload };
    },

    // --------------------------------------------------CLEAR UPDATE FLAG---------------------------------------------------
    clearUpdateBoolean(state) {
      return { ...state, isUpdated: false };
    },

    // --------------------------------------------------CLEAR ERROR---------------------------------------------------
    clearError(state) {
      return { ...state, error: null };
    },
  },
});

// Export actions
export const {
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
} = companySlice.actions;

export default companySlice.reducer;
