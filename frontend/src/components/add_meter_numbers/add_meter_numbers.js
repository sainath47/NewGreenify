import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./add_meter_numbers.css";
import { useState } from "react";
import Reading from "../current_reading/current_reading";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddMeterNos(props) {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleOpen = (event) => {
    event.stopPropagation();
        setSelectedFile(null);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedFile) {
      const fileName = selectedFile.name;
      const fileExtension = fileName.split(".").pop();

      if (fileExtension !== "xlsx") {
        // Invalid file type, show an error message or perform appropriate actions
        alert("Please select a valid XLSX file.");
        return;
      }
      const formData = new FormData();
      formData.append("meterNumbers", true);
      formData.append("file", selectedFile);
      

      try {
        const response = await fetch(`api/user/${props.id}`, {
          method: "PUT",
          body: formData,
        });

        if (response.ok) {
          let data = await response.json();
          // console.log();

          console.log("File uploaded successfully!");
          setOpen(false);
          alert("File uploaded successfully!");
          // Handle response from the backend
          // window.location.reload();
        } else {
          alert(
            "Error uploading file, Please Check The Format Of File You Are Uploading, It Should Be As Per The Format Instructed"
          );
          throw new Error("Error uploading file");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      alert("NO FILE CHOSEN");
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // const handleDragEnter = (event) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   // Add styles to indicate drag enter
  // };

  // const handleDragLeave = (event) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   // Remove styles for drag leave
  // };

  // const handleDragOver = (event) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   // Add styles to indicate drag over
  // };

  // const handleDrop = (event) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   // Remove styles for drag over
  //   const files = event.dataTransfer.files;
  //   // Process the dropped files
  // };

  return (
    <div className="py-4 ml-auto">
      <Button
        style={{ backgroundColor: "#088F8F", color: "white" }}
        onClick={handleOpen}
      >
        Allot Meters
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            className="file"
            // onDragEnter={handleDragEnter}
            // onDragLeave={handleDragLeave}
            // onDragOver={handleDragOver}
            // onDrop={handleDrop}
          >
            <h3 style={{ paddingBottom: 20 }}>Choose A XLSX File</h3>
            <div className="file-input">
              {/* 
              DRAG & DROP FUNCTIIONALITY TO BE IMPLEMENTED
              <CloudUploadIcon style={{ fontSize: 65 }} />
              <p>Drag And Drop</p>
              or */}
              <input type="file" onChange={handleFileChange} />
            </div>
            <button onClick={handleSubmit}>Save</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

//meters will be alloted & alloted meters should also be shown, in the model of edit user 
