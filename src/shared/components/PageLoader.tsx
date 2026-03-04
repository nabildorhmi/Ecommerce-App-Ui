import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

/**
 * MiraiTech branded page loader with glowing spinner and pulsing text.
 */
export function PageLoader() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: 3,
        position: 'relative',
      }}
    >
      {/* Glow ring backdrop */}
      <Box
        sx={{
          position: 'absolute',
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,194,255,0.12) 0%, transparent 70%)',
          animation: 'pulse-glow 2s ease-in-out infinite',
        }}
      />

      {/* Spinner */}
      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress
          size={52}
          thickness={2.5}
          sx={{
            color: 'rgba(0,194,255,0.25)',
            position: 'absolute',
          }}
          variant="determinate"
          value={100}
        />
        <CircularProgress
          size={52}
          thickness={2.5}
          sx={{
            color: '#00C2FF',
            filter: 'drop-shadow(0 0 8px rgba(0,194,255,0.6))',
          }}
        />
      </Box>

      {/* Brand text */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          sx={{
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.25em',
            color: 'rgba(0,194,255,0.7)',
            textTransform: 'uppercase',
            animation: 'pulse-dot 2s ease-in-out infinite',
          }}
        >
          MIRAÏTECH
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Noto Serif JP", serif',
            fontSize: '0.55rem',
            color: 'rgba(0,194,255,0.2)',
            letterSpacing: '0.2em',
            mt: 0.5,
          }}
        >
          読み込み中
        </Typography>
      </Box>
    </Box>
  );
}
