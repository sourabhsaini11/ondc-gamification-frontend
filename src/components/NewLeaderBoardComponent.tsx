import { useState } from 'react'
import { Separator } from './ui/separator'
import { Loader2, Search, Trophy } from 'lucide-react'
import { TableDemo } from './Table'
import { Button } from '@/components/ui/button'
import { useQuery } from 'react-query'
import { dailyLeaderboard, weeklyLeaderboard, monthlyLeaderboard, searchGameId } from '@/http/route'
import { useDebounce } from 'use-debounce' 
const FILTER_OPTIONS = ['Monthly', 'Weekly', 'Daily']
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'
import { useAuth } from '@/services/AuthContext'
const NewLeaderBoardComponent = () => {
  const { isAuthenticated } = useAuth()
  const [filter, setFilter] = useState('Monthly')
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch] = useDebounce(searchTerm, 500)

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
  const { data: searchResults = [],  } = useQuery(
    ['search-game', debouncedSearch],
    () => searchGameId(debouncedSearch),
    { enabled: !!debouncedSearch }
  )
  

  return (
  
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
              [1, 0, 2].map((pos) => {
                const user = topThree[pos]
                return (
                  <div
                    key={pos}
                    className={`group relative cursor-pointer flex flex-col justify-center items-center rounded-t-xl text-center ${HEIGHTS[pos]} ${BG_CLASSES[pos]} w-1/5 shadow-md shadow-gray-400`}
                  >
                    <div className="absolute top-[-60px] text-sm">
                      <div className="flex flex-col text-md justify-center">
                        <span className="text-black">{user?.game_id?.slice(0, 4) || ''}</span>
                        <span className="text-gray-400">{user?.total_points}</span>
                      </div>
                    </div>
                    <div
                      className={`rounded-full w-20 h-20 border-2 bg-white font-bold text-2xl text-center flex flex-col justify-center ${
                        pos === 1
                          ? 'border-yellow-500 text-yellow-700'
                          : pos === 0
                          ? 'border-slate-500 text-slate-700'
                          : 'border-red-300 text-red-400'
                      }`}
                    >
                      {pos + 1}
                    </div>
                  </div>
                )
              })
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
            {
  isAuthenticated && (
    <div className="flex flex-col items-center w-full">
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
      {searchResults.length > 0 && (
        <TooltipProvider>
          <Card className="w-1/2 mx-auto shadow-md bg-gray-50">
            <CardContent className="p-4">
              <p className="font-bold text-center text-gray-700 mb-2">Matching Game IDs</p>
              <ScrollArea className="max-h-64 overflow-y-auto border rounded-lg p-2">
                {searchResults.map((game: any) => (
                  <Tooltip key={game.game_id}>
                    <TooltipTrigger asChild>
                      <div className="border-b py-2 px-4 hover:bg-gray-100 cursor-pointer transition-all rounded-lg">
                        <p className="text-sm text-gray-800 truncate w-full">
                          <span className="font-semibold">Game ID:</span> {game.game_id.slice(0, 10)}...
                        </p>
                        <p className="text-xs text-gray-600">
                          <span className="font-semibold">Total Points:</span> {game.total_points}
                        </p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>{game.game_id}</TooltipContent>
                  </Tooltip>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TooltipProvider>
      )}
    </div>
  )
}

             
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
                <TableDemo filter={filter} data={leaderboardData} />
              )}
            </div>
          </div>
        </div>

  )
}

export default NewLeaderBoardComponent
