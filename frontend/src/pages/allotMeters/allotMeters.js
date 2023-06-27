import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AddMeterNos from "../../components/add_meter_numbers/add_meter_numbers";

const AllotMeters = () => {
    const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const [filters, setFilters] = useState({
  //     startDate: "",
  //     endDate: "",
  //     houseNo: "",
  //     blockNo: "",
  //     meterSNo: "",
  //   });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch data from the API
      const response = await fetch("api/user");
      const data = await response.json();
      // Set the fetched data to the component state
      // console.log(data.data);
        setUsers(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const columns = [
    // { field: '_id', headerName: 'ID', width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
  
    // {
    //   field: "createdAt",
    //   headerName: "CREATED_AT",
    //   type: "number",
    //   width: 220,
    // },
    {
      field: "Allot Meters",
      headerName: "Action",
      width: 140,
      renderCell: (params) => {
        // const handleButtonClick = (event) => {
        //   event.stopPropagation();
        //   // handle button click event
        //   console.log("Button clicked for row with ID:", params.id);
        // };
  
        return (
<AddMeterNos id={params.id}/>
        );
      },
    },
  ];

    const rows = users;

  const handleSearch = async () => {
    try {
      setLoading(true);
      // console.log(date);
    //   const { startDate, endDate, houseNo, blockNo, meterSNo } = filters;
      //   console.log( {startDate, endDate, houseNo, blockNo, meterSNo  });
      // console.log(startDate, endDate);

      function formatDate(dateString) {
        const date = new Date(dateString);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();

        return `${month}/${day}/${year}`;
      }
    //   const sD = formatDate(startDate);

    //   const eD = formatDate(endDate);

      // console.log(sD, eD, 'startDate', 'endDate'); // Output: "6/4/2023"
    //   const response =
    //     await fetch(`http://localhost:8000/api/reading?startDate=${sD}&endDate=${eD}&houseNo=${houseNo}&blockNo=${blockNo}&meterSNo=${meterSNo}
    //   `);
    //   const data = await response.json();
    //   console.log(data, "data after search");
    //   setReadings(data.data);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  //   const handleStartDateChange = (event) => {
  //     const newStartDate = event.target.value;
  //     const { endDate } = filters;
  //     // Check if newStartDate is less than endDate
  //     if (!endDate || new Date(newStartDate) < new Date(endDate)) {
  //       setFilters({ ...filters, startDate: newStartDate });
  //     }
  //   };

  //   const handleEndDateChange = (event) => {
  //     const newEndDate = event.target.value;
  //     const { startDate } = filters;
  //     // Check if newEndDate is greater than startDate
  //     if (!startDate || new Date(newEndDate) >= new Date(startDate)) {
  //       setFilters({ ...filters, endDate: newEndDate });
  //     } else alert("End-Date Should Be Greater Than Start-Date");
  //   };

  const handleClear = () => {
    // setFilters({
    //   startDate: '',
    //   endDate: '',
    //   houseNo: '',
    //   blockNo: '',
    //   meterSNo: ''
    // });
  };

  //if user have permission to add reading then only the button of add reading will be visible

  const user = JSON.parse(localStorage.getItem("user"));
  const addReadingsPermission =
    user?.permissions?.includes("AddReadings") ?? false;
  return (
    <div style={{ height: "78vh", width: "100%" }}>
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
  );
};

export default AllotMeters;
//i will be changing the names of the files accordingly after
//each user will be having update profile option(where we have option to allot them meters too) & this one will have option to update name & now assign role also
//allot meters will be different option in the sidebar(which will allot meters to the users)