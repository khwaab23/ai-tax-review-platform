import { useEffect, useState, type ReactNode } from "react";
import { initialState } from "../data/mockData";
import type { AppState, ClientRequest } from "../types";
import { AppStateContext, type AppStateContextValue } from "./AppStateContext";
const KEY = "northstar-tax-prototype-v1";
export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) ?? "null") ?? initialState;
    } catch {
      return initialState;
    }
  });
  useEffect(() => localStorage.setItem(KEY, JSON.stringify(state)), [state]);
  const updateField: AppStateContextValue["updateField"] = (
    id,
    value,
    status,
    audit,
  ) =>
    setState((s) => ({
      ...s,
      fields: s.fields.map((f) =>
        f.id === id
          ? {
              ...f,
              value,
              state: status,
              audit: [
                ...f.audit,
                {
                  ...audit,
                  id: crypto.randomUUID(),
                  timestamp: new Date().toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }),
                },
              ],
            }
          : f,
      ),
    }));
  const addNote = (id: string, note: string) =>
    setState((s) => ({
      ...s,
      notes: { ...s.notes, [id]: [...(s.notes[id] ?? []), note] },
    }));
  const createRequest = (fieldId: string) =>
    setState((s) => {
      if (
        s.requests.some((r) => r.fieldId === fieldId && r.status === "pending")
      )
        return s;
      const type = fieldId === "wage-conflict" ? "conflict" : "upload";
      const request: ClientRequest = {
        id: crypto.randomUUID(),
        fieldId,
        type,
        title:
          type === "upload"
            ? "Upload your Lakeside Bank 1099-INT"
            : "Confirm your 2025 wage amount",
        what:
          type === "upload"
            ? "Upload the 1099-INT issued by Lakeside Bank."
            : "Tell us which wage amount is correct.",
        why:
          type === "upload"
            ? "You reported interest from this bank, but we do not have its tax document."
            : "Your W-2 and questionnaire show different amounts.",
        requestedBy: "Maya Patel",
        due: "August 12, 2026",
        after: "Maya will review your response and update your return.",
        status: "pending",
        createdAt: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };
      return {
        ...s,
        requests: [...s.requests, request],
        fields: s.fields.map((f) =>
          f.id === fieldId
            ? {
                ...f,
                audit: [
                  ...f.audit,
                  {
                    id: crypto.randomUUID(),
                    action: "Information requested from client",
                    person: "Maya Patel",
                    timestamp: new Date().toLocaleString(),
                  },
                ],
              }
            : f,
        ),
      };
    });
  const submitRequest = (id: string, response: string, filename?: string) =>
    setState((s) => {
      const req = s.requests.find((r) => r.id === id)!;
      return {
        ...s,
        requests: s.requests.map((r) =>
          r.id === id ? { ...r, status: "submitted", response, filename } : r,
        ),
        fields: s.fields.map((f) =>
          f.id === req.fieldId
            ? {
                ...f,
                audit: [
                  ...f.audit,
                  {
                    id: crypto.randomUUID(),
                    action: "Client response received",
                    person: "Sarah Johnson",
                    timestamp: new Date().toLocaleString(),
                    newValue: response,
                  },
                ],
              }
            : f,
        ),
      };
    });
  return (
    <AppStateContext.Provider
      value={{
        state,
        updateField,
        addNote,
        createRequest,
        submitRequest,
        resetDemo: () => setState(initialState),
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}
