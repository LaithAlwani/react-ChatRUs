import Box from "@mui/material/Box";
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Box sx={{ minHeight: "100vh", marginBottom:"-55px"}}>
        <Navbar />
        {children}
      </Box>
      <Footer />
    </>
  );
}
