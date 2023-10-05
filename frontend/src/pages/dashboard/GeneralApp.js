import React from "react";
import { Box } from "@mui/material";
import Conversation from "../../components/Conversation";
import { useTheme } from "@mui/material/styles";

const GeneralApp = () => {
  const theme = useTheme();
  return (
      <Box sx={{ width:'70vw',backgroundColor: theme.palette.background.default }}>
      <Conversation/>
      </Box>
  );
};

export default GeneralApp;
