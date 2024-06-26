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
  ListItemText,
  Divider
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

interface SystemState {
  'dhcpd.1.start'?: string
  'dhcpd.1.end'?: string
  [key: string]: string | undefined
}

const API_URL = 'https://noc-backend.glitch.me'

const UploadPage: React.FC = () => {
  const [ip, setIp] = useState<string>('')
  const [port, setPort] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [connectionStatus, setConnectionStatus] = useState<string>('')
  const [info, setInfo] = useState<InfoState>({})
  const [system, setSystem] = useState<SystemState>({})
  const [showInfo, setShowInfo] = useState<boolean>(false)
  const [autoConnect, setAutoConnect] = useState<boolean>(false)
  const [dhcpLeasesInfo, setDhcpLeasesInfo] = useState({
    timestamp: '',
    macAddress: '',
    ipAddress: '',
    deviceName: '',
    id: ''
  })

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoConnect) {
        handleInfo()
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [autoConnect])

  const handleConnect = async () => {
    try {
      const response = await fetch(`${API_URL}/connect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ip,
          port,
          username,
          password
        })
      })

      if (response.ok) {
        setConnectionStatus('Conectado con éxito')
        setShowInfo(true) // Muestra la información después de una conexión exitosa
        await handleInfo() // Llama a handleInfo después de una conexión exitosa
        await handleGetDhcpLeases() // Llama a handleGetDhcpLeases después de una conexión exitosa
        await handleSystemConfig()
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

  const handleGetDhcpLeases = async () => {
    try {
      const response = await fetch(`${API_URL}/dhcpLeases`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Error getting DHCP leases')
      }

      const data = await response.json()

      // Split by space
      const parts = data.message.split(' ')

      // Create an object with the information
      const newDhcpLeasesInfo = {
        timestamp: parts[0],
        macAddress: parts[1],
        ipAddress: parts[2],
        deviceName: parts[3],
        id: parts[4]
      }

      // Actualiza el estado con la nueva información
      setDhcpLeasesInfo(newDhcpLeasesInfo)
    } catch (error) {
      console.error('Error getting DHCP leases:', error)
    }
  }

  const handleSystemConfig = async () => {
    try {
      const response = await fetch(`${API_URL}/systemConfig`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Error getting system config')
      }

      const data = await response.json()

      if (typeof data.message !== 'string') {
        throw new Error('Unexpected response format')
      }

      // Split by newline first to get each line, then split by '=' to get key-value pairs
      const lines = data.message.split('\n')

      const system = lines.reduce((obj: SystemState, line: string) => {
        const [key, value] = line.split('=')
        if (key && value) {
          obj[key.trim()] = value.trim()
        }

        return obj
      }, {})

      // Only keep the keys that you're interested in
      const keys = ['dhcpd.1.start', 'dhcpd.1.end']
      const filteredSystem = keys.reduce((obj: SystemState, key: string) => {
        if (key in system) {
          obj[key] = system[key]
        } else {
          obj[key] = 'Error'
        }

        return obj
      }, {})

      setSystem(filteredSystem)
    } catch (error) {
      console.error('Error getting system config:', error)
      setSystem({
        'dhcpd.1.start': 'Error',
        'dhcpd.1.end': 'Error'
      })
    }
  }

  const handleInfo = async () => {
    try {
      const response = await fetch(`${API_URL}/info`, {
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
      const response = await fetch(`${API_URL}/download`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error('Failed to download:', error)
    }
  }

  const handleReboot = async () => {
    try {
      const response = await fetch(`${API_URL}/reboot`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error('Failed to reboot:', error)
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
        <Grid item xs={12} lg={8}>
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
        <Grid item xs={12} lg={4}>
          <TextField
            label='Port'
            variant='outlined'
            value={port}
            onChange={event => setPort(event.target.value)}
            fullWidth
            required
            margin='normal'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            label='Usuario'
            variant='outlined'
            value={username}
            onChange={event => setUsername(event.target.value)}
            fullWidth
            required
            margin='normal'
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            label='Contraseña'
            variant='outlined'
            value={password}
            onChange={event => setPassword(event.target.value)}
            fullWidth
            required
            margin='normal'
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            onClick={handleConnect}
            variant='contained'
            color='primary'
            sx={{ margin: '1.5rem 0', width: '100%' }}
          >
            Conectar
          </Button>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center' }}>
          <Button
            variant='contained'
            onClick={handleDownload}
            color='secondary'
            sx={{ margin: '1.5rem 0', width: '100%' }}
          >
            Bandwith
          </Button>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center' }}>
          <Button
            variant='contained'
            onClick={handleReboot}
            color='secondary'
            sx={{ margin: '1.5rem 0', width: '100%' }}
          >
            Reiniciar
          </Button>
        </Grid>
        <Box sx={{ width: '100%' }}>
          {connectionStatus && (
            <Box>
              <Typography variant='h4' align='center' gutterBottom>
                {connectionStatus}
              </Typography>
            </Box>
          )}
          {showInfo && info && (
            <Box sx={{ width: '100%' }}>
              <List component='nav' aria-label='main mailbox' sx={{ width: '100%' }}>
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
              <Divider sx={{ m: '0 !important' }} />
              <Typography variant='h5' sx={{ margin: '1rem auto', textAlign: 'center' }}>
                Dhcp Leases
              </Typography>
              <List component='nav' aria-label='main mailbox' sx={{ margin: '1rem' }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Icon icon='material-symbols:factory-outline' fontSize={20} />
                    </ListItemIcon>
                    <ListItemText primary='Hostname:' />
                  </ListItemButton>
                  <Typography variant='body1'> {dhcpLeasesInfo.deviceName}</Typography>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Icon icon='carbon:mac' fontSize={20} />
                    </ListItemIcon>
                    <ListItemText primary='MAC Cliente:' />
                  </ListItemButton>
                  <Typography variant='body1'> {dhcpLeasesInfo.macAddress.toUpperCase()}</Typography>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Icon icon='mdi:ip' fontSize={20} />
                    </ListItemIcon>
                    <ListItemText primary='Dirección IP Cliente:' />
                  </ListItemButton>
                  <Typography variant='body1'> {dhcpLeasesInfo.ipAddress}</Typography>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Icon icon='mdi:ip' fontSize={20} />
                    </ListItemIcon>
                    <ListItemText primary='Ip inicio - fin:' />
                  </ListItemButton>
                  <Typography variant='body1'>
                    {system['dhcpd.1.start']} - {system['dhcpd.1.end']}
                  </Typography>
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
