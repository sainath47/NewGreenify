import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
const Monthly_Reading = () => {
  const [readings, setReadings] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch data from the API
      const response = await fetch("api/reading");
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
    { field: "HOUSE_NO.", headerName: "HOUSE_NO.", width: 130 },
    { field: "BLOCK_NO.", headerName: "BLOCK_NO.", width: 200 },
    {
      field: "MAY_READING",
      headerName: "MAY_READING",
      type: "number",
      width: 120,
    },
    {
      field: "JUNE_READING",
      headerName: "JUNE_READING",
      description: "This column has a value getter and is not sortable.",
      type: "number",
      width: 120,
    },
    {
      field: "DIFFERENCE",
      headerName: "DIFFERENCE",
      description: "This column has a value getter and is not sortable.",
      type: "number",
      width: 120,
    },
  ];

  const rows = readings;

  return (


      <div style={{ height: 400, width: "100%" }}>
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

export default Monthly_Reading;
