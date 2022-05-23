import * as React from "react";
import { createTheme, ThemeProvider as MuiThemeProvider, CssBaseline, Button } from "@mui/material";

export function ThemeProvider({ children }: React.PropsWithChildren<Record<never, never>>): JSX.Element {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
          primary: {
            main: "#ff7626",
          },
        },
      }),
    [isDarkMode]
  );

  return (
    <MuiThemeProvider theme={theme}>
      <Button style={{ position: "absolute" }} onClick={() => setIsDarkMode((prevMode) => !prevMode)}>
        Toggle
      </Button>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
