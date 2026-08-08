import {
  ChevronLeft,
  ChevronRight,
  FileQuestion,
  Minus,
  Plus,
  ScanLine,
} from "lucide-react";
import { useState } from "react";
import type { TaxField } from "../types";
export function DocumentPreview({ field }: { field: TaxField }) {
  const [zoom, setZoom] = useState(100);
  const [pages, setPages] = useState<Record<string, number>>({});
  const page = pages[field.id] ?? field.page;
  const pageCount = field.evidenceType === "calculated" ? 2 : 1;
  const setPage = (next: number) =>
    setPages((current) => ({ ...current, [field.id]: next }));
  if (field.evidenceType === "missing")
    return (
      <section className="document-panel">
        <header className="panel-header">
          <div>
            <h2>Source document</h2>
            <p>No document received</p>
          </div>
          <span>Missing</span>
        </header>
        <div className="missing-document">
          <FileQuestion />
          <h3>Supporting document unavailable</h3>
          <p>
            Sarah reported interest from Lakeside Bank, but a 1099-INT has not
            been provided.
          </p>
          <strong>Expected source: 1099-INT · Box 1</strong>
        </div>
        <div className="source-connection">
          <ScanLine size={16} />
          <span>
            No source is available to connect to{" "}
            <strong>
              {field.form}, {field.line}
            </strong>
          </span>
        </div>
      </section>
    );
  const sourceValue =
    field.evidenceType === "calculated"
      ? page === 1
        ? "$824.16"
        : "$460.47"
      : field.value;
  const payer =
    field.evidenceType === "calculated"
      ? page === 1
        ? "FIRST NATIONAL BANK"
        : "HARBOR CREDIT UNION"
      : field.documentType === "1099-DIV"
        ? "HARBOR BROKERAGE LLC"
        : "ACME DESIGN GROUP, INC.";
  return (
    <section className="document-panel">
      <header className="panel-header">
        <div>
          <h2>Source document</h2>
          <p>{field.document}</p>
        </div>
        <span>{field.documentType}</span>
      </header>
      <div className="doc-toolbar">
        <div>
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            aria-label="Previous page"
          >
            <ChevronLeft />
          </button>
          <span>
            Page {page} of {pageCount}
          </span>
          <button
            disabled={page >= pageCount}
            onClick={() => setPage(page + 1)}
            aria-label="Next page"
          >
            <ChevronRight />
          </button>
        </div>
        <div>
          <button
            disabled={zoom <= 75}
            onClick={() => setZoom(Math.max(75, zoom - 25))}
            aria-label="Zoom out"
          >
            <Minus />
          </button>
          <span>{zoom}%</span>
          <button
            disabled={zoom >= 150}
            onClick={() => setZoom(Math.min(150, zoom + 25))}
            aria-label="Zoom in"
          >
            <Plus />
          </button>
        </div>
      </div>
      <div className="paper-stage">
        <div
          className={`tax-paper ${field.evidenceType === "low-confidence" ? "blurry" : ""}`}
          style={{ transform: `scale(${zoom / 100})` }}
        >
          <div className="paper-title">
            <b>
              {field.documentType === "W-2"
                ? "W-2 Wage and Tax Statement"
                : field.documentType}
            </b>
            <span>2025</span>
          </div>
          <div className="paper-person">
            Sarah Johnson
            <br />
            <small>128 Linden Avenue, Arlington, VA 22201</small>
          </div>
          <div className="form-grid">
            <div>
              <small>PAYER / EMPLOYER</small>
              <b>{payer}</b>
            </div>
            <div>
              <small>RECIPIENT TIN</small>
              <b>***-**-4821</b>
            </div>
            <div className="source-highlight">
              <span>
                <ScanLine size={15} /> {field.sourceLocation.split("·").pop()}
              </span>
              <strong>{sourceValue}</strong>
              <small>Source for {field.name}</small>
            </div>
            <div>
              <small>Federal tax withheld</small>
              <b>{field.documentType === "W-2" ? "$11,240.00" : "$0.00"}</b>
            </div>
            <div>
              <small>Account number</small>
              <b>•••• 3948</b>
            </div>
            <div>
              <small>Tax year</small>
              <b>2025</b>
            </div>
          </div>
          <p className="paper-foot">
            {field.documentType === "W-2"
              ? "Copy B — To be filed with employee’s federal tax return"
              : "Recipient copy — Keep for your records"}
          </p>
        </div>
      </div>
      <div className="source-connection">
        <ScanLine size={16} />
        <span>
          Highlighted value connects to{" "}
          <strong>
            {field.form}, {field.line}
          </strong>
        </span>
      </div>
    </section>
  );
}
