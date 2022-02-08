import React from "react";
import { Container } from "semantic-ui-react";
import Head from "next/head";
import Header from "./Header";
import "semantic-ui-css/semantic.min.css";
const Layout = (props) => {
  return (
    <div>
      <Container>
        <Header />
        {props.children}
      </Container>
    </div>
  );
};
export default Layout;
