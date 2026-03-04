import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BoltIcon from '@mui/icons-material/Bolt';
import SpeedIcon from '@mui/icons-material/Speed';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

interface SpecsTableProps {
  attributes: Record<string, string | number> | null | undefined;
}

function formatKey(key: string): string {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

// Map common spec keywords to icons
function getSpecIcon(key: string): React.ReactNode | null {
  const lk = key.toLowerCase();
  if (lk.includes('power') || lk.includes('motor') || lk.includes('watt')) return <BoltIcon sx={{ fontSize: '0.9rem', color: '#F0B429' }} />;
  if (lk.includes('speed') || lk.includes('vitesse')) return <SpeedIcon sx={{ fontSize: '0.9rem', color: '#00C2FF' }} />;
  if (lk.includes('battery') || lk.includes('batterie') || lk.includes('range') || lk.includes('autonomie')) return <BatteryChargingFullIcon sx={{ fontSize: '0.9rem', color: '#00C853' }} />;
  if (lk.includes('weight') || lk.includes('poids')) return <FitnessCenterIcon sx={{ fontSize: '0.9rem', color: '#9CA3AF' }} />;
  return null;
}

/**
 * SpecsTable — premium styled specs display with icons and alternating row highlights.
 */
export function SpecsTable({ attributes }: SpecsTableProps) {
  if (!attributes) return null;

  let parsed = attributes;
  if (typeof attributes === 'string') {
    try { parsed = JSON.parse(attributes); } catch { return null; }
  }

  const entries = Object.entries(parsed).filter(
    ([, value]) => value !== null && value !== undefined && String(value) !== ''
  );

  if (entries.length === 0) return null;

  return (
    <TableContainer
      sx={{
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.07)',
        overflow: 'hidden',
        background: 'rgba(17,17,22,0.5)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <Table size="small">
        <TableBody>
          {entries.map(([key, value], i) => {
            const icon = getSpecIcon(key);
            return (
              <TableRow
                key={key}
                sx={{
                  '&:last-child td': { border: 0 },
                  bgcolor: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                  transition: 'background 0.2s',
                  '&:hover': { bgcolor: 'rgba(0,194,255,0.04)' },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    fontWeight: 600, width: '42%', color: 'text.secondary',
                    fontSize: '0.8rem', py: 1.25, borderColor: 'rgba(255,255,255,0.05)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {icon}
                    <Typography sx={{ fontSize: 'inherit', fontWeight: 'inherit', color: 'inherit' }}>
                      {formatKey(key)}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600, color: 'text.primary',
                    fontSize: '0.82rem', py: 1.25, borderColor: 'rgba(255,255,255,0.05)',
                  }}
                >
                  {String(value)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
