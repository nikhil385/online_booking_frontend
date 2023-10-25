import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Card, CardActions, CardContent, CardHeader, TextField } from '@mui/material';
import SelectDatePicker from './SelectDatepicker';
import { createEvent } from '../apis/events';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function EventForm(props) {
  const [open, setOpen] = useState(true);
  const [proposedDates, setProposedDates] = useState([])
  const [proposedLocation, setProposedLocation] = useState([])
  const [name, setName] = useState('')
  const user = JSON.parse(sessionStorage.getItem('user'))
  
  const handleClose = () => {
    props.setNewEvent(false)
    setOpen(false);
    setProposedDates([])
    setProposedLocation('')
    setName('')
  }

  const handleSave = () => {
    const data = {
      proposedDates,
      proposedLocation,
      name,
      companyName: user.companyName,
      userId: user._id
    }
    createEvent(data)
    handleClose()
    props.refreshEvents()
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        style={{marginTop: 20, height: '95%', overflowX: 'auto'}}
      >
        <Box
          component="form"
          sx={style}
          noValidate
          autoComplete="off">
          <Card>
            <CardHeader title="New Event" />
            <CardContent>
              <TextField 
                style={{width: '100%'}}
                id="name"
                label="Event Name"
                variant="standard"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
              <TextField 
                style={{width: '100%', marginTop: 20}}
                InputProps={{ readOnly: true }} 
                name='companyName'
                id="companyName"
                label="Company Name"
                variant="standard"
                defaultValue={user.companyName} />
              <div style={{marginTop: 20}}>
                <SelectDatePicker setProposedDates={setProposedDates} />
              </div>
              <TextField 
                style={{width: '100%', marginTop: 10}}
                id="proposedLocation"
                name="proposedLocation"
                label="Proposed Location"
                variant="standard"
                value={proposedLocation}
                onChange={(e) => setProposedLocation(e.target.value)}
                 />
            </CardContent>
            <CardActions style={{float: 'right'}}>
              <Button  variant='contained' onClick={handleSave}>Save</Button>
              <Button color='error' variant='contained' onClick={handleClose}>Cancel</Button>
            </CardActions>
          </Card>
        </Box>
      </Modal>
    </div>
  );
}
