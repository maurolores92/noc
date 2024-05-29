import { NextApiRequest, NextApiResponse } from 'next/types'

const apiKey = 'c6214a27484fbc' // Reemplaza esto con tu token real de IPinfo.io

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { ip } = req.query

  if (!ip) {
    return res.status(400).json({ error: 'IP address is required' })
  }

  try {
    const response = await fetch(`https://ipinfo.io/${ip}/json?token=${apiKey}`)
    if (response.ok) {
      const data = await response.json()
      res.status(200).json(data)
    } else {
      res.status(response.status).json({ error: 'Failed to fetch data' })
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
