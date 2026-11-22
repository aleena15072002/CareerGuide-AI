import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import SectionHeader from "../components/common/SectionHeader";
import ProgressBar from "../components/common/ProgressBar";
import api from "../services/api";

export default function CareerDetails() {
  const { id } = useParams();

  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/careers/${id}`);

        setCareer(response.data);
      } catch (err) {
        console.error("Career details error:", err);

        setError(
          err.response?.data?.detail ||
            "Failed to load career details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCareer();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <SectionHeader
          title="Career Details"
          subtitle="Career package and profile alignment."
        />

        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>

        <Link
          to="/recommendations"
          className="mt-5 inline-flex text-sm font-semibold text-blue-600"
        >
          ← Back to recommendations
        </Link>
      </div>
    );
  }

  if (!career) {
    return (
      <div className="card p-8 text-center">
        <h2 className="font-bold">
          Career not found
        </h2>

        <Link
          to="/recommendations"
          className="mt-4 inline-flex text-sm font-semibold text-blue-600"
        >
          Back to recommendations
        </Link>
      </div>
    );
  }

  // Backend field mapping
  const careerId =
    career.career_id ||
    career.id ||
    id;

  const title =
    career.career_name ||
    career.title ||
    career.name ||
    "Career";

  const score =
    career.recommendation_score ??
    career.match_score ??
    career.score ??
    0;

  const demand =
    career.demand ||
    career.job_demand ||
    "Good";

  const salary =
    career.salary ||
    career.salary_range ||
    "Not available";

  const description =
    career.description ||
    "Career information is not available.";

  const skills =
    career.required_skills ||
    career.skills ||
    [];

  const matched =
    career.matched_skills ||
    [];

  const missing =
    career.skill_gaps ||
    career.missing_skills ||
    [];

  return (
    <div>
      <SectionHeader
        title={title}
        subtitle="Career package and profile alignment."
        action={
          <Link
            to={`/roadmap/${careerId}`}
            className="btn-primary"
          >
            View roadmap
          </Link>
        }
      />

      {/* Main career information */}
      <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">

        {/* Profile match */}
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Profile match
              </p>

              <p className="mt-1 text-4xl font-bold text-blue-600">
                {score}%
              </p>
            </div>

            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
              {demand} demand
            </span>
          </div>

          <div className="mt-6">
            <ProgressBar
              label="Overall match"
              value={Number(score)}
            />
          </div>

          <p className="mt-6 text-sm leading-7 text-slate-600">
            {description}
          </p>
        </div>

        {/* Salary + skills */}
        <div className="card p-6">
          <p className="text-sm text-slate-500">
            Expected salary range
          </p>

          <p className="mt-2 text-xl font-bold">
            {salary}
          </p>

          <p className="mt-6 text-sm text-slate-500">
            Required skills
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {skills.length > 0 ? (
              skills.map((skill, index) => {
                const skillName =
                  typeof skill === "string"
                    ? skill
                    : skill?.name ||
                      skill?.skill_name ||
                      skill?.title ||
                      "";

                return (
                  <span
                    key={skillName || index}
                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                  >
                    {skillName}
                  </span>
                );
              })
            ) : (
              <p className="text-xs text-slate-400">
                No skills available.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Matched + Skill gap */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">

        {/* Matched skills */}
        <div className="card p-6">
          <h2 className="font-bold">
            Matched skills
          </h2>

          <div className="mt-4 space-y-2">
            {matched.length > 0 ? (
              matched.map((skill, index) => {
                const skillName =
                  typeof skill === "string"
                    ? skill
                    : skill?.name ||
                      skill?.skill_name ||
                      skill?.title ||
                      "";

                return (
                  <p
                    key={skillName || index}
                    className="text-sm text-green-700"
                  >
                    ✓ {skillName}
                  </p>
                );
              })
            ) : (
              <p className="text-sm text-slate-400">
                No matched skills available.
              </p>
            )}
          </div>
        </div>

        {/* Skill gap */}
        <div className="card p-6">
          <h2 className="font-bold">
            Skill gap
          </h2>

          <div className="mt-4 space-y-2">
            {missing.length > 0 ? (
              missing.map((skill, index) => {
                const skillName =
                  typeof skill === "string"
                    ? skill
                    : skill?.name ||
                      skill?.skill_name ||
                      skill?.title ||
                      "";

                return (
                  <p
                    key={skillName || index}
                    className="text-sm text-amber-700"
                  >
                    ○ {skillName}
                  </p>
                );
              })
            ) : (
              <p className="text-sm text-green-700">
                ✓ No major skill gaps identified.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}