import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import Add_File from "../add_file/add_file";
const Reading = () => {
  const [readings, setReadings] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch data from the API

      const response = await fetch("http://localhost:8000/api/reading");
      const data = await response.json();

      // Set the fetched data to the component state
      // console.log(data);
      setReadings(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const columns = [
    // { field: '_id', headerName: 'ID', width: 70 },
    { field: "HOUSE_NO", headerName: "HOUSE_NO.", width: 130 },
    { field: "BLOCK_NO", headerName: "BLOCK_NO.", width: 200 },
    {
      field: "READING",
      headerName: "READING",
      type: "number",
      width: 120,
    },

    {
      field: "READING_DATE",
      headerName: "READING_DATE",
      type: "number",
      width: 220,
    },

    {
      field: "createdAt",
      headerName: "CREATED_AT",
      type: "number",
      width: 220,
    },
  ];

  const rows = readings;

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Add_File/>
      <DataGrid
        getRowId={(row) => row._id}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default Reading;
