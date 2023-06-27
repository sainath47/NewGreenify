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

export default function RoleEditModal(props) {
  const [open, setOpen] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [selectedRole, setSelectedRole] = React.useState("");
  const [roles, setRoles] = React.useState([]);

  const fetchRoles = async() => {
    // Fetch roles from the database and update the 'roles' state
    // Example: API call or data retrieval from a database
    const response = await fetch("api/role");
    const data = await response.json();
    // console.log(data.data);
    setRoles(data.data);
  };
  const handleOpen = (event) => {
event.stopPropagation()
    setFirstName(props.firstName)
  setLastName(props.lastName)
    fetchRoles(); // Fetch roles from the database when the modal is opened
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async() => {
    // Perform actions with the edited data
    // console.log("First Name:", firstName);
    // console.log("Last Name:", lastName);
    // console.log("Selected Role:", selectedRole);
    try {
      const response = await fetch(`api/user/${props.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          role: selectedRole,
        }),
      });
  
      if (response.ok) {
        
        console.log('User updated successfully');
      } else {
        console.error('Failed to update user:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }



    // Close the modal
    handleClose();
    alert('successfully updated user')

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
            <Typography>Edit Role</Typography>
          
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
//all permission are accumulated to one place in a form of array(this will be also dynamic & will be taken from highest authority super-admin), this array will be shown & the selected checkboxes will form a array & that array will be appended to the role
//EDIT ROLE , permissions can be edited & name can be edited , same name can cause conflict, so will provide validation, using regex(capital or small should not effect) 

//the object id of the particular role is assigned to the user