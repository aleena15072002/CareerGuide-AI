import { useEffect, useState } from "react";

import SectionHeader from "../components/common/SectionHeader";
import ProgressBar from "../components/common/ProgressBar";

import api from "../services/api";

export default function CareerAnalysis() {
  const [careers, setCareers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCareerAnalysis = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/careers");

        const careerData =
          response.data?.careers ||
          response.data ||
          [];

        setCareers(careerData);
      } catch (err) {
        console.error(
          "Career analysis error:",
          err
        );

        setError(
          err.response?.data?.detail ||
            "Failed to load career analysis."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCareerAnalysis();
  }, []);

  // --------------------------------
  // LOADING
  // --------------------------------

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
      </div>
    );
  }

  // --------------------------------
  // ERROR
  // --------------------------------

  if (error) {
    return (
      <div>
        <SectionHeader
          title="Career Analysis"
          subtitle="Understand how your current profile aligns with your career direction."
        />

        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      </div>
    );
  }

  // --------------------------------
  // TOP CAREER
  // --------------------------------

  const topCareer = careers[0];

  const careerScore =
    topCareer?.score ??
    topCareer?.match_score ??
    topCareer?.recommendation_score ??
    0;

  const careerTitle =
    topCareer?.title ||
    topCareer?.career_name ||
    "No career recommendation";

  const careerDescription =
    topCareer?.description ||
    "Complete your profile to receive personalized career guidance.";

  // --------------------------------
  // SKILLS
  // --------------------------------

  const skills =
    topCareer?.skills ||
    topCareer?.required_skills ||
    topCareer?.matched_skills ||
    [];

  // --------------------------------
  // STRENGTHS
  // --------------------------------

  const strengths =
    topCareer?.strengths ||
    topCareer?.matched_skills ||
    skills.slice(0, 4);

  // --------------------------------
  // SKILL GAPS
  // --------------------------------

  const skillGaps =
    topCareer?.skill_gaps ||
    topCareer?.missing_skills ||
    [];

  // --------------------------------
  // READINESS
  // --------------------------------

  const readiness =
    careerScore > 0
      ? Math.round(careerScore)
      : 0;

  return (
    <div>

      <SectionHeader
        title="Career Analysis"
        subtitle="Understand how your current profile aligns with your career direction."
      />

      {/* ================================
          TOP SECTION
      ================================= */}

      <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">

        {/* READINESS */}

        <div className="card p-7 text-center">

          <p className="text-sm font-medium text-slate-500">
            Overall career readiness
          </p>

          <div className="mx-auto mt-5 grid h-40 w-40 place-items-center rounded-full border-[14px] border-blue-100">

            <div>

              <p className="text-4xl font-bold text-slate-900">
                {readiness}%
              </p>

              <p className="text-xs text-slate-500">
                {readiness >= 80
                  ? "Ready to grow"
                  : readiness >= 60
                  ? "Good progress"
                  : "Keep improving"}
              </p>

            </div>

          </div>

          <p className="mx-auto mt-5 max-w-sm text-sm leading-6 text-slate-500">
            {careerDescription}
          </p>

        </div>

        {/* PROFILE ALIGNMENT */}

        <div className="card p-7">

          <h2 className="font-bold">
            Profile alignment
          </h2>

          <div className="mt-6 space-y-6">

            <ProgressBar
              label="Technical skills"
              value={skills.length > 0 ? 80 : 0}
            />

            <ProgressBar
              label="Career direction"
              value={careerScore}
            />

            <ProgressBar
              label="Education alignment"
              value={
                topCareer?.education_alignment ??
                0
              }
            />

            <ProgressBar
              label="Overall readiness"
              value={readiness}
            />

          </div>

        </div>

      </div>

      {/* ================================
          TOP CAREER
      ================================= */}

      {topCareer && (
        <div className="card mt-6 p-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-sm font-semibold text-blue-600">
                Recommended career
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-900">
                {careerTitle}
              </h2>

            </div>

            <span className="w-fit rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
              {careerScore}% match
            </span>

          </div>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
            {careerDescription}
          </p>

        </div>
      )}

      {/* ================================
          STRENGTHS + AREAS TO IMPROVE
      ================================= */}

      <div className="mt-6 grid gap-6 md:grid-cols-2">

        {/* STRENGTHS */}

        <div className="card p-6">

          <h2 className="font-bold">
            Your strengths
          </h2>

          <ul className="mt-4 space-y-3 text-sm text-slate-600">

            {strengths.length > 0 ? (
              strengths.map((item, index) => {

                const value =
                  typeof item === "string"
                    ? item
                    : item?.name ||
                      item?.skill_name ||
                      item?.title ||
                      "";

                return (
                  <li
                    key={value || index}
                    className="flex gap-2"
                  >
                    <span className="text-green-600">
                      ✓
                    </span>

                    {value}
                  </li>
                );
              })
            ) : (
              <li className="text-slate-400">
                No strengths available yet.
              </li>
            )}

          </ul>

        </div>

        {/* AREAS TO IMPROVE */}

        <div className="card p-6">

          <h2 className="font-bold">
            Areas to improve
          </h2>

          <ul className="mt-4 space-y-3 text-sm text-slate-600">

            {skillGaps.length > 0 ? (
              skillGaps.map((item, index) => {

                const value =
                  typeof item === "string"
                    ? item
                    : item?.name ||
                      item?.skill_name ||
                      item?.title ||
                      "";

                return (
                  <li
                    key={value || index}
                    className="flex gap-2"
                  >
                    <span className="text-amber-600">
                      •
                    </span>

                    {value}
                  </li>
                );
              })
            ) : (
              <li className="text-slate-400">
                No skill gaps available yet.
              </li>
            )}

          </ul>

        </div>

      </div>

      {/* ================================
          ALL CAREER OPTIONS
      ================================= */}

      {careers.length > 1 && (
        <div className="card mt-6 p-6">

          <h2 className="font-bold">
            Other career options
          </h2>

          <div className="mt-5 space-y-3">

            {careers.slice(1).map(
              (career, index) => {

                const score =
                  career.score ??
                  career.match_score ??
                  career.recommendation_score ??
                  0;

                const title =
                  career.title ||
                  career.career_name ||
                  `Career ${index + 2}`;

                return (
                  <div
                    key={
                      career.id ||
                      career.career_id ||
                      index
                    }
                    className="rounded-xl border border-slate-200 p-4"
                  >

                    <div className="flex items-center justify-between gap-4">

                      <div>

                        <p className="text-sm font-semibold text-slate-800">
                          {title}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Career recommendation
                        </p>

                      </div>

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                        {score}% match
                      </span>

                    </div>

                    <div className="mt-3">
                      <ProgressBar
                        label=""
                        value={score}
                      />
                    </div>

                  </div>
                );
              }
            )}

          </div>

        </div>
      )}

    </div>
  );
}