import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { formatDate } from '../utils/utility';
import { approveEvent, rejectEvent } from '../apis/events';
import ApproveForm from './ApproveForm';
import RejectForm from './RejectForm';

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

export default function EventModal(props) {
  const handleClose = () => props.setOpenModal(false);
  const [openApproveForm, setOpenApproveForm] = useState(false)
  const [openRejectForm, setOpenRejectForm] = useState(false)

  const handleApprove = (confirmedDate) => {
    approveEvent({ _id: props.event._id, confirmedDate, confirmedBy: props.user.username})
    setOpenApproveForm(false)
    handleClose()
    props.refreshEvents()
  }

  const handleReject = (remarks) => {
    rejectEvent({ _id: props.event._id, remarks })
    setOpenRejectForm(false)
    handleClose()
    props.refreshEvents()
  }

  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {
              props.event.name
            }
          </Typography>
          <hr/>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Company Name: { props.event.companyName }
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Vendor: { props.event.confirmedBy }
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Status: { props.event.status }
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Confirmed At/ Proposed Dates: { 
            props.event.confirmedDate || props.event.proposedDates.map(p => formatDate(p)).join(', ') }
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Proposed Location: { props.event.proposedLocation }
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Created At: { formatDate(props.event.createdAt) }
          </Typography>
          <hr/>
          {
            (props.isVendor && (props.event.status === "Pending")) ? 
            <div>
              <Button  variant='contained' onClick={() => setOpenApproveForm(true)}>Approve</Button>
              <Button color='error' variant='contained' onClick={() => setOpenRejectForm(true)}>Reject</Button>
            </div> :
            <></>
          }
          {
            openApproveForm &&
            <ApproveForm proposedDates={props.event.proposedDates} open={openApproveForm} handleApprove={handleApprove} close={setOpenApproveForm} />
          }
          {
            openRejectForm && 
            <RejectForm open={openRejectForm} handleReject={handleReject} close={setOpenRejectForm} />
          }
        </Box>
      </Modal>
    </div>
  );
}
