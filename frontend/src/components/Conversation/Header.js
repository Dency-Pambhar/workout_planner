import { Box, Typography,IconButton, Divider,Stack, } from '@mui/material'
import React from 'react';
import { useTheme } from "@mui/material/styles";
import StyledBadge from '../StyledBadge';
import { ToggleSidebar } from '../../redux/slices/app';
import { useDispatch } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  return (
    <Box p={2} sx={{ width:'100%',borderRadius:'4px', backgroundColor: theme.palette.background.neutral, boxShadow:'0px 0px 2px rgba(0,0,0,0.25)'}}>
    <Stack alignItems={'center'} direction='row' justifyContent={'space-between'}
    sx={{width:'100%', height:'100%'}}>
        <Stack onClick={()=>{
            dispatch(ToggleSidebar());
        }} direction={'row'} spacing={2}>
            <Box>
                <StyledBadge  overlap="circular"
                anchorOrigin={{ // position
                    vertical: "bottom",
                    horizontal: "right",
                }}
                variant="dot">
                </StyledBadge>
                
            </Box>
            <Stack spacing={0.2}>
                    <Typography variant='subtitle2'>
                        {'Workout Planner'}
                    </Typography>
                    <Typography variant='caption'>
                        Online
                    </Typography>
                </Stack>
        </Stack>
    </Stack>
</Box>
  )
}

export default Header