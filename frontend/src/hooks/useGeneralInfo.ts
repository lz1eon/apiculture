import { useContext } from 'react';
import { GeneralInfoContext } from '../contexts/GeneralInfoContext';

export const useGeneralInfo = () => {
    const { apiaries, setApiaries } = useContext(GeneralInfoContext);
    return { apiaries, setApiaries };
}