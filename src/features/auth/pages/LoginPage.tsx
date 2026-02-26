import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';
import { loginApi, registerApi } from '../api/auth';
import { useAuthStore } from '../store';

export function LoginPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);

  const user = useAuthStore((s) => s.user);

  // Already authenticated — redirect immediately
  if (user) {
    return <Navigate to="/products" replace />;
  }

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi(email, password),
    onSuccess: ({ token, user: loggedInUser }) => {
      useAuthStore.getState().setAuth(token, loggedInUser);
      if (loggedInUser.role === 'admin') {
        void navigate('/admin/products');
      } else {
        void navigate('/products');
      }
    },
    onError: (err: unknown) => {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Identifiants incorrects";
      setLoginError(message);
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerApi,
    onSuccess: ({ token, user: newUser }) => {
      useAuthStore.getState().setAuth(token, newUser);
      void navigate('/products');
    },
    onError: (err: unknown) => {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Erreur lors de l'inscription";
      setRegisterError(message);
    },
  });

  const handleLogin = async (data: { email: string; password: string }) => {
    setLoginError(null);
    await loginMutation.mutateAsync(data);
  };

  const handleRegister = async (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
  }) => {
    setRegisterError(null);
    await registerMutation.mutateAsync(data);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(22, 22, 28, 0.6)' : 'background.paper',
          backdropFilter: (theme) => theme.palette.mode === 'dark' ? 'blur(16px)' : 'none',
          border: '1px solid',
          borderColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'divider',
          borderRadius: '16px',
          boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 16px 48px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
          {tab === 0 ? "Connexion" : "Inscription"}
        </Typography>

        <Tabs
          value={tab}
          onChange={(_e, v: number) => {
            setTab(v);
            setLoginError(null);
            setRegisterError(null);
          }}
          centered
          sx={{
            mb: 4,
            '& .MuiTabs-indicator': { backgroundColor: '#00C2FF', height: 3 },
            '& .MuiTab-root': { fontWeight: 600, color: 'text.secondary', textTransform: 'none', fontSize: '1rem', '&.Mui-selected': { color: '#00C2FF' } }
          }}
        >
          <Tab label={"Connexion"} />
          <Tab label={"Inscription"} />
        </Tabs>

        <Box>
          {tab === 0 ? (
            <LoginForm onSubmit={handleLogin} error={loginError} />
          ) : (
            <RegisterForm onSubmit={handleRegister} error={registerError} />
          )}
        </Box>
      </Paper>
    </Container>
  );
}
