import React, { useEffect, useState, useRef } from 'react';
import { Box, Grid, Typography, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';



import StoryListItem from '../../components/StoryListItem/StoryListItem';
import MatchingHeightComponent from '../../components/MatchComponentHeight/MatchComponentHeight';

// sample data import
// import { contact } from '../../sampleData';

export default function ContactDetailsPage() {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const { id } = useParams();
  // const contact = useSelector(store => store.contacts.currentContact)
  const [createMode, setCreateMode] = useState(true)

  useEffect(() => {
    dispatch({ type: 'GET_CURRENT_CONTACT', payload: id })
  }, [])

  // sort by select options
  const sortByOptions = [
    { value: 'newest', label: 'newest' },
    { value: 'publication_date', label: 'publication date' },
    { value: 'type', label: 'type' },
  ]

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      width: '150px',
    })
  };

  return (
    <Box>
      <Grid container space={1}>
        <Grid item xs={2} display='flex' flexDirection='row-reverse'>
          {/* profile image */}
          <Box
            component='img'
            sx={{
              height: 150
            }}
            alt="Profile Picture"
            src={contact?.photo}
          />
        </Grid>
        {/* holds name, pronouns, and expertise */}
        <Grid item xs={10}>
          <Box display='flex' flexDirection='column' justifyContent='center' height={150}>
            <Box display='flex' flexDirection='row' alignItems='center'>
              <Typography variant='h4'>{contact?.name}</Typography>
              <Typography variant='h6' sx={{ ml: 1 }}>({contact?.pronouns})</Typography>
            </Box>
            <Typography variant='h6' fontStyle='italic'>{contact?.expertise}</Typography>
          </Box>
        </Grid>
        {/* start of row that holds general info and contribution headers, as well as sort by an search field */}
        <Grid item xs={4}>
          <Typography variant='h5' fontWeight='bold'>General Info <EditIcon /></Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant='h5' fontWeight='bold' sx={{ ml: 2 }}>Contributions</Typography>
        </Grid>
        
        {/* search item, need to finish functionality */}
        <Grid item xs={4}>
          <TextField
            variant='outlined'
            label='Search'
            fullWidth
            size='small'
          />

        </Grid>
        {/* this row has the two large sections of information, general info and contributions */}
        <Grid container space={1}>
          {/* general info section */}
          <Grid item xs={4} ref={ref} sx={{ p: 1, backgroundColor: 'lightgrey', mt: 1 }}>
            <Typography variant='h6' fontWeight='bold' sx={{ mt: 1 }}>Bio</Typography>
            <Typography variant='body1'>{contact?.bio}</Typography>
            <Typography variant='h6' fontWeight='bold' sx={{ mt: 1 }}>Role(s)</Typography>
            {contact?.roles?.map((role) => {
              return <Typography key={role.id} variant='body1'>{role.name}</Typography>
            })}
            <Typography variant='h6' fontWeight='bold' sx={{ mt: 1 }}>Mailing Address</Typography>
            <Typography variant='body1'>{contact?.mailing_address}</Typography>
            <Typography variant='h6' fontWeight='bold' sx={{ mt: 1 }}>Billing Address</Typography>
            <Typography variant='body1'>{contact?.billing_address}</Typography>
            <Typography variant='h6' fontWeight='bold' sx={{ mt: 1 }}>Email</Typography>
            <Typography variant='body1'>{contact?.email}</Typography>
            <Typography variant='h6' fontWeight='bold' sx={{ mt: 1 }}>Phone</Typography>
            <Typography variant='body1'>{contact?.phone}</Typography>
            <Typography variant='h6' fontWeight='bold' sx={{ mt: 1 }}>LinkedIn</Typography>
            <Typography variant='body1'>{contact?.linkedin}</Typography>
            <Typography variant='h6' fontWeight='bold' sx={{ mt: 1 }}>Twitter</Typography>
            <Typography variant='body1'>{contact?.twitter}</Typography>
            <Typography variant='h6' fontWeight='bold' sx={{ mt: 1 }}>Instagram</Typography>
            <Typography variant='body1'>{contact?.instagram}</Typography>
            <Typography variant='h6' fontWeight='bold' sx={{ mt: 1 }}>Facebook</Typography>
            <Typography variant='body1'>{contact?.facebook}</Typography>
          </Grid>
          {/* contributions section */}
          <Grid item xs={8} sx={{ pl: 1, backgroundColor: 'white' }}>
            {/* container so there is margin between general info and contributions while maximizing screen space */}
            <Grid container space={1} sx={{ backgroundColor: 'lightgrey', mt: 1 }}>
              <MatchingHeightComponent element={ref}>
                <Grid item xs={12} sx={{ p: 1 }}>
                  {contact.stories?.map((story) => {
                    return <StoryListItem key={story.id} story={story} createMode={createMode} setCreateMode={setCreateMode} />
                  })}
                </Grid>
              </MatchingHeightComponent>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}