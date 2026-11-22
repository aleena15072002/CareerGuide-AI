import {
  FiBriefcase,
  FiCheckCircle,
  FiMap,
  FiTarget,
} from "react-icons/fi";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SectionHeader from "../components/common/SectionHeader";
import StatCard from "../components/common/StatCard";
import ProgressBar from "../components/common/ProgressBar";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [profileResponse, recommendationsResponse] =
          await Promise.all([
            api.get("/profile"),
            api.get("/recommendations"),
          ]);

        setProfile(profileResponse.data);

        const recommendationData =
          recommendationsResponse.data?.recommendations ||
          recommendationsResponse.data ||
          [];

        setRecommendations(recommendationData);
      } catch (err) {
        console.error("Dashboard error:", err);

        setError(
          err.response?.data?.detail ||
            "Failed to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  /* -------------------------
     LOADING
  ------------------------- */

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
      </div>
    );
  }

  /* -------------------------
     ERROR
  ------------------------- */

  if (error) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      </div>
    );
  }

  /* -------------------------
     USER DATA
  ------------------------- */

  const userName =
    profile?.full_name ||
    user?.full_name ||
    "Student";

  /* -------------------------
     PROFILE COMPLETION
  ------------------------- */

  const profileFields = [
    profile?.full_name,
    profile?.education,
    profile?.experience,
    profile?.skills,
    profile?.interests,
    profile?.career_goal,
  ];

  const completedFields = profileFields.filter(
    (field) =>
      field !== null &&
      field !== undefined &&
      field !== "" &&
      (!Array.isArray(field) || field.length > 0)
  ).length;

  const profileCompletion =
    profileFields.length > 0
      ? Math.round(
          (completedFields / profileFields.length) * 100
        )
      : 0;

  /* -------------------------
     TOP CAREER
  ------------------------- */

  const topCareer = recommendations[0];

  const careerScore =
    topCareer?.recommendation_score ??
    topCareer?.score ??
    0;

  const careerTitle =
    topCareer?.career_name ||
    topCareer?.title ||
    "No recommendation yet";

  const careerDescription =
    topCareer?.description ||
    "Complete your profile to receive personalized career recommendations.";

  const careerSkills =
    topCareer?.matched_skills ||
    topCareer?.skills ||
    [];

  return (
    <div>

      {/* HEADER */}

      <SectionHeader
        title={`Welcome back, ${userName} 👋`}
        subtitle="Here’s a clear view of your current career progress."
      />

      {/* STATS */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          label="Profile completion"
          value={`${profileCompletion}%`}
          helper="Keep your profile updated"
          icon={FiCheckCircle}
        />

        <StatCard
          label="Top career match"
          value={`${careerScore}%`}
          helper={careerTitle}
          icon={FiTarget}
        />

        <StatCard
          label="Skills matched"
          value={`${careerSkills.length} skills`}
          helper="Based on your profile"
          icon={FiBriefcase}
        />

        <StatCard
          label="Roadmap progress"
          value="0%"
          helper="Start your career roadmap"
          icon={FiMap}
        />

      </div>

      {/* MAIN SECTION */}

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_.65fr]">

        {/* TOP RECOMMENDATION */}

        <div className="card p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-semibold text-blue-600">
                Top recommendation
              </p>

              <h2 className="mt-1 text-xl font-bold">
                {careerTitle}
              </h2>

            </div>

            {topCareer && (
              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                {careerScore}% match
              </span>
            )}

          </div>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            {careerDescription}
          </p>

          {topCareer && (
            <div className="mt-5">
              <ProgressBar
                label="Career match"
                value={careerScore}
              />
            </div>
          )}

          {/* SKILLS */}

          {careerSkills.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">

              {careerSkills.map((skill, index) => (
                <span
                  key={skill?.id || skill || index}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                >
                  {typeof skill === "string"
                    ? skill
                    : skill?.name || skill?.skill_name}
                </span>
              ))}

            </div>
          )}

          {/* BUTTON */}

          {topCareer ? (
            <Link
              to={`/career/${topCareer.career_id || topCareer.id}`}
              className="mt-6 inline-flex btn-primary text-sm"
            >
              View career
            </Link>
          ) : (
            <Link
              to="/profile"
              className="mt-6 inline-flex btn-primary text-sm"
            >
              Complete profile
            </Link>
          )}

        </div>

        {/* QUICK ACTIONS */}

        <div className="card p-6">

          <p className="text-sm font-semibold text-slate-500">
            Quick actions
          </p>

          <div className="mt-4 space-y-3">

            <Link
              to="/profile"
              className="block rounded-lg border border-slate-200 p-3 text-sm font-semibold hover:border-blue-300"
            >
              Complete profile
            </Link>

            <Link
              to="/pdf-analyzer"
              className="block rounded-lg border border-slate-200 p-3 text-sm font-semibold hover:border-blue-300"
            >
              Analyze resume
            </Link>

            <Link
              to="/chat"
              className="block rounded-lg border border-slate-200 p-3 text-sm font-semibold hover:border-blue-300"
            >
              Ask AI Career Assistant
            </Link>

          </div>

        </div>

      </div>

      {/* CAREER READINESS */}

      <div className="card mt-6 p-6">

        <div className="flex items-center justify-between">

          <h2 className="font-bold">
            Career readiness
          </h2>

          <span className="text-sm font-semibold text-blue-600">
            {profileCompletion}%
          </span>

        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">

          <ProgressBar
            label="Technical skills"
            value={careerSkills.length > 0 ? 80 : 0}
          />

          <ProgressBar
            label="Education alignment"
            value={profile?.education ? 80 : 0}
          />

          <ProgressBar
            label="Career clarity"
            value={profile?.career_goal ? 90 : 0}
          />

          <ProgressBar
            label="Interview readiness"
            value={0}
          />

        </div>

      </div>

    </div>
  );
}