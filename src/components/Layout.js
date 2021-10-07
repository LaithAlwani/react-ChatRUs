import Box from "@mui/material/Box";
import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Box sx={{ minHeight: "100vh", marginBottom:"-36px"}}>
        <Navbar />
        {children}
      </Box>
    </>
  );
}
