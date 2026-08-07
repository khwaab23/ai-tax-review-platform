import {createContext} from 'react';import type {AppState,AuditEntry,ReviewState} from '../types';
export type AppStateContextValue={state:AppState;updateField:(id:string,value:string,status:ReviewState,audit:Omit<AuditEntry,'id'|'timestamp'>)=>void;addNote:(id:string,note:string)=>void;createRequest:(fieldId:string)=>void;submitRequest:(id:string,response:string,filename?:string)=>void;resetDemo:()=>void};
export const AppStateContext=createContext<AppStateContextValue|null>(null);
