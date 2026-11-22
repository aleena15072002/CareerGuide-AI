import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiTarget,
  FiTrendingUp,
  FiMap,
  FiMessageCircle,
  FiCheckCircle,
  FiUser,
  FiSearch,
  FiStar,
  FiBarChart2,
  FiBriefcase,
  FiBookOpen,
  FiChevronRight,
  FiZap,
  FiAward,
  FiActivity,
} from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      const hero = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      hero
        .from(".hero-badge", {
          opacity: 0,
          y: 18,
          duration: 0.5,
        })
        .from(
          ".hero-title",
          {
            opacity: 0,
            y: 25,
            duration: 0.65,
          },
          "-=0.2"
        )
        .from(
          ".hero-description",
          {
            opacity: 0,
            y: 15,
            duration: 0.5,
          },
          "-=0.3"
        )
        .from(
          ".hero-buttons",
          {
            opacity: 0,
            y: 12,
            duration: 0.45,
          },
          "-=0.2"
        )
        .from(
          ".hero-points",
          {
            opacity: 0,
            y: 10,
            duration: 0.4,
          },
          "-=0.2"
        )
        .from(
          ".hero-panel",
          {
            opacity: 0,
            x: 25,
            duration: 0.65,
          },
          "-=0.35"
        );

      /*
       * IMPORTANT:
       * We intentionally DO NOT use opacity: 0 here.
       * If ScrollTrigger fails, the cards remain visible.
       */

      gsap.from(".process-card", {
        scrollTrigger: {
          trigger: ".process-section",
          start: "top 80%",
        },
        y: 25,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: ".features-section",
          start: "top 80%",
        },
        y: 25,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.from(".insight-card", {
        scrollTrigger: {
          trigger: ".insight-section",
          start: "top 80%",
        },
        y: 25,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 88%",
        },
        y: 15,
        duration: 0.5,
        stagger: 0.1,
      });

      gsap.from(".cta-content", {
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 82%",
        },
        y: 25,
        duration: 0.7,
        ease: "power3.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="min-h-screen overflow-hidden bg-slate-50 text-slate-900"
    >
      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden bg-white">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-100/40 blur-3xl" />

        <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-indigo-100/40 blur-3xl" />

        <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-14 sm:px-6 lg:px-8 lg:pb-16 lg:pt-18">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-14">
            {/* LEFT */}
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
                </span>

                AI-powered career guidance
              </div>

              {/* Heading */}
              <h1 className="hero-title mt-5 text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-[58px]">
                Build a career path
                <br />
                that{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  fits you.
                </span>
              </h1>

              {/* Description */}
              <p className="hero-description mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                Analyze your skills, discover suitable careers, identify
                skill gaps, build a personalized roadmap and get guidance
                from your AI career assistant.
              </p>

              {/* Buttons */}
              <div className="hero-buttons mt-7 flex flex-wrap gap-3">
                <Link
                  to="/register"
                  className="group inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl"
                >
                  Create your profile

                  <FiArrowRight
                    size={17}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-slate-900 transition-all duration-200 hover:border-blue-300 hover:text-blue-600"
                >
                  Explore platform

                  <FiChevronRight size={16} />
                </Link>
              </div>

              {/* Points */}
              <div className="hero-points mt-7 flex flex-wrap gap-x-6 gap-y-3">
                <span className="flex items-center gap-2 text-sm text-slate-500">
                  <FiCheckCircle className="text-blue-600" />
                  Profile analysis
                </span>

                <span className="flex items-center gap-2 text-sm text-slate-500">
                  <FiCheckCircle className="text-blue-600" />
                  Skill gap detection
                </span>

                <span className="flex items-center gap-2 text-sm text-slate-500">
                  <FiCheckCircle className="text-blue-600" />
                  AI guidance
                </span>
              </div>
            </div>

            {/* RIGHT DASHBOARD */}
            <div className="hero-panel relative w-full">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.10)]">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-blue-600 text-white">
                      <FiTarget size={17} />
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-900">
                        Career Overview
                      </p>

                      <p className="text-[10px] text-slate-400">
                        Personalized analysis
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-600">
                    Updated
                  </span>
                </div>

                {/* Body */}
                <div className="p-5 sm:p-6">
                  {/* Main cards */}
                  <div className="grid gap-4 sm:grid-cols-[1fr_150px]">
                    {/* Match */}
                    <div className="rounded-xl bg-slate-950 p-5 text-white">
                      <p className="text-xs text-slate-400">
                        Career match score
                      </p>

                      <div className="mt-2 flex items-end justify-between">
                        <div>
                          <p className="text-4xl font-extrabold">
                            92%
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            Excellent match
                          </p>
                        </div>

                        <div className="grid h-10 w-10 place-items-center rounded-full bg-blue-600">
                          <FiAward size={18} />
                        </div>
                      </div>

                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                        <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-blue-600 to-indigo-500" />
                      </div>
                    </div>

                    {/* Career */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <div className="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-blue-600">
                        <FiBriefcase size={16} />
                      </div>

                      <p className="mt-3 text-[10px] text-slate-400">
                        Recommended
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-900">
                        Full Stack
                        <br />
                        Developer
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="rounded-xl border border-slate-200 p-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <FiBarChart2 size={13} />

                        <span className="text-[10px]">
                          Skills
                        </span>
                      </div>

                      <p className="mt-2 text-xl font-bold text-slate-900">
                        8/10
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 p-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <FiMap size={13} />

                        <span className="text-[10px]">
                          Roadmap
                        </span>
                      </div>

                      <p className="mt-2 text-xl font-bold text-slate-900">
                        6
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 p-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <FiActivity size={13} />

                        <span className="text-[10px]">
                          Ready
                        </span>
                      </div>

                      <p className="mt-2 text-xl font-bold text-slate-900">
                        84%
                      </p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mt-4 rounded-xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-slate-900">
                          Skill analysis
                        </p>

                        <p className="mt-1 text-[10px] text-slate-400">
                          Your current technical readiness
                        </p>
                      </div>

                      <FiTrendingUp className="text-blue-600" />
                    </div>

                    <div className="mt-4 space-y-3">
                      {[
                        ["JavaScript", "90%"],
                        ["React", "84%"],
                        ["Node.js", "76%"],
                      ].map(([skill, value]) => (
                        <div key={skill}>
                          <div className="mb-1.5 flex justify-between">
                            <span className="text-[10px] font-medium text-slate-500">
                              {skill}
                            </span>

                            <span className="text-[10px] font-semibold text-slate-700">
                              {value}
                            </span>
                          </div>

                          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-blue-600"
                              style={{ width: value }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="mt-4 flex items-center justify-between rounded-xl bg-blue-50 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FiCheckCircle
                        size={15}
                        className="text-blue-600"
                      />

                      <span className="text-xs font-medium text-slate-700">
                        Your profile is ready for analysis
                      </span>
                    </div>

                    <FiChevronRight
                      size={15}
                      className="text-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* Floating readiness card */}
              <div className="absolute -bottom-5 -left-4 hidden rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                    <FiTrendingUp size={16} />
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-wide text-slate-400">
                      Readiness
                    </p>

                    <p className="text-sm font-bold text-slate-900">
                      +18.4%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STATS
      ========================================================= */}

      <section className="stats-section border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-slate-200 px-5 py-7 sm:grid-cols-4 lg:px-8">
          <div className="stat-item px-4 text-center">
            <p className="text-2xl font-extrabold text-slate-950">
              4+
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Career tools
            </p>
          </div>

          <div className="stat-item px-4 text-center">
            <p className="text-2xl font-extrabold text-slate-950">
              AI
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Powered guidance
            </p>
          </div>

          <div className="stat-item px-4 text-center">
            <p className="text-2xl font-extrabold text-slate-950">
              1:1
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Personalized roadmap
            </p>
          </div>

          <div className="stat-item px-4 text-center">
            <p className="text-2xl font-extrabold text-slate-950">
              24/7
            </p>

            <p className="mt-1 text-xs text-slate-500">
              AI assistance
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}

      <section
        id="how-it-works"
        className="process-section border-b border-slate-200 bg-slate-50"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
              How CareerGuide AI works
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              From profile to a clear career plan.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              Build your profile, understand your strengths and discover
              exactly what you should learn next to move toward your target
              career.
            </p>
          </div>

          {/* Cards */}
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                number: "01",
                icon: FiUser,
                title: "Build your profile",
                description:
                  "Add your education, technical skills, interests, experience and career goals. Your profile becomes the foundation for personalized guidance.",
                label: "Personalized profile",
              },
              {
                number: "02",
                icon: FiSearch,
                title: "Analyze your potential",
                description:
                  "CareerGuide AI compares your current profile with career requirements to identify strengths, missing skills and areas that need improvement.",
                label: "AI-powered analysis",
              },
              {
                number: "03",
                icon: FiMap,
                title: "Follow your roadmap",
                description:
                  "Get a structured learning roadmap with recommended skills, technologies and next steps designed around your chosen career.",
                label: "Actionable learning plan",
              },
            ].map(
              ({
                number,
                icon: Icon,
                title,
                description,
                label,
              }) => (
                <div
                  key={number}
                  className="process-card group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                >
                  {/* Top */}
                  <div className="flex items-center justify-between">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                      <Icon size={19} />
                    </div>

                    <span className="text-xs font-bold tracking-[0.2em] text-slate-300">
                      {number}
                    </span>
                  </div>

                  {/* Text */}
                  <h3 className="mt-6 text-lg font-bold text-slate-950">
                    {title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {description}
                  </p>

                  {/* Bottom */}
                  <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs font-semibold text-blue-600">
                    <span>{label}</span>

                    <FiArrowRight
                      size={13}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURES
      ========================================================= */}

      <section
        id="features"
        className="features-section bg-white"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          {/* Header */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                Platform features
              </span>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Everything you need for smarter career decisions.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                Career discovery, skill analysis, personalized roadmaps
                and AI assistance — all in one simple workspace.
              </p>
            </div>

            <div className="max-w-md lg:pb-1">
              <p className="text-sm leading-6 text-slate-500">
                Turn your current skills into a clear plan for your next
                career move.
              </p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: FiTrendingUp,
                title: "Career Analysis",
                description:
                  "Understand your current career readiness, strengths and skill gaps.",
                label: "Know your position",
              },
              {
                icon: FiTarget,
                title: "Career Recommendations",
                description:
                  "Discover career paths that match your skills, interests and profile.",
                label: "Find the right path",
              },
              {
                icon: FiMap,
                title: "Personalized Roadmap",
                description:
                  "Get a practical step-by-step learning plan for your selected career.",
                label: "Know what to learn",
              },
              {
                icon: FiMessageCircle,
                title: "AI Career Assistant",
                description:
                  "Ask questions about careers, skills, interviews and learning plans.",
                label: "Get instant guidance",
              },
            ].map(
              ({
                icon: Icon,
                title,
                description,
                label,
              }) => (
                <div
                  key={title}
                  className="feature-card group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                >
                  {/* Icon */}
                  <div className="flex items-start justify-between">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                      <Icon size={20} />
                    </div>

                    <FiArrowRight
                      size={16}
                      className="text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-600"
                    />
                  </div>

                  {/* Content */}
                  <h3 className="mt-6 text-base font-bold text-slate-950">
                    {title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {description}
                  </p>

                  {/* Label */}
                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <span className="text-xs font-semibold text-blue-600">
                      {label}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          CAREER INSIGHT
      ========================================================= */}

      <section
        className="insight-section border-y border-slate-200 bg-slate-50"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* READINESS */}
            <div className="insight-card rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                    Career readiness
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-slate-950">
                    Understand where you stand.
                  </h3>
                </div>

                <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">
                  <FiBarChart2 size={19} />
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                Compare your current skills with the requirements of your
                target career and identify what you need to improve.
              </p>

              {/* Progress */}
              <div className="mt-8 space-y-5">
                <div>
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="font-medium text-slate-600">
                      Current profile
                    </span>

                    <span className="font-bold text-slate-900">
                      68%
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-full w-[68%] rounded-full bg-slate-400" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="font-medium text-slate-600">
                      Target readiness
                    </span>

                    <span className="font-bold text-blue-600">
                      84%
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-blue-50">
                    <div className="h-full w-[84%] rounded-full bg-blue-600" />
                  </div>
                </div>
              </div>

              {/* Small insight */}
              <div className="mt-7 flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                <FiTrendingUp
                  size={17}
                  className="mt-0.5 text-blue-600"
                />

                <div>
                  <p className="text-xs font-semibold text-slate-900">
                    Your next opportunity
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Improve your missing skills to move closer to your
                    target career.
                  </p>
                </div>
              </div>
            </div>

            {/* ROADMAP */}
            <div className="insight-card rounded-2xl border border-slate-800 bg-slate-950 p-7 text-white sm:p-8">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                    Personalized roadmap
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    Know what to learn next.
                  </h3>
                </div>

                <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600">
                  <FiBookOpen size={19} />
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                Follow a structured path based on your current level and
                the skills required for your target career.
              </p>

              {/* Roadmap */}
              <div className="mt-7 space-y-3">
                {[
                  ["01", "Advanced React", "In progress"],
                  ["02", "Node.js APIs", "Next"],
                  ["03", "System Design", "Upcoming"],
                ].map(([number, title, status]) => (
                  <div
                    key={number}
                    className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4"
                  >
                    <span className="text-xs font-bold text-blue-400">
                      {number}
                    </span>

                    <div className="flex-1">
                      <p className="text-sm font-semibold">
                        {title}
                      </p>

                      <p className="mt-1 text-[10px] text-slate-500">
                        {status}
                      </p>
                    </div>

                    <FiChevronRight
                      size={15}
                      className="text-slate-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}

      <section className="cta-section bg-slate-950">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="cta-content relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 px-6 py-12 sm:px-10 lg:px-14">
            {/* Decoration */}
            <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />

            <div className="relative max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-400">
                <FiStar size={13} />
                Start building your future
              </div>

              {/* Heading */}
              <h2 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                Stop guessing.
                <br />
                Start planning.
              </h2>

              {/* Description */}
              <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                Create your profile and let CareerGuide AI help you
                understand your options, identify your skill gaps and plan
                your next steps.
              </p>

              {/* Buttons */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/register"
                  className="group inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-700"
                >
                  Get started

                  <FiArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-5 py-3.5 text-sm font-semibold text-slate-200 transition-all duration-200 hover:border-slate-500 hover:bg-slate-800"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          {/* Brand */}
          <div>
            <p className="text-sm font-bold text-white">
              CareerGuide AI
            </p>

            <p className="mt-1 text-xs text-slate-500">
              AI-powered career planning and guidance.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-5 text-xs text-slate-500">
            <Link
              to="/"
              className="transition-colors hover:text-white"
            >
              Home
            </Link>

            <Link
              to="/login"
              className="transition-colors hover:text-white"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="transition-colors hover:text-white"
            >
              Register
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-slate-600">
            © 2026 CareerGuide AI
          </p>
        </div>
      </footer>
    </div>
  );
}