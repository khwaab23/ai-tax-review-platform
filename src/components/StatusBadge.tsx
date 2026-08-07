import type {ReviewState} from '../types'; const labels:Record<ReviewState,string>={'needs-review':'Needs review',conflict:'Conflict',missing:'Missing info',verified:'Verified',rejected:'Rejected'};
export function StatusBadge({state}:{state:ReviewState}){return <span className={`status status-${state}`}>{labels[state]}</span>}
