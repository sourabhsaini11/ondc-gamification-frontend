import { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material'
import {  ChevronUp, ChevronDown, Trophy } from 'lucide-react'

const mockData = [
  { id: 1, game_id: 'Game123', total_points: 1500, total_orders: 30, total_gmv: 50000 },
  { id: 2, game_id: 'Game456', total_points: 1400, total_orders: 25, total_gmv: 45000 },
  { id: 3, game_id: 'Game789', total_points: 1300, total_orders: 20, total_gmv: 40000 },
]

const Leaderboard = () => {
  const [dailyLeaderboard, setDailyLeaderboard] = useState(mockData)
  const [weeklyLeaderboard, setWeeklyLeaderboard] = useState(mockData)
  const [monthlyLeaderboard, setMonthlyLeaderboard] = useState(mockData)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchLeaderboards = async () => {
      try {
        const [dailyRes, weeklyRes, monthlyRes] = await Promise.all([
          axios.get(`${import.meta.env.BACKEND_URI}/api/v1//orders/daily-leaderboard`),
          axios.get(`${import.meta.env.BACKEND_URI}/api/v1//orders/week-leaderboard`),
          axios.get(`${import.meta.env.BACKEND_URI}/api/v1//orders/month-leaderboard`),
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
        <div className="flex flex-col gap-4">
          <LeaderboardSection title="Daily Leaderboard" data={dailyLeaderboard} />
          <LeaderboardSection title="Weekly Leaderboard" data={weeklyLeaderboard} />
          <LeaderboardSection title="Monthly Leaderboard" data={monthlyLeaderboard} />
        </div>
      )}
    </Paper>
  )
}

const LeaderboardSection = ({ title, data }: { title: string; data: any[] }) => {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className="bg-blue-50 p-6 rounded-xl shadow-md border border-blue-200">
      <Typography variant="h6" sx={{ color: '#4077cf', fontWeight: 'bold', textAlign: 'center', mb: 3 }}>
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpanded(!expanded)}>
          <span>{title}</span>
          {expanded ? <ChevronUp /> : <ChevronDown />}
        </div>
      </Typography>
      {expanded && (
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
                data?.map((user: any, index) => (
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
                  <TableCell colSpan={5} sx={{ textAlign: 'center', color: 'gray' }}>
                    No data available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  )
}

export default Leaderboard
