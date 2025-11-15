import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import api from "../api/api";
import Loading from "../Components/Loading";
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
            
            </>
          )}
        </main>
      </div>
    </div>
  );
}
