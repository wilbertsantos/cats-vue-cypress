// src/types/index.ts

export interface Breed {
  id: string;
  name: string;
  origin: string;
  temperament: string;
  description: string;
}

export interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: Breed[];
}
