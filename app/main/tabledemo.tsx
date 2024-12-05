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
    duration: "4:18",
    album: "The Weekend",
    image: "/after.png",
    isPlaying: false,
  },
  {
    id: "3",
    number: "3",
    title: "Highest In The Room",
    plays: "Travis Scott",
    duration: "4:17",
    album: "Thriller 25 Super Deluxe Edition",
    image: "/high.png",
  },
  {
    id: "4",
    number: "4",
    title: "Believer",
    plays: "Imagine Dragons",
    duration: "6:05",
    album: "Imagine Dragons",
    image: "/believer.jpg",
  },
  {
    id: "5",
    number: "5",
    title: "Rock With You - Single Version",
    plays: "ColdPlay",
    duration: "3:40",
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
          <TableHead className="w-16">#</TableHead>
          <TableHead>TITLE</TableHead>
          <TableHead>PLAYING</TableHead>
          <TableHead>TIME</TableHead>
          <TableHead>ALBUM</TableHead>
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
                <button onClick={() => onPlayPause(song.id)} className="hidden group-hover:block">
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
                <img src={song.image} alt={song.title} className="h-10 w-10 rounded" />
                <span>{song.title}</span>
              </div>
            </TableCell>
            <TableCell>{song.plays}</TableCell>
            <TableCell>{song.duration}</TableCell>
            <TableCell>{song.album}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
