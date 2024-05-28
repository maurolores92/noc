import { NextApiRequest, NextApiResponse } from 'next/types'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { mac } = req.query

  try {
    const response = await fetch(`https://api.macvendors.com/${encodeURIComponent(mac as string)}`)
    if (response.ok) {
      const data = await response.text()
      res.status(200).send(data)
    } else {
      res.status(404).send('Not Found')
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).send('Error fetching data')
  }
}
