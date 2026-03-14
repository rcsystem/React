import { Badge, Description, Groups, SupervisorAccount } from '@mui/icons-material';
import { alpha, Box, Card, CardContent, Chip, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const resumen = [
  { titulo: 'Permisos pendientes', valor: '18', subtitulo: 'Solicitudes por revisar hoy', icono: <Description color="error" /> },
  { titulo: 'Inasistencias registradas', valor: '4', subtitulo: 'Incidencias del día', icono: <Badge color="error" /> },
  { titulo: 'Usuarios activos', valor: '286', subtitulo: 'Personal con acceso al sistema', icono: <Groups color="error" /> },
  { titulo: 'Autorizadores disponibles', valor: '12', subtitulo: 'Gerentes, directores y RH', icono: <SupervisorAccount color="error" /> },
];

const permisos = [
  { folio: 'PER-2026-0012', empleado: 'Rafael Cruz', tipo: 'Entrada personal', fecha: '2026-03-14', estado: 'Pendiente' },
  { folio: 'PER-2026-0013', empleado: 'María López', tipo: 'Salida laboral', fecha: '2026-03-14', estado: 'Aprobado' },
  { folio: 'PER-2026-0014', empleado: 'Carlos Medina', tipo: 'Salida personal', fecha: '2026-03-15', estado: 'Pendiente' },
];

export function DashboardPage() {
  return (
    <Stack spacing={3}>
      <Grid container spacing={2.5}>
        {resumen.map((item) => (
          <Grid size={{ xs: 12, sm: 6, xl: 3 }} key={item.titulo}>
            <Card sx={{ borderRadius: 4, boxShadow: '0 8px 30px rgba(15,23,42,.06)' }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>{item.titulo}</Typography>
                    <Typography variant="h4" sx={{ mt: 1, fontWeight: 900 }}>{item.valor}</Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: '#94a3b8' }}>{item.subtitulo}</Typography>
                  </Box>
                  <Box sx={{ width: 52, height: 52, borderRadius: 3, display: 'grid', placeItems: 'center', bgcolor: alpha('#d10c0c', 0.08) }}>{item.icono}</Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card sx={{ borderRadius: 4, boxShadow: '0 8px 30px rgba(15,23,42,.06)' }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 900 }}>Permisos recientes</Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>Resumen operativo para autorizadores y RH.</Typography>
            </Box>
            <Chip label="Hoy" color="error" variant="outlined" />
          </Stack>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Folio</TableCell>
                  <TableCell>Empleado</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Estado</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {permisos.map((permiso) => (
                  <TableRow key={permiso.folio} hover>
                    <TableCell>{permiso.folio}</TableCell>
                    <TableCell>{permiso.empleado}</TableCell>
                    <TableCell>{permiso.tipo}</TableCell>
                    <TableCell>{permiso.fecha}</TableCell>
                    <TableCell>{permiso.estado}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Stack>
  );
}
