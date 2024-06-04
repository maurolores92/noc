import React, { useState } from 'react'
import { Container, Button, Grid, TextField } from '@mui/material'

const API_URL = 'https://noc-backend.glitch.me'

const ConnectMikrotik = (): React.ReactElement => {
  const [ip, setIp] = useState<string>('')
  const [port, setPort] = useState<string>('')
  const [user, setUser] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleConnect = async () => {
    try {
      const response = await fetch(`${API_URL}/connectMikrotik`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ip,
          port,
          user,
          password
        })
      })

      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container maxWidth='sm'>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <TextField
            label='Host'
            variant='outlined'
            value={ip}
            onChange={event => setIp(event.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label='Puerto'
            variant='outlined'
            value={port}
            onChange={event => setPort(event.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Usuario'
            variant='outlined'
            value={user}
            onChange={event => setUser(event.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Contraseña'
            variant='outlined'
            value={password}
            onChange={event => setPassword(event.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' color='primary' onClick={handleConnect}>
            Conectar
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}
export default ConnectMikrotik
