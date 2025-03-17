import { Loader2, Search, Trophy } from "lucide-react";
import { TableDemo } from "./Table";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useQuery } from "react-query";
import {
  dailyLeaderboard,
  weeklyLeaderboard,
  monthlyLeaderboard,
  allTimeLeaders,
} from "@/http/route";

const FILTER_OPTIONS = ["All Time", "Monthly", "Weekly", "Daily"];

const NewLeaderBoardComponent = () => {
  const [filter, setFilter] = useState("All Time");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: dailyLeaders = [], isLoading: isDailyLoading } = useQuery({
    queryFn: dailyLeaderboard,
    queryKey: ["daily-leaders"],
  });

  const { data: weeklyLeaders = [], isLoading: isWeeklyLoading } = useQuery({
    queryFn: weeklyLeaderboard,
    queryKey: ["weekly-leaders"],
  });

  const { data: monthlyLeaders = [], isLoading: isMonthlyLoading } = useQuery({
    queryFn: monthlyLeaderboard,
    queryKey: ["monthly-leaders"],
  });

  const { data: alltimeLeaders = [], isLoading: isAllTimeLoading } = useQuery({
    queryFn: allTimeLeaders,
    queryKey: ["alltime-leaders"],
  });

  const getFilteredData = () => {
    switch (filter) {
      case "Daily":
        return dailyLeaders;
      case "Weekly":
        return weeklyLeaders;
      case "Monthly":
        return monthlyLeaders;
      case "All Time":
        return alltimeLeaders;
      default:
        return [];
    }
  };

  const leaderboardData = getFilteredData();
  const topThree = leaderboardData.slice(0, 3);
  const searchableLeaders = leaderboardData.filter((user: any) =>
    searchTerm ? user.game_id?.toLowerCase().includes(searchTerm.toLowerCase()) : true
  );


  return (
    <div className="flex flex-col justify-between bg-white">
     <h1 className="text-5xl pt-6 pl-12 font-extrabold text-transparent bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text mb-6 tracking-widest shadow-md">
  Leaderboard
</h1>



      <div className="top h-[30vh] flex gap-10 px-40 pt-72 pb-20 justify-center items-end">
        {topThree.length > 0 ? (
          topThree.map((user : any, index : any) => (
            <div
              key={index}
              className={`group relative cursor-pointer flex flex-col justify-center items-center rounded-t-xl text-center h-${
                index === 0 ? "48" : index === 1 ? "36" : "28"
              } bg-${
                index === 0
                  ? "yellow-100/70 border border-yellow-200"
                  : index === 1
                  ? "slate-100/80 border border-gray-200"
                  : "red-100/90 border border-red-400"
              } w-1/5 shadow-md shadow-gray-400`}
            >
              <div className="absolute top-[-60px] text-sm">
                <div className="flex flex-col text-md justify-center">
                  <span className="text-black">{user.game_id?.slice(0, 4) || ""}</span>
                  <span className="text-gray-400">{user.total_points}</span>
                </div>
              </div>
              <div
                className={`rounded-full w-20 h-20 border-2 bg-white font-bold text-2xl text-center flex flex-col justify-center ${
                  index === 0
                    ? "border-yellow-500 text-yellow-700"
                    : index === 1
                    ? "border-slate-500 text-slate-700"
                    : "border-red-300 text-red-400"
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

      <div className="bottom h-[70vh] flex flex-col gap-4 mx-2">
        <div className="flex justify-between items-center mx-4">
        <div className="input-wrapper flex items-center rounded-xl px-4 tracking-wide gap-2 bg-gray-100 w-2/3 shadow-sm border border-gray-300">
  <Search className="text-gray-500" />
  <input
    type="text"
    placeholder="Search game ID"
    className="px-3 py-3 outline-none w-full bg-transparent text-gray-800 placeholder-gray-500"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-white text-gray-700 shadow-md">
                {filter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {FILTER_OPTIONS.map((option) => (
                <DropdownMenuItem key={option} onClick={() => setFilter(option)}>
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="table w-full h-full bg-white p-2 rounded-xl">
          {isDailyLoading || isWeeklyLoading || isMonthlyLoading || isAllTimeLoading ? (
            <div className="flex justify-center flex-col items-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <TableDemo filter={filter} data={searchableLeaders} />
          )}
        </div>
      </div>
    </div>
  );
};

export default NewLeaderBoardComponent;
