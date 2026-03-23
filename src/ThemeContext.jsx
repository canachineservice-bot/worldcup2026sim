import { createContext, useContext, useState, useEffect } from "react";

const LIGHT = {
  bg: "#FAFBFD", b2: "#F0F2F6", cd: "#FFFFFF", tx: "#1a1a2e", t2: "#555577", t3: "#9999bb",
  ac: "#d4145a", a2: "#fbb03b", gn: "#00a854", bd: "#E2E5EB", bl: "#2563eb",
  hd: "#FFFFFF", hb: "1px solid #E2E5EB",
};

const DARK = {
  bg: "#0a1628", b2: "#0f1d32", cd: "#1a2a4a", tx: "#f0f0f5", t2: "#a0a0c0", t3: "#6a6a8a",
  ac: "#d4145a", a2: "#fbb03b", gn: "#00c960", bd: "#2a3a5a", bl: "#5b8def",
  hd: "#0f1d32", hb: "1px solid #2a3a5a",
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem("wcup_theme") === "dark"; } catch { return true; }
  });

  useEffect(() => {
    try { localStorage.setItem("wcup_theme", dark ? "dark" : "light"); } catch {}
  }, [dark]);

  const toggle = () => setDark(d => !d);
  const colors = dark ? DARK : LIGHT;

  return (
    <ThemeContext.Provider value={{ dark, toggle, C: colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
