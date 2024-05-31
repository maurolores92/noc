import React, { useState } from 'react'
import { TextField, Button, Typography, Container, Grid } from '@mui/material'

const UploadPage: React.FC = () => {
  const [ip, setIp] = useState<string>('')
  const [connectionStatus, setConnectionStatus] = useState<string>('')

  const handleConnect = async () => {
    try {
      const response = await fetch('https://chipped-sophisticated-grey.glitch.me/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ip, // usa la variable de estado ip
          port: '8889', // usa un valor vacío para el puerto
          username: '', // usa un valor vacío para el nombre de usuario
          password: '' // usa un valor vacío para la contraseña
        })
      })

      if (response.ok) {
        setConnectionStatus('Conectado con éxito')
      } else {
        setConnectionStatus('Error al conectar')
      }
    } catch (error) {
      console.error('Error connecting:', error)
      setConnectionStatus('Error al conectar')
    }
  }

  const handleUpload = async () => {
    try {
      const response = await fetch('https://chipped-sophisticated-grey.glitch.me/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ip, // usa la variable de estado ip
          port: '8889', // usa un valor vacío para el puerto
          username: '', // usa un valor vacío para el nombre de usuario
          password: '', // usa un valor vacío para la contraseña
          url: 'http://www.sawerin.com.ar/IPCam.apk' // la URL del archivo a descargar
        })
      })

      if (response.ok) {
        setConnectionStatus('Archivo descargado con éxito')
      } else {
        setConnectionStatus('Error al descargar el archivo')
      }
    } catch (error) {
      console.error('Error downloading file:', error)
      setConnectionStatus('Error al descargar el archivo')
    }
  }

  return (
    <Container maxWidth='sm'>
      <Typography variant='h1' sx={{ fontSize: '22px' }} gutterBottom>
        Prueba de Ancho de banda Ubiquiti
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <TextField
            label='IP Address'
            variant='outlined'
            value={ip}
            onChange={event => setIp(event.target.value)}
            fullWidth
            required
            margin='normal'
          />
        </Grid>
        <Grid item xs={3}>
          <TextField label='Port' variant='outlined' value='8889' fullWidth disabled margin='normal' />
        </Grid>
        <Grid item xs={2}>
          <Button onClick={handleConnect} variant='contained' color='primary' sx={{ margin: '1.5rem 0' }}>
            Conectar
          </Button>
        </Grid>
        {connectionStatus && (
          <Grid item xs={12}>
            <Typography variant='body1' align='center' gutterBottom>
              {connectionStatus}
            </Typography>
          </Grid>
        )}
        <Button onClick={handleUpload} variant='contained' color='primary' fullWidth>
          Upload
        </Button>
      </Grid>
    </Container>
  )
}

export default UploadPage
