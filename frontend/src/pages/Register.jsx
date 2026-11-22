import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiMail,
  FiLock,
  FiUser,
  FiTarget,
} from "react-icons/fi";
import { useState } from "react";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await api.post("/accounts/register", {
        full_name: fullName,
        email: email,
        password: password,
      });

      // Registration successful
      navigate("/login");

    } catch (err) {
      const message =
        err.response?.data?.detail ||
        "Registration failed. Please try again.";

      setError(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50">

      <div className="mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-6xl items-center justify-center px-5 py-12">

        <div className="w-full max-w-md">

          {/* LOGO */}
          <Link
            to="/"
            className="mb-8 flex items-center justify-center gap-2.5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <FiTarget size={19} />
            </div>

            <div className="text-left">
              <p className="text-sm font-bold text-slate-900">
                CareerGuide AI
              </p>

              <p className="text-[10px] text-slate-400">
                Career intelligence platform
              </p>
            </div>
          </Link>

          {/* REGISTER CARD */}
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_10px_40px_rgba(15,23,42,0.06)] sm:p-9">

            {/* BACK TO HOME */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 transition hover:text-blue-600"
            >
              <FiArrowLeft size={14} />
              Back to home
            </Link>

            {/* HEADER */}
            <div className="mt-8">

              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Create your account
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Start building your personalized career journey.
              </p>

            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs leading-5 text-red-600">
                {error}
              </div>
            )}

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="mt-7"
            >

              {/* FULL NAME */}
              <div>

                <label
                  htmlFor="name"
                  className="text-xs font-semibold text-slate-700"
                >
                  Full name
                </label>

                <div className="relative mt-2">

                  <FiUser
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    required
                    autoComplete="name"
                    disabled={loading}
                    className="h-12 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
                  />

                </div>

              </div>

              {/* EMAIL */}
              <div className="mt-5">

                <label
                  htmlFor="email"
                  className="text-xs font-semibold text-slate-700"
                >
                  Email address
                </label>

                <div className="relative mt-2">

                  <FiMail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                    disabled={loading}
                    className="h-12 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div className="mt-5">

                <label
                  htmlFor="password"
                  className="text-xs font-semibold text-slate-700"
                >
                  Password
                </label>

                <div className="relative mt-2">

                  <FiLock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    required
                    autoComplete="new-password"
                    disabled={loading}
                    className="h-12 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
                  />

                </div>

              </div>

              {/* CREATE ACCOUNT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="group mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-blue-600 disabled:hover:shadow-none"
              >

                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account

                    <FiArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}

              </button>

            </form>

            {/* DIVIDER */}
            <div className="my-7 flex items-center gap-3">

              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-[10px] font-medium text-slate-400">
                OR
              </span>

              <div className="h-px flex-1 bg-slate-200" />

            </div>

            {/* LOGIN LINK */}
            <Link
              to="/login"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50/30 hover:text-blue-600"
            >
              Already have an account?

              <span className="text-blue-600">
                Sign in
              </span>
            </Link>

          </div>

          {/* FOOTER */}
          <p className="mt-6 text-center text-[11px] text-slate-400">
            © 2026 CareerGuide AI. All rights reserved.
          </p>

        </div>

      </div>

    </div>
  );
}