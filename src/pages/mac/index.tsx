import React, { useState } from 'react'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import axios from 'axios'

const MacVendorLookup: React.FC = () => {
  const [macAddress, setMacAddress] = useState('')
  const [vendorInfo, setVendorInfo] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMacAddress(event.target.value)
  }

  const fetchVendorInfo = async () => {
    setError(null)
    setVendorInfo(null)

    try {
      const response = await axios.get(`http://localhost:3001/api/${macAddress}`)
      setVendorInfo(response.data)
    } catch (error) {
      setError('Failed to fetch vendor information. Please check the MAC address and try again.')
    }
  }

  return (
    <Container maxWidth='sm'>
      <Typography variant='h4' sx={{ margin: '2rem 0' }}>
        Búsqueda de proveedores de MAC
      </Typography>
      <TextField
        label='MAC Address'
        value={macAddress}
        onChange={handleInputChange}
        placeholder='Enter MAC Address'
        fullWidth
        sx={{ marginBottom: '1rem' }}
      />
      <Button variant='contained' color='primary' onClick={fetchVendorInfo} fullWidth>
        Proveedor de búsqueda
      </Button>
      {error && (
        <Typography variant='body1' color='error' sx={{ marginTop: '1rem' }}>
          {error}
        </Typography>
      )}
      {vendorInfo && (
        <Box sx={{ marginTop: '1rem' }}>
          <Typography variant='body1'>Informacion del proveedor: {vendorInfo}</Typography>
        </Box>
      )}
    </Container>
  )
}

export default MacVendorLookup
