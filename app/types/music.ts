// types.ts

export interface SongBase {
  id: string;
  title: string;
  duration: string;
}

export interface CentralSong extends SongBase {
  artist: string;
  cover: string;
  file: string;
}

export interface TableDemoSong extends SongBase {
  number: string;
  plays: string;
  album: string;
  image: string;
  isPlaying?: boolean;
}
