import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LoginComponent from '../components/member/LoginComponent';
import { Button, Typography } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(5),
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
    }
  }));


function ResultModalComponent({openToggle}) {

    const [open, setOpen] = useState(true);

    useEffect(()=>{
        setOpen(true)
    },[openToggle])

    const handleClose = () => {
      setOpen(false);
    };
  
    return (
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogContent><span className="font-medium">수정되었습니다 💫</span></DialogContent>
          <div className="m-auto mb-6">
            <Button variant="contained" color="secondary" sx={{width:80}} onClick={handleClose} autoFocus>확인</Button>
          </div>
        </BootstrapDialog>
    );
      
}


export default ResultModalComponent;