'use client';

import { FlightAnimation } from './FlightAnimation';

// Componente con detalles del vuelo y animación
export function FlightDetails() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg backdrop-blur-sm bg-opacity-95">
      <h2 className="text-sm font-semibold text-gray-900 mb-4">Flight details</h2>

      {/* Información de clase de asiento */}
      <div className="mb-6 bg-red-50 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-red-400 rounded"></div>
          <span className="font-bold text-gray-900">Business</span>
        </div>
        <div className="space-y-2">
          <div className="flex gap-8 text-sm text-gray-600">
            <span>Seat</span>
            <span>Seat</span>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-1 bg-gray-400"></div>
            <div className="w-8 h-1 bg-gray-400"></div>
          </div>
        </div>
        <p className="text-red-500 font-semibold mt-3">Price $0</p>
      </div>

      {/* Ruta del vuelo */}
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-xl text-gray-900">MUC</h3>
          <p className="text-sm text-gray-500">Munich</p>
        </div>

        {/* Animación de ruta con avión */}
        <FlightAnimation variant="desktop" />

        <div>
          <h3 className="font-bold text-xl text-gray-900">LXR</h3>
          <p className="text-sm text-gray-500">London</p>
        </div>
      </div>

      {/* Fecha y número de vuelo */}
      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t">
        <div>
          <p className="text-xs text-gray-500 uppercase">Date</p>
          <p className="font-bold text-gray-900">Dec 1, 2026</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase">Flight</p>
          <p className="font-bold text-gray-900">No 25</p>
        </div>
      </div>
    </div>
  );
}
