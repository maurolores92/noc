import React, { useEffect, useState } from 'react'

const IPAddressDisplay = () => {
  const [ipAddress, setIPAddress] = useState(null)

  useEffect(() => {
    const getIPAddress = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json')
        const data = await response.json()
        setIPAddress(data.ip)
      } catch (error) {
        console.error('Failed to fetch IP address:', error)
      }
    }

    getIPAddress()
  }, [])

  return (
    <div>
      <h2>Tu dirección IP es:</h2>
      <p>{ipAddress}</p>
    </div>
  )
}

export default IPAddressDisplay
