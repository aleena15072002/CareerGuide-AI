import { useEffect, useState } from "react";
import { FiEdit3, FiSave } from "react-icons/fi";

import SectionHeader from "../components/common/SectionHeader";
import api from "../services/api";

export default function StudentProfile() {
  const [editing, setEditing] = useState(false);

  const [data, setData] = useState({
    education: "",
    specialization: "",
    experience_years: 0,
    skills: [],
    interests: [],
    target_role: "",
    bio: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // --------------------------------
  // GET PROFILE
  // --------------------------------

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/profile");

        const profile = response.data;

        // Profile doesn't exist yet
        if (!profile) {
          setLoading(false);
          return;
        }

        setData({
          education: profile.education || "",
          specialization: profile.specialization || "",
          experience_years:
            profile.experience_years ?? 0,
          skills: Array.isArray(profile.skills)
            ? profile.skills
            : [],
          interests: Array.isArray(profile.interests)
            ? profile.interests
            : [],
          target_role: profile.target_role || "",
          bio: profile.bio || "",
        });
      } catch (err) {
        console.error("Profile fetch error:", err);

        setError(
          err.response?.data?.detail ||
            "Failed to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // --------------------------------
  // UPDATE FIELD
  // --------------------------------

  const update = (key, value) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // --------------------------------
  // SAVE PROFILE
  // --------------------------------

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        education: data.education || null,
        specialization: data.specialization || null,
        experience_years:
          Number(data.experience_years) || 0,
        skills: data.skills,
        interests: data.interests,
        target_role: data.target_role || null,
        bio: data.bio || null,
      };

      const response = await api.put(
        "/profile",
        payload
      );

      setData({
        education: response.data.education || "",
        specialization:
          response.data.specialization || "",
        experience_years:
          response.data.experience_years ?? 0,
        skills: Array.isArray(response.data.skills)
          ? response.data.skills
          : [],
        interests: Array.isArray(
          response.data.interests
        )
          ? response.data.interests
          : [],
        target_role:
          response.data.target_role || "",
        bio: response.data.bio || "",
      });

      setEditing(false);
      setSuccess("Profile updated successfully.");
    } catch (err) {
      console.error("Profile update error:", err);

      setError(
        err.response?.data?.detail ||
          "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

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

  return (
    <div>
      {/* HEADER */}

      <SectionHeader
        title="Student Profile"
        subtitle="View your saved information and update it when needed."
        action={
          <button
            onClick={() => {
              if (editing) {
                handleSave();
              } else {
                setError("");
                setSuccess("");
                setEditing(true);
              }
            }}
            disabled={saving}
            className="btn-secondary flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {editing ? (
              <>
                <FiSave />

                {saving
                  ? "Saving..."
                  : "Save profile"}
              </>
            ) : (
              <>
                <FiEdit3 />
                Edit profile
              </>
            )}
          </button>
        }
      />

      {/* SUCCESS */}

      {success && (
        <div className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {/* ERROR */}

      {error && (
        <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="space-y-6">

        {/* ================================
            EDUCATION & EXPERIENCE
        ================================= */}

        <section className="card p-6">

          <h2 className="font-bold">
            Education & Experience
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">

            <Field
              label="Education"
              value={data.education}
              editing={editing}
              onChange={(value) =>
                update("education", value)
              }
              placeholder="e.g. B.Com"
            />

            <Field
              label="Specialization"
              value={data.specialization}
              editing={editing}
              onChange={(value) =>
                update(
                  "specialization",
                  value
                )
              }
              placeholder="e.g. Computer Applications"
            />

            <Field
              label="Experience (Years)"
              value={data.experience_years}
              editing={editing}
              type="number"
              min="0"
              onChange={(value) =>
                update(
                  "experience_years",
                  value
                )
              }
              placeholder="e.g. 1"
            />

            <Field
              label="Target Role"
              value={data.target_role}
              editing={editing}
              onChange={(value) =>
                update(
                  "target_role",
                  value
                )
              }
              placeholder="e.g. Full Stack Developer"
            />

          </div>

        </section>

        {/* ================================
            SKILLS & INTERESTS
        ================================= */}

        <section className="card p-6">

          <h2 className="font-bold">
            Skills & Interests
          </h2>

          <div className="mt-5 grid gap-6 md:grid-cols-2">

            <TagField
              title="Skills"
              values={data.skills}
              editing={editing}
              onChange={(values) =>
                update("skills", values)
              }
            />

            <TagField
              title="Interests"
              values={data.interests}
              editing={editing}
              onChange={(values) =>
                update(
                  "interests",
                  values
                )
              }
            />

          </div>

        </section>

        {/* ================================
            BIO
        ================================= */}

        <section className="card p-6">

          <h2 className="font-bold">
            About You
          </h2>

          <div className="mt-5">

            <label className="block text-sm font-medium text-slate-700">
              Bio

              {editing ? (
                <textarea
                  value={data.bio}
                  onChange={(e) =>
                    update(
                      "bio",
                      e.target.value
                    )
                  }
                  rows={5}
                  placeholder="Tell us about yourself, your background, goals and interests..."
                  className="mt-2 w-full resize-none rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              ) : (
                <div className="mt-2 min-h-[120px] rounded-lg bg-slate-50 px-3 py-3 text-sm leading-6 text-slate-600">
                  {data.bio || "Not added"}
                </div>
              )}
            </label>

          </div>

        </section>

      </div>
    </div>
  );
}


// ========================================
// FIELD COMPONENT
// ========================================

function Field({
  label,
  value,
  editing,
  onChange,
  placeholder,
  type = "text",
  min,
}) {
  return (
    <label className="block text-sm font-medium text-slate-700">

      {label}

      {editing ? (
        <input
          type={type}
          min={min}
          value={value ?? ""}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder={placeholder}
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        />
      ) : (
        <div className="mt-2 rounded-lg bg-slate-50 px-3 py-2.5 text-sm text-slate-600">
          {value !== null &&
          value !== undefined &&
          value !== ""
            ? value
            : "Not added"}
        </div>
      )}

    </label>
  );
}


// ========================================
// TAG FIELD
// ========================================

function TagField({
  title,
  values,
  editing,
  onChange,
}) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const value = input.trim();

    if (!value) return;

    if (!values.includes(value)) {
      onChange([...values, value]);
    }

    setInput("");
  };

  const removeTag = (tag) => {
    onChange(
      values.filter(
        (item) => item !== tag
      )
    );
  };

  return (
    <div>

      <p className="text-sm font-medium text-slate-700">
        {title}
      </p>

      {/* ADD TAG */}

      {editing && (
        <div className="mt-2 flex gap-2">

          <input
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
            placeholder={`Add ${title.toLowerCase()}`}
            className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />

          <button
            type="button"
            onClick={addTag}
            className="rounded-lg bg-blue-600 px-4 text-xs font-semibold text-white transition hover:bg-blue-700"
          >
            Add
          </button>

        </div>
      )}

      {/* TAGS */}

      <div className="mt-3 flex flex-wrap gap-2">

        {values.length === 0 ? (
          <span className="text-xs text-slate-400">
            No {title.toLowerCase()} added
          </span>
        ) : (
          values.map((value) => (
            <span
              key={value}
              className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700"
            >
              {value}

              {editing && (
                <button
                  type="button"
                  onClick={() =>
                    removeTag(value)
                  }
                  className="ml-2 text-blue-400 hover:text-red-500"
                >
                  ×
                </button>
              )}
            </span>
          ))
        )}

      </div>

    </div>
  );
}