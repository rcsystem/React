import { Box, Button, Divider, IconButton, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { clienteApi } from '../../api/clienteApi';
import { useAuthStore } from '../../auth/authStore';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const [email, setEmail] = useState('admin@walworth.com.mx');
  const [password, setPassword] = useState('Admin12345');
  const [mostrar, setMostrar] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { establecerSesion } = useAuthStore();
  const navigate = useNavigate();

  const iniciarSesion = async () => {
    try {
      setCargando(true);
      setError(null);

      const { data } = await clienteApi.post('/auth/login', { email, password });
      establecerSesion(data.token, { ...data.user, roles: data.roles });
      navigate('/');
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'No fue posible iniciar sesión.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', bgcolor: '#f3f4f6' }}>
      <Box
        sx={{
          flex: 1.35,
          position: 'relative',
          display: { xs: 'none', md: 'block' },
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.86), rgba(255,255,255,.86)), url('../public/sie-login.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRight: '1px solid #e5e7eb',
        }}
      />

      <Box sx={{ minHeight: '100vh', flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', px: 3, py: 6, bgcolor: '#f9fafb' }}>
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: 520,
            p: { xs: 3, sm: 5 },
            borderRadius: 0,
            bgcolor: 'transparent',
          }}
        >
          <Stack spacing={3.5}>
            <Stack spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 92,
                  height: 92,
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <Box
                  component="img"
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Acceso"
                  sx={{ width: 72, height: 72, objectFit: 'contain' }}
                />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 500, color: '#4b5563', textAlign: 'center' }}>
                Sistema de Integración Empresarial
              </Typography>
            </Stack>

            <Stack spacing={2}>
              <TextField
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Usuario"
                variant="outlined"
                onKeyDown={(e) => e.key === 'Enter' && iniciarSesion()}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: '#9ca3af' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: 0,
                    bgcolor: '#dfe7f4',
                    height: 52,
                    '& fieldset': { borderColor: '#dfe7f4' },
                    '&:hover fieldset': { borderColor: '#cbd5e1' },
                    '&.Mui-focused fieldset': { borderColor: '#94a3b8' },
                  },
                }}
              />

              <TextField
                fullWidth
                type={mostrar ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                variant="outlined"
                onKeyDown={(e) => e.key === 'Enter' && iniciarSesion()}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: '#9ca3af' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setMostrar((v) => !v)} edge="end">
                        {mostrar ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: 0,
                    bgcolor: '#dfe7f4',
                    height: 52,
                    '& fieldset': { borderColor: '#dfe7f4' },
                    '&:hover fieldset': { borderColor: '#cbd5e1' },
                    '&.Mui-focused fieldset': { borderColor: '#94a3b8' },
                  },
                }}
              />

              {error ? (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              ) : null}

              <Button
                fullWidth
                variant="contained"
                onClick={iniciarSesion}
                disabled={cargando}
                sx={{
                  py: 1.5,
                  borderRadius: 0,
                  fontWeight: 800,
                  fontSize: '1.05rem',
                  textTransform: 'none',
                  bgcolor: '#1f3147',
                  boxShadow: 'none',
                  '&:hover': { bgcolor: '#18273a', boxShadow: 'none' },
                  '&:disabled': { bgcolor: '#94a3b8', color: 'white' },
                }}
              >
                {cargando ? 'Ingresando...' : 'Iniciar Sesión'}
              </Button>
            </Stack>

            <Typography sx={{ textAlign: 'center', color: '#0d6efd', fontWeight: 700, cursor: 'pointer' }}>
              Resetear contraseña
            </Typography>

            <Divider sx={{ borderColor: '#d1d5db' }} />

            <Typography variant="h6" sx={{ color: '#4b5563', textAlign: 'center', fontWeight: 300 }}>
              Versión 3.1.9 - 2026
            </Typography>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}
