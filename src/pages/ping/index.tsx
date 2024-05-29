import React, { useState, useEffect } from 'react'
import {
  TextField,
  Button,
  Typography,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid
} from '@mui/material'

const PingPage: React.FC = () => {
  const [ipAddress, setIpAddress] = useState<string>('')
  const [pingResults, setPingResults] = useState<any[]>([])
  const [pingCount, setPingCount] = useState<number>(0)
  const [startPing, setStartPing] = useState<boolean>(false)
  const [pingInterval, setPingInterval] = useState<number>(1000) // Nuevo estado para el intervalo de ping

  const handlePing = async () => {
    try {
      const response = await fetch(`/api/ping?ip=${ipAddress}`)
      if (response.ok) {
        const data = await response.json()
        setPingResults(prevResults => {
          const newResults = [data, ...prevResults]

          // Añadimos una línea en blanco antes de la declaración de retorno
          return newResults.slice(0, 15)
        })
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
      intervalId = setInterval(() => {
        if (pingCount) {
          handlePing()
        } else {
          if (intervalId) clearInterval(intervalId)
        }
      }, pingInterval) // Usamos el estado pingInterval para el intervalo de ping
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [ipAddress, pingCount, startPing, pingInterval]) // Agregamos pingInterval a las dependencias del useEffect

  const stopPing = () => {
    setStartPing(false)
  }

  return (
    <Container maxWidth='md'>
      <Typography variant='h1' sx={{ fontSize: '30px' }} gutterBottom>
        Ping IP Address
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label='IP Address'
            variant='outlined'
            value={ipAddress}
            onChange={event => setIpAddress(event.target.value)}
            fullWidth
            required
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
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
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            onClick={() => {
              setStartPing(false)
              setPingResults([])
              setPingCount(0)
              setTimeout(() => setStartPing(true), 0)
            }}
            variant='contained'
            color='primary'
            fullWidth
          >
            Ping
          </Button>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button onClick={stopPing} variant='contained' color='secondary' fullWidth>
            Parar
          </Button>
        </Grid>
      </Grid>
      {pingResults.map((result, index) => (
        <div key={index}>
          <Typography variant='body1' gutterBottom>
            {result.alive ? `Ping successful tiempo= ${result.time}ms` : 'Host is unreachable'}
          </Typography>
        </div>
      ))}
    </Container>
  )
}

export default PingPage
