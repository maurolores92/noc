import React, { useState } from 'react'
import axios from 'axios'
import { TextField, Button, Typography, Container, Box } from '@mui/material'

const PingPage: React.FC = () => {
  const [ipAddress, setIpAddress] = useState('')
  const [pingResult, setPingResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handlePing = async () => {
    setLoading(true)
    setPingResult(null)

    try {
      const response = await axios.post('/api/ping', { ip: ipAddress })

      const result = response.data

      setPingResult(result.message)
    } catch (error) {
      setPingResult('Failed to ping the IP address')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth='sm'>
      <Box>
        <Typography variant='h4' gutterBottom>
          Ping an IP Address
        </Typography>
        <TextField
          label='IP Address'
          value={ipAddress}
          onChange={e => setIpAddress(e.target.value)}
          fullWidth
          margin='normal'
        />
        <Button variant='contained' color='primary' fullWidth onClick={handlePing} disabled={loading}>
          {loading ? 'Pinging...' : 'Ping'}
        </Button>
        {pingResult && (
          <Typography variant='h6' color='textSecondary' gutterBottom>
            Result: {pingResult}
          </Typography>
        )}
      </Box>
    </Container>
  )
}

export default PingPage
