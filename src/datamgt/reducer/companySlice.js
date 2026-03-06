import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "companies",
  initialState: {
    companies: [],
    isLoading: false,
    needToFetch: true,
  },
  reducers: {
    // --------------------------------------------------FETCH COMPANIES---------------------------------------------------
    fetchCompaniesRequest(state) {
      return { ...state, isLoading: true };
    },
    fetchCompaniesSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        companies: action.payload,
        needToFetch: false,
      };
    },
    fetchCompaniesFail(state, action) {
      return {
        ...state,
        isLoading: false,
        needToFetch: false,
        error: action.payload,
      };
    },

    // --------------------------------------------------ADD COMPANY---------------------------------------------------
    addCompanyRequest(state) {
      return { ...state, isLoading: true };
    },
    addCompanySuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        companies: [...state.companies, action.payload],
        needToFetch: false,
      };
    },
    addCompanyFail(state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        needToFetch: false,
      };
    },

    // --------------------------------------------------UPDATE COMPANY---------------------------------------------------
    updateCompanyRequest(state) {
      return { ...state, isLoading: true };
    },
    updateCompanySuccess(state, action) {
      const updatedCompanies = state.companies.map((c) =>
        c.id === action.payload.id ? action.payload : c,
      );
      return {
        ...state,
        isLoading: false,
        companies: updatedCompanies,
        needToFetch: false,
      };
    },
    updateCompanyFail(state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        needToFetch: false,
      };
    },

    // --------------------------------------------------DELETE COMPANY---------------------------------------------------
    deleteCompanyRequest(state) {
      return { ...state, isLoading: true };
    },
    deleteCompanySuccess(state, action) {
      const filteredCompanies = state.companies.filter(
        (c) => c.id !== action.payload,
      );
      return {
        ...state,
        isLoading: false,
        companies: filteredCompanies,
        needToFetch: false,
      };
    },
    deleteCompanyFail(state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        needToFetch: false,
      };
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
  clearError,
} = companySlice.actions;

export default companySlice.reducer;
