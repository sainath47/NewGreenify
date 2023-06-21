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

export default function UserEditModal(props) {
  const [open, setOpen] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const handleOpen = (event) => {
event.stopPropagation()
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // Perform actions with the edited data
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);

    // Close the modal
    handleClose();
  };

  return (
    <div className="pt-4">
      <Button
        onClick={handleOpen}
        style={{ backgroundColor: "#088F8F", color: "white" }}
      >
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack direction="column" spacing={2}>
            <Typography>Edit User</Typography>
            <input
              type="text"
              placeholder="First Name"
              className="border-2 rounded-md border-black"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border-2 rounded-md border-black"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
              <Button
                variant="contained"
                onClick={handleClose}
                style={{ backgroundColor: "#FF0000" }}
              >
                Close
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
//role management(all role will be accumulated & permissions are editable, can create a role)
/*user management(all users are accumulated & role can be edited, so providing the dropdown, which will fetch all the role which are present & ) **/