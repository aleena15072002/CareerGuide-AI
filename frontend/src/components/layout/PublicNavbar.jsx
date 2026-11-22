import { Link } from "react-router-dom";
import { FiArrowRight, FiBookOpen } from "react-icons/fi";

export default function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-blue-600 text-white">
            <FiBookOpen />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">CareerGuide AI</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
          <a href="#features" className="hover:text-blue-600">Features</a>
          <a href="#how-it-works" className="hover:text-blue-600">How it works</a>
          <a href="#about" className="hover:text-blue-600">About</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/login" className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Login</Link>
          <Link to="/register" className="btn-primary flex items-center gap-2 text-sm">
            Get started <FiArrowRight />
          </Link>
        </div>
      </div>
    </header>
  );
}