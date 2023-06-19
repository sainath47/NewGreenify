import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import * as XLSX from "xlsx";

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

export default function ExportFile(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  }
 const handleExport = () => {
    // Array of JavaScript objects
    const data = props.readings
    const keysToInclude = ['HOUSE_NO','BLOCK_NO','READING','READING_DATE,METER_S_NO'];

   const filteredData =data.map(obj =>
    Object.fromEntries(Object.entries(obj).filter(([key]) => keysToInclude.includes(key)))
  );
    // Create a new workbook
    const workbook = XLSX.utils.book_new();



    // Convert the data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(filteredData);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

    // Convert workbook to a binary string
    const workbookBinary = XLSX.write(workbook, { type: 'binary' });

    // Convert binary string to Blob
    const blob = new Blob([s2ab(workbookBinary)], { type: 'application/octet-stream' });

    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'output.xlsx';

    // Trigger the download
    downloadLink.click();
    setOpen(false)
  }

  return (
    <div className=" pt-4">
      <Button
        onClick={handleOpen}
        style={{ backgroundColor: "#088F8F", color: "white" }}
        
      >
        save as xlsx file
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you wanna download data in format of xlsx
          </Typography>
          <Stack direction="row" spacing={2}>
            <Typography></Typography>
            <Button variant="contained" onClick={handleExport}>Yes</Button>
            <Button variant="contained" onClick={handleClose} style={{ backgroundColor: "#FF0000" }}>
              NO
            </Button>
            {/* <Button variant="contained" disabled>
              Disabled
            </Button>
            <Button variant="contained" href="#contained-buttons">
              Link
            </Button> */}
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
