import React, { useEffect, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string; // Format: "mm:ss"
  cover: string;
}

interface NowPlayingProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onTogglePlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  getCurrentTime: () => number; // This must be passed as a function
  seek: (time: number) => void;
}

const NowPlaying: React.FC<NowPlayingProps> = ({
  currentSong,
  isPlaying,
  onTogglePlayPause,
  onNext,
  onPrevious,
  getCurrentTime,
  seek,
}) => {
  const [progress, setProgress] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  // Sync progress with the current playback
  useEffect(() => {
    if (!currentSong || !isPlaying || isSeeking) return;

    const interval = setInterval(() => {
      setProgress(getCurrentTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [currentSong, isPlaying, isSeeking, getCurrentTime]);

  // Parse duration string into seconds
  const parseDuration = (duration: string): number => {
    const [minutes, seconds] = duration.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  // Format seconds into "mm:ss"
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentSong) {
    return <div className="text-center text-gray-500">No song selected</div>;
  }

  const durationInSeconds = parseDuration(currentSong.duration);

  const handleSliderChange = (value: number[]) => {
    setProgress(value[0]);
  };

  const handleSliderCommit = () => {
    setIsSeeking(false);
    seek(progress);
  };

  return (
    <div className="rounded-lg bg-zinc-950 p-4">
    <div className="aspect-square overflow-hidden rounded-lg">
      <img
        src={currentSong.cover}
        alt={`${currentSong.title} album cover`}
        className="h-full w-full object-cover"
      />
    </div>
    <div className="mt-4 text-center">
      <h3 className="text-sm sm:text-lg font-semibold text-white">
        {currentSong.title}
      </h3>
      <p className="text-xs sm:text-sm text-white/60">{currentSong.artist}</p>
    </div>
    <div className="mt-4">
      <div className="flex items-center justify-between text-xs sm:text-sm">
        <span>{formatTime(progress)}</span>
        <span>{currentSong.duration}</span>
      </div>
      <Slider
        value={[progress]}
        max={durationInSeconds}
        step={1}
        onValueChange={handleSliderChange}
        onChange={handleSliderCommit}
        className="mt-2"
      />
    </div>
    <div className="mt-4 flex items-center justify-center gap-2 sm:gap-4">
      <Button
        size="icon"
        variant="ghost"
        className="h-6 w-6 sm:h-8 sm:w-8 text-white/60 hover:text-white"
      >
        <Shuffle className="h-4 w-4" />
      </Button>
      <Button
        onClick={onPrevious}
        size="icon"
        variant="ghost"
        className="h-6 w-6 sm:h-8 sm:w-8 text-white/60 hover:text-white"
      >
        <SkipBack className="h-4 w-4" />
      </Button>
      <Button
        onClick={onTogglePlayPause}
        size="icon"
        variant="ghost"
        className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white text-black hover:bg-white/90 hover:text-black"
      >
        {isPlaying ? <Pause className="h-4 w-4 sm:h-6 sm:w-6" /> : <Play className="h-4 w-4 sm:h-6 sm:w-6" />}
      </Button>
      <Button
        onClick={onNext}
        size="icon"
        variant="ghost"
        className="h-6 w-6 sm:h-8 sm:w-8 text-white/60 hover:text-white"
      >
        <SkipForward className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className="h-6 w-6 sm:h-8 sm:w-8 text-white/60 hover:text-white"
      >
        <Repeat className="h-4 w-4" />
      </Button>
    </div>
  </div>
  
  );
};

export default NowPlaying;
