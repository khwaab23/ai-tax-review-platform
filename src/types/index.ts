export type ReviewState =
  | "needs-review"
  | "conflict"
  | "missing"
  | "verified"
  | "rejected";
export type EvidenceType =
  | "direct"
  | "low-confidence"
  | "calculated"
  | "conflict"
  | "missing"
  | "corrected"
  | "verified";
export interface AuditEntry {
  id: string;
  action: string;
  person: string;
  timestamp: string;
  oldValue?: string;
  newValue?: string;
  reason?: string;
}
export interface TaxField {
  id: string;
  section: string;
  name: string;
  form: string;
  line: string;
  value: string;
  state: ReviewState;
  evidenceType: EvidenceType;
  confidence?: number;
  document: string;
  documentType: string;
  page: number;
  uploaded: string;
  sourceLocation: string;
  explanation: string;
  uncertainty?: string;
  recommendedAction: string;
  calculation?: string[];
  conflictingEvidence?: string;
  audit: AuditEntry[];
}
export interface ClientRequest {
  id: string;
  fieldId: string;
  type: "upload" | "conflict";
  title: string;
  what: string;
  why: string;
  requestedBy: string;
  due: string;
  after: string;
  status: "pending" | "submitted";
  response?: string;
  filename?: string;
  createdAt: string;
}
export interface AppState {
  fields: TaxField[];
  requests: ClientRequest[];
  notes: Record<string, string[]>;
}
