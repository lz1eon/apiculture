import { createContext } from 'react';

interface HiveSelectionContextType {
  selectedHivesCount: number;
  setSelectedHivesCount: (count: number) => void;
};

export const HiveSelectionContext = createContext<HiveSelectionContextType>({
  selectedHivesCount: 0,
  setSelectedHivesCount: () => {},
});