import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import RoughModel from "../../components/rough_modal/rough_modal";

const Page = () => {
  const [row, setRow] = useState(null);
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(false);
const fetchData = async()=>{
  try{
    const url = `http://localhost:8000/api/readings`;

    const response = await fetch(url);

    const data = await response.json();
    // Set the fetched data to the component state
    console.log(data);
    setReadings(data.data);
  }
  catch (error) {
    setLoading(false);
    console.error("Error fetching data:", error);
  }
}

useEffect(() => {
  fetchData();
}, []);

  const columns = [
    { field: "Sr_No", headerName: "Sr.No.", width: 70 },
    { field: "Tower_no", headerName: "Tower_no.", width: 90 },
    { field: "Floor", headerName: "Floor", width: 120 },
    {
      field: "Flat_no",
      headerName: "Flat_no.",
      width: 130,
      renderCell: (params) => (
        <button
          onClick={() => handleOpen(params.row)}
          style={{
            textDecoration: "underline",
            color: "blue",
            cursor: "pointer",
            border: "none",
            background: "none",
            padding: "0",
            font: "inherit",
            outline: "inherit",
          }}
        >
          {params.value}
        </button>
      ),
      
    },
    {
      field: "Meter_Serial_No_Kitchen_Unit",
      headerName: "Meter_Serial_No._Kitchen Unit",
      width: 300,
    },
    {
      field: "Usage1",
      headerName: "Usage",
      width: 300,
    },
    {
      field: "Meter_Serial_no_Toilet_Unit",
      headerName: "Meter_Serial_No.Toilet_Unit",
      width: 200,
    },

    {
      field: "Usage2",
      headerName: "Usage",
      width: 200,
    },
    {
      field: "TotalUsage",
      headerName: "Total Usage",
      width: 150,
      valueGetter: (params) => params.row.Usage1 + params.row.Usage2,
    },
  ];

  const rows = readings
  
  // [
  //   {
  //     _id: "1",
  //     "Sr.No.": 1,
  //     "Tower_no.": 2,
  //     "Floor.": "Ground Floor",
  //     "Flat_no.": "001",
  //     "Meter_Serial_No._Kitchen Unit": "A-2360r9728qfewhqwlajk",
  //     "Meter_Serial_No.Toilet_Unit": "A-2134y8921047",
  //   },
  // ];
  const [open, setOpen] = React.useState(false);


  const handleOpen = (row) => {
    // event.stopPropagation();
    setRow(row);
    // Open your modal or perform any other action here
    setOpen(true);
  };

    
    
      const handleClose = () => {
        setOpen(false);
      };

  return (
    <div className="">
      <p className="font-normal">
        <strong>SITE:</strong> NBCC Sarojini Nagar
      </p>
      <div className="flex w-1/2 pt-3">
        <p className="font-normal">
          <strong>No. Of Houses:</strong> 200
        </p>
        <p className="font-normal ml-auto">
          <strong>Total No. Of Meters:</strong> 400
        </p>
      </div>

      <div className="pt-3 h-[90vh] w-[155vh]">
        <DataGrid
          getRowId={(row) => row["_id"]}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
      <RoughModel handleOpen={handleOpen} handleClose={handleClose} open={open} row={row} />
    </div>
  );
};

export default Page;
