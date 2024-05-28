import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next/types'

const apiKey = 'sDVxTQ6ba8d2667f142244958dc650eb303b4d33'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { ip } = req.body

  if (!ip) {
    return res.status(400).json({ message: 'IP address is required' })
  }

  try {
    const response = await axios.post('https://api.ping-api.com/ping', {
      api_key: apiKey,
      host: ip
    })

    const result = response.data

    if (result.status === 'success') {
      return res.status(200).json({ message: 'Responds' })
    } else {
      return res.status(200).json({ message: 'Does not respond' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Failed to ping the IP address' })
  }
}
