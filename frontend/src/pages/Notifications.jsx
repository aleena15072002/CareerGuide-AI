import { useEffect, useState } from "react";
import {
  FiBell,
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
} from "react-icons/fi";

import SectionHeader from "../components/common/SectionHeader";
import api from "../services/api";

export default function Notifications() {
  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [markingId, setMarkingId] =
    useState(null);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          "/notifications"
        );

        const data =
          response.data?.notifications ||
          response.data ||
          [];

        setNotifications(data);
      } catch (err) {
        console.error(
          "Notifications fetch error:",
          err
        );

        setError(
          err.response?.data?.detail ||
            "Failed to load notifications."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      setMarkingId(notificationId);
      setError("");

      await api.patch(
        `/notifications/${notificationId}/read`
      );

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? {
                ...notification,
                is_read: true,
                read: true,
              }
            : notification
        )
      );
    } catch (err) {
      console.error(
        "Mark notification error:",
        err
      );

      setError(
        err.response?.data?.detail ||
          "Failed to mark notification as read."
      );
    } finally {
      setMarkingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
      </div>
    );
  }

  return (
    <div>
      <SectionHeader
        title="Notifications"
        subtitle="Stay updated with your career activity."
      />

      {/* Error */}
      {error && (
        <div className="mb-5 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          <FiAlertCircle />
          {error}
        </div>
      )}

      {/* Notifications */}
      <div className="card divide-y divide-slate-100">

        {notifications.length === 0 ? (
          <div className="p-10 text-center">
            <FiBell className="mx-auto text-3xl text-slate-300" />

            <p className="mt-3 text-sm font-semibold text-slate-700">
              No notifications
            </p>

            <p className="mt-1 text-xs text-slate-500">
              You are all caught up.
            </p>
          </div>
        ) : (
          notifications.map(
            (notification) => {
              const id =
                notification.id ||
                notification.notification_id;

              const isRead =
                notification.is_read ??
                notification.read ??
                false;

              const title =
                notification.title ||
                notification.subject ||
                "Notification";

              const message =
                notification.message ||
                notification.description ||
                notification.content ||
                "";

              const createdAt =
                notification.created_at ||
                notification.createdAt ||
                notification.date ||
                "";

              const type =
                notification.type ||
                "info";

              return (
                <div
                  key={id}
                  className={`flex items-start gap-4 p-5 transition ${
                    !isRead
                      ? "bg-blue-50/30"
                      : ""
                  }`}
                >
                  {/* Notification dot/icon */}
                  <span
                    className={`mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full ${
                      getTypeStyle(type)
                    }`}
                  >
                    {getTypeIcon(type)}
                  </span>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p
                          className={`text-sm font-semibold ${
                            isRead
                              ? "text-slate-600"
                              : "text-slate-800"
                          }`}
                        >
                          {title}
                        </p>

                        {message && (
                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {message}
                          </p>
                        )}

                        <p className="mt-1 text-xs text-slate-400">
                          {formatDate(
                            createdAt
                          )}
                        </p>
                      </div>

                      {/* Unread indicator */}
                      {!isRead && (
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600" />
                      )}
                    </div>

                    {/* Mark as read */}
                    {!isRead && (
                      <button
                        type="button"
                        onClick={() =>
                          markAsRead(id)
                        }
                        disabled={
                          markingId === id
                        }
                        className="mt-3 text-xs font-semibold text-blue-600 hover:text-blue-700 disabled:opacity-50"
                      >
                        {markingId === id
                          ? "Marking..."
                          : "Mark as read"}
                      </button>
                    )}

                    {isRead && (
                      <p className="mt-3 flex items-center gap-1 text-xs text-green-600">
                        <FiCheckCircle />
                        Read
                      </p>
                    )}
                  </div>
                </div>
              );
            }
          )
        )}
      </div>
    </div>
  );
}

function getTypeIcon(type) {
  const value =
    String(type).toLowerCase();

  if (
    value.includes("success") ||
    value.includes("complete")
  ) {
    return (
      <FiCheckCircle
        size={14}
      />
    );
  }

  if (
    value.includes("warning") ||
    value.includes("alert")
  ) {
    return (
      <FiAlertCircle
        size={14}
      />
    );
  }

  return <FiInfo size={14} />;
}

function getTypeStyle(type) {
  const value =
    String(type).toLowerCase();

  if (
    value.includes("success") ||
    value.includes("complete")
  ) {
    return "bg-green-50 text-green-600";
  }

  if (
    value.includes("warning") ||
    value.includes("alert")
  ) {
    return "bg-orange-50 text-orange-600";
  }

  return "bg-blue-50 text-blue-600";
}

function formatDate(value) {
  if (!value) {
    return "Recently";
  }

  try {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  } catch {
    return value;
  }
}