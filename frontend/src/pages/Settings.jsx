import { useEffect, useState } from "react";
import SectionHeader from "../components/common/SectionHeader";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Settings() {
  const { user } = useAuth();

  const [account, setAccount] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await api.get("/accounts/me");
        setAccount(response.data);
      } catch (error) {
        console.error("Failed to load account settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, []);

  const displayUser = account || user;

  return (
    <div>
      <SectionHeader
        title="Settings"
        subtitle="Manage your account and application preferences."
      />

      <div className="space-y-4">
        {/* Account Information */}
        <div className="card p-6">
          <h2 className="font-bold text-slate-800">
            Account information
          </h2>

          {loading ? (
            <div className="mt-4 space-y-3">
              <div className="h-4 w-48 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-64 animate-pulse rounded bg-slate-200" />
            </div>
          ) : displayUser ? (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Name
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {displayUser.name ||
                    displayUser.full_name ||
                    "Not available"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">
                  Email
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {displayUser.email || "Not available"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">
                  Account ID
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {displayUser.id || "Not available"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500">
                  Role
                </p>
                <p className="mt-1 text-sm font-semibold capitalize text-slate-800">
                  {displayUser.role || "Student"}
                </p>
              </div>
            </div>
          ) : (
            <p className="mt-2 text-sm text-slate-500">
              Account information could not be loaded.
            </p>
          )}
        </div>

        {/* Profile Settings */}
        <div className="card p-6">
          <h2 className="font-bold text-slate-800">
            Profile settings
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Manage your personal and academic information from the
            Student Profile page.
          </p>

          <button
            onClick={() => (window.location.href = "/profile")}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Manage Profile
          </button>
        </div>

        {/* Notifications */}
        <div className="card p-6">
          <h2 className="font-bold text-slate-800">
            Notifications
          </h2>

          <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) =>
                setNotificationsEnabled(e.target.checked)
              }
              className="h-4 w-4 accent-blue-600"
            />

            <span>
              Receive career updates and reminders
            </span>
          </label>

          <p className="mt-2 text-xs text-slate-500">
            Notification preferences are currently managed locally.
          </p>
        </div>

        {/* Security */}
        <div className="card p-6">
          <h2 className="font-bold text-slate-800">
            Security
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Your account uses JWT authentication for secure access
            to protected CareerGuide AI features.
          </p>

          <div className="mt-4 rounded-lg bg-slate-50 p-4">
            <p className="text-xs font-medium text-slate-500">
              Authentication status
            </p>

            <p className="mt-1 text-sm font-semibold text-green-600">
              Authenticated
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}