import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useState } from 'react'

import { Fragment } from 'react'

// ** MUI Imports
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface IPDetails {
  ipAddress: string
  networkAddress: string
  usableHostIPRange: string
  broadcastAddress: string
  totalNumberOfHosts: number
  numberOfUsableHosts: number
  subnetMask: string
  wildcardMask: string
  binarySubnetMask: string
  ipClass: string
  cidrNotation: string
  ipType: string
  short: string
  binaryID: string
  integerID: number
  hexID: string
  inAddrArpa: string
  ipv4MappedAddress: string
  ipv6to4Prefix: string
}

const subnetMaskOptions = [
  '255.255.255.252/30',
  '255.255.255.248/29',
  '255.255.255.240/28',
  '255.255.255.224/27',
  '255.255.255.192/26',
  '255.255.255.128/25',
  '255.255.255.0/24',
  '255.255.254.0/23',
  '255.255.252.0/22',
  '255.255.248.0/21',
  '255.255.240.0/20',
  '255.255.224.0/19',
  '255.255.192.0/18',
  '255.255.128.0/17'
]

const IPDetailsPage: React.FC = () => {
  const [ipAddress, setIpAddress] = useState('')
  const [subnetMask, setSubnetMask] = useState('')
  const [ipDetails, setIpDetails] = useState<IPDetails | null>(null)

  const calculateDetails = () => {
    if (!ipAddress || !subnetMask) {
      console.error('Both IP address and subnet mask are required.')

      return
    }

    // Obtener el número de bits de la máscara de red
    const subnetBits = subnetMask.split('/').length > 1 ? parseInt(subnetMask.split('/')[1]) : null

    if (subnetBits === null) {
      console.error('Subnet bits are null.')

      return
    }

    // Calcular la máscara de red en formato de octeto
    const subnetMaskOctet = subnetMask
      .split('/')[0]
      .split('.')
      .map(octet => parseInt(octet))

    // Calcular la dirección IP en formato de octeto
    const ipAddressOctet = ipAddress.split('.').map(octet => parseInt(octet))

    // Calcular la dirección de red
    const networkAddressOctet = ipAddressOctet.map((value, index) => value & subnetMaskOctet[index])
    const networkAddress = networkAddressOctet.join('.')

    // Calcular el rango de IPs utilizable
    const firstUsableHost = networkAddressOctet.slice()
    firstUsableHost[3]++
    const lastUsableHost = networkAddressOctet.slice()
    lastUsableHost[3] += Math.pow(2, 32 - subnetBits) - 2
    const usableHostIPRange = `${firstUsableHost.join('.')} - ${lastUsableHost.join('.')}`

    // Calcular la dirección de broadcast
    const broadcastAddressOctet = networkAddressOctet.slice()
    broadcastAddressOctet[3] += Math.pow(2, 32 - subnetBits) - 1
    const broadcastAddress = broadcastAddressOctet.join('.')

    // Calcular el número total de hosts y el número de hosts utilizables
    const totalNumberOfHosts = Math.pow(2, 32 - subnetBits)
    const numberOfUsableHosts = totalNumberOfHosts - 2

    // Convertir la máscara de red a su forma binaria
    const binarySubnetMask = subnetMaskOctet.map(octet => octet.toString(2).padStart(8, '0')).join('.')

    // Definir el modelo de detalles de IP
    const details: IPDetails = {
      ipAddress,
      networkAddress,
      usableHostIPRange,
      broadcastAddress,
      totalNumberOfHosts,
      numberOfUsableHosts,
      subnetMask: subnetMask.split('/')[0],
      wildcardMask: subnetMaskOctet.map(octet => (255 - octet).toString()).join('.'),
      binarySubnetMask,
      ipClass: subnetBits === null ? '' : subnetBits < 8 ? 'A' : subnetBits < 16 ? 'B' : 'C',
      cidrNotation: subnetMask,
      ipType:
        ipAddressOctet[0] === 10 ||
        (ipAddressOctet[0] === 172 && ipAddressOctet[1] >= 16 && ipAddressOctet[1] <= 31) ||
        (ipAddressOctet[0] === 192 && ipAddressOctet[1] === 168)
          ? 'Private'
          : 'Public',
      short: `${ipAddress} ${subnetMask}`,
      binaryID: ipAddressOctet.map(octet => octet.toString(2).padStart(8, '0')).join(''),
      integerID: (ipAddressOctet[0] << 24) | (ipAddressOctet[1] << 16) | (ipAddressOctet[2] << 8) | ipAddressOctet[3],
      hexID: ipAddressOctet.map(octet => octet.toString(16).padStart(2, '0')).join(''),
      inAddrArpa: ipAddressOctet.reverse().join('.').concat('.in-addr.arpa'),
      ipv4MappedAddress: `::ffff:${ipAddressOctet.map(octet => octet.toString(16).padStart(2, '0')).join(':')}`,
      ipv6to4Prefix: `2002:${ipAddressOctet.map(octet => octet.toString(16).padStart(2, '0')).join(':')}::/48`
    }

    // Establecer los detalles de IP calculados
    setIpDetails(details)
  }

  return (
    <Container maxWidth='md'>
      <Typography variant='h1' sx={{ fontSize: '22px' }}>
        Calculadora de IP
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <TextField
          label='IP Address'
          value={ipAddress}
          onChange={e => setIpAddress(e.target.value)}
          placeholder='IP Address'
          sx={{ margin: '1rem', width: '300px' }}
        />
        <FormControl sx={{ margin: '1rem', width: '300px' }}>
          <InputLabel id='subnet-mask-label'>Mascara de Subred</InputLabel>
          <Select
            labelId='subnet-mask-label'
            value={subnetMask}
            onChange={e => setSubnetMask(e.target.value as string)}
          >
            <MenuItem value=''>Select Subnet Mask</MenuItem>
            {subnetMaskOptions.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={calculateDetails} variant='contained' color='primary' sx={{ margin: '1rem' }}>
          Calcular
        </Button>
      </Box>
      {ipDetails && (
        <Box>
          <Fragment>
            <List component='nav' aria-label='main mailbox'>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='ph:network' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='IP Address:' />
                </ListItemButton>
                <Typography variant='body1'> {ipDetails.ipAddress}</Typography>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='ph:network' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='Network Address:' />
                </ListItemButton>
                <Typography variant='body1'> {ipDetails.networkAddress}</Typography>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='ph:network' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='Rango de IP de host utilizable:' />
                </ListItemButton>
                <Typography variant='body1'> {ipDetails.usableHostIPRange}</Typography>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='ph:network' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='Broadcast Address:' />
                </ListItemButton>
                <Typography variant='body1'> {ipDetails.broadcastAddress}</Typography>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='ph:network' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='Número total de Hosts:' />
                </ListItemButton>
                <Typography variant='body1'> {ipDetails.totalNumberOfHosts}</Typography>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='ph:network' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='Número Utilizable de Hosts:' />
                </ListItemButton>
                <Typography variant='body1'> {ipDetails.numberOfUsableHosts}</Typography>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='ph:network' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='Máscara de subred:' />
                </ListItemButton>
                <Typography variant='body1'> {ipDetails.subnetMask}</Typography>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='ph:network' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='Mascara Wildcard:' />
                </ListItemButton>
                <Typography variant='body1'> {ipDetails.wildcardMask}</Typography>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='ph:network' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='Máscara de subred binaria:' />
                </ListItemButton>
                <Typography variant='body1'> {ipDetails.binarySubnetMask}</Typography>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='ph:network' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='Clase IP: ' />
                </ListItemButton>
                <Typography variant='body1'>{ipDetails.ipClass}</Typography>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='ph:network' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='Notación CIDR:' />
                </ListItemButton>
                <Typography variant='body1'> {ipDetails.cidrNotation}</Typography>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='ph:network' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='Tipo de IP: ' />
                </ListItemButton>
                <Typography variant='body1'>{ipDetails.ipType}</Typography>
              </ListItem>
            </List>

            <Divider sx={{ m: '0 !important' }} />

            <List component='nav' aria-label='secondary mailbox'>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='ph:network' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='Corto:' />
                </ListItemButton>
                <Typography variant='body1'> {ipDetails.short}</Typography>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='ph:network' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='ID Binaria: ' />
                </ListItemButton>
                <Typography variant='body1'>{ipDetails.binaryID}</Typography>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='ph:network' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='ID Entero:' />
                </ListItemButton>
                <Typography variant='body1'> {ipDetails.integerID}</Typography>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='ph:network' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='ID Hexadecimal:' />
                </ListItemButton>
                <Typography variant='body1'> {ipDetails.hexID}</Typography>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='ph:network' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='InAddr Arpa:' />
                </ListItemButton>
                <Typography variant='body1'> {ipDetails.inAddrArpa}</Typography>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='ph:network' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='IPv4 Mapped Address:' />
                </ListItemButton>
                <Typography variant='body1'> {ipDetails.ipv4MappedAddress}</Typography>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon icon='ph:network' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary='IPv6to4 Prefix:' />
                </ListItemButton>
                <Typography variant='body1'> {ipDetails.ipv6to4Prefix}</Typography>
              </ListItem>
            </List>
          </Fragment>
        </Box>
      )}
    </Container>
  )
}

export default IPDetailsPage
