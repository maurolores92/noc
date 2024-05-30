import React, { useState } from 'react'
import { TextField, Button, Typography, Container, Box } from '@mui/material'

const UploadPage: React.FC = () => {
  const [ip, setIp] = useState<string>('')
  const [port, setPort] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [connectionStatus, setConnectionStatus] = useState<string>('')

  const handleConnect = async () => {
    try {
      const response = await fetch('https://chipped-sophisticated-grey.glitch.me/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ip, port, username, password })
      })

      if (response.ok) {
        setConnectionStatus('Conectado')
      } else {
        setConnectionStatus('No conectado')
      }
    } catch (error) {
      console.error('Error connecting:', error)
      setConnectionStatus('No conectado')
    }
  }

  const handleSubmit = async () => {
    // ... (tu código existente para manejar la subida del archivo)
  }

  return (
    <Container maxWidth='sm'>
      <Typography variant='h1' sx={{ fontSize: '22px' }} gutterBottom>
        Prueba de Ancho de banda Ubiquiti
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          label='IP Address'
          variant='outlined'
          value={ip}
          onChange={event => setIp(event.target.value)}
          fullWidth
          required
          margin='normal'
        />
        <TextField
          label='Port'
          variant='outlined'
          value={port}
          onChange={event => setPort(event.target.value)}
          fullWidth
          required
          margin='normal'
        />
        <TextField
          label='Username'
          variant='outlined'
          value={username}
          onChange={event => setUsername(event.target.value)}
          fullWidth
          required
          margin='normal'
        />
        <TextField
          label='Password'
          variant='outlined'
          value={password}
          onChange={event => setPassword(event.target.value)}
          fullWidth
          required
          margin='normal'
          type='password'
        />
        <Button onClick={handleConnect} variant='contained' color='primary' sx={{ margin: '1rem' }}>
          Conectar
        </Button>
      </Box>

      {connectionStatus && (
        <Typography variant='body1' align='center' gutterBottom>
          {connectionStatus}
        </Typography>
      )}
      <Button onClick={handleSubmit} variant='contained' color='primary' fullWidth>
        Upload
      </Button>
    </Container>
  )
}

export default UploadPage
