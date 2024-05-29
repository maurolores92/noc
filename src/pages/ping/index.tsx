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
  Box
} from '@mui/material'
import { Icon } from '@iconify/react'

const PingPage: React.FC = () => {
  const [ipAddress, setIpAddress] = useState<string>('')
  const [pingResults, setPingResults] = useState<any[]>([])
  const [startPing, setStartPing] = useState<boolean>(false)
  const [pingInterval, setPingInterval] = useState<number>(1000)

  const handlePing = async () => {
    try {
      const response = await fetch(`/api/ping?ip=${ipAddress}`)
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setPingResults(prevResults => [data, ...prevResults].slice(0, 15))
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
  }, [ipAddress, startPing, pingInterval])

  const startPingHandler = () => {
    setPingResults([])
    setStartPing(true)
  }

  const stopPing = () => {
    setStartPing(false)
  }

  return (
    <Container maxWidth='md'>
      <Typography variant='h1' sx={{ fontSize: '30px' }} gutterBottom>
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
      {pingResults.map((result, index) => (
        <Fragment key={index}>
          <List component='nav' aria-label='main mailbox' sx={{ textAlign: 'center', margin: '0 auto' }}>
            <ListItem disablePadding>
              <ListItemIcon>
                <Icon icon='mdi:internet-protocol' fontSize={20} />
              </ListItemIcon>
              <ListItemText>
                {result.alive
                  ? `Ping successful tiempo= ${result.time}ms, bytes= ${result.output.match(/bytes=(\d+)/)[1]} bytes`
                  : 'Tiempo de espera agotado para esta solicitud.'}
              </ListItemText>
            </ListItem>
          </List>
        </Fragment>
      ))}
    </Container>
  )
}

export default PingPage
