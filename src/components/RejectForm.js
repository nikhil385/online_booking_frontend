import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function RejectForm(props) {
  const [remarks, setRemarks] = useState(null)

  const handleReject = () => {
    props.handleReject(remarks)
  }

  return (
    <div>
      <Dialog fullWidth open={props.open} onClose={() => props.close()}>
        <DialogTitle>Reject</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="remarks"
            label="Reason For Rejection"
            fullWidth
            variant="standard"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.close()}>Cancel</Button>
          <Button onClick={handleReject}>Reject</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
