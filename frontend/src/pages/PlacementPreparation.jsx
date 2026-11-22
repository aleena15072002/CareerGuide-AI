import { useEffect, useMemo, useState } from "react";
import {
  FiCheckCircle,
  FiChevronRight,
  FiAlertCircle,
  FiAward,
} from "react-icons/fi";

import SectionHeader from "../components/common/SectionHeader";
import ProgressBar from "../components/common/ProgressBar";
import api from "../services/api";

export default function PlacementPreparation() {
  const [questions, setQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] =
    useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState(null);

  const [loading, setLoading] = useState(true);
  const [evaluating, setEvaluating] = useState(false);
  const [error, setError] = useState("");

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          "/placement/questions"
        );

        const data =
          response.data?.questions ||
          response.data ||
          [];

        setQuestions(data);
      } catch (err) {
        console.error(
          "Placement questions error:",
          err
        );

        setError(
          err.response?.data?.detail ||
            "Failed to load placement questions."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Filter questions by selected category
  const filteredQuestions = useMemo(() => {
    if (!selectedCategory) {
      return questions;
    }

    return questions.filter(
      (item) =>
        item.category?.toLowerCase() ===
        selectedCategory.toLowerCase()
    );
  }, [questions, selectedCategory]);

  const currentQuestion =
    filteredQuestions[currentIndex];

  // Start category practice
  const startPractice = (category) => {
    setSelectedCategory(category);
    setCurrentIndex(0);
    setAnswer("");
    setEvaluation(null);
    setError("");
  };

  // Evaluate answer
  const evaluateAnswer = async () => {
    if (!currentQuestion) return;

    if (!answer.trim()) {
      setError("Please write your answer first.");
      return;
    }

    try {
      setEvaluating(true);
      setError("");
      setEvaluation(null);

      const response = await api.post(
        "/placement/evaluate",
        {
          question:
            currentQuestion.question,
          answer: answer.trim(),
        }
      );

      let result =
        response.data?.evaluation;

      // Gemini usually returns JSON as a string
      if (typeof result === "string") {
        try {
          result = JSON.parse(
            result
              .replace(/^```json\s*/i, "")
              .replace(/```$/i, "")
              .trim()
          );
        } catch {
          // Keep string response
        }
      }

      setEvaluation(result);
    } catch (err) {
      console.error(
        "Answer evaluation error:",
        err
      );

      setError(
        err.response?.data?.detail ||
          "Failed to evaluate your answer."
      );
    } finally {
      setEvaluating(false);
    }
  };

  const nextQuestion = () => {
    if (
      currentIndex <
      filteredQuestions.length - 1
    ) {
      setCurrentIndex((prev) => prev + 1);
      setAnswer("");
      setEvaluation(null);
      setError("");
    }
  };

  const previousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setAnswer("");
      setEvaluation(null);
      setError("");
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
      </div>
    );
  }

  // API error
  if (error && questions.length === 0) {
    return (
      <div>
        <SectionHeader
          title="Placement Preparation"
          subtitle="Track your readiness across the areas that matter for placements."
        />

        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          <FiAlertCircle />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <SectionHeader
        title="Placement Preparation"
        subtitle="Track your readiness across the areas that matter for placements."
      />

      {/* Overall Readiness */}
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">
              Overall readiness
            </p>

            <p className="mt-1 text-3xl font-bold">
              76%
            </p>
          </div>

          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            In progress
          </span>
        </div>

        <div className="mt-7 grid gap-6 md:grid-cols-2">
          <ProgressBar
            label="Technical interview"
            value={80}
          />

          <ProgressBar
            label="Aptitude"
            value={70}
          />

          <ProgressBar
            label="Communication"
            value={72}
          />

          <ProgressBar
            label="Resume"
            value={90}
          />
        </div>
      </div>

      {/* Practice Categories */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">

        <button
          type="button"
          onClick={() =>
            startPractice("Technical")
          }
          className="card p-5 text-left transition hover:border-blue-300 hover:shadow-sm"
        >
          <p className="font-bold">
            Technical Interview
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Practice technical questions and
            get AI feedback on your answers.
          </p>

          <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-blue-600">
            Start practice
            <FiChevronRight />
          </span>
        </button>

        <button
          type="button"
          onClick={() =>
            startPractice("HR")
          }
          className="card p-5 text-left transition hover:border-blue-300 hover:shadow-sm"
        >
          <p className="font-bold">
            HR Interview
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Practice common HR questions and
            improve your communication.
          </p>

          <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-blue-600">
            Start practice
            <FiChevronRight />
          </span>
        </button>

        <button
          type="button"
          onClick={() =>
            startPractice("Aptitude")
          }
          className="card p-5 text-left transition hover:border-blue-300 hover:shadow-sm"
        >
          <p className="font-bold">
            Aptitude Practice
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Practice aptitude questions and
            improve your placement readiness.
          </p>

          <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-blue-600">
            Start practice
            <FiChevronRight />
          </span>
        </button>
      </div>

      {/* Practice Area */}
      {selectedCategory && (
        <div className="mt-6">
          <div className="card p-6">

            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                  {selectedCategory} Practice
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Question{" "}
                  {currentIndex + 1} of{" "}
                  {filteredQuestions.length}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedCategory(null);
                  setAnswer("");
                  setEvaluation(null);
                  setError("");
                }}
                className="text-xs font-semibold text-slate-500 hover:text-blue-600"
              >
                Back
              </button>
            </div>

            {/* Progress */}
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all"
                style={{
                  width: `${
                    filteredQuestions.length
                      ? ((currentIndex + 1) /
                          filteredQuestions.length) *
                        100
                      : 0
                  }%`,
                }}
              />
            </div>

            {currentQuestion ? (
              <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_.9fr]">

                {/* Question */}
                <div>
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600">
                      <FiAward />
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Interview Question
                      </p>

                      <h2 className="mt-2 text-lg font-bold leading-7">
                        {currentQuestion.question}
                      </h2>
                    </div>
                  </div>

                  <label className="mt-6 block">
                    <span className="text-sm font-semibold text-slate-700">
                      Your Answer
                    </span>

                    <textarea
                      value={answer}
                      onChange={(e) =>
                        setAnswer(
                          e.target.value
                        )
                      }
                      rows={8}
                      disabled={evaluating}
                      placeholder="Write your answer here..."
                      className="mt-2 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm leading-6 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:bg-slate-50"
                    />
                  </label>

                  {error && (
                    <div className="mt-4 flex gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-600">
                      <FiAlertCircle className="mt-0.5 shrink-0" />
                      {error}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={evaluateAnswer}
                    disabled={
                      evaluating ||
                      !answer.trim()
                    }
                    className="btn-primary mt-5 w-full disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {evaluating
                      ? "AI is evaluating..."
                      : "Evaluate My Answer"}
                  </button>

                  {/* Navigation */}
                  <div className="mt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={
                        previousQuestion
                      }
                      disabled={
                        currentIndex === 0 ||
                        evaluating
                      }
                      className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Previous
                    </button>

                    <button
                      type="button"
                      onClick={
                        nextQuestion
                      }
                      disabled={
                        currentIndex ===
                          filteredQuestions.length -
                            1 ||
                        evaluating
                      }
                      className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next
                      <FiChevronRight />
                    </button>
                  </div>
                </div>

                {/* Evaluation */}
                <div className="rounded-xl border border-slate-200 p-5">
                  <h3 className="font-bold">
                    AI Evaluation
                  </h3>

                  {!evaluation ? (
                    <div className="flex min-h-[320px] items-center justify-center text-center">
                      <div>
                        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-blue-50 text-blue-600">
                          <FiCheckCircle />
                        </div>

                        <p className="mt-4 text-sm font-semibold">
                          Submit your answer
                        </p>

                        <p className="mt-2 text-xs leading-5 text-slate-500">
                          Gemini AI will evaluate
                          your answer and provide
                          useful feedback.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <EvaluationResult
                      evaluation={
                        evaluation
                      }
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-lg bg-slate-50 p-6 text-center text-sm text-slate-500">
                No questions available for
                this category.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function EvaluationResult({
  evaluation,
}) {
  // Gemini returned plain text
  if (typeof evaluation === "string") {
    return (
      <div className="mt-4 rounded-lg bg-slate-50 p-4">
        <p className="whitespace-pre-wrap text-sm leading-6 text-slate-600">
          {evaluation}
        </p>
      </div>
    );
  }

  const score = Number(
    evaluation?.score ?? 0
  );

  const strengths = Array.isArray(
    evaluation?.strengths
  )
    ? evaluation.strengths
    : [];

  const weaknesses = Array.isArray(
    evaluation?.weaknesses
  )
    ? evaluation.weaknesses
    : [];

  return (
    <div className="mt-5 space-y-5">

      {/* Score */}
      <div className="rounded-xl bg-blue-50 p-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          Your Score
        </p>

        <p className="mt-2 text-5xl font-bold text-blue-600">
          {score}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          out of 100
        </p>
      </div>

      {/* Strengths */}
      {strengths.length > 0 && (
        <div>
          <h4 className="text-sm font-bold text-green-700">
            Strengths
          </h4>

          <div className="mt-2 space-y-2">
            {strengths.map(
              (item, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-green-50 p-3 text-xs leading-5 text-green-800"
                >
                  ✓{" "}
                  {typeof item ===
                  "string"
                    ? item
                    : item?.text ||
                      item?.description ||
                      JSON.stringify(item)}
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Weaknesses */}
      {weaknesses.length > 0 && (
        <div>
          <h4 className="text-sm font-bold text-orange-700">
            Areas to Improve
          </h4>

          <div className="mt-2 space-y-2">
            {weaknesses.map(
              (item, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-orange-50 p-3 text-xs leading-5 text-orange-800"
                >
                  ○{" "}
                  {typeof item ===
                  "string"
                    ? item
                    : item?.text ||
                      item?.description ||
                      JSON.stringify(item)}
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Feedback */}
      {evaluation?.feedback && (
        <div>
          <h4 className="text-sm font-bold">
            AI Feedback
          </h4>

          <p className="mt-2 rounded-lg bg-slate-50 p-3 text-xs leading-6 text-slate-600">
            {evaluation.feedback}
          </p>
        </div>
      )}

      {/* Improved Answer */}
      {evaluation?.improved_answer && (
        <div>
          <h4 className="text-sm font-bold">
            Improved Answer
          </h4>

          <div className="mt-2 rounded-lg border border-blue-100 bg-blue-50 p-3 text-xs leading-6 text-slate-700">
            {evaluation.improved_answer}
          </div>
        </div>
      )}
    </div>
  );
}