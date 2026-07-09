import React, { useState, useEffect } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import { expenseService } from "../services/dataService";
import CardExpense from "../components/Fragments/CardExpense";
import AppSnackbar from "../components/Elements/AppSnackbar";

function expense() {
  const [expensesData, setExpensesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchExpenses = async () => {
    setIsLoading(true);
    try {
      const data = await expenseService();
      setExpensesData(Array.isArray(data) ? data : []);
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Gagal mengambil data expenses",
        severity: "error",
      });
    } finally {
      // Kita beri sedikit delay agar efek loading terlihat seperti di UAS
      setTimeout(() => setIsLoading(false), 800);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <MainLayout title="Expenses Comparison">
      <h2 className="text-gray-03 mb-6">Expenses Comparison</h2>

      {isLoading ? (
        /* LOADER SESUAI GAMBAR UAS */
        <div className="flex flex-col justify-center items-center h-64 w-full">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
          <p className="mt-4 text-primary font-medium text-sm">Loading Data</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(expensesData) &&
            expensesData.map((exp, index) => (
              <CardExpense
                key={index}
                category={exp.category}
                amount={exp.amount}
                percentage={exp.percentage}
                trend={exp.trend}
                detail={exp.detail}
              />
            ))}
        </div>
      )}

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </MainLayout>
  );
}

export default expense;