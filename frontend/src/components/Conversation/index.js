import { Box, Stack } from '@mui/material';
import React, { useState } from 'react';
// import { useTheme } from "@mui/material/styles";
import Header from './Header';
import Footer from './Footer';
import Message from './Message';

const Conversation = () => {
  // const theme = useTheme();
  const [userInputs, setUserInputs] = useState([]);
  const [loading, setLoading] = useState(false);
  return (
    <Stack height={'100%'} maxHeight={'100vh'} width={'auto'}>

      {/* Chat header */}
      <Header />
      {/* Msg */}
      <Box className='scrollbar' width={"100%"} sx={{ flexGrow: 1, height: '100%', overflowY: 'scroll' }}>
        <Message menu={true} userInputs={userInputs} />
      </Box>
      {/* Chat footer */}
      <Footer loading={loading} setUserInputs={setUserInputs} userInputs={userInputs} setLoading={setLoading} />
    </Stack>
  )
}

export default Conversation