import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SectionHeader from "../components/common/SectionHeader";
import api from "../services/api";

export default function Roadmap() {
  const { id } = useParams();

  const [roadmap, setRoadmap] = useState([]);
  const [career, setCareer] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRoadmap = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/roadmap/${id}`);

      const data = response.data;

      /*
        Backend response can be:

        {
          career_id: 1,
          career_name: "Full Stack Developer",
          progress: 40,
          items: [...]
        }

        OR directly an array.
      */

      if (Array.isArray(data)) {
        setRoadmap(data);
        setCareer(null);
      } else {
        setRoadmap(
          data.items ||
            data.roadmap ||
            data.steps ||
            []
        );

        setCareer(data);
      }
    } catch (err) {
      console.error("Roadmap fetch error:", err);

      setError(
        err.response?.data?.detail ||
          "Failed to load roadmap."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmap();
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
          title="Career Roadmap"
          subtitle="Personalized learning plan based on your current profile."
        />

        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      </div>
    );
  }

  const careerTitle =
    career?.career_name ||
    career?.title ||
    career?.career?.name ||
    "Career";

  const matchScore =
    career?.recommendation_score ??
    career?.match_score ??
    career?.score ??
    null;

  return (
    <div>
      <SectionHeader
        title={`${careerTitle} Roadmap`}
        subtitle={
          matchScore !== null
            ? `Personalized learning plan based on your current profile. ${matchScore}% match.`
            : "Personalized learning plan based on your current profile."
        }
      />

      <div className="card p-6">
        {roadmap.length === 0 ? (
          <div className="py-8 text-center">
            <h2 className="font-bold text-slate-900">
              No roadmap available
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              A learning roadmap has not been created for this career yet.
            </p>
          </div>
        ) : (
          <div className="relative space-y-0">
            {roadmap.map((item, i) => {
              const step =
                item.step ||
                item.order ||
                i + 1;

              const title =
                item.title ||
                item.name ||
                item.topic ||
                `Step ${step}`;

              const description =
                item.description ||
                item.details ||
                "";

              const completed =
                item.completed ??
                item.is_completed ??
                item.status === "Completed";

              const status =
                item.status ||
                (completed
                  ? "Completed"
                  : "Not Started");

              return (
                <div
                  key={item.id || item.item_id || step}
                  className="relative flex gap-5 pb-10 last:pb-0"
                >
                  {/* Step circle */}
                  <div
                    className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold text-white ${
                      completed
                        ? "bg-green-600"
                        : "bg-blue-600"
                    }`}
                  >
                    {completed ? "✓" : step}
                  </div>

                  {/* Vertical line */}
                  {i < roadmap.length - 1 && (
                    <div className="absolute left-5 top-10 h-[calc(100%-10px)] w-px bg-slate-200" />
                  )}

                  {/* Content */}
                  <div className="pt-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2
                        className={`font-bold ${
                          completed
                            ? "text-green-800"
                            : "text-slate-900"
                        }`}
                      >
                        {title}
                      </h2>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          status === "Completed"
                            ? "bg-green-50 text-green-700"
                            : status === "In Progress"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {status}
                      </span>
                    </div>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                      {description}
                    </p>

                    {/* Complete button */}
                    {!completed && item.id && (
                      <button
                        type="button"
                        onClick={() =>
                          handleComplete(item.id)
                        }
                        className="mt-4 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
                      >
                        Mark as complete
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  async function handleComplete(itemId) {
    try {
      await api.patch(
        `/roadmap/items/${itemId}/complete`,
        {
          completed: true,
        }
      );

      // Reload latest roadmap from backend
      await fetchRoadmap();
    } catch (err) {
      console.error("Complete roadmap item error:", err);

      setError(
        err.response?.data?.detail ||
          "Failed to update roadmap item."
      );
    }
  }
}