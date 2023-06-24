import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import AddFile from "../add_file/add_file";
import ExportFile from "../../export_file";
import Button from "@mui/material/Button";
// import { Link } from "react-router-dom";

const Reading = () => {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    houseNo: "",
    blockNo: "",
    meterSNo: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch data from the API
      const user = JSON.parse(localStorage.getItem("user"));
const permissions = user?.permissions;
const email = user?.email;
let ReadAllReadings = false 
if(permissions.includes('ReadAllReadings')) ReadAllReadings = true
const url = `http://localhost:8000/api/reading?ReadAllReadings=${ReadAllReadings}&email=${email}`;

const response = await fetch(url);

      const data = await response.json();
      // Set the fetched data to the component state
      // console.log(data);
      setReadings(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
      field: "METER_S_NO",
      headerName: "METER_S_NO",
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

  const handleSearch = async () => {
    try {
      setLoading(true);
      // console.log(date);
      const { startDate, endDate, houseNo, blockNo, meterSNo } = filters;
      //   console.log( {startDate, endDate, houseNo, blockNo, meterSNo  });
      // console.log(startDate, endDate);

      function formatDate(dateString) {
        const date = new Date(dateString);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();

        return `${month}/${day}/${year}`;
      }
      const sD = formatDate(startDate);

      const eD = formatDate(endDate);

      

      // console.log(sD, eD, 'startDate', 'endDate'); // Output: "6/4/2023"
      const response =
        await fetch(`http://localhost:8000/api/reading?startDate=${sD}&endDate=${eD}&houseNo=${houseNo}&blockNo=${blockNo}&meterSNo=${meterSNo}
      `);
      const data = await response.json();
      console.log(data, "data after search");
      setReadings(data.data);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartDateChange = (event) => {
    const newStartDate = event.target.value;
    const { endDate } = filters;
    // Check if newStartDate is less than endDate
    if (!endDate || new Date(newStartDate) < new Date(endDate)) {
      setFilters({ ...filters, startDate: newStartDate });
    }
  };

  const handleEndDateChange = (event) => {
    const newEndDate = event.target.value;
    const { startDate } = filters;
    // Check if newEndDate is greater than startDate
    if (!startDate || new Date(newEndDate) >= new Date(startDate)) {
      setFilters({ ...filters, endDate: newEndDate });
    } else alert("End-Date Should Be Greater Than Start-Date");
  };

  const handleClear = () => {
    setFilters({
      startDate: "",
      endDate: "",
      houseNo: "",
      blockNo: "",
      meterSNo: "",
    });
  };

  //if user have permission to add reading then only the button of add reading will be visible

  const user = JSON.parse(localStorage.getItem("user"));
  const addReadingsPermission =
    user?.permissions?.includes("AddReadings") ?? false;
  return (
    <div style={{ height: "78vh", width: "100%" }}>
      <div className="flex-wrap">
        <div className="flex">
          <div>
            <label>Start Date:</label>
            <input
              className=" border-2 rounded-md border-black"
              type="date"
              value={filters.startDate}
              onChange={handleStartDateChange}
            />
          </div>

          <div className="ml-7">
            <label>End Date:</label>
            <input
              className=" border-2 rounded-md border-black"
              type="date"
              value={filters.endDate}
              onChange={handleEndDateChange}
            />
          </div>
          <div className="ml-7">
            <label>HouseNo.:</label>
            <input
              className=" border-2 rounded-md border-black"
              type="text"
              value={filters.houseNo}
              onChange={(e) =>
                setFilters({ ...filters, houseNo: e.target.value })
              }
            />
          </div>
          <div className="ml-7">
            <label>BlockNo.:</label>
            <input
              className=" border-2 rounded-md border-black"
              type="text"
              value={filters.blockNo}
              onChange={(e) =>
                setFilters({ ...filters, blockNo: e.target.value })
              }
            />
          </div>
          <div className="ml-7">
            <label>Meter S_No:</label>
            <input
              className=" border-2 rounded-md border-black"
              type="number"
              value={filters.meterSNo}
              onChange={(e) =>
                setFilters({ ...filters, meterSNo: e.target.value })
              }
            />
          </div>
        </div>
      </div>
      <div className="flex pt-4 ml-auto">
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
        <div className="pl-4">
          <Button variant="contained" color="error" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </div>
      <div className="flex">
        <ExportFile readings={readings} />
        {addReadingsPermission && (
          <AddFile readings={readings} setReadings={setReadings} />
        )}
      </div>

      {readings && !loading && (
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
      )}
      {!readings && (
        <div className="flex align-middle justify-center">
          No Data Corresponding
        </div>
      )}
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default Reading;

