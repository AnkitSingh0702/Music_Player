'use client';

import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableDemo } from './tabledemo';
import NowPlaying from './nowplaying';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { CentralSong, TableDemoSong } from '../types/music';

const songs: CentralSong[] = [
  {
    id: "1",
    title: "Legends Never Die",
    artist: "Alan Walker, League of Legends",
    duration: "02:59",
    cover: "/Legends.png",
    file: "/legends.mp3",
  },
  {
    id: "2",
    title: "After Hour",
    artist: "The Weekend",
    duration: "06:01",
    cover: "/giphy.gif",
    file: "/after.mp3",
  },
  {
    id: "3",
    title: "Highest In The Room",
    artist: "Travis Scott",
    duration: "02:57",
    cover: "/high.png",
    file: "/high.mp3",
  },
  {
    id: "4",
    title: "Believer",
    artist: "Imagine Dragons",
    duration: "03:24",
    cover: "/beiliver.gif",
    file: "/Believer.mp3",
  },
  {
    id: "5",
    title: "Hymn For The Weekend",
    artist: "ColdPlay",
    duration: "04:19",
    cover: "/hymn.png",
    file: "/hymn.mp3",
  },
];

export default function Central() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSong, setCurrentSong] = useState<CentralSong | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [progress, setProgress] = useState(0);

  const handlePlayPause = useCallback(
    (songId: string) => {
      const selectedSong = songs.find((song) => song.id === songId);
      if (selectedSong) {
        if (currentSong?.id === selectedSong.id && isPlaying) {
          audioRef.current?.pause();
          setIsPlaying(false);
        } else {
          if (audioRef.current) {
            audioRef.current.pause();
          }
          setCurrentSong(selectedSong);
          setProgress(0);

          const audio = new Audio(selectedSong.file);
          audioRef.current = audio;

          audio.play();
          setIsPlaying(true);

          audio.addEventListener("ended", () => {
            setIsPlaying(false);
            setProgress(0);
          });
        }
      }
    },
    [currentSong, isPlaying]
  );

  const handleTogglePlayPause = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying((prev) => !prev);
    }
  }, [isPlaying]);

  const handleNextSong = useCallback(() => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong?.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    handlePlayPause(songs[nextIndex].id);
  }, [currentSong, handlePlayPause]);

  const handlePreviousSong = useCallback(() => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong?.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    handlePlayPause(songs[prevIndex].id);
  }, [currentSong, handlePlayPause]);

  useEffect(() => {
    if (audioRef.current) {
      const updateProgress = () => {
        setProgress(audioRef.current?.currentTime || 0);
      };

      audioRef.current.addEventListener("timeupdate", updateProgress);
      return () => {
        audioRef.current?.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, [isPlaying]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 ">
        <div className="flex items-center gap-4">
          {['Music', 'Podcast', 'Live', 'Radio'].map((item) => (
            <Button key={item} variant="ghost" className="hover:text-gray-400">
              {item}
            </Button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search for songs..."
            className="w-64  pl-8 placeholder-gray-400 focus-visible:ring-0"
          />
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-b from-purple-800 to-black flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Discover Great Music</h1>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 gap-8 px-6 py-6">
        {/* Song List */}
        <div className="flex-1">
          <TableDemo
            onPlayPause={handlePlayPause}
            currentSong={currentSong as TableDemoSong | null} // Type assertion
            isPlaying={isPlaying}
          />
        </div>

        {/* Now Playing */}
        <div className="w-80 bg-zinc-900 rounded-lg p-4">
          <NowPlaying
            currentSong={currentSong}
            isPlaying={isPlaying}
            onTogglePlayPause={handleTogglePlayPause}
            onNext={handleNextSong}
            onPrevious={handlePreviousSong}
            getCurrentTime={() => audioRef.current?.currentTime || 0}
            seek={seek}
          />
        </div>
      </div>
    </div>
  );
}
