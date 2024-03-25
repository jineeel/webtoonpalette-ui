import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LoginComponent from '../components/member/LoginComponent';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(5),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(5),
    }, 
  }));


function LoginModalComponent({openToggle}) {

    const [open, setOpen] = useState(true);

    useEffect(()=>{
        setOpen(true)
    },[openToggle])

    const handleClose = () => {
      setOpen(false);
    };
  
    return (
       
      <React.Fragment>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose} 
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          ><CloseIcon /></IconButton>
          <DialogContent dividers>
            <LoginComponent />
          </DialogContent>
        </BootstrapDialog>
      </React.Fragment>
    );
      
}


export default LoginModalComponent;