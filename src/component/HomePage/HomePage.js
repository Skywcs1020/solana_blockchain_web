import React from "react";
import { Link } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import "./HomePage.css";

function HomePage() {
  return (
    <center
      style={{
        padding: "40px",
        width: "70%",
        margin: "0 auto",
        height: "100px",
      }}>
      <MDBRow className="row-cols-1 row-cols-md-2 g-5">
        <MDBCol>
          <Link to="/update">
            <MDBCard>
              <MDBCardImage
                src="https://articlesbase.com/wp-content/uploads/2019/06/writing.jpg"
                position="top"
                style={{ height: "400px" }}
                alt="..."
              />
              <MDBCardBody>
                <MDBCardTitle>Update</MDBCardTitle>
                <MDBCardText></MDBCardText>
                {/* <MDBBtn href="#">Button</MDBBtn> */}
              </MDBCardBody>
            </MDBCard>
          </Link>
        </MDBCol>

        <MDBCol>
          <Link to="/view">
            <MDBCard>
              <MDBCardImage
                src="https://www.cyberadviserblog.com/wp-content/uploads/sites/18/2023/01/1674238823-3954-8348-lxb_photopypeCEaJeZYlxb_photo-.jpg"
                position="top"
                style={{ height: "400px" }}
                alt="..."
              />
              <MDBCardBody>
                <MDBCardTitle>View</MDBCardTitle>
                <MDBCardText></MDBCardText>
                {/* <MDBBtn href="#">Button</MDBBtn> */}
              </MDBCardBody>
            </MDBCard>
          </Link>
        </MDBCol>
      </MDBRow>
    </center>
  );
}

export default HomePage;
