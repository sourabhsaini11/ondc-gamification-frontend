import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  const leaders = [
    {
        rank: '04',
        GameId: 'CH123',
        Score: '781'
    },
    {
        rank: '04',
        GameId: 'CH123',
        Score: '781'
    },
    {
        rank: '04',
        GameId: 'CH123',
        Score: '781'
    },
    {
        rank: '04',
        GameId: 'CH123',
        Score: '781'
    },
    {
        rank: '04',
        GameId: 'CH123',
        Score: '781'
    },
  ]
 
  export function TableDemo() {
    return (
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow >
            <TableHead className="w-[100px]">Rank</TableHead>
            <TableHead>Game ID</TableHead>
            <TableHead className="text-right">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaders.map(( leader) => (
            <TableRow key={leader.rank}>
              <TableCell className="font-medium ">{leader.rank}</TableCell>
              <TableCell>{leader.GameId}</TableCell>
              <TableCell className="text-right">{leader.Score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
     
      </Table>
    )
  }
  