import React from "react";
import { Box, Stack } from "@mui/material";
import Conversation from "../../components/Conversation";
import { useTheme } from "@mui/material/styles";

const GeneralApp = () => {
  const theme = useTheme();
  return (
      <Box sx={{ backgroundColor: theme.palette.background.default }}>
      <Conversation/>
      </Box>
  );
};

export default GeneralApp;
