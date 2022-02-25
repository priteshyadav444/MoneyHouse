import React from "react";
import { useParams } from "react-router";
import AppNavbar from "./Component/AppNavbar";

export default function MainNavbar(props) {
  const params = useParams();
  return (
    <>
      <AppNavbar />
      {props.children}
    </>
  );
}
