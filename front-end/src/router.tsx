import { createBrowserRouter, Navigate } from "react-router";
import App from "@/App";
import { DateCalculation } from "@/pages/DateCalculation";
import { DateAfterDays } from "@/pages/DateAfterDays";

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
        path: "date-after-days",
        element: <DateAfterDays />,
      },
    ],
  },
]);
