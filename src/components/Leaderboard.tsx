import { useEffect, useState } from 'react'
import axiosInstance from '@/lib/axiosInstance'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material'
import { ChevronUp, ChevronDown, Trophy } from 'lucide-react'
import { DatePickerDemo } from './DatePickerComponent'

const Leaderboard = () => {
  const [dailyLeaderboard, setDailyLeaderboard] = useState([])
  const [weeklyLeaderboard, setWeeklyLeaderboard] = useState([])
  const [monthlyLeaderboard, setMonthlyLeaderboard] = useState([])

  const [loadingDaily, setLoadingDaily] = useState(false)
  const [loadingWeekly, setLoadingWeekly] = useState(false)

  const [selectedDailyDate, setSelectedDailyDate] = useState<Date | null>(null)
  const [selectedWeeklyDate, setSelectedWeeklyDate] = useState<Date | null>(null)

  useEffect(() => {
    const fetchMonthlyLeaderboard = async () => {
      try {
        const monthlyRes = await axiosInstance.get(`/api/v1/orders/month-leaderboard`)
        setMonthlyLeaderboard(monthlyRes.data.data.body)
      } catch (error) {
        console.error('Error fetching monthly leaderboard:', error)
      }
    }
    
    fetchMonthlyLeaderboard()
  }, [])

  useEffect(() => {
    const fetchDailyLeaderboard = async () => {
      setLoadingDaily(true)
      try {
        const url = selectedDailyDate 
          ? `/api/v1/orders/daily-leaderboard?date=${selectedDailyDate.toISOString().split('T')[0]}`
          : `/api/v1/orders/daily-leaderboard`
        const res = await axiosInstance.get(url)
        setDailyLeaderboard(res.data.data.body)
      } catch (error) {
        console.error('Error fetching daily leaderboard:', error)
      } finally {
        setLoadingDaily(false)
      }
    }

    fetchDailyLeaderboard()
  }, [selectedDailyDate])

  useEffect(() => {
    const fetchWeeklyLeaderboard = async () => {
      setLoadingWeekly(true)
      try {
        const url = selectedWeeklyDate 
          ? `/api/v1/orders/week-leaderboard?date=${selectedWeeklyDate.toISOString().split('T')[0]}`
          : `/api/v1/orders/week-leaderboard`
        const res = await axiosInstance.get(url)
        setWeeklyLeaderboard(res.data.data.body)
      } catch (error) {
        console.error('Error fetching weekly leaderboard:', error)
      } finally {
        setLoadingWeekly(false)
      }
    }

    fetchWeeklyLeaderboard()
  }, [selectedWeeklyDate])

  return (
    <Paper sx={{ p: 4, maxWidth: '80%', mx: 'auto', boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3, color: '#4077cf' }}>
        <Trophy className="inline-block mr-2 text-yellow-500" style={{ height: '2.5rem', width: '2.5rem' }} /> Leaderboards
      </Typography>

      <div className="flex flex-col gap-4">
        <LeaderboardSection title="Daily Leaderboard" data={dailyLeaderboard} setSelectedDate={setSelectedDailyDate} loading={loadingDaily} />
        <LeaderboardSection title="Weekly Leaderboard" data={weeklyLeaderboard} setSelectedDate={setSelectedWeeklyDate} loading={loadingWeekly} />
        <LeaderboardSection title="Monthly Leaderboard" data={monthlyLeaderboard} loading={false} />
      </div>
    </Paper>
  )
}

const LeaderboardSection = ({ title, data, setSelectedDate, loading }: { title: string; data: any[]; setSelectedDate?: (date: Date | null) => void; loading: boolean }) => {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className="bg-blue-50 p-6 rounded-xl shadow-md border border-blue-200">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h6" sx={{ color: '#4077cf', fontWeight: 'bold' }}>
          {title}
        </Typography>
        <div className="flex justify-end gap-4 ">
          {['Daily Leaderboard', 'Weekly Leaderboard'].includes(title) && setSelectedDate && <DatePickerDemo isWeek={title === 'Daily Leaderboard' ? false : true} setSelectedDate={setSelectedDate} />}
          <div className="cursor-pointer" onClick={() => setExpanded(!expanded)}>
            {expanded ? <ChevronUp /> : <ChevronDown />}
          </div>
        </div>
      </div>
      {expanded && (
        <>
          {loading ? (
            <Typography textAlign="center" color="gray">
              Loading {title.toLowerCase()}...
            </Typography>
          ) : (
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
                    data.map((user, index) => (
                      <TableRow key={user.id} sx={{ bgcolor: index % 2 === 0 ? '#F0F4FF' : 'white' }}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{user.game_id.length > 10 ? user.game_id.slice(0, 10) + "..." : user.game_id}</TableCell>

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
        </>
      )}
    </div>
  )
}

export default Leaderboard