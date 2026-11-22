import { Routes, Route } from "react-router-dom";

import PublicLayout from "./components/layout/PublicLayout";
import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import StudentProfile from "./pages/StudentProfile";
import CareerAnalysis from "./pages/CareerAnalysis";
import Recommendations from "./pages/Recommendations";
import CareerDetails from "./pages/CareerDetails";
import Roadmap from "./pages/Roadmap";
import AIChatbot from "./pages/AIChatbot";
import PDFAnalyzer from "./pages/PDFAnalyzer";
import PlacementPreparation from "./pages/PlacementPreparation";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* PROTECTED */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>

          <Route path="/dashboard" element={<Dashboard />} />

          <Route
            path="/profile"
            element={<StudentProfile />}
          />

          <Route
            path="/career-analysis"
            element={<CareerAnalysis />}
          />

          <Route
            path="/recommendations"
            element={<Recommendations />}
          />

          <Route
            path="/career/:id"
            element={<CareerDetails />}
          />

          <Route
            path="/roadmap/:id"
            element={<Roadmap />}
          />

          <Route
            path="/chat"
            element={<AIChatbot />}
          />

          <Route
            path="/pdf-analyzer"
            element={<PDFAnalyzer />}
          />

          <Route
            path="/placement-preparation"
            element={<PlacementPreparation />}
          />

          <Route
            path="/notifications"
            element={<Notifications />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

        </Route>
      </Route>

    </Routes>
  );
}