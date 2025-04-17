import { AppBar, Toolbar, Typography, Switch } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeProvider";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const theme = useTheme();

  return (
    <AppBar position="static" sx={{ bgcolor: theme.palette.background.default }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          TalentFlow
        </Typography>
        <Switch checked={darkMode} onChange={toggleDarkMode} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
