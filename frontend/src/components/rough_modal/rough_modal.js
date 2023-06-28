import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";

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

export default function RoughModel(props) {
  return (
    <div className="pt-4">
      <Button
        onClick={props.handleOpen}
        style={{ backgroundColor: "#088F8F", color: "white" }}
      >
        Edit
      </Button>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography sx={{ mt: 2 }}>
    <strong>Allote Name:</strong> {"Jhon Doe"}
  </Typography>
  <Typography sx={{ mt: 2 }}>
    <strong>House No:</strong> {props.row?.Flat_no}
  </Typography>
  <Typography sx={{ mt: 2 }}>
    <strong>AlloteId:</strong> {props.row?._id}
  </Typography>
  <Typography variant="h2" sx={{ mt: 2, fontWeight: "bold" }}>
    Total Usage: {props.row?.Usage1 + props.row?.Usage2}
  </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Button onClick={props.handleClose}>Close</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
