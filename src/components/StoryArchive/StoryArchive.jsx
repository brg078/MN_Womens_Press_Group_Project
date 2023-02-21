import React, { useState } from 'react'

// libraries
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';

// components
import { Box, Typography, TextField } from '@mui/material';
import StoryListItem from '../StoryListItem/StoryListItem';
import SortFilterSearch from '../../assets/SortFilterSearch/SortFilterSearch'

export default function StoryArchive() {

  const allStories = useSelector(store => store.stories.allStories)
  // console.log('all stories: ', allStories)

  const archiveStories = allStories.length ? allStories.filter(story => DateTime.fromISO(story.publication_date) < DateTime.now()) : [];

  // console.log('archiveStories[0].publication_date', archiveStories[0]?.publication_date);
  // console.log('archiveStories[0].publication_date past?', DateTime.fromISO(archiveStories[0]?.publication_date)< DateTime.now())

  //* ================= SORT/FILTER/SEARCH STUFF ===============

  // initialize all variables
  const [searchTerm, setSearchTerm] = useState('');
  const [sortMethod, setSortMethod] = useState('date');
  const [sortDirection, setSortDirection] = useState('ascending')
  const [filterMethod, setFilterMethod] = useState('all');
  const sortOptions = ['date', 'title']
  const filterOptions = ['all', 'recent',]

  const filterResults = (arr) => {
    switch (filterMethod) {
      case 'all':
        return arr;
        break;
      // recent sets to the past three months
      case 'recent':
        return arr.filter(story => story.publication_date > DateTime.now().minus({ months: 3 }))
        break;
      default:
        return arr
    }
  }

  const ascDesc = (arr) => sortDirection === 'ascending' ? arr : arr.reverse()

  const sortResults = (arr) => {

    switch (sortMethod) {
      case 'date':
        return arr.sort((a, b) => {
          if (DateTime.fromISO(a.publication_date) > DateTime.fromISO(b.publication_date)) return 1
          if (DateTime.fromISO(a.publication_date) < DateTime.fromISO(b.publication_date)) return -1
          else return 0
        })
      case 'title':
        return arr.sort((a, b) => {
          if (a.title > b.title) return 1
          if (a.title < b.title) return -1
          else return 0
        })
      default:
        return arr;
    }
  }

  const searchResults = (arr) => {
    function getContactsString(story) {
      return story.contacts.map(contact => contact?.name.toLowerCase()).join('')
    }

    function getTabsString(story) {
      return story.tags.map(tag => tag?.name.toLowerCase()).join('')
    }

    return arr.filter(story => story.title.toLowerCase().includes(searchTerm) || getContactsString(story).includes(searchTerm) || getTabsString(story).includes(searchTerm) || story.theme[0]?.name.toLowerCase().includes(searchTerm))
  }

  const storyResults = ascDesc(filterResults(sortResults(searchResults(archiveStories))))

  return (
    <Box>
      {/* sort, search, and filter methods */}
      {/* sort direction: {sortDirection} */}
      {/* asc/desc of stories: {ascDesc(archiveStories).map(story => story.title)} */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant='h4'>Stories </Typography>
        <SortFilterSearch
          sortOptions={sortOptions}
          filterOptions={filterOptions}
          sortMethod={sortMethod}
          setSortMethod={setSortMethod}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
          filterMethod={filterMethod}
          setFilterMethod={setFilterMethod}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </Box>
      {storyResults.map(story => {
        return (
          <StoryListItem key={story.id} story={story} />
        )
      })}
    </Box>
  )
}
