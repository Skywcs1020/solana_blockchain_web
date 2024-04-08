import React from "react";
import { Link } from "react-router-dom";
import {
  MDBIcon,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import "./HomePage.css";

const HomePage = () => {
  return (
    <center
      style={{
        padding: "40px",
        width: "50%",
        margin: "0 auto",
      }}>
      <MDBRow className="row-cols-md-2 g-5">
        <MDBCol>
          <Link to="/register">
						<div className="p-3 border rounded-7" id="blockButton">
							<MDBIcon fas icon="user-edit" 
								className="ms-1" 
								size="3x" 
							/>
							<h3 className="my-2">Register</h3>
						</div>
          </Link>
        </MDBCol>

        <MDBCol>
          <Link to="/create">
            <div className="p-3 border rounded-7" id="blockButton">
							<MDBIcon fas icon="plus-circle" 
								className="ms-1" 
								size="3x" 
							/>
							<h3 className="my-2">Create</h3>
						</div>
          </Link>
        </MDBCol>

				<MDBCol>
          <Link to="/update">
            <div className="p-3 border rounded-7" id="blockButton">
							<MDBIcon fas icon="edit" 
								className="ms-1" 
								size="3x" 
							/>
							<h3 className="my-2">Update</h3>
						</div>
          </Link>
        </MDBCol>

				<MDBCol>
          <Link to="/view">
            <div className="p-3 border rounded-7" id="blockButton">
							<MDBIcon fas icon="clipboard-list" 
								className="ms-1" 
								size="3x" 
							/>
							<h3 className="my-2">View</h3>
						</div>
          </Link>
        </MDBCol>
      </MDBRow>
    </center>
  );
}

export default HomePage;
