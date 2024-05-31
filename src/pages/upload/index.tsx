import React, { useEffect, useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { Icon } from '@iconify/react'

interface InfoState {
  deviceName?: string
  essid?: string
  freq?: string
  chain0Signal?: string
  chain1Signal?: string
  cpuUsage?: string
  distance?: string
  lanSpeed?: string
  deviceId?: string
  uptime?: string
  platform?: string
  wlanTxRate?: string
  wlanRxRate?: string
  [key: string]: string | undefined
}

const UploadPage: React.FC = () => {
  const [ip, setIp] = useState<string>('')
  const [connectionStatus, setConnectionStatus] = useState<string>('')
  const [info, setInfo] = useState<InfoState>({})
  const [showInfo, setShowInfo] = useState<boolean>(false)
  const [autoConnect, setAutoConnect] = useState<boolean>(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoConnect) {
        handleInfo()
      }
    }, 2000) // Actualiza cada segundo

    return () => clearInterval(interval) // Limpia el intervalo cuando el componente se desmonta
  }, [autoConnect])

  const handleConnect = async () => {
    try {
      const response = await fetch('https://chipped-sophisticated-grey.glitch.me/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ip // usa la variable de estado ip
          // El nombre de usuario y la contraseña están en el backend
        })
      })

      if (response.ok) {
        setConnectionStatus('Conectado con éxito')
        setShowInfo(true) // Muestra la información después de una conexión exitosa
        await handleInfo() // Llama a handleInfo después de una conexión exitosa
        setAutoConnect(true) // Inicia la conexión automática
      } else {
        setConnectionStatus('Error al conectar')
        setShowInfo(false) // Oculta la información si la conexión falla
      }
    } catch (error) {
      console.error('Error connecting:', error)
      setConnectionStatus('Error al conectar')
      setShowInfo(false) // Oculta la información si la conexión falla
    }
  }

  const handleInfo = async () => {
    try {
      const response = await fetch('https://chipped-sophisticated-grey.glitch.me/info', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Error getting info')
      }

      const data = await response.json()

      if (typeof data.message !== 'string') {
        throw new Error('Unexpected response format')
      }

      // Split by comma, space and newline
      const pairs = data.message.split(/,| |\n/)

      const info = pairs.reduce((obj: InfoState, pair: string) => {
        const [key, value] = pair.split('=')
        obj[key] = value

        return obj
      }, {})

      // Only keep the keys that you're interested in
      const keys = [
        'deviceName',
        'deviceId',
        'essid',
        'freq',
        'chain0Signal',
        'chain1Signal',
        'cpuUsage',
        'distance',
        'lanSpeed',
        'uptime',
        'platform',
        'wlanTxRate',
        'wlanRxRate'
      ]
      const filteredInfo = keys.reduce((obj: InfoState, key: string) => {
        obj[key] = info[key] || 'Error '

        return obj
      }, {})

      setInfo(filteredInfo)
    } catch (error) {
      console.error('Error getting info:', error)
      setInfo({
        deviceName: 'Error ',
        deviceId: '',
        essid: '',
        freq: '',
        chain0Signal: '',
        chain1Signal: '',
        cpuUsage: '',
        distance: '',
        lanSpeed: '',
        uptime: '',
        platform: '',
        wlanTxRate: '',
        wlanRxRate: ''
      })
    }
  }

  const handleDownload = async () => {
    try {
      await fetch('/download')
    } catch (error) {
      console.error('Failed to download file:', error)
    }
  }

  function formatTime(seconds: number) {
    const days = Math.floor(seconds / (24 * 60 * 60))
    seconds -= days * 24 * 60 * 60
    const hrs = Math.floor(seconds / (60 * 60))
    seconds -= hrs * 60 * 60
    const mnts = Math.floor(seconds / 60)
    seconds -= mnts * 60

    return `${days} days ${hrs}:${mnts}:${seconds}`
  }

  return (
    <Container maxWidth='sm'>
      <Typography variant='h1' sx={{ fontSize: '22px' }} gutterBottom>
        Prueba de Ancho de banda Ubiquiti
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={8} lg={5}>
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
        <Grid item xs={4} lg={3}>
          <TextField label='Port' variant='outlined' value='8889' fullWidth disabled margin='normal' />
        </Grid>
        <Grid item xs={6} lg={2}>
          <Button onClick={handleConnect} variant='contained' color='primary' sx={{ margin: '1.5rem 0' }}>
            Conectar
          </Button>
        </Grid>
        <Grid item xs={6} lg={2} sx={{ textAlign: 'center' }}>
          <Button variant='contained' onClick={handleDownload} color='secondary' sx={{ margin: '1.5rem 1rem' }}>
            Bandwith
          </Button>
        </Grid>
        <Box sx={{ margin: '0 auto' }}>
          {connectionStatus && (
            <Box>
              <Typography variant='h4' align='center' gutterBottom>
                {connectionStatus}
              </Typography>
            </Box>
          )}
          {showInfo && info && (
            <Box>
              <List component='nav' aria-label='main mailbox' sx={{ margin: '3rem' }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Icon icon='solar:devices-bold' fontSize={20} />
                    </ListItemIcon>
                    <ListItemText primary='Nombre del dispositivo:' />
                  </ListItemButton>
                  <Typography variant='body1'>{info.deviceName}</Typography>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Icon icon='carbon:machine-learning-model' fontSize={20} />
                    </ListItemIcon>
                    <ListItemText primary='Modelo: ' />
                  </ListItemButton>
                  <Typography variant='body1'>{info.platform}</Typography>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Icon icon='iconoir:antenna' fontSize={20} />
                    </ListItemIcon>
                    <ListItemText primary='Panel: ' />
                  </ListItemButton>
                  <Typography variant='body1'>{info.essid}</Typography>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Icon icon='carbon:mac' fontSize={20} />
                    </ListItemIcon>
                    <ListItemText primary='MAC: ' />
                  </ListItemButton>
                  <Typography variant='body1'>{info.deviceId}</Typography>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Icon icon='oui:app-uptime' fontSize={20} />
                    </ListItemIcon>
                    <ListItemText primary='Uptime: ' />
                  </ListItemButton>
                  <Typography variant='body1'>{info.uptime ? formatTime(Number(info.uptime)) : 'N/A'}</Typography>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Icon icon='tabler:antenna' fontSize={20} />
                    </ListItemIcon>
                    <ListItemText primary='Señal Tx: | Señal Rx' />
                  </ListItemButton>
                  <Typography variant='body1'>
                    {info.chain0Signal} | {info.chain1Signal}
                  </Typography>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Icon icon='uil:signal' fontSize={20} />
                    </ListItemIcon>
                    <ListItemText primary='Señal Tx: | Señal Rx' />
                  </ListItemButton>
                  <Typography variant='body1'>
                    {info.wlanTxRate}Mb | {info.wlanRxRate}Mb
                  </Typography>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Icon icon='uil:processor' fontSize={20} />
                    </ListItemIcon>
                    <ListItemText primary='Procesador:' />
                  </ListItemButton>
                  <Typography variant='body1'> {info.cpuUsage}%</Typography>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Icon icon='arcticons:frequency-generator' fontSize={20} />
                    </ListItemIcon>
                    <ListItemText primary='Frecuencia:' />
                  </ListItemButton>
                  <Typography variant='body1'> {info.freq}</Typography>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Icon icon='mdi:signal-distance-variant' fontSize={20} />
                    </ListItemIcon>
                    <ListItemText primary='Distancia del panel: ' />
                  </ListItemButton>
                  <Typography variant='body1'>{info.distance}metros</Typography>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Icon icon='teenyicons:lan-cable-solid' fontSize={20} />
                    </ListItemIcon>
                    <ListItemText primary='Linkeo LAN:' />
                  </ListItemButton>
                  <Typography variant='body1'> {info.lanSpeed}</Typography>
                </ListItem>
              </List>
            </Box>
          )}
        </Box>
      </Grid>
    </Container>
  )
}

export default UploadPage
