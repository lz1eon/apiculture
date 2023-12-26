import { createContext } from 'react';
import { Apiary } from '../models';

interface GeneralInfoContextType {
  apiaries: Apiary[];
  setApiaries: (apiaries: Apiary[]) => void;
};

export const GeneralInfoContext = createContext<GeneralInfoContextType>({
  apiaries: [],
  setApiaries: () => {},
});