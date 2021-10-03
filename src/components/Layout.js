import Box from "@mui/material/Box";
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Box sx={{ minHeight: "95vh", marginBottom:"-15px"}}>
        <Navbar />
        {children}
      </Box>
      <Footer />
    </>
  );
}
