import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Play, Pause } from 'lucide-react';
import { TableDemoSong } from "../types/music";

const songs: TableDemoSong[] = [
  {
    id: "1",
    number: "1",
    title: "Legends Never Die",
    plays: "Alan Walker , League of Legends",
    duration: "02:59",
    album: "League of Legends",
    image: "/Legends.png",
  },
  {
    id: "2",
    number: "2",
    title: "After Hour",
    plays: "The Weekend",
    duration: "06:01",
    album: "The Weekend",
    image: "/after.png",
    isPlaying: false,
  },
  {
    id: "3",
    number: "3",
    title: "Highest In The Room",
    plays: "Travis Scott",
    duration: "02:57",
    album: "Highest In The Room",
    image: "/high.png",
  },
  {
    id: "4",
    number: "4",
    title: "Believer",
    plays: "Imagine Dragons",
    duration: "03:24",
    album: "Imagine Dragons",
    image: "/believer.jpg",
  },
  {
    id: "5",
    number: "5",
    title: "Hymn For The Weekend",
    plays: "ColdPlay",
    duration: "04:19",
    album: "Off The Wall",
    image: "/hymn.png",
  },
];

interface TableDemoProps {
  onPlayPause: (songId: string) => void;
  currentSong: TableDemoSong | null;
  isPlaying: boolean;
}

export function TableDemo({ onPlayPause, currentSong, isPlaying }: TableDemoProps) {
  return (
    <Table>
    <TableHeader>
      <TableRow className="hover:bg-white/5">
        <TableHead className="w-8 sm:w-16 text-xs sm:text-sm">#</TableHead>
        <TableHead className="text-xs sm:text-sm">TITLE</TableHead>
        <TableHead className="text-xs sm:text-sm">PLAYING</TableHead>
        <TableHead className="text-xs sm:text-sm">TIME</TableHead>
        <TableHead className="text-xs sm:text-sm hidden md:table-cell">ALBUM</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {songs.map((song) => (
        <TableRow
          key={song.id}
          className={`group hover:bg-white/5 ${
            currentSong?.id === song.id && isPlaying ? "bg-white/10" : ""
          }`}
        >
          <TableCell className="font-medium">
            <div className="relative w-4">
              <span className="group-hover:hidden">{song.number}</span>
              <button
                onClick={() => onPlayPause(song.id)}
                className="hidden group-hover:block"
              >
                {currentSong?.id === song.id && isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </button>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-3">
              <img
                src={song.image}
                alt={song.title}
                className="h-8 w-8 sm:h-10 sm:w-10 rounded"
              />
              <span className="text-xs sm:text-sm">{song.title}</span>
            </div>
          </TableCell>
          <TableCell className="text-xs sm:text-sm">{song.plays}</TableCell>
          <TableCell className="text-xs sm:text-sm">{song.duration}</TableCell>
          <TableCell className="hidden md:table-cell text-xs sm:text-sm">
            {song.album}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  
  );
}
