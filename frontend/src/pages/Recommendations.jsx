import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import SectionHeader from "../components/common/SectionHeader";
import api from "../services/api";

export default function Recommendations() {
  const [recommendations, setRecommendations] =
    useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --------------------------------
  // GET RECOMMENDATIONS
  // --------------------------------

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          "/recommendations"
        );

        const data =
          response.data?.recommendations ||
          response.data ||
          [];

        setRecommendations(data);
      } catch (err) {
        console.error(
          "Recommendations error:",
          err
        );

        setError(
          err.response?.data?.detail ||
            "Failed to load career recommendations."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
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
          title="Career Recommendations"
          subtitle="Careers ranked using your profile, skills, interests and goals."
        />

        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <SectionHeader
        title="Career Recommendations"
        subtitle="Careers ranked using your profile, skills, interests and goals."
      />

      {/* NO RECOMMENDATIONS */}

      {recommendations.length === 0 ? (
        <div className="card p-8 text-center">

          <h2 className="text-lg font-bold text-slate-900">
            No recommendations yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Complete your student profile with your
            education, skills, interests and target role
            to receive personalized career recommendations.
          </p>

          <Link
            to="/profile"
            className="btn-primary mt-5 inline-flex text-sm"
          >
            Complete profile
          </Link>

        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">

          {recommendations.map(
            (career, index) => {

              const careerId =
                career.career_id ||
                career.id;

              const careerTitle =
                career.career_name ||
                career.title ||
                "Career";

              const score =
                career.recommendation_score ??
                career.score ??
                career.match_score ??
                0;

              const description =
                career.description ||
                "This career is recommended based on your current profile.";

              const skills =
                career.matched_skills ||
                career.skills ||
                [];

              const demand =
                career.demand ||
                career.job_demand ||
                "Good";

              const salary =
                career.salary ||
                career.salary_range ||
                "Not available";

              return (
                <div
                  key={
                    careerId || index
                  }
                  className="card p-6"
                >

                  {/* HEADER */}

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                        Recommended career
                      </p>

                      <h2 className="mt-2 text-xl font-bold">
                        {careerTitle}
                      </h2>

                    </div>

                    <div className="text-right">

                      <p className="text-2xl font-bold text-blue-600">
                        {score}%
                      </p>

                      <p className="text-xs text-slate-500">
                        match
                      </p>

                    </div>

                  </div>

                  {/* DESCRIPTION */}

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {description}
                  </p>

                  {/* SKILLS */}

                  {skills.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">

                      {skills.map(
                        (skill, skillIndex) => {

                          const skillName =
                            typeof skill ===
                            "string"
                              ? skill
                              : skill?.name ||
                                skill?.skill_name ||
                                skill?.title ||
                                "";

                          return (
                            <span
                              key={
                                skillName ||
                                skillIndex
                              }
                              className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
                            >
                              {skillName}
                            </span>
                          );
                        }
                      )}

                    </div>
                  )}

                  {/* DEMAND + SALARY */}

                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm">

                    <div className="rounded-lg bg-slate-50 p-3">

                      <span className="text-slate-500">
                        Demand
                      </span>

                      <p className="mt-1 font-semibold">
                        {demand}
                      </p>

                    </div>

                    <div className="rounded-lg bg-slate-50 p-3">

                      <span className="text-slate-500">
                        Salary
                      </span>

                      <p className="mt-1 font-semibold">
                        {salary}
                      </p>

                    </div>

                  </div>

                  {/* VIEW CAREER */}

                  {careerId && (
                    <Link
                      to={`/career/${careerId}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      View career
                      <FiArrowRight />
                    </Link>
                  )}

                </div>
              );
            }
          )}

        </div>
      )}
    </div>
  );
}