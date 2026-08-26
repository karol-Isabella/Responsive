'use client';

interface ProgressBarProps {
  selected: number;
  total: number;
}

// Componente de barra de progreso
export function ProgressBar({ selected, total }: ProgressBarProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg backdrop-blur-sm bg-opacity-95">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-900">{selected}/{total}</span>
        <span className="text-xs text-gray-500">Seats selected</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-red-400 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(selected / total) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
