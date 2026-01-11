import { createBrowserRouter, Navigate } from "react-router";
import App from "@/App";
import { DateCalculation } from "@/pages/DateCalculation";
import { DaysFromToday } from "@/pages/DaysFromToday";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/date-calculation" replace />,
      },
      {
        path: "date-calculation",
        element: <DateCalculation />,
      },
      {
        path: "days-from-today",
        element: <DaysFromToday />,
      },
    ],
  },
]);
