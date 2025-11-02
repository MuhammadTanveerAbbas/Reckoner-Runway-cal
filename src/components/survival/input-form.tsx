'use client';

import { useState } from 'react';

interface InputFormProps {
  onSubmit: (data: any) => void;
}

export function InputForm({ onSubmit }: InputFormProps) {
  const [revenue, setRevenue] = useState('');
  const [expenses, setExpenses] = useState('');
  const [savings, setSavings] = useState('');
  const [growth, setGrowth] = useState('');
  const [currency, setCurrency] = useState('USD');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const revenueNum = parseFloat(revenue);
    const expensesNum = parseFloat(expenses);
    const savingsNum = parseFloat(savings);
    const growthNum = parseFloat(growth);
    
    if (revenueNum < 0 || expensesNum < 0 || savingsNum < 0) {
      alert('Please enter positive values for all financial inputs');
      return;
    }
    
    if (growthNum < -100 || growthNum > 1000) {
      alert('Please enter a realistic growth rate between -100% and 1000%');
      return;
    }
    
    onSubmit({ revenue, expenses, savings, growth, currency });
  };

  return (
    <div className="w-full max-w-2xl px-4">
      <div className="bg-[#111111] rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 border border-gray-800">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 text-center">
          Calculate Your Financial Runway
        </h2>
        <p className="text-sm sm:text-base text-[#B3B3B3] text-center mb-6">
          Get instant insights into your financial runway
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Currency
            </label>
            <div className="flex flex-wrap gap-2">
              {['USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD', 'PKR', 'JPY'].map((curr) => (
                <button
                  key={curr}
                  type="button"
                  onClick={() => setCurrency(curr)}
                  className={`px-4 py-2 rounded-lg border transition ${
                    currency === curr
                      ? 'bg-[#00B4FF] text-black border-[#00B4FF]'
                      : 'bg-black text-white border-gray-700'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Monthly Revenue ({currency})
              </label>
              <input
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-[#00B4FF] focus:border-transparent outline-none transition placeholder-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="50000"
                min="0"
                step="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Monthly Expenses ({currency})
              </label>
              <input
                type="number"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-[#00B4FF] focus:border-transparent outline-none transition placeholder-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="75000"
                min="0"
                step="1"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Savings / Cash in Hand ({currency})
              </label>
              <input
                type="number"
                value={savings}
                onChange={(e) => setSavings(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-[#00B4FF] focus:border-transparent outline-none transition placeholder-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="300000"
                min="0"
                step="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Expected Growth Rate (%)
              </label>
              <input
                type="number"
                value={growth}
                onChange={(e) => setGrowth(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base rounded-lg bg-black border border-gray-700 text-white focus:ring-2 focus:ring-[#00B4FF] focus:border-transparent outline-none transition placeholder-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="10"
                min="-100"
                max="1000"
                step="0.1"
                required
              />
            </div>
          </div>



          <button
            type="submit"
            className="w-full bg-[#00B4FF] hover:bg-[#0099DD] text-black font-semibold py-2.5 px-4 sm:py-3 sm:px-6 text-sm sm:text-base rounded-lg transition shadow-lg hover:shadow-xl uppercase tracking-wide"
          >
            Estimate Survival
          </button>
        </form>
      </div>
    </div>
  );
}
