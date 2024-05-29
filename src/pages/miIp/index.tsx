import { Icon } from '@iconify/react'
import { Container, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const IPAddressDisplay = () => {
  const [ipAddress, setIPAddress] = useState(null)

  useEffect(() => {
    const getIPAddress = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json')
        const data = await response.json()
        setIPAddress(data.ip)
      } catch (error) {
        console.error('Failed to fetch IP address:', error)
      }
    }

    getIPAddress()
  }, [])

  return (
    <Container maxWidth='sm'>
      <Typography variant='h4' gutterBottom sx={{ textAlign: 'center' }}>
        Tu dirección IP es:
      </Typography>
      <List component='nav' aria-label='main mailbox' sx={{ margin: '3rem' }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Icon icon='carbon:enterprise' fontSize={20} />
            </ListItemIcon>
            <ListItemText primary='Tu IP:' />
          </ListItemButton>
          <Typography variant='body1'> {ipAddress}</Typography>
        </ListItem>
      </List>
    </Container>
  )
}

export default IPAddressDisplay
