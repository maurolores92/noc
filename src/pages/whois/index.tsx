import React, { Fragment, useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { Icon } from '@iconify/react'

const WhoisLookup: React.FC = () => {
  const [ipAddress, setIpAddress] = useState<string>('')
  const [result, setResult] = useState<any>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await fetch(`/api/whois?ip=${encodeURIComponent(ipAddress)}`)
      if (response.ok) {
        const data = await response.json()
        setResult(data)
      } else {
        setResult('Not Found')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setResult('Error fetching data')
    }
  }

  return (
    <Container maxWidth='sm'>
      <Typography variant='h1' sx={{ fontSize: '30px' }} gutterBottom>
        Consulta de Propietario de IP
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label='Dirección IP'
          variant='outlined'
          value={ipAddress}
          onChange={event => setIpAddress(event.target.value)}
          fullWidth
          required
          autoFocus
          margin='normal'
        />
        <Button type='submit' variant='contained' color='primary' fullWidth>
          Consultar
        </Button>
      </form>
      {result && (
        <Fragment>
          <List component='nav' aria-label='main mailbox' sx={{ margin: '3rem' }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Icon icon='grommet-icons:host' fontSize={20} />
                </ListItemIcon>
                <ListItemText primary='Hostname: ' />
              </ListItemButton>
              <Typography variant='body1'>{result.hostname || 'Información no disponible'}</Typography>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Icon icon='hugeicons:property-view' fontSize={20} />
                </ListItemIcon>
                <ListItemText primary='Propietario:' />
              </ListItemButton>
              <Typography variant='body1'> {result.org || 'Información no disponible'}</Typography>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Icon icon='mdi:city' fontSize={20} />
                </ListItemIcon>
                <ListItemText primary=' Ciudad: ' />
              </ListItemButton>
              <Typography variant='body1'>{result.city || 'Información no disponible'}</Typography>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Icon icon='oui:vis-map-region' fontSize={20} />
                </ListItemIcon>
                <ListItemText primary=' Región: ' />
              </ListItemButton>
              <Typography variant='body1'> {result.region || 'Información no disponible'}</Typography>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Icon icon='gis:search-country' fontSize={20} />
                </ListItemIcon>
                <ListItemText primary='País: ' />
              </ListItemButton>
              <Typography variant='body1'>{result.country || 'Información no disponible'}</Typography>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Icon icon='clarity:organization-line' fontSize={20} />
                </ListItemIcon>
                <ListItemText primary='ORG: ' />
              </ListItemButton>
              <Typography variant='body1'>{result.org || 'Información no disponible'}</Typography>
            </ListItem>
          </List>
        </Fragment>
      )}
    </Container>
  )
}

export default WhoisLookup
