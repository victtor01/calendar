import { createContext } from "react";

export const ThemeContext = createContext({
  handleTheme: () => null,
  theme: "DARK",
});
