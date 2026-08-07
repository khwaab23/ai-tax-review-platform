# Northstar Tax Review

A hosted-ready, clickable frontend prototype for an AI-assisted tax workflow connecting a client, CPA firm, and evidence-aware automation layer. The product keeps Maya Patel, the preparer, responsible for every tax decision while making document traceability and uncertainty easy to inspect.

## Problem and users

Tax professionals often need to trace a return value back to a source document while deciding whether an automated extraction is trustworthy. Clients need a much simpler experience for answering targeted questions without seeing internal tax-firm details. This prototype serves Sarah Johnson (client), Maya Patel (preparer), and Daniel Brooks (reviewer) at fictional Northstar Tax Advisors.

The primary workflow combines Source Document Traceability and Trustworthy AI. The supporting client workflow closes the loop when evidence is missing or conflicting.

## Main workflow

1. Maya starts from a return-level dashboard and opens the prioritized review queue.
2. In the three-panel workspace, she selects a return field, inspects the highlighted source, and reads a plain-language evidence summary.
3. She approves, edits and approves, rejects, adds a private note, or asks Sarah for information.
4. Sarah switches into the client portal, uploads a missing 1099-INT or resolves a wage discrepancy.
5. The response appears in the field’s CPA audit history. All activity survives refresh through `localStorage`.

## What works

- Seven realistic evidence cases: direct extraction, blurry/low-confidence source, multi-document calculation, source conflict, missing document, corrected result, and verified field
- Review filters, selected-field coordination across all three panels, simulated document pages, source highlighting, and zoom controls
- Immediate approval plus reason-required edits and rejections
- Internal notes, audit history, next-unresolved navigation, client request creation, and disabled duplicate requests
- Drag-and-drop or file-picker upload with type/size validation, progress, confirmation, and replace-file handling
- Wage conflict choices and a preparer-question path
- Connected client-to-CPA updates, empty/success/error/loading states, and reset confirmation
- Keyboard-focus styling, semantic forms, accessible labels, and responsive tablet/mobile layouts

## Trust and safety decisions

The interface calls the system “automated assistance,” links every suggestion to evidence, pairs confidence with an explanation and uncertainty reason, recommends a next action, and always exposes human review controls. A green verified state only appears after a recorded professional decision; it is distinct from an automated suggestion. Clients never see internal notes, confidence scores, professional navigation, or technical reasoning.

## What is simulated

Documents, OCR/extraction, confidence, calculations, upload transport, secure messaging, authentication, and tax values are mock experiences. There is no backend, database, real PDF viewer, tax calculation, AI model, or filing/signing integration. Files are validated in the browser, but their contents are not uploaded or stored; only filenames and user actions are persisted.

## Technology

React, TypeScript, Vite, React Router, Lucide React, regular CSS, typed mock data, React context/state, and browser `localStorage`. No component framework or backend dependency is used.

## Local setup

Requires a current Node.js LTS release.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Routes are `/cpa`, `/cpa/review`, and `/client`.

## Quality and production build

```bash
npm run lint
npm run build
npm run preview
```

## Deployment

Run `npm run build` and deploy the generated `dist/` directory to any static host. Configure the host to rewrite unknown routes to `index.html` so React Router routes can load directly. On Netlify use an SPA rewrite; on Vercel add an equivalent catch-all rewrite.

## Prototype limitations

- One fictional return and one client are included.
- The document preview is an intentionally simulated tax form, not a PDF renderer.
- Uploaded file bytes are not persisted; only a filename is remembered.
- Alert dialogs stand in for secure messaging.
- State is local to one browser and is not suitable for sensitive production data.
