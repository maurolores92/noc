import React, { Fragment, useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { Icon } from '@iconify/react'

const IndexPage: React.FC = () => {
  const [macAddress, setMacAddress] = useState<string>('')
  const [result, setResult] = useState<string>('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await fetch(`../api/${encodeURIComponent(macAddress)}`)
      if (response.ok) {
        const data = await response.text()
        setResult(data)
      } else {
        setResult('Not Found')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setResult('Error fetching data')
    }
  }

  return (
    <Container maxWidth='sm'>
      <Typography variant='h1' sx={{ fontSize: '30px' }} gutterBottom>
        Consulta de Propietario de MAC
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label='Dirección MAC'
          variant='outlined'
          value={macAddress}
          onChange={event => setMacAddress(event.target.value)}
          fullWidth
          required
          autoFocus
          margin='normal'
        />
        <Button type='submit' variant='contained' color='primary' fullWidth>
          Consultar
        </Button>
      </form>
      {result && (
        <Fragment>
          <List component='nav' aria-label='main mailbox' sx={{ margin: '3rem' }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Icon icon='carbon:enterprise' fontSize={20} />
                </ListItemIcon>
                <ListItemText primary='Fabricante:' />
              </ListItemButton>
              <Typography variant='body1'> {result}</Typography>
            </ListItem>
          </List>
        </Fragment>
      )}
    </Container>
  )
}

export default IndexPage
