import { createContext } from 'react';
import { GameData } from '../types/types';
export const GamesContext = createContext<GameData['games']>([]);
