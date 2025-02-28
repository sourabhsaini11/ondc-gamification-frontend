import { Paper, Typography, Box, Card, CardContent, CardHeader, IconButton, Stack } from '@mui/material';
import { Gamepad2Icon } from 'lucide-react';
import { GiPresent, GiLaurelsTrophy, GiGuitar, GiDiploma } from 'react-icons/gi'; // You can use any icon library
import Leaderboard from '../Leaderboard';

const GameMechanics = () => {
  return (
    <>
      <Leaderboard />
      <Box className="mt-4">
        <Paper sx={{ p: 4, maxWidth: '80%', mx: 'auto', boxShadow: 3, borderRadius: 2, backgroundColor: 'white' }}>
          <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3, color: '#1e3a8a' }}>
            <Gamepad2Icon className="inline-block mr-2 text-yellow-500" style={{ height: '2.5rem', width: '2.5rem' }} /> Proposed Game Mechanics

          </Typography>
          <Stack spacing={4}>
            <Card sx={{ border: 1, borderColor: '#1e3a8a', borderRadius: 2, backgroundColor: '#f5faff' }}>
              <CardHeader
                avatar={<IconButton><GiPresent style={{ color: '#1e3a8a', fontSize: '2rem' }} /></IconButton>}
                title="Daily, Weekly, and Monthly Awards"
                titleTypographyProps={{ fontWeight: 'bold', color: '#1e3a8a' }}
              />
              <CardContent>
                <Typography variant="body2" sx={{ color: '#1e3a8a' }}>
                  Winners will be recognized with prizes at all stages—daily, weekly, and monthly—ensuring continuous excitement throughout Aarambh 2.0.
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ border: 1, borderColor: '#1e3a8a', borderRadius: 2, backgroundColor: 'white' }}>
              <CardHeader
                avatar={<IconButton><GiLaurelsTrophy style={{ color: '#1e3a8a', fontSize: '2rem' }} /></IconButton>}
                title="Luxurious Weekend Getaway for Top 3 Winners"
                titleTypographyProps={{ fontWeight: 'bold', color: '#1e3a8a' }}
              />
              <CardContent>
                <Typography variant="body2" sx={{ color: '#1e3a8a' }}>
                  The top three monthly performers will win a weekend getaway, a grand reward for their exceptional engagement and achievements.
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ border: 1, borderColor: '#1e3a8a', borderRadius: 2, backgroundColor: '#f5faff' }}>
              <CardHeader
                avatar={<IconButton><GiGuitar style={{ color: '#1e3a8a', fontSize: '2rem' }} /></IconButton>}
                title="Exclusive ONDC Gift Cards"
                titleTypographyProps={{ fontWeight: 'bold', color: '#1e3a8a' }}
              />
              <CardContent>
                <Typography variant="body2" sx={{ color: '#1e3a8a' }}>
                  Participants can earn ONDC specific gift cards, offering access to exciting shopping opportunities across the network.
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ border: 1, borderColor: '#1e3a8a', borderRadius: 2, backgroundColor: 'white' }}>
              <CardHeader
                avatar={<IconButton><GiDiploma style={{ color: '#1e3a8a', fontSize: '2rem' }} /></IconButton>}
                title="Prestigious Digital Certificates"
                titleTypographyProps={{ fontWeight: 'bold', color: '#1e3a8a' }}
              />
              <CardContent>
                <Typography variant="body2" sx={{ color: '#1e3a8a' }}>
                  All eligible participants will be awarded digital certificates, recognizing their remarkable support for sellers and contribution to this national mission.
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Paper>
      </Box>
    </>
  );
};

export default GameMechanics;
