import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { formatDate } from '../utils/utility';

export default function ApproveForm(props) {
  const [confirmedDate, setConfirmedDate] = useState(props.proposedDates[0])

  const handleApprove = () => {
    props.handleApprove(confirmedDate)
  }

  const handleChange = (e) => {
    setConfirmedDate(e.target.value)
  }

  return (
    <div style={{minWidth: 200}}>
      <Dialog fullWidth open={props.open} onClose={() => props.close()}>
        <DialogTitle>Approve</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Confirmed Date</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={confirmedDate}
              label="Confirmed Date"
              onChange={handleChange}
            >
              {
                props.proposedDates.map((p) => {
                  return <MenuItem value={p}>{formatDate(p)}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.close()}>Cancel</Button>
          <Button onClick={handleApprove}>Approve</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}



