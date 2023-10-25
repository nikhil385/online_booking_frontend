import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getEvents } from '../apis/events';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import EventModal from './Event';
import EventForm from './EventForm';
import { formatDate, getLoggedInUser } from '../utils/utility';

const Dashboard = () => {
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [currentEvent, setCurrentEvent] = useState(null);
  const [newEvent, setNewEvent] = useState(null);
  const [openModal, setOpenModal] = useState(false)

  const handleViewEvent = (event) => {
    setCurrentEvent(event)
    setOpenModal(true)
  }

  const refreshEvents = () => {
    getEvents().then((result) => {
      setEvents(result)
    })
  }

  const handleClick = () => {
    setNewEvent(true)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('user')
    navigate('/login')
  }

  const authenticated = getLoggedInUser()
  useEffect(() => {
    if (authenticated) {
      refreshEvents()
    }
  }, []);


  if (!authenticated) {
    window.location.href = '/login'
  } else {
    return (
      <div>
        <Button style={{float: 'right', margin: 10}} variant='outlined' onClick={handleLogout}>Logout</Button>
        {
          authenticated.role === "HR" &&
          <Button style={{float: 'right', margin: 10}} variant='contained' onClick={handleClick}>Create Event</Button>
        }
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Event Name</TableCell>
                <TableCell align="right">Vendor name</TableCell>
                <TableCell align="right">Confirmed Date</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Date Created</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events && events.map((event) => (
                <TableRow
                  key={event._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {event.name}
                  </TableCell>
                  <TableCell align="right">
                    {
                      event.confirmedBy
                    }
                  </TableCell>
                  <TableCell align="right">
                    {
                      event.confirmedDate || event.proposedDates.map(p => formatDate(p)).join(', ')
                    }
                  </TableCell>
                  <TableCell align="right">
                    {
                      event.status
                    }
                  </TableCell>
                  <TableCell align="right">
                    {
                      formatDate(event.createdAt)
                    }
                  </TableCell>
                  <TableCell align="right">
                    <Button onClick={() => handleViewEvent(event)} variant='outlined'>View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {
          currentEvent && <EventModal refreshEvents={refreshEvents} user={authenticated} isVendor={authenticated.role === "VENDOR"} event={currentEvent} setOpenModal={setOpenModal} open={openModal} />
        }
        {
          newEvent && <EventForm refreshEvents={refreshEvents} setNewEvent={setNewEvent} />
        }
      </div>
    );
  }
}

export default Dashboard;
