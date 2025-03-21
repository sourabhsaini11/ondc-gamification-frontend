import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertTriangle } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  game_id: string;
  total_points: number;
}

interface TableDemoProps {
  filter: string;
  data: LeaderboardEntry[];
}

export function TableDemo({ filter, data = [] }: TableDemoProps) {
  console.log("DATA IS: ", data);

  const trimmedData = data.length > 9 ? data.slice(0, 9) : data;

  return (
    <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <Table className="min-w-full bg-white">
        <TableCaption className="text-lg font-medium text-gray-700">
          Leaderboard based on <span className="font-semibold">{filter}</span> filter.
        </TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-[80px] text-center font-semibold">Rank</TableHead>
            <TableHead className="font-semibold">Game ID</TableHead>
            <TableHead className="text-right font-semibold">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trimmedData.length > 0 ? (
            trimmedData.map((leader, index) => (
              <TableRow key={index} className="hover:bg-gray-50 transition">
                <TableCell className="text-center font-medium">{index + 1}</TableCell>
                <TableCell className="font-mono text-gray-800">
                  {leader.game_id?.slice(0, 4) ?? "N/A"}
                </TableCell>
                <TableCell className="text-right">
                  <span className="inline-block px-3 py-1 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg shadow">
                    {leader.total_points || 0}
                  </span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-6 text-gray-500">
                <div className="flex flex-col items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-gray-400" />
                  <span className="text-sm text-muted font-medium">No leaders available</span>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
