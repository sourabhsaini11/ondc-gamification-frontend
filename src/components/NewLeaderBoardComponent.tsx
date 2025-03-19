import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Separator } from './ui/separator'
import { Loader2, Search, Trophy } from 'lucide-react'
import { TableDemo } from './Table'
import { Button } from '@/components/ui/button'
import { useQuery } from 'react-query'
import { dailyLeaderboard, weeklyLeaderboard, monthlyLeaderboard } from '@/http/route'
import GameMechanics from './ui/Data'

const FILTER_OPTIONS = ['Monthly', 'Weekly', 'Daily']

const NewLeaderBoardComponent = () => {
  const [filter, setFilter] = useState('Monthly')
  const [searchTerm, setSearchTerm] = useState('')

  const { data: dailyLeaders = [], isLoading: isDailyLoading } = useQuery({
    queryFn: dailyLeaderboard,
    queryKey: ['daily-leaders'],
  })
  const { data: weeklyLeaders = [], isLoading: isWeeklyLoading } = useQuery({
    queryFn: weeklyLeaderboard,
    queryKey: ['weekly-leaders'],
  })
  const { data: monthlyLeaders = [], isLoading: isMonthlyLoading } = useQuery({
    queryFn: monthlyLeaderboard,
    queryKey: ['monthly-leaders'],
  })

  const HEIGHTS = ['h-48', 'h-36', 'h-28']
  const BG_CLASSES = [
    'bg-yellow-100/70 border border-yellow-200',
    'bg-slate-100/80 border border-gray-200',
    'bg-red-100/90 border border-red-400',
  ]

  const getFilteredData = () => {
    switch (filter) {
      case 'Daily':
        return dailyLeaders
      case 'Weekly':
        return weeklyLeaders
      case 'Monthly':
        return monthlyLeaders
      default:
        return []
    }
  }

  const leaderboardData = getFilteredData()
  const topThree = leaderboardData.slice(0, 3)
  const searchableLeaders = leaderboardData.filter((user: any) =>
    searchTerm ? user.game_id?.toLowerCase().includes(searchTerm.toLowerCase()) : true,
  )

  return (
    <Tabs defaultValue="leaderboard" className="w-full">
      <TabsList className="flex justify-center space-x-4 p-4 bg-gray-100 rounded-lg shadow">
        <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        <TabsTrigger value="rules">Game Rules</TabsTrigger>
      </TabsList>
      <TabsContent value="leaderboard">
        <div className="flex rounded-lg flex-col justify-between bg-white">
          <div className="px-6 pt-6 pb-2">
            <div className="flex items-center gap-2 justify-center">
              <h1 className="text-4xl font-medium text-gray-600">{filter} Leaderboard</h1>
            </div>
            <Separator className="my-4" />
          </div>

          {/* Top 3 Leaders */}
          <div className="top h-[30vh] flex gap-10 px-40 pt-72 pb-20 justify-center items-end">
            {topThree.length > 0 ? (
              topThree.map((user: any, index: any) => (
                <div
                  key={index}
                  className={`group relative cursor-pointer flex flex-col justify-center items-center rounded-t-xl text-center ${HEIGHTS[index]} ${BG_CLASSES[index]} w-1/5 shadow-md shadow-gray-400`}
                >
                  <div className="absolute top-[-60px] text-sm">
                    <div className="flex flex-col text-md justify-center">
                      <span className="text-black">{user.game_id?.slice(0, 4) || ''}</span>
                      <span className="text-gray-400">{user.total_points}</span>
                    </div>
                  </div>
                  <div
                    className={`rounded-full w-20 h-20 border-2 bg-white font-bold text-2xl text-center flex flex-col justify-center ${
                      index === 0
                        ? 'border-yellow-500 text-yellow-700'
                        : index === 1
                        ? 'border-slate-500 text-slate-700'
                        : 'border-red-300 text-red-400'
                    }`}
                  >
                    {index + 1}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center text-gray-500 gap-3">
                <Trophy className="w-16 h-16 text-gray-300" />
                <p className="text-lg font-medium">No leaders available</p>
              </div>
            )}
          </div>

          {/* Bottom Section */}
          <div className="bottom h-[70vh] flex flex-col gap-4 mx-2">
            <div className="flex flex-col justify-center items-center mx-4 gap-4">
              <div className="input-wrapper flex items-center justify-center rounded-xl px-4 tracking-wide gap-2 bg-gray-100 w-1/2 shadow-sm border border-gray-300 ">
                <Search className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search game ID"
                  className="px-3 py-3 outline-none w-full bg-transparent text-gray-800 placeholder-gray-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Horizontal Filter Buttons */}
              <div className="flex gap-2">
                {FILTER_OPTIONS.map((option) => (
                  <Button
                    key={option}
                    variant="outline"
                    className={`shadow-md px-6 py-2 transition-all ${
                      filter === option
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-200'
                    }`}
                    onClick={() => setFilter(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>

            {/* Leaderboard Table */}
            <div className="table w-full h-full bg-white p-2 rounded-xl">
              {isDailyLoading || isWeeklyLoading || isMonthlyLoading ? (
                <div className="flex justify-center flex-col items-center">
                  <Loader2 className="animate-spin" />
                </div>
              ) : (
                <TableDemo filter={filter} data={searchableLeaders} />
              )}
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="rules">
        <GameMechanics />
      </TabsContent>
    </Tabs>
  )
}

export default NewLeaderBoardComponent
