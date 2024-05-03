import React, { useState } from 'react';
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  TextField,
  FormControl,
  Button,
  Grid,
  Stack,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

export default function ChatbotModal({ open, handleClose }) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    { message: 'hello how can i help you?', isUser: false },
  ]);

  const sendMessage = async (userMessage = '') => {
    // send a POST request to the chatbot API with the user's message
    if (userMessage === 'clear') {
      setChat([{ message: 'chat cleared !', isUser: false }])
      setMessage('');
    } else {
      const response = await axios.post('http://localhost:8000/api/chatbot/', {
        message,
      });
      // update the chat state with the chatbot's response
      setChat([
        ...chat,
        { message: userMessage, isUser: true },
        { message: response.data.message, isUser: false },
      ]);
      // clear the message input field
      setMessage('');
    }
  };

  const onSubmitMessage = (e) => {
    e.preventDefault();
    if (message !== '') {
      sendMessage(message);
    }
  };

  return (
    <Modal {...attributes.modalAttr} open={open} onClose={handleClose}>
      <Fade in={open}>
        <Box sx={styles.BoxContainerStyle}>
          <div style={styles.ChatTitleContainerStyle}>
            <h3>CHAT-BOT</h3>
          </div>
          <hr />
          <div style={styles.ChatContainerStyle}>
            <Stack spacing={1}>
              {chat.map((chatMessage, index) => (
                <div
                  style={{
                    ...styles.messageContainerStyle,
                    justifyContent: chatMessage.isUser
                      ? 'flex-end'
                      : 'flex-start',
                  }}
                >
                  <div
                    key={index}
                    className={`${chatMessage.isUser ? 'user' : 'chatbot'}`}
                    style={{
                      ...styles.messageStyle,
                      background: chatMessage.isUser ? '#5F5' : '#FFF',
                    }}
                  >
                    {chatMessage.message}
                  </div>
                </div>
              ))}
            </Stack>
          </div>
          <hr />
          <form {...attributes.formAttr} onSubmit={(e) => onSubmitMessage(e)}>
            <FormControl fullWidth>
              <Grid container spacing={0}>
                <Grid item xs={6} md={10}>
                  <TextField
                    {...attributes.userInputAttr}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6} md={2}>
                  <Button {...attributes.submitButtonAttr}>
                    <SendIcon />
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
}

const styles = {
  BoxContainerStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'rgba(255, 255, 255, 0)',
    backdropFilter: 'blur(1px)',
    border: '1px solid #000',
    borderRadius: 3,
    boxShadow:
      '0px 35px 68px 0px rgba(74, 74, 74, 0.5), inset 0px -12px 16px 0px rgba(74, 74, 74, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255)',
    p: 2.5,
  },
  ChatTitleContainerStyle: {
    background: '#fff',
    padding: 5,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ChatContainerStyle: {
    height: 300,
    background: '#ddde',
    backgroundImage:
      'linear-gradient(30deg, #999 12%, transparent 12.5%, transparent 87%, #999 87.5%, #999), linear-gradient(150deg, #999 12%, transparent 12.5%, transparent 87%, #999 87.5%, #999), linear-gradient(30deg, #999 12%, transparent 12.5%, transparent 87%, #999 87.5%, #999), linear-gradient(150deg, #999 12%, transparent 12.5%, transparent 87%, #999 87.5%, #999)',
    backgroundSize: '46px 81px',
    backgroundPosition: '0 0, 0 0, 23px 40px, 23px 40px, 0 0, 23px 40px',
    padding: 20,
    borderRadius: 10,
    overflow: 'auto',
  },
  messageContainerStyle: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  messageStyle: {
    padding: 10,
    fontStyle: 'italic',
    borderRadius: 10,
    float: 'left',
    maxWidth: 200,
  },
  formStyle: {
    background: '#fff',
    overflow: 'hidden',
    borderRadius: 10,
  },
};

const attributes = {
  modalAttr: {
    'aria-labelledby': 'transition-modal-title',
    'aria-describedby': 'transition-modal-description',
    closeAfterTransition: true,
    slots: { backdrop: Backdrop },
    slotProps: {
      backdrop: {
        timeout: 500,
      },
    },
  },
  formAttr: {
    noValidate: true,
    autoComplete: 'off',
    style: styles.formStyle,
  },
  userInputAttr: {
    fullWidth: true,
    id: 'filled-basic',
    label: 'Enter your message...',
    variant: 'filled',
    color: 'success',
    sx: { width: '100%', height: '100%' },
  },
  submitButtonAttr: {
    variant: 'contained',
    color: 'success',
    type: 'submit',
    sx: { width: '100%', height: '100%' },
  },
};
