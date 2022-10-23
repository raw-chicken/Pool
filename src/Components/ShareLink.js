import * as React from 'react';

import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function ShareLink(props) {
    const [open, setOpen] = React.useState(false);
    const copyLink = () => {
        const link = window.location.href;
        navigator.clipboard.writeText(link);
        setOpen(true);
    }

    // const handleClickOpen = () => {
    //     setOpen(true);
    //   };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const handleCancel = () => {
        setOpen(false);
      };
    
      return (
        <div>
          <IconButton 
            onClick={copyLink} 
            color="primary" 
            aria-label="share link"
            sx={{
                color:"#77BB3F",
                ':click': {
                backgroundColor: 'white',
            },
            }}
        >
            <ShareIcon />
        </IconButton>
          <Dialog fullWidth open={open} onClose={handleCancel}>
            <DialogTitle>Link copied</DialogTitle>
            <DialogActions>
              <Button onClick={handleClose}>Ok</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}