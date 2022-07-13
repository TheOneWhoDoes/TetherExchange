import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalUser extends Component {
  render() {
    const { isOpen, toggle, data } = this.props;
    if (isOpen)
      return (
        <div>
          <div className="detailedContainer">
            <div>
              <img
                style={{
                  width: "120px",
                  height: "120px",
                  marginTop: "0px",
                }}
                src={data.avatar}
                className="user_image"
              />
            </div>
            <div>{data.email}</div>
            <div>{data.first_name}</div>
            <div>{data.last_name}</div>
            <div>{data.text}</div>
            <div>{data.url}</div>
          </div>
        </div>
      );
    else {
      return null;
    }
  }
}

export default ModalUser;
