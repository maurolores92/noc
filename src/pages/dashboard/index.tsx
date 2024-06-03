import { Icon } from '@iconify/react'
import { Button, Typography, Grid, CardContent, CardMedia, Card, Box } from '@mui/material'
import Link from 'next/link'

const Home = () => {
  return (
    <Grid
      container
      spacing={2}
      justifyContent='center'
      sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
    >
      <Grid item xs={12} sm={6} md={6} lg={4} sx={{ display: 'flex' }}>
        <Card sx={{ margin: '1rem 0', flex: '1' }}>
          <CardMedia
            component='img'
            height='180'
            image='/images/noc/Ubiquiti.jpg' // Reemplaza esto con la ruta de tu imagen
            alt='Ubiquiti'
          />
          <CardContent>
            <Typography fontWeight={900} sx={{ textAlign: 'justify' }}>
              1. Monitoreo de Antenas Ubiquiti:{' '}
            </Typography>
            <Typography sx={{ textAlign: 'justify' }}>
              Con esta herramienta, puedes conectarte a las antenas Ubiquiti de tu red y obtener información sobre su
              estado y rendimiento. Puedes verificar si las antenas están conectadas, ver el tráfico de red, la calidad
              de la señal y otros detalles importantes para el mantenimiento y monitoreo de la red.
            </Typography>
            <Box sx={{ textAlign: 'center' }}>
              <Link href='/ubiquiti'>
                <Button variant='contained' color='primary' sx={{ margin: '1rem auto', width: '180px' }}>
                  <Icon icon='cbi:ubiquiti' fontSize={20} />
                  <span style={{ marginLeft: '0.5rem' }}>Ubiquiti</span>
                </Button>
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={6} lg={4} sx={{ display: 'flex' }}>
        <Card sx={{ margin: '1rem 0', flex: '1' }}>
          <CardMedia
            component='img'
            height='180'
            image='/images/noc/ping.jpg' // Reemplaza esto con la ruta de tu imagen
            alt='ping'
          />
          <CardContent>
            <Typography fontWeight={900} sx={{ textAlign: 'justify' }}>
              2. Herramienta de Ping:{' '}
            </Typography>
            <Typography sx={{ textAlign: 'justify' }}>
              Con esta herramienta, puedes ingresar una dirección IP y verificar si responde a los paquetes de ping
              desde internet. Esto es útil para verificar la conectividad de red y determinar si un dispositivo o
              servidor está accesible desde la web.
            </Typography>
            <Box sx={{ textAlign: 'center' }}>
              <Link href='/ping'>
                <Button variant='contained' color='primary' sx={{ margin: '1rem', width: '180px' }}>
                  <Icon icon='tabler:user' fontSize={20} />
                  <span style={{ marginLeft: '0.5rem' }}>Ping</span>
                </Button>
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={6} lg={4} sx={{ display: 'flex' }}>
        <Card sx={{ margin: '1rem 0', flex: '1' }}>
          <CardMedia
            component='img'
            height='180'
            image='/images/noc/calculator-ip.webp' // Reemplaza esto con la ruta de tu imagen
            alt='calculator ip'
          />
          <CardContent>
            <Typography fontWeight={900} sx={{ textAlign: 'justify' }}>
              3. Calculadora de Subredes:{' '}
            </Typography>
            <Typography sx={{ textAlign: 'justify' }}>
              La calculadora de subredes te permite ingresar una dirección IP y una máscara de subred en formato CIDR
              (/xx) y calcular detalles importantes sobre esa subred, como la dirección de red, la dirección de
              broadcast, el rango de direcciones IP utilizables, el número total de hosts y más. Esto es útil para la
              planificación y configuración de redes.
            </Typography>
            <Box sx={{ textAlign: 'center' }}>
              <Link href='/calculatorIp'>
                <Button variant='contained' color='primary' sx={{ margin: '1rem', width: '180px' }}>
                  <Icon icon='ph:calculator' fontSize={20} />
                  <span style={{ marginLeft: '0.5rem' }}>Calculadora IP</span>
                </Button>
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={6} lg={4} sx={{ display: 'flex' }}>
        <Card sx={{ margin: '1rem 0', flex: '1' }}>
          <CardMedia
            component='img'
            height='180'
            image='/images/noc/MAC.jpeg' // Reemplaza esto con la ruta de tu imagen
            alt='mac address'
          />
          <CardContent>
            <Typography fontWeight={900} sx={{ textAlign: 'justify' }}>
              4. Consulta de Fabricante de MAC:{' '}
            </Typography>
            <Typography sx={{ textAlign: 'justify' }}>
              Esta herramienta te permite ingresar una dirección MAC y obtener el fabricante correspondiente de ese
              dispositivo. Es útil para identificar el origen de un dispositivo de red basado en su dirección MAC, lo
              que puede ayudarte en la administración y solución de problemas de la red.
            </Typography>
            <Box sx={{ textAlign: 'center' }}>
              <Link href='/mac'>
                <Button variant='contained' color='primary' sx={{ margin: '1rem', width: '180px' }}>
                  <Icon icon='carbon:mac' fontSize={20} />
                  <span style={{ marginLeft: '0.5rem' }}>MAC Vendors</span>
                </Button>
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={6} lg={4} sx={{ display: 'flex' }}>
        <Card sx={{ margin: '1rem 0', flex: '1' }}>
          <CardMedia
            component='img'
            height='180'
            image='/images/noc/ip.jpg' // Reemplaza esto con la ruta de tu imagen
            alt='ip'
          />
          <CardContent>
            <Typography fontWeight={900} sx={{ textAlign: 'justify' }}>
              5. Mi IP:
            </Typography>
            <Typography sx={{ textAlign: 'justify' }}>
              Esta herramienta simple te proporciona la dirección IP pública a través de la cual tu dispositivo se
              conecta a internet. Es útil para conocer la dirección IP que se asigna a tu conexión externa y puede ser
              útil en situaciones donde necesitas acceder a dispositivos o servicios externos que requieren tu dirección
              IP pública para la autorización o configuración.
            </Typography>
            <Box sx={{ textAlign: 'center' }}>
              <Link href='/miIp'>
                <Button variant='contained' color='primary' sx={{ margin: '1rem', width: '180px' }}>
                  <Icon icon='mdi:ip' fontSize={20} />
                  <span style={{ marginLeft: '0.5rem' }}>Mi IP</span>
                </Button>
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={6} lg={4} sx={{ display: 'flex' }}>
        <Card sx={{ margin: '1rem 0', flex: '1' }}>
          <CardMedia
            component='img'
            height='180'
            image='/images/noc/whois.jpg' // Reemplaza esto con la ruta de tu imagen
            alt='Ubiquiti'
          />
          <CardContent>
            <Typography fontWeight={900} sx={{ textAlign: 'justify' }}>
              6. Identificación de Propietario de IP Pública:
            </Typography>
            <Typography sx={{ textAlign: 'justify' }}>
              Esta herramienta te permite ingresar una dirección IP pública y obtener información sobre su propietario
              registrado. Es útil para identificar la organización o entidad asociada con una dirección IP pública
              específica, lo que puede ser útil para investigaciones de seguridad o para fines de cumplimiento legal.
            </Typography>
            <Box sx={{ textAlign: 'center' }}>
              <Link href='/whois'>
                <Button variant='contained' color='primary' sx={{ margin: '1rem', width: '180px' }}>
                  <Icon icon='hugeicons:office' fontSize={20} />
                  <span style={{ marginLeft: '0.5rem' }}>Whois</span>
                </Button>
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Home
