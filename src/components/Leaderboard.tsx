import { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material'
import { Trophy } from 'lucide-react'

const Leaderboard = () => {
  const [dailyLeaderboard, setDailyLeaderboard] = useState([])
  const [weeklyLeaderboard, setWeeklyLeaderboard] = useState([])
  const [monthlyLeaderboard, setMonthlyLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeaderboards = async () => {
      try {
        const [dailyRes, weeklyRes, monthlyRes] = await Promise.all([
          axios.get('https://gamafication-node-backend-dev.thewitslab.com/api/v1/orders/daily-leaderboard'),
          axios.get('https://gamafication-node-backend-dev.thewitslab.com/api/v1/orders/week-leaderboard'),
          axios.get('https://gamafication-node-backend-dev.thewitslab.com/api/v1/orders/month-leaderboard'),
        ])

        setDailyLeaderboard(dailyRes.data.data.body)
        setWeeklyLeaderboard(weeklyRes.data.data.body)
        setMonthlyLeaderboard(monthlyRes.data.data.body)
      } catch (error) {
        console.error('Error fetching leaderboards:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboards()
  }, [])

  return (
    <Paper sx={{ p: 4, maxWidth: '80%', mx: 'auto', boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3, color: '#4077cf' }}>
        <Trophy className="inline-block mr-2 text-yellow-500" style={{ height: '2.5rem', width: '2.5rem' }} />{' '}
        Leaderboards
      </Typography>

      {loading ? (
        <Typography textAlign="center" color="gray">
          Loading leaderboard data...
        </Typography>
      ) : (
        <>
          <LeaderboardSection title="Daily Leaderboard" data={dailyLeaderboard} />
          <LeaderboardSection title="Weekly Leaderboard" data={weeklyLeaderboard} />
          <LeaderboardSection title="Monthly Leaderboard" data={monthlyLeaderboard} />
        </>
      )}
    </Paper>
  )
}

const LeaderboardSection = ({ title, data }: { title: string; data: any[] }) => (
  <div className="bg-blue-50 p-6 rounded-xl shadow-md border border-blue-200">
    <Typography variant="h6" sx={{ color: '#4077cf', fontWeight: 'bold', textAlign: 'center', mb: 3 }}>
      {title}
    </Typography>
    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
      <Table>
        <TableHead sx={{ bgcolor: '#4077cf' }}>
          <TableRow>
            {['Rank', 'Game ID', 'Total Points', 'Total Orders', 'GMV'].map((header) => (
              <TableCell key={header} sx={{ color: 'white', fontWeight: 'bold' }}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((user: any, index) => (
              <TableRow key={user.id} sx={{ bgcolor: index % 2 === 0 ? '#F0F4FF' : 'white' }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.game_id}</TableCell>
                <TableCell>{user.total_points}</TableCell>
                <TableCell>{user.total_orders}</TableCell>
                <TableCell>{user.total_gmv}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} sx={{ textAlign: 'center', color: 'gray' }}>
                No data available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
)

export default Leaderboard
