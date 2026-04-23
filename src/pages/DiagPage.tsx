import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const DiagPage = () => {
  const location = useLocation();
  const [now, setNow] = useState(() => new Date().toLocaleTimeString());
  const [fullUrl, setFullUrl] = useState("");

  useEffect(() => {
    setFullUrl(window.location.href);
    const t = setInterval(() => setNow(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(t);
  }, [location.pathname]);

  const Row = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between gap-4 border-b border-border py-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono text-foreground break-all text-right">{value}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-md mx-auto space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-primary">Router Diagnostic</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Confirms HashRouter navigation works inside the APK.
          </p>
        </header>

        <section className="rounded-lg border border-border bg-card p-4">
          <Row label="Pathname" value={location.pathname} />
          <Row label="Search" value={location.search || "(none)"} />
          <Row label="Hash key" value={location.key} />
          <Row label="Full URL" value={fullUrl} />
          <Row label="Clock" value={now} />
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase">
            Test navigation
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {[
              { to: "/", label: "Home" },
              { to: "/shop", label: "Shop" },
              { to: "/workouts", label: "Workouts" },
              { to: "/tools", label: "Tools" },
              { to: "/tips", label: "Tips" },
              { to: "/wishlist", label: "Wishlist" },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-md bg-secondary text-secondary-foreground px-3 py-2 text-center text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm">
          <p className="font-semibold text-primary mb-1">✅ If you can read this</p>
          <p className="text-muted-foreground">
            React mounted, HashRouter resolved <code>#/diag</code>, and styling is
            loading correctly inside the WebView.
          </p>
        </section>
      </div>
    </div>
  );
};

export default DiagPage;
