import { Search } from 'lucide-react'
import { TableDemo } from './Table'

const NewLeaderBoardComponent = () => {
  return (
    <div className="flex flex-col justify-between bg-sky-100/90">
      <h1 className="text-3xl pt-4 pl-10 font-semibold text-gray-800 mb-4  tracking-wider ">Leaderboard</h1>
      <div className="top h-[30vh] flex gap-10 px-40 pt-72 pb-20 justify-center items-end">
  <div className="group relative cursor-pointer flex flex-col justify-center items-center rounded-t-xl text-center h-36 bg-slate-100/80 w-1/5 shadow-md shadow-gray-400 border border-gray-200">
    <div className="absolute top-[-60px] text-sm text-slate-700">
      <div className="flex flex-col text-md justify-center">
        <span className="text-black">924</span>
        <span className="text-gray-400">HK 123</span>
      </div>
    </div>
    <div className="rounded-full w-20 h-20 border-2 border-slate-500 bg-white font-bold text-2xl text-slate-700 text-center flex flex-col justify-center">
      2
    </div>
  </div>

  <div className="group relative cursor-pointer flex flex-col justify-center items-center rounded-t-xl h-48 bg-yellow-100/70 border border-t-yellow-200 w-1/5 shadow-md shadow-gray-400 text-center">
    <div className="absolute top-[-60px] text-sm text-yellow-700">
      <div className="flex flex-col text-md justify-center">
        <span className="text-black">924</span>
        <span className="text-gray-400">HK 123</span>
      </div>
    </div>
    <div className="rounded-full w-20 h-20 border-2 border-yellow-500 bg-white font-bold text-2xl text-yellow-700 text-center flex flex-col justify-center">
      1
    </div>
  </div>

  <div className="group relative cursor-pointer rounded-t-xl flex flex-col justify-center items-center h-28 bg-red-100/90 w-1/5 shadow-md shadow-gray-400 border border-red-400 text-center">
    <div className="absolute top-[-60px] text-sm text-red-400">
      <div className="flex flex-col text-md justify-center">
        <span className="text-black">924</span>
        <span className="text-gray-400">HK 123</span>
      </div>
    </div>
    <div className="rounded-full w-20 h-20 border-2 border-red-300 bg-white font-bold text-2xl text-red-400 text-center flex flex-col justify-center">
      3
    </div>
  </div>
</div>



      <div className="bottom h-[70vh] flex flex-col gap-4 mx-2">
        <div className="search-bar w-full">
          <div className="input-wrapper flex items-center rounded-xl px-4 tracking-wide  gap-2 mx-4 bg-white">
            <Search className="text-gray-200" />
            <input type="text" placeholder="Search game ID" className="px-2 py-4 outline-none w-full bg-transparent" />
          </div>
        </div>
        <div className="table w-full h-full bg-white p-2 rounded-xl">
          <TableDemo />
        </div>
      </div>
    </div>
  )
}

export default NewLeaderBoardComponent
