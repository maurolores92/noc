import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useState } from 'react'

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
    <Container maxWidth='sm'>
      <Typography variant='h1' sx={{ fontSize: '30px' }}>
        Calculadora de IP
      </Typography>
      <TextField
        label='IP Address'
        value={ipAddress}
        onChange={e => setIpAddress(e.target.value)}
        placeholder='IP Address'
        sx={{ width: '100%', marginTop: '2rem' }}
      />
      <FormControl sx={{ width: '100%', marginTop: '2rem' }}>
        <InputLabel id='subnet-mask-label'>Subnet Mask</InputLabel>
        <Select labelId='subnet-mask-label' value={subnetMask} onChange={e => setSubnetMask(e.target.value as string)}>
          <MenuItem value=''>Select Subnet Mask</MenuItem>
          {subnetMaskOptions.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button onClick={calculateDetails} variant='contained' color='primary' fullWidth sx={{ marginTop: '2rem' }}>
        Calcular
      </Button>

      {ipDetails && (
        <Box>
          <Typography variant='body1'>IP Address: {ipDetails.ipAddress}</Typography>
          <Typography variant='body1'>Network Address: {ipDetails.networkAddress}</Typography>
          <Typography variant='body1'>Usable Host IP Range: {ipDetails.usableHostIPRange}</Typography>
          <Typography variant='body1'>Broadcast Address: {ipDetails.broadcastAddress}</Typography>
          <Typography variant='body1'>Total Number of Hosts: {ipDetails.totalNumberOfHosts}</Typography>
          <Typography variant='body1'>Number of Usable Hosts: {ipDetails.numberOfUsableHosts}</Typography>
          <Typography variant='body1'>Subnet Mask: {ipDetails.subnetMask}</Typography>
          <Typography variant='body1'>Wildcard Mask: {ipDetails.wildcardMask}</Typography>
          <Typography variant='body1'>Binary Subnet Mask: {ipDetails.binarySubnetMask}</Typography>
          <Typography variant='body1'>IP Class: {ipDetails.ipClass}</Typography>
          <Typography variant='body1'>CIDR Notation: {ipDetails.cidrNotation}</Typography>
          <Typography variant='body1'>IP Type: {ipDetails.ipType}</Typography>
          <Typography variant='body1'>Short: {ipDetails.short}</Typography>
          <Typography variant='body1'>Binary ID: {ipDetails.binaryID}</Typography>
          <Typography variant='body1'>Integer ID: {ipDetails.integerID}</Typography>
          <Typography variant='body1'>Hex ID: {ipDetails.hexID}</Typography>
          <Typography variant='body1'>InAddr Arpa: {ipDetails.inAddrArpa}</Typography>
          <Typography variant='body1'>IPv4 Mapped Address: {ipDetails.ipv4MappedAddress}</Typography>
          <Typography variant='body1'>IPv6to4 Prefix: {ipDetails.ipv6to4Prefix}</Typography>
        </Box>
      )}
    </Container>
  )
}

export default IPDetailsPage
