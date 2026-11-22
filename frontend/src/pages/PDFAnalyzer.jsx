import { useState } from "react";
import {
  FiUploadCloud,
  FiFileText,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

import SectionHeader from "../components/common/SectionHeader";
import api from "../services/api";

export default function PDFAnalyzer() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0] || null;

    setError("");
    setAnalysis(null);

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (
      selectedFile.type !== "application/pdf" &&
      !selectedFile.name.toLowerCase().endsWith(".pdf")
    ) {
      setFile(null);
      setError("Please select a PDF file only.");
      return;
    }

    setFile(selectedFile);
  };

  const analyzePDF = async () => {
    if (!file) {
      setError("Please select a PDF resume first.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setAnalysis(null);

      const formData = new FormData();

      formData.append("file", file);

      const response = await api.post(
        "/pdf/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      let result = response.data?.analysis;

      /*
        Gemini response can be JSON string.
        Convert it into an object when possible.
      */
      if (typeof result === "string") {
        try {
          result = JSON.parse(
            result
              .replace(/^```json\s*/i, "")
              .replace(/```$/i, "")
              .trim()
          );
        } catch {
          // Keep response as string
        }
      }

      setAnalysis(result);
    } catch (err) {
      console.error("PDF analysis error:", err);

      setError(
        err.response?.data?.detail ||
          "Failed to analyze the PDF."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SectionHeader
        title="Resume / PDF Analyzer"
        subtitle="Upload your resume and get AI-powered career insights."
      />

      <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">

        {/* Upload */}
        <div className="card p-6">
          <label className="flex min-h-72 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center hover:border-blue-400">
            <FiUploadCloud
              size={36}
              className="text-blue-600"
            />

            <p className="mt-4 font-bold">
              {file
                ? "Resume selected"
                : "Upload your resume"}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              PDF files only
            </p>

            <span className="mt-5 btn-primary text-sm">
              {file ? "Choose another PDF" : "Choose PDF"}
            </span>

            <input
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {/* Selected file */}
          {file && (
            <div className="mt-4 flex items-center gap-3 rounded-lg bg-blue-50 p-3 text-sm">
              <FiFileText className="shrink-0 text-blue-600" />

              <div className="min-w-0">
                <p className="truncate font-medium text-blue-900">
                  {file.name}
                </p>

                <p className="text-xs text-blue-600">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-4 flex gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-600">
              <FiAlertCircle className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Analyze button */}
          <button
            type="button"
            onClick={analyzePDF}
            disabled={!file || loading}
            className="btn-primary mt-5 w-full disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Analyzing resume..."
              : "Analyze Resume"}
          </button>
        </div>

        {/* Analysis */}
        <div className="card p-6">
          <h2 className="font-bold">
            Analysis preview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            AI analysis generated from your uploaded resume.
          </p>

          {!analysis ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "Education",
                "Skills",
                "Experience",
                "Projects",
                "Skill gaps",
                "Career suggestions",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-slate-200 p-4"
                >
                  <FiCheckCircle className="text-blue-600" />

                  <p className="mt-2 text-sm font-semibold">
                    {item}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Ready for PDF analysis
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <AnalysisResult analysis={analysis} />
          )}
        </div>
      </div>
    </div>
  );
}

function AnalysisResult({ analysis }) {
  // Gemini returned plain text instead of JSON
  if (typeof analysis === "string") {
    return (
      <div className="mt-5 rounded-lg bg-slate-50 p-4">
        <p className="whitespace-pre-wrap text-sm leading-7 text-slate-600">
          {analysis}
        </p>
      </div>
    );
  }

  const skills = Array.isArray(analysis.skills)
    ? analysis.skills
    : [];

  const education = Array.isArray(
    analysis.education
  )
    ? analysis.education
    : [];

  const experience = Array.isArray(
    analysis.experience
  )
    ? analysis.experience
    : [];

  const projects = Array.isArray(
    analysis.projects
  )
    ? analysis.projects
    : [];

  const careers = Array.isArray(
    analysis.suggested_careers
  )
    ? analysis.suggested_careers
    : [];

  const skillGaps = Array.isArray(
    analysis.skill_gaps
  )
    ? analysis.skill_gaps
    : [];

  const recommendations = Array.isArray(
    analysis.recommendations
  )
    ? analysis.recommendations
    : [];

  return (
    <div className="mt-5 space-y-6">

      {/* Summary */}
      {analysis.summary && (
        <div>
          <h3 className="text-sm font-bold">
            Professional Summary
          </h3>

          <p className="mt-2 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-600">
            {analysis.summary}
          </p>
        </div>
      )}

      <ResultSection
        title="Skills"
        items={skills}
        className="bg-blue-50 text-blue-700"
      />

      <ResultSection
        title="Education"
        items={education}
        className="bg-slate-100 text-slate-700"
      />

      <ResultSection
        title="Experience"
        items={experience}
        className="bg-purple-50 text-purple-700"
      />

      <ResultSection
        title="Projects"
        items={projects}
        className="bg-cyan-50 text-cyan-700"
      />

      <ResultSection
        title="Suggested Careers"
        items={careers}
        className="bg-green-50 text-green-700"
      />

      <ResultSection
        title="Skill Gaps"
        items={skillGaps}
        className="bg-orange-50 text-orange-700"
      />

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div>
          <h3 className="text-sm font-bold">
            Recommendations
          </h3>

          <div className="mt-3 space-y-2">
            {recommendations.map(
              (item, index) => {
                const value =
                  typeof item === "string"
                    ? item
                    : item?.text ||
                      item?.description ||
                      item?.recommendation ||
                      JSON.stringify(item);

                return (
                  <div
                    key={index}
                    className="rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-600"
                  >
                    {value}
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

function ResultSection({
  title,
  items,
  className,
}) {
  if (!items.length) {
    return null;
  }

  return (
    <div>
      <h3 className="text-sm font-bold">
        {title}
      </h3>

      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item, index) => {
          const value =
            typeof item === "string"
              ? item
              : item?.name ||
                item?.title ||
                item?.skill ||
                item?.degree ||
                item?.role ||
                item?.text ||
                JSON.stringify(item);

          return (
            <span
              key={index}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${className}`}
            >
              {value}
            </span>
          );
        })}
      </div>
    </div>
  );
}