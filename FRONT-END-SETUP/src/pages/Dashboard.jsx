import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import api from "../api";
import Loading from "../";
import { useAuth } from "../auth/AuthProvider";

export default function Dashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [cRes, fRes] = await Promise.all([
          api.get("/courses"),
          api.get("/fees"),
        ]);
        setCourses(cRes.data || []);
        setFees(fRes.data || []);
      } catch (e) {
        setCourses([]);
        setFees([]);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (!user) return <Loading text="Redirecting..." />;

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-6">
          <h2 className="text-2xl font-bold mb-4">Welcome, {user.email}</h2>

          {loading ? (
            <Loading />
          ) : (
            <>
              {/* STAT CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-6 rounded-xl shadow">
                  <div className="text-sm text-gray-500">Total Courses</div>
                  <div className="text-2xl font-bold mt-2">
                    {courses.length}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                  <div className="text-sm text-gray-500">
                    Total Fees Records
                  </div>
                  <div className="text-2xl font-bold mt-2">{fees.length}</div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                  <div className="text-sm text-gray-500">Outstanding</div>
                  <div className="text-2xl font-bold mt-2">
                    ₹ {fees.reduce((s, f) => s + (f.amount || 0), 0)}
                  </div>
                </div>
              </div>

              {/* LISTS */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* COURSES LIST */}
                <div className="bg-white p-6 rounded-xl shadow">
                  <h3 className="font-semibold mb-3">Courses</h3>
                  <ul className="space-y-2">
                    {courses.map((c) => (
                      <li key={c.id} className="p-3 border rounded">
                        {c.name}
                        <span className="text-xs text-gray-500 ml-2">
                          ({c.code || "—"})
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* FEES LIST */}
                <div className="bg-white p-6 rounded-xl shadow">
                  <h3 className="font-semibold mb-3">Fees</h3>
                  <ul className="space-y-2">
                    {fees.map((f) => (
                      <li
                        key={f.id}
                        className="p-3 border rounded flex justify-between"
                      >
                        <div>
                          <div>Student ID: {f.studentId || "-"}</div>
                          <div className="text-sm text-gray-500">
                            Status: {f.status || "pending"}
                          </div>
                        </div>
                        <div className="font-semibold">₹ {f.amount}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
