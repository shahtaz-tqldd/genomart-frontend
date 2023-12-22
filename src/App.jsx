import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/Routes";
import { Toaster } from "react-hot-toast";
import useAuthCheck from "./hooks/useAuthCheck";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Loader from "./ui/Loader/Loader";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: `'Outfit', sans-serif`,
    },
  });

  const authChecked = useAuthCheck();

  return !authChecked ? (
    <Loader />
  ) : (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <RouterProvider router={routes} />
        <Toaster />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
