import { Avatar, Box, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography, AppBar, Chip, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { menuApp } from '../../config/menu';
import { useAuthStore } from '../../auth/authStore';

const anchoDrawer = 290;

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [abierto, setAbierto] = useState(false);
  const { usuario, limpiarSesion } = useAuthStore();
  const location = useLocation();
  const rolPrincipal = usuario?.roles?.[0];

  const opciones = useMemo(() => {
    if (!rolPrincipal) return [];
    return menuApp.filter((opcion) => opcion.roles.includes(rolPrincipal));
  }, [rolPrincipal]);

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ px: 2.5, py: 3 }}>
        <Typography sx={{ fontWeight: 900, color: 'primary.main' }}>RH WALWORTH</Typography>
        <Typography variant="caption" color="text.secondary">React + MUI</Typography>
      </Box>
      <Divider />
      <Box sx={{ px: 2.5, py: 2 }}>
        <Typography sx={{ fontWeight: 800 }}>{usuario?.full_name ?? usuario?.email}</Typography>
        <Chip size="small" label={rolPrincipal ?? 'sin rol'} sx={{ mt: 1, textTransform: 'capitalize' }} color="primary" />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{usuario?.department?.name ?? 'Sin departamento'}</Typography>
      </Box>
      <Divider />
      <List sx={{ px: 1.5, py: 1.5, flex: 1 }}>
        {opciones.map((opcion) => {
          const activo = location.pathname === opcion.ruta;
          return (
            <ListItemButton
              key={opcion.ruta}
              component={NavLink}
              to={opcion.ruta}
              onClick={() => setAbierto(false)}
              sx={{ mb: 0.5, borderRadius: 2, bgcolor: activo ? 'rgba(209,12,12,.08)' : 'transparent' }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: activo ? 'primary.main' : 'inherit' }}>{opcion.icono}</ListItemIcon>
              <ListItemText primary={opcion.etiqueta} primaryTypographyProps={{ fontWeight: activo ? 800 : 600 }} />
            </ListItemButton>
          );
        })}
      </List>
      <Box sx={{ p: 2 }}>
        <Button fullWidth variant="outlined" color="error" startIcon={<LogoutIcon />} onClick={limpiarSesion}>Cerrar sesión</Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="fixed" elevation={0} sx={{ width: { md: `calc(100% - ${anchoDrawer}px)` }, ml: { md: `${anchoDrawer}px` }, bgcolor: 'white', color: '#111827', borderBottom: '1px solid #e5e7eb' }}>
        <Toolbar>
          <IconButton edge="start" onClick={() => setAbierto(true)} sx={{ mr: 1.5, display: { md: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 900 }}>Sistema RH</Typography>
            <Typography variant="body2" color="text.secondary">Gestión de usuarios, permisos e incidencias</Typography>
          </Box>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <IconButton><NotificationsIcon /></IconButton>
            <Avatar sx={{ bgcolor: 'primary.main' }}>{(usuario?.full_name ?? usuario?.email ?? 'U').charAt(0)}</Avatar>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { md: anchoDrawer }, flexShrink: { md: 0 } }}>
        <Drawer variant="temporary" open={abierto} onClose={() => setAbierto(false)} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: anchoDrawer, boxSizing: 'border-box' } }}>
          {drawer}
        </Drawer>
        <Drawer variant="permanent" open sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { width: anchoDrawer, boxSizing: 'border-box', borderRight: '1px solid #e5e7eb' } }}>
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, width: { md: `calc(100% - ${anchoDrawer}px)` }, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
