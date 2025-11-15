import {
  TTSIcon,
  SourcesIcon,
  CrossPlatformIcon,
  CustomizationIcon,
  SyncIcon,
  DarkModeIcon,
} from "@/components/icons";

export default function DesignSystemTest() {
  return (
    <div className="page-shell" style={{ padding: "var(--spacing-8) 0" }}>
      <h1 style={{ fontSize: "var(--font-size-4xl)", fontWeight: "var(--font-weight-bold)", marginBottom: "var(--spacing-8)" }}>
        Design System Test
      </h1>

      {/* Brand Colors */}
      <section style={{ marginBottom: "var(--spacing-12)" }}>
        <h2 style={{ fontSize: "var(--font-size-2xl)", fontWeight: "var(--font-weight-semibold)", marginBottom: "var(--spacing-4)" }}>
          Brand Colors
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "var(--spacing-4)" }}>
          <div style={{ padding: "var(--spacing-4)", background: "var(--brand-primary)", color: "white", borderRadius: "var(--radius-lg)" }}>
            Primary
          </div>
          <div style={{ padding: "var(--spacing-4)", background: "var(--brand-primary-dark)", color: "white", borderRadius: "var(--radius-lg)" }}>
            Primary Dark
          </div>
          <div style={{ padding: "var(--spacing-4)", background: "var(--brand-primary-light)", color: "white", borderRadius: "var(--radius-lg)" }}>
            Primary Light
          </div>
          <div style={{ padding: "var(--spacing-4)", background: "var(--brand-accent)", color: "white", borderRadius: "var(--radius-lg)" }}>
            Accent
          </div>
        </div>
      </section>

      {/* Icons */}
      <section style={{ marginBottom: "var(--spacing-12)" }}>
        <h2 style={{ fontSize: "var(--font-size-2xl)", fontWeight: "var(--font-weight-semibold)", marginBottom: "var(--spacing-4)" }}>
          Custom Icons
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "var(--spacing-6)" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ 
              width: "64px", 
              height: "64px", 
              margin: "0 auto var(--spacing-2)", 
              padding: "var(--spacing-3)",
              background: "var(--brand-primary)",
              borderRadius: "var(--radius-lg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <SourcesIcon style={{ width: "40px", height: "40px", color: "white" }} />
            </div>
            <div style={{ fontSize: "var(--font-size-sm)" }}>Sources</div>
          </div>
          
          <div style={{ textAlign: "center" }}>
            <div style={{ 
              width: "64px", 
              height: "64px", 
              margin: "0 auto var(--spacing-2)", 
              padding: "var(--spacing-3)",
              background: "var(--brand-accent)",
              borderRadius: "var(--radius-lg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <CustomizationIcon style={{ width: "40px", height: "40px", color: "white" }} />
            </div>
            <div style={{ fontSize: "var(--font-size-sm)" }}>Customization</div>
          </div>
          
          <div style={{ textAlign: "center" }}>
            <div style={{ 
              width: "64px", 
              height: "64px", 
              margin: "0 auto var(--spacing-2)", 
              padding: "var(--spacing-3)",
              background: "var(--brand-primary-light)",
              borderRadius: "var(--radius-lg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <TTSIcon style={{ width: "40px", height: "40px", color: "white" }} />
            </div>
            <div style={{ fontSize: "var(--font-size-sm)" }}>Text-to-Speech</div>
          </div>
          
          <div style={{ textAlign: "center" }}>
            <div style={{ 
              width: "64px", 
              height: "64px", 
              margin: "0 auto var(--spacing-2)", 
              padding: "var(--spacing-3)",
              background: "var(--brand-primary-dark)",
              borderRadius: "var(--radius-lg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <CrossPlatformIcon style={{ width: "40px", height: "40px", color: "white" }} />
            </div>
            <div style={{ fontSize: "var(--font-size-sm)" }}>Cross-Platform</div>
          </div>
          
          <div style={{ textAlign: "center" }}>
            <div style={{ 
              width: "64px", 
              height: "64px", 
              margin: "0 auto var(--spacing-2)", 
              padding: "var(--spacing-3)",
              background: "var(--brand-accent-dark)",
              borderRadius: "var(--radius-lg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <SyncIcon style={{ width: "40px", height: "40px", color: "white" }} />
            </div>
            <div style={{ fontSize: "var(--font-size-sm)" }}>Sync</div>
          </div>
          
          <div style={{ textAlign: "center" }}>
            <div style={{ 
              width: "64px", 
              height: "64px", 
              margin: "0 auto var(--spacing-2)", 
              padding: "var(--spacing-3)",
              background: "var(--brand-accent-light)",
              borderRadius: "var(--radius-lg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <DarkModeIcon style={{ width: "40px", height: "40px", color: "white" }} />
            </div>
            <div style={{ fontSize: "var(--font-size-sm)" }}>Dark Mode</div>
          </div>
        </div>
      </section>

      {/* Shadows */}
      <section style={{ marginBottom: "var(--spacing-12)" }}>
        <h2 style={{ fontSize: "var(--font-size-2xl)", fontWeight: "var(--font-weight-semibold)", marginBottom: "var(--spacing-4)" }}>
          Shadow System
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "var(--spacing-4)" }}>
          <div style={{ padding: "var(--spacing-6)", background: "var(--surface)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)" }}>
            Shadow SM
          </div>
          <div style={{ padding: "var(--spacing-6)", background: "var(--surface)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-md)" }}>
            Shadow MD
          </div>
          <div style={{ padding: "var(--spacing-6)", background: "var(--surface)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-lg)" }}>
            Shadow LG
          </div>
          <div style={{ padding: "var(--spacing-6)", background: "var(--surface)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-xl)" }}>
            Shadow XL
          </div>
        </div>
      </section>

      {/* Border Radius */}
      <section style={{ marginBottom: "var(--spacing-12)" }}>
        <h2 style={{ fontSize: "var(--font-size-2xl)", fontWeight: "var(--font-weight-semibold)", marginBottom: "var(--spacing-4)" }}>
          Border Radius
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "var(--spacing-4)" }}>
          <div style={{ padding: "var(--spacing-6)", background: "var(--brand-primary)", color: "white", borderRadius: "var(--radius-sm)" }}>
            SM (6px)
          </div>
          <div style={{ padding: "var(--spacing-6)", background: "var(--brand-primary)", color: "white", borderRadius: "var(--radius-md)" }}>
            MD (8px)
          </div>
          <div style={{ padding: "var(--spacing-6)", background: "var(--brand-primary)", color: "white", borderRadius: "var(--radius-lg)" }}>
            LG (12px)
          </div>
          <div style={{ padding: "var(--spacing-6)", background: "var(--brand-primary)", color: "white", borderRadius: "var(--radius-xl)" }}>
            XL (16px)
          </div>
        </div>
      </section>
    </div>
  );
}
