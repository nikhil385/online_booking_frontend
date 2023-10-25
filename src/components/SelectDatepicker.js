import React, { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';

const SelectDatePicker = (props) => {
  const [selectedDates, setSelectedDates] = useState([null, null, null]);

  const handleDateChange = (date, index) => {
    const updatedDates = [...selectedDates];
    updatedDates[index] = date;
    setSelectedDates(updatedDates);
  };

  useEffect(() => {
    props.setProposedDates(selectedDates)
  }, [selectedDates])

  return(
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {
        selectedDates.map((date, index) => (
          <div style={{marginTop: 10}} key={index}>
            <DatePicker
              value={date}
              minDate={new Date()}
              onChange={(date) => handleDateChange(date, index)}
              label={`Proposed Date ${index + 1}`}
              inputVariant="outlined"
            />
          </div>
        ))
      }
    </LocalizationProvider>
  );
};

export default SelectDatePicker;
