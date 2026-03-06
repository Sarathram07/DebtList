import React, { useEffect, useState, useRef } from "react";
import { Paper, Button, TextField, Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import {
  addNewCompany,
  deleteCompanyById,
  fetchCompanies,
  updateCompanyById,
} from "../datamgt/actions/companyAction";
import { showErrorToast } from "../utils/toastUtils";
import { clearError } from "../datamgt/reducer/companySlice";

const DebtTable = () => {
  const dispatch = useDispatch();
  const {
    companies: companyList,
    error,
    needToFetch,
  } = useSelector((state) => state.companyState);

  const schema = yup.object({
    name: yup.string().required("Company name required"),
    email: yup.string().email("Invalid email").required("Email required"),
    debt: yup.number().required("Debt required").positive(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (error) {
      showErrorToast(error, {
        onOpen: () => {
          dispatch(clearError());
        },
      });
    }
    if (needToFetch) {
      dispatch(fetchCompanies);
    }
  }, [dispatch, error, needToFetch]);

  const addIdtoData = (data) => {
    const totalCompanies = companyList.length;
    return { ...data, id: `${totalCompanies + 1}` };
  };

  const onSubmit = (data) => {
    if (editing) {
      dispatch(updateCompanyById(data));
      setEditing(false);
    } else {
      const updatedData = addIdtoData(data);
      dispatch(addNewCompany(updatedData));
      // Swal.fire("Added!", "Company added successfully", "success");
    }
    reset({
      name: "",
      email: "",
      debt: "",
    });
  };

  const handleEdit = (company) => {
    Object.entries(company).forEach(([key, value]) => {
      setValue(key, value);
    });
    setEditing(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete company?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCompanyById(id));
        Swal.fire("Deleted!", "Company deleted successfully", "success");
      }
    });
  };

  // DataGrid columns
  const columns = [
    {
      field: "id",
      headerName: "No.",
      flex: 1,
      renderCell: (params) => `${params.value}`,
    },
    {
      field: "name",
      headerName: "Company",
      flex: 1,
      renderCell: (params) => `${params.value}`,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      renderCell: (params) => `${params.value}`,
    },
    {
      field: "debt",
      headerName: "Debt",
      flex: 1,
      renderCell: (params) => `₹ ${params.value}`,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </Button>

          <Button
            color="error"
            size="small"
            gap={1}
            onClick={() => handleDelete(params.row.id)}
          >
            Del
          </Button>
        </>
      ),
    },
  ];

  // DataGrid rows
  //console.log("In Grid Table ", companyList);
  const rows = companyList.map((c) => ({
    id: c.id, // must be unique
    name: c.name,
    email: c.email,
    debt: c.debt,
  }));

  //console.log("Component- re-rendered");

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h5" mb={2}>
        Company Debt Management
      </Typography>

      {/* FORM */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }} id="debt-form">
        <TextField
          label="Company Name"
          {...register("name")}
          type="text"
          slotProps={{
            inputLabel: { shrink: true },
          }}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          label="Email"
          {...register("email")}
          type="email"
          slotProps={{
            inputLabel: { shrink: true },
          }}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Debt"
          type="number"
          {...register("debt")}
          slotProps={{
            inputLabel: { shrink: true },
          }}
          error={!!errors.debt}
          helperText={errors.debt?.message}
        />

        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          {editing ? "Update" : "Add"}
        </Button>
      </Box>

      {/* DATAGRID TABLE */}
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          showToolbar
          pageSizeOptions={[5, 10, 15, 20]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          disableRowSelectionOnClick
        />
      </div>
    </Paper>
  );
};

export default DebtTable;
