import { NextApiRequest, NextApiResponse } from 'next/types'
import ping from 'ping'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { ip } = req.query

  try {
    const result = await ping.promise.probe(ip as string)
    res.status(200).json(result)
  } catch (error) {
    console.error('Error pinging:', error)
    res.status(500).json({ error: 'Error pinging the IP address' })
  }
}
