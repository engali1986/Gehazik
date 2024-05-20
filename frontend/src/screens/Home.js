import React, { useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = (params) => {
  return (
    <Container>
      <div className=" d-none d-md-block">
        <Row
          style={{
            backgroundColor: "gray",
            left: "0px",
            minWidth: "max-content",
          }}
        >
          <Col sm={1} style={{ fontSize: "1.5rem" }}>
            home
          </Col>

          <Col
            sm={2}
            onClick={(e) => {
              e.stopPropagation();
            }}
            style={{
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              position: "relative",
            }}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                const SubMenus = document.querySelectorAll(".NavItem");
                for (let index = 0; index < SubMenus.length; index++) {
                  SubMenus[index].children[1].style.display = "none";
                }
                params.BackDropRef.current.classList.add("BackDropActivated");
                document.querySelectorAll(".categories")[0].style.display =
                  "flex";
                document.querySelectorAll(
                  ".categories"
                )[0].children[1].style.display = "none";
              }}
              style={{ width: "100%", cursor: "pointer" }}
            >
              categories
            </div>
          </Col>

          <Col
            sm={1}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="NavItem"
            style={{
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              position: "relative",
            }}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                const SubMenus = document.querySelectorAll(".NavItem");
                for (let index = 0; index < SubMenus.length; index++) {
                  SubMenus[index].children[1].style.display = "none";
                }
                document.querySelectorAll(".categories")[0].style.display =
                  "none";
                console.log(e.target.parentElement.parentElement);
                console.log(
                  e.target.parentElement.parentElement.getBoundingClientRect()
                    .left
                );
                params.BackDropRef.current.classList.add("BackDropActivated");
                e.target.parentElement.children[1].style.display = "block";
              }}
              style={{ width: "100%" }}
            >
              profile
            </div>

            <div
              style={{
                minHeight: "400px",
                minWidth: "400px",
                border: "2px solid orange",
                position: "absolute",
                top: "5vh",
                left: "0px",
                backgroundColor: "orange",
                zIndex: "300",
              }}
            >
              profile items
            </div>
          </Col>
          <Col
            sm={1}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="NavItem"
            style={{
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              position: "relative",
            }}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                const SubMenus = document.querySelectorAll(".NavItem");
                for (let index = 0; index < SubMenus.length; index++) {
                  SubMenus[index].children[1].style.display = "none";
                }
                document.querySelectorAll(".categories")[0].style.display =
                  "none";
                console.log(e.target.parentElement.children[1]);
                params.BackDropRef.current.classList.add("BackDropActivated");
                e.target.parentElement.children[1].style.display = "block";
              }}
              style={{ width: "100%" }}
            >
              Products
            </div>

            <div
              style={{
                minHeight: "400px",
                minWidth: "400px",
                border: "2px solid orange",
                position: "absolute",
                top: "5vh",
                left: "0px",
                backgroundColor: "orange",
                zIndex: "300",
              }}
            >
              Products items
            </div>
          </Col>
          <Col sm={{ offset: 5, span: 1 }}>
            <Link to="/LogIn">LogIn</Link>
          </Col>
        </Row>
        <Row className="categories" style={{ backgroundColor: "orange" }}>
          <Col
            sm={2}
            onClick={(e) => {
              e.stopPropagation();
              console.log(
                document.querySelectorAll(".categories")[0].children[1]
              );
              document.querySelectorAll(
                ".categories"
              )[0].children[1].style.display = "block";
            }}
          >
            sadasda
          </Col>
          <Col sm={10} style={{ diaplay: "none" }}>
            sdads
          </Col>
        </Row>
      </div>
      {/*  small screen navbar */}
      <Row className=" d-md-none  d-flex" style={{ backgroundColor: "gray" }}>
        <Col
          className=" d-block"
          style={{ fontSize: "1.5rem", maxWidth: "fit-content" }}
        >
          home
        </Col>

        <Col
          className=" d-block"
          style={{ fontSize: "1.5rem", maxWidth: "fit-content" }}
        >
          home
        </Col>

        <Col
          xs={12}
          className=" d-block ms-0 ms-sm-auto"
          style={{ fontSize: "1.5rem", maxWidth: "fit-content" }}
        >
          Login
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
