import React, { useState, useEffect, Fragment } from 'react'
import {
  TextField,
  Button,
  Typography,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Divider
} from '@mui/material'
import { Icon } from '@iconify/react'

const PingPage: React.FC = () => {
  const [ipAddress, setIpAddress] = useState<string>('')
  const [pingResults, setPingResults] = useState<any[]>([])
  const [startPing, setStartPing] = useState<boolean>(false)
  const [pingInterval, setPingInterval] = useState<number>(1000)

  const handlePing = async () => {
    try {
      const response = await fetch(`https://chipped-sophisticated-grey.glitch.me/ping/${ipAddress}`)
      if (response.ok) {
        const data = await response.json()
        setPingResults(prevResults => [data, ...prevResults]) // .slice(0, 9) ha sido removido
      } else {
        console.error('Error fetching ping result:', response.statusText)
      }
    } catch (error) {
      console.error('Error fetching ping result:', error)
    }
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    if (startPing) {
      handlePing() // Llama a handlePing inmediatamente cuando startPing se establece en true
      intervalId = setInterval(handlePing, pingInterval)
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [startPing, pingInterval]) // ipAddress ha sido removido de las dependencias

  const startPingHandler = () => {
    setPingResults([])
    setStartPing(true)
  }

  const stopPing = () => {
    setStartPing(false)
  }

  return (
    <Container maxWidth='md'>
      <Typography variant='h1' sx={{ fontSize: '20px' }} gutterBottom>
        Ping IP Address
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <TextField
          label='IP Address'
          variant='outlined'
          value={ipAddress}
          onChange={event => setIpAddress(event.target.value)}
          fullWidth
          required
          autoFocus
        />
        <FormControl fullWidth sx={{ width: '40%', marginLeft: '1rem' }}>
          <InputLabel id='ping-interval-label'>Ping Interval</InputLabel>
          <Select
            labelId='ping-interval-label'
            value={pingInterval}
            onChange={event => setPingInterval(event.target.value as number)}
          >
            <MenuItem value={250}>250ms</MenuItem>
            <MenuItem value={500}>500ms</MenuItem>
            <MenuItem value={700}>700ms</MenuItem>
            <MenuItem value={1000}>1000ms</MenuItem>
          </Select>
        </FormControl>
        <Button
          onClick={startPingHandler}
          variant='contained'
          color='primary'
          sx={{ margin: '0 1rem', padding: '0 2rem' }}
        >
          Ping
        </Button>
        <Button onClick={stopPing} variant='contained' color='secondary' sx={{ margin: '0 1rem', padding: '0 2rem' }}>
          Parar
        </Button>
      </Box>
      <Box sx={{ height: '410px' }}>
        <List component='nav' aria-label='main mailbox' sx={{ textAlign: 'center', margin: '0 auto' }}>
          {pingResults.slice(0, 9).map((result, index) => (
            <Fragment key={index}>
              <List component='nav' aria-label='main mailbox' sx={{ textAlign: 'center', margin: '0 auto' }}>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <Icon icon='mdi:internet-protocol' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText>
                    {result.alive
                      ? `Ping successful tiempo= ${Number(result.time).toFixed(1)}ms, bytes= ${
                          (result.output.match(/(\d+) bytes from/) || [])[1] || 'N/A'
                        } bytes, TTL= ${(result.output.match(/ttl=(\d+)/) || [])[1] || 'N/A'}`
                      : 'Tiempo de espera agotado para esta solicitud.'}
                  </ListItemText>
                </ListItem>
              </List>
            </Fragment>
          ))}
        </List>
      </Box>
      <Divider sx={{ m: '0 !important' }} />
      {pingResults.length > 0 && (
        <Box sx={{ marginTop: '1rem' }}>
          <Fragment>
            <Typography variant='h4' fontWeight={800}>
              Estadísticas de ping:
            </Typography>
            <List component='nav' aria-label='main mailbox' sx={{ textAlign: 'center', margin: '0 auto' }}>
              <ListItem disablePadding>
                <ListItemIcon>
                  <Icon icon='mdi:internet-protocol' fontSize={20} />
                </ListItemIcon>
                <ListItemText>
                  Paquetes: enviados = {pingResults.length}, recibidos ={' '}
                  {pingResults.filter(result => result.alive).length}
                </ListItemText>
              </ListItem>
            </List>
            <List component='nav' aria-label='main mailbox' sx={{ textAlign: 'center', margin: '0 auto' }}>
              <ListItem disablePadding>
                <ListItemIcon>
                  <Icon icon='mdi:internet-protocol' fontSize={20} />
                </ListItemIcon>
                <ListItemText>
                  Paquetes perdidos = {pingResults.filter(result => !result.alive).length} (
                  {((pingResults.filter(result => !result.alive).length / pingResults.length) * 100).toFixed(1)}% )
                </ListItemText>
              </ListItem>
            </List>
            <Typography sx={{ margin: '1rem 0' }}>Tiempos aproximados de ida y vuelta en ms:</Typography>
            <List component='nav' aria-label='main mailbox' sx={{ textAlign: 'center', margin: '0 auto' }}>
              <ListItem disablePadding>
                <ListItemIcon>
                  <Icon icon='mdi:internet-protocol' fontSize={20} />
                </ListItemIcon>
                <ListItemText>
                  Mínimo = {Math.min(...pingResults.filter(result => result.alive).map(result => Number(result.time)))}
                  ms
                </ListItemText>
              </ListItem>
            </List>
            <List component='nav' aria-label='main mailbox' sx={{ textAlign: 'center', margin: '0 auto' }}>
              <ListItem disablePadding>
                <ListItemIcon>
                  <Icon icon='mdi:internet-protocol' fontSize={20} />
                </ListItemIcon>
                <ListItemText>
                  Máximo = {Math.max(...pingResults.filter(result => result.alive).map(result => Number(result.time)))}
                  ms
                </ListItemText>
              </ListItem>
            </List>
            <List component='nav' aria-label='main mailbox' sx={{ textAlign: 'center', margin: '0 auto' }}>
              <ListItem disablePadding>
                <ListItemIcon>
                  <Icon icon='mdi:internet-protocol' fontSize={20} />
                </ListItemIcon>
                <ListItemText>
                  Media ={' '}
                  {(
                    pingResults
                      .filter(result => result.alive)
                      .reduce((total, result) => total + Number(result.time), 0) /
                    pingResults.filter(result => result.alive).length
                  ).toFixed(1)}
                  ms
                </ListItemText>
              </ListItem>
            </List>
          </Fragment>
        </Box>
      )}
    </Container>
  )
}

export default PingPage
