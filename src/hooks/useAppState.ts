import {useContext} from 'react';import {AppStateContext} from './AppStateContext';
export const useAppState=()=>{const context=useContext(AppStateContext);if(!context)throw new Error('AppStateProvider missing');return context};
