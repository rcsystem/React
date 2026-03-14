import { useEffect, useState } from 'react';
import { clienteApi } from '../../api/clienteApi';
import { Box, Button, Card, CardContent, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';

interface UsuarioFila {
  id: number;
  full_name?: string;
  email: string;
  employee_number: string;
  department?: { name: string } | null;
  position?: { name: string } | null;
  is_active: boolean;
}

export function UsersPage() {
  const [usuarios, setUsuarios] = useState<UsuarioFila[]>([]);
  const [busqueda, setBusqueda] = useState('');

  const cargarUsuarios = async () => {
    const { data } = await clienteApi.get('/users', { params: { search: busqueda } });
    setUsuarios(data.data ?? []);
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" sx={{ mb: 2 }}>
          <Box>
            <Typography variant="h6">Usuarios</Typography>
            <Typography variant="body2" color="text.secondary">Alta, baja, edición y consulta de usuarios.</Typography>
          </Box>
          <Stack direction="row" spacing={1.5}>
            <TextField size="small" placeholder="Buscar usuario" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
            <Button variant="contained" onClick={cargarUsuarios}>Buscar</Button>
          </Stack>
        </Stack>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell>Número empleado</TableCell>
                <TableCell>Departamento</TableCell>
                <TableCell>Puesto</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarios.map((usuario) => (
                <TableRow key={usuario.id} hover>
                  <TableCell>{usuario.full_name}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>{usuario.employee_number}</TableCell>
                  <TableCell>{usuario.department?.name ?? '-'}</TableCell>
                  <TableCell>{usuario.position?.name ?? '-'}</TableCell>
                  <TableCell>{usuario.is_active ? 'Activo' : 'Inactivo'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
