import { Box, Fab, IconButton, InputAdornment, Stack, TextField, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { styled, useTheme } from "@mui/material/styles";
import { PaperPlaneTilt, Smiley, Camera, File, Image, Sticker, User } from 'phosphor-react';
import { Dna } from 'react-loader-spinner'


const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        paddingTop: '12px',
        paddingBottom: '12px',
    }
}));

const Actions = [
    {
        color: '#4da5fe',
        icon: <Image size={24} />,
        y: 102,
        title: 'Photo/Video'
    },
    {
        color: '#1b8cfe',
        icon: <Sticker size={24} />,
        y: 172,
        title: 'Stickers'
    },
    {
        color: '#0172e4',
        icon: <Camera size={24} />,
        y: 242,
        title: 'Image'
    },
    {
        color: '#0159b2',
        icon: <File size={24} />,
        y: 312,
        title: 'Document'
    },
    {
        color: '#013f7f',
        icon: <User size={24} />,
        y: 382,
        title: 'Contact'
    }
];

const ChatInput = ({ setOpenPicker, setInputMessage, handleKeyDown, inputMessage }) => {
    const [openAction, setOpenAction] = useState(false);
    return (
        <StyledInput fullWidth placeholder='Ask Here' variant='filled'
            onKeyDown={handleKeyDown}
            value={inputMessage}
            onChange={(e) => {
                setInputMessage(e.target.value)


            }}
            InputProps={{
                disableUnderline: true,
                startAdornment:
                    <Stack sx={{ width: 'max-content' }}>
                        <Stack sx={{ position: 'relative', display: openAction ? 'inline-block' : 'none' }}>
                            {Actions.map((el) => (
                                <Tooltip placement='right' title={el.title}>
                                    <Fab sx={{ position: 'absolute', top: -el.y, backgroundColor: el.color }}>
                                        {el.icon}
                                    </Fab>
                                </Tooltip>

                            ))}
                        </Stack>
                    </Stack>
                ,
                endAdornment: <InputAdornment>
                    <IconButton onClick={() => {
                        setOpenPicker((prev) => !prev);
                    }}>
                        <Smiley />
                    </IconButton>
                </InputAdornment>
            }} />
    )
}

const Footer = ({ setUserInputs, userInputs, setLoading, loading }) => {
    const theme = useTheme();
    const [openPicker, setOpenPicker] = useState(false);
    const [inputMessage, setInputMessage] = useState('')
    const [data, setData] = useState()

    if (data) {
        console.log("++++++++++++++++++++++++")
        console.log(data)
        console.log("++++++++++++++++++++++++")
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // Perform the action you want when Enter is pressed
            console.log('Enter key pressed! Value:', inputMessage);
            const message = {
                type: "msg",
                message: inputMessage,
                incoming: false,
                outgoing: true
            }



            // const temp = [...userInputs, message]
            setUserInputs(prevState => [...prevState, message])
            const apiUrl = 'http://127.0.0.1:5000/ask?question=' + encodeURIComponent(inputMessage);
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                    console.log("-----")
                    console.log(data)
                    if (data.status === 200) {
                        const msg = {
                            type: "msg",
                            
                            message: data.answer,
                            incoming: true,
                            outgoing: false
                        }
                        console.log("userInputs", userInputs)
                        setUserInputs(prevState => [...prevState, msg])
                    }

                    console.log("-----")
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                });

            setLoading(true)
            setInputMessage('')

        }
    };




    return (
        <Box p={2} sx={{
            width: '100%', backgroundColor: theme.palette.background.paper, boxShadow: '0px 0px 2px rgba(0,0,0,0.25)'
        }}>
            <Stack direction='row' alignItems={'center'} spacing={3}>

                <Stack sx={{ width: '100%' }}>
                    {loading ? (<div style={{ display: "flex" }}><Loader /> <div style={{ height: "40px", marginTop: "10px" }}>Loading ...</div> </div>) : (<><ChatInput inputMessage={inputMessage} handleKeyDown={handleKeyDown} setOpenPicker={setOpenPicker} setInputMessage={setInputMessage} />
                    </>)}
                </Stack>

                <Box sx={{
                    height: 48, width: 48, backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5
                }}>
                    <Stack sx={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <IconButton onClick={() => {
                            const message = {
                                type: "msg",
                                message: inputMessage,
                                incoming: false,
                                outgoing: true
                            }
                            const temp = [...userInputs, message]
                            setUserInputs(temp)
                        }}>
                            <PaperPlaneTilt color='#fff' />
                        </IconButton>
                    </Stack>

                </Box>
            </Stack>
        </Box>
    )
}


const Loader = () => {
    return (<>
        <Dna
            visible={true}
            height="40"
            width="80"
            ariaLabel="dna-loading"
            wrapperClass="dna-wrapper"
        />
    </>)
}

export default Footer