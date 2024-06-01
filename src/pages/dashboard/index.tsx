import { Container, Button, Typography, Grid } from '@mui/material'
import Link from 'next/link'

const Home = () => {
  return (
    <Container maxWidth='lg' sx={{ margin: '0 auto', textAlign: 'center' }}>
      <Grid container spacing={2} justifyContent='center'>
        <Grid xs={12} lg={3} sx={{ margin: '1rem 0' }}>
          <Link href='/ubiquiti'>
            <Button variant='contained' color='primary' sx={{ margin: '1rem', width: '160px' }}>
              Ubiquiti
            </Button>
          </Link>
        </Grid>
        <Grid xs={12} lg={9} sx={{ margin: '1rem 0' }}>
          <Typography fontWeight={900} sx={{ textAlign: 'justify' }}>
            1. Monitoreo de Antenas Ubiquiti:{' '}
          </Typography>
          <Typography sx={{ textAlign: 'justify' }}>
            Con esta herramienta, puedes conectarte a las antenas Ubiquiti de tu red y obtener información sobre su
            estado y rendimiento. Puedes verificar si las antenas están conectadas, ver el tráfico de red, la calidad de
            la señal y otros detalles importantes para el mantenimiento y monitoreo de la red.
          </Typography>
        </Grid>

        <Grid xs={12} lg={3} sx={{ margin: '1rem 0' }}>
          <Link href='/ping'>
            <Button variant='contained' color='primary' sx={{ margin: '1rem', width: '160px' }}>
              Ping
            </Button>
          </Link>
        </Grid>
        <Grid xs={12} lg={9} sx={{ margin: '1rem 0' }}>
          <Typography fontWeight={900} sx={{ textAlign: 'justify' }}>
            2. Herramienta de Ping:{' '}
          </Typography>
          <Typography sx={{ textAlign: 'justify' }}>
            Con esta herramienta, puedes ingresar una dirección IP y verificar si responde a los paquetes de ping desde
            internet. Esto es útil para verificar la conectividad de red y determinar si un dispositivo o servidor está
            accesible desde la web.
          </Typography>
        </Grid>

        <Grid xs={12} lg={3} sx={{ margin: '1rem 0' }}>
          <Link href='/calculatorIp'>
            <Button variant='contained' color='primary' sx={{ margin: '1rem', width: '160px' }}>
              Calculadora IP
            </Button>
          </Link>
        </Grid>
        <Grid xs={12} lg={9} sx={{ margin: '1rem 0' }}>
          <Typography fontWeight={900} sx={{ textAlign: 'justify' }}>
            3. Calculadora de Subredes:{' '}
          </Typography>
          <Typography sx={{ textAlign: 'justify' }}>
            La calculadora de subredes te permite ingresar una dirección IP y una máscara de subred en formato CIDR
            (/xx) y calcular detalles importantes sobre esa subred, como la dirección de red, la dirección de broadcast,
            el rango de direcciones IP utilizables, el número total de hosts y más. Esto es útil para la planificación y
            configuración de redes.
          </Typography>
        </Grid>

        <Grid xs={12} lg={3} sx={{ margin: '1rem 0' }}>
          <Link href='/mac'>
            <Button variant='contained' color='primary' sx={{ margin: '1rem', width: '160px' }}>
              MAC Vendors
            </Button>
          </Link>
        </Grid>
        <Grid xs={12} lg={9} sx={{ margin: '1rem 0' }}>
          <Typography fontWeight={900} sx={{ textAlign: 'justify' }}>
            4. Consulta de Fabricante de MAC:{' '}
          </Typography>
          <Typography sx={{ textAlign: 'justify' }}>
            Esta herramienta te permite ingresar una dirección MAC y obtener el fabricante correspondiente de ese
            dispositivo. Es útil para identificar el origen de un dispositivo de red basado en su dirección MAC, lo que
            puede ayudarte en la administración y solución de problemas de la red.
          </Typography>
        </Grid>

        <Grid xs={12} lg={3} sx={{ margin: '1rem 0' }}>
          <Link href='/miIp'>
            <Button variant='contained' color='primary' sx={{ margin: '1rem', width: '160px' }}>
              Mi IP
            </Button>
          </Link>
        </Grid>
        <Grid xs={12} lg={9} sx={{ margin: '1rem 0' }}>
          <Typography fontWeight={900} sx={{ textAlign: 'justify' }}>
            5. Mi IP:
          </Typography>
          <Typography sx={{ textAlign: 'justify' }}>
            Esta herramienta simple te proporciona la dirección IP pública a través de la cual tu dispositivo se conecta
            a internet. Es útil para conocer la dirección IP que se asigna a tu conexión externa y puede ser útil en
            situaciones donde necesitas acceder a dispositivos o servicios externos que requieren tu dirección IP
            pública para la autorización o configuración. Además, puede ser útil para fines de resolución de problemas
            de red, ya que te proporciona información sobre tu conexión externa sin tener que buscarla en otros lugares.
          </Typography>
        </Grid>

        <Grid xs={12} lg={3} sx={{ margin: '1rem 0' }}>
          <Link href='/whois'>
            <Button variant='contained' color='primary' sx={{ margin: '1rem', width: '160px' }}>
              Whois
            </Button>
          </Link>
        </Grid>
        <Grid xs={12} lg={9} sx={{ margin: '1rem 0' }}>
          <Typography fontWeight={900} sx={{ textAlign: 'justify' }}>
            6. Identificación de Propietario de IP Pública:
          </Typography>
          <Typography sx={{ textAlign: 'justify' }}>
            Esta herramienta te permite ingresar una dirección IP pública y obtener información sobre su propietario
            registrado. Es útil para identificar la organización o entidad asociada con una dirección IP pública
            específica, lo que puede ser útil para investigaciones de seguridad o para fines de cumplimiento legal.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home
