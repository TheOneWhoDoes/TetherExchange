import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function ModalUser({ isModalOpen, toggleModalClose, userInfo }) {
  return (
    <Modal
      open={isModalOpen}
      onClose={toggleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="detailedContainer">
          <div>
            <img
              style={{
                width: "120px",
                height: "120px",
                marginTop: "0px",
                borderRadius: "50%",
                float: "right",
              }}
              src={userInfo.avatar}
              className="user_image"
            />
          </div>
          <div>
            <div>
              Full Name: {userInfo.first_name} {userInfo.last_name}
            </div>
            <div>Email: {userInfo.email}</div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
