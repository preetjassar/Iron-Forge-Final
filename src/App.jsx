import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import About from "./components/About";
import Programs from "./components/Programs";
import TrainersPage from "./pages/TrainersPage";
import Pricing from "./components/Pricing";
import ForgeFitPage from "./pages/ForgeFitPage";
import Calculations from "./components/Calculations";
import BMIPage from "./pages/calculators/BMIPage";
import BMRPage from "./pages/calculators/BMRPage";
import Contact from "./components/Contact";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import Profile from "./pages/profile/Profile";
import BookSession from "./pages/booking/BookSession";

import Payment from "./pages/booking/Payment";
import PaymentSuccess from "./pages/Success/PaymentSuccess";
import BookingSuccess from "./pages/Success/BookingSuccess";
import JoinProgram from "./components/JoinProgram";

import StrengthTraining from "./pages/programs/StrengthTraining";
import WeightLoss from "./pages/programs/WeightLoss";
import CardioFitness from "./pages/programs/CardioFitness";
import YogaFlexibility from "./pages/programs/YogaFlexibilty";
import CrossFitpage from "./pages/programs/Crossfit";
import PersonalTraining from "./pages/programs/PersonalTraining";

import AuthRoutes from "./components/authRoutes";
import "./App.css";

const router = createBrowserRouter([
  // PUBLIC WEBSITE (MainLayout with Navbar & Footer)
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "programs",
        element: <Programs />,
      },
      {
        path: "trainers",
        element: <TrainersPage />,
      },
      {
        path: "pricing",
        element: <Pricing />,
      },
      {
        path: "forgefit",
        element: <ForgeFitPage />,
      },
      {
        path: "bmi",
        element: <BMIPage />,
      },
      {
        path: "bmr",
        element: <BMRPage />,
      },
      {
        path: "calculations",
        element: <Calculations />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "joinprogram",
        element: <JoinProgram />,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "booking-success",
        element: <BookingSuccess />,
      },

      // Program Detail Pages
      {
        path: "programs/StrengthTraining",
        element: <StrengthTraining />,
      },
      {
        path: "programs/CardioFitness",
        element: <CardioFitness />,
      },
      {
        path: "programs/CrossFit",
        element: <CrossFitpage />,
      },
      {
        path: "programs/PersonalTraining",
        element: <PersonalTraining />,
      },
      {
        path: "programs/WeightLoss",
        element: <WeightLoss />,
      },
      {
        path: "programs/YogaFlexibilty",
        element: <YogaFlexibility />,
      },

      // PROTECTED USER ROUTES
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "booksession",
        element: (
          <ProtectedRoute>
            <BookSession />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // AUTH (Login / Signup)
  {
    element: <AuthRoutes />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },

  // 404 NOT FOUND
  {
    path: "*",
    element: <NotFound />,
  },
]);

export { router };