import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Pagination from "@mui/material/Pagination";

/**
 * @module pagination
 *  Compoonent for handling pagination
 */
class Pagination_1 extends Component {
  state = {};

  handleChange = (event, value) => {
    this.props.onPageChange(value);
  };

  handleChangeFarsi = (event, value) => {
    this.props.onPageChange(value);
  };

  render() {
    const { pagesCount, currentPage, onPageChange } = this.props;
    const pages = _.range(1, pagesCount + 1);
    // const classes = useStyles();

    return (
      <nav style={{ marginLeft: "2vw", marginBottom: "2pc" }}>
        <div>
          <Pagination
            count={pagesCount}
            color="secondary"
            variant="outlined"
            shape="rounded"
            onChange={this.handleChange}
          />
        </div>
      </nav>
    );
  }
}

Pagination_1.propTypes = {
  pagesCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination_1;
