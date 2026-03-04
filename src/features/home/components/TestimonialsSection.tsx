import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/Star';

const TESTIMONIALS = [
    {
        name: 'Ahmed K.',
        city: 'Casablanca',
        rating: 5,
        text: '"Qualité exceptionnelle ! Ma MiraiTech Pro est rapide, silencieuse et le design est incroyable. Meilleur achat de l\'année."',
    },
    {
        name: 'Fatima Z.',
        city: 'Rabat',
        rating: 5,
        text: '"Livraison rapide et service client au top. La trottinette est exactement comme décrite. Je recommande à 100%."',
    },
    {
        name: 'Youssef M.',
        city: 'Marrakech',
        rating: 5,
        text: '"Après 6 mois d\'utilisation quotidienne, toujours aussi performante. L\'autonomie est impressionnante."',
    },
];

function StarRating({ rating }: { rating: number }) {
    return (
        <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
            {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                    key={i}
                    sx={{
                        fontSize: '1.2rem',
                        color: i < rating ? '#00C2FF' : 'rgba(255,255,255,0.12)',
                    }}
                />
            ))}
        </Box>
    );
}

export function TestimonialsSection() {
    return (
        <Box
            component="section"
            sx={{
                bgcolor: '#0B0B0E',
                py: { xs: 6, md: 10 },
            }}
        >
            <Container maxWidth="lg">
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 6 } }}>
                    <Typography
                        sx={{
                            fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em',
                            color: '#00C2FF', textTransform: 'uppercase', mb: 1,
                            fontFamily: '"Orbitron", sans-serif'
                        }}
                    >
                        TÉMOIGNAGES
                    </Typography>
                    <Typography sx={{ fontWeight: 800, fontSize: { xs: '1.8rem', md: '2.4rem' }, color: '#F5F7FA', textTransform: 'uppercase', fontFamily: '"Orbitron", sans-serif' }}>
                        ILS NOUS FONT CONFIANCE
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {TESTIMONIALS.map(({ name, city, rating, text }) => (
                        <Grid key={name} size={{ xs: 12, md: 4 }}>
                            <Box
                                sx={{
                                    height: '100%',
                                    p: { xs: 3, md: 4 },
                                    borderRadius: '16px',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    background: 'rgba(17, 17, 22, 0.4)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <StarRating rating={rating} />

                                <Typography sx={{ fontSize: '0.95rem', color: '#F5F7FA', lineHeight: 1.6, mb: 4, flexGrow: 1 }}>
                                    {text}
                                </Typography>

                                <Box>
                                    <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#F5F7FA', fontFamily: '"Orbitron", sans-serif' }}>{name}</Typography>
                                    <Typography sx={{ fontSize: '0.8rem', color: '#9CA3AF' }}>{city}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
