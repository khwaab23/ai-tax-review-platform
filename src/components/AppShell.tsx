import { Building2, ChevronDown, RotateCcw, ShieldCheck } from "lucide-react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppState } from "../hooks/useAppState";
export function AppShell() {
  const loc = useLocation();
  const nav = useNavigate();
  const { resetDemo } = useAppState();
  const client = loc.pathname.startsWith("/client");

  return (
    <div className={client ? "app client-app" : "app"}>
      <header className="topbar">
        <NavLink to="/cpa" className="brand">
          <span className="brand-mark">
            <Building2 size={19} />
          </span>
          <span>
            <strong>Northstar</strong>
            <small>Tax Advisors</small>
          </span>
        </NavLink>
        <div className="topbar-right">
          <button
            className="reset-button"
            onClick={() => {
              if (
                confirm("Reset all prototype activity to its original state?")
              ) {
                resetDemo();
                nav("/cpa");
              }
            }}
          >
            <RotateCcw size={15} /> Reset demo
          </button>
          <div className="role-control">
            <span>Prototype view</span>
            <button
              onClick={() => nav(client ? "/cpa" : "/client")}
              aria-label="Switch prototype role"
            >
              <ShieldCheck size={16} />
              {client ? "Client View" : "CPA View"}
              <ChevronDown size={14} />
            </button>
          </div>
          <div
            className="avatar"
            aria-label={client ? "Sarah Johnson" : "Maya Patel"}
          >
            {client ? "SJ" : "MP"}
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
