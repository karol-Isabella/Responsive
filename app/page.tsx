'use client';

import { useState, useMemo } from 'react';

// Interface para representar un asiento individual
interface Seat {
  id: string;
  seatNumber: string;
  classType: 'business' | 'first' | 'economy';
  status: 'available' | 'selected' | 'taken';
  price: number;
}

// Interface para representar una clase de asientos
interface SeatClass {
  name: string;
  seats: Seat[];
  price: number;
}

// Componente de botón individual para cada asiento
function SeatButton({
  seat,
  onSelect,
  isSelected,
}: {
  seat: Seat;
  onSelect: (seat: Seat) => void;
  isSelected: boolean;
}) {
  const getStyles = () => {
    if (seat.status === 'taken') return 'bg-gray-300 text-gray-400 cursor-not-allowed border-gray-300';
    if (isSelected) return 'bg-red-400 border-2 border-red-500 text-white';
    if (seat.status === 'available')
      return 'bg-white border-2 border-red-400 text-red-400 hover:bg-red-50 cursor-pointer';
    return 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300';
  };

  return (
    <button
      onClick={() => seat.status === 'available' && onSelect(seat)}
      disabled={seat.status === 'taken'}
      className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 border-2 ${getStyles()}`}
    >
      {seat.seatNumber}
    </button>
  );
}

// Componente que renderiza la grid de asientos de cada clase
function SeatClassSection({
  seatClass,
  selectedSeats,
  onSeatSelect,
}: {
  seatClass: SeatClass;
  selectedSeats: Seat[];
  onSeatSelect: (seat: Seat) => void;
}) {
  // Agrupar asientos en filas para mejor presentación
  const seatsInClass = useMemo(() => {
    const rows: Seat[][] = [];
    for (let i = 0; i < seatClass.seats.length; i += 6) {
      rows.push(seatClass.seats.slice(i, i + 6));
    }
    return rows;
  }, [seatClass.seats]);

  return (
    <div className="mb-8">
      <h3 className="text-center font-bold text-gray-800 mb-4">{seatClass.name}</h3>
      <div className="flex justify-center gap-2">
        {seatsInClass.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-col gap-2">
            {row.map((seat) => (
              <SeatButton
                key={seat.id}
                seat={seat}
                onSelect={onSeatSelect}
                isSelected={selectedSeats.some((s) => s.id === seat.id)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente principal
export default function Home() {
  // Estado para controlar asientos seleccionados
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  // Datos de asientos inicializados
  const seatClasses: SeatClass[] = useMemo(
    () => [
      {
        name: 'Business Class',
        price: 250,
        seats: Array.from({ length: 24 }, (_, i) => {
          const row = Math.floor(i / 6);
          const col = i % 6;
          const seatLetter = String.fromCharCode(65 + col);
          const seatNumber = seatLetter + (row + 1);
          // Patrones de disponibilidad para cada asiento
          const statuses = ['available', 'available', 'taken', 'available', 'taken', 'available'];
          return {
            id: `business-${i}`,
            seatNumber,
            classType: 'business',
            status: (statuses[col] || 'available') as Seat['status'],
            price: 250,
          };
        }),
      },
      {
        name: 'First Class',
        price: 400,
        seats: Array.from({ length: 30 }, (_, i) => {
          const row = Math.floor(i / 6);
          const col = i % 6;
          const seatLetter = String.fromCharCode(65 + col);
          const seatNumber = seatLetter + (row + 1);
          const statuses = ['available', 'taken', 'available', 'available', 'taken', 'available'];
          return {
            id: `first-${i}`,
            seatNumber,
            classType: 'first',
            status: (statuses[col] || 'available') as Seat['status'],
            price: 400,
          };
        }),
      },
      {
        name: 'Economy Class',
        price: 100,
        seats: Array.from({ length: 60 }, (_, i) => {
          const row = Math.floor(i / 6);
          const col = i % 6;
          const seatLetter = String.fromCharCode(65 + col);
          const seatNumber = seatLetter + (row + 1);
          const statuses = ['available', 'available', 'taken', 'taken', 'available', 'available'];
          return {
            id: `economy-${i}`,
            seatNumber,
            classType: 'economy',
            status: (statuses[col] || 'available') as Seat['status'],
            price: 100,
          };
        }),
      },
    ],
    []
  );

  // Manejar selección de asientos con límite de 2 asientos máximo
  const handleSeatSelect = (seat: Seat) => {
    setSelectedSeats((prev) => {
      const isAlreadySelected = prev.some((s) => s.id === seat.id);
      if (isAlreadySelected) {
        return prev.filter((s) => s.id !== seat.id);
      } else {
        if (prev.length < 2) {
          return [...prev, seat];
        }
        return prev;
      }
    });
  };

  // Calcular precio total con animación
  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-8 max-w-7xl mx-auto">
        {/* Sidebar izquierdo - Solo visible en desktop */}
        <div className="hidden lg:flex flex-col w-80 gap-6">
          {/* Logo y marca */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center">
              <span className="text-2xl text-white font-bold">+</span>
            </div>
            <div>
              <h1 className="font-bold text-gray-900">Aerial</h1>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Seat Selection</p>
            </div>
          </div>

          {/* Card con detalles del vuelo */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Flight details</h2>

            {/* Información de clase de asiento */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-red-400 rounded"></div>
                <span className="font-bold text-gray-900">Business</span>
              </div>
              <span className="text-gray-500 text-sm">Seat</span>
              <span className="text-gray-500 ml-4 text-sm">Seat</span>
              <div className="flex gap-4 mt-2">
                <div className="w-2 h-2 bg-black"></div>
                <div className="w-2 h-2 bg-black"></div>
              </div>
              <p className="text-red-500 font-semibold mt-2">Price $0</p>
            </div>

            {/* Ruta del vuelo */}
            <div className="space-y-3">
              <div>
                <h3 className="font-bold text-xl text-gray-900">MUC</h3>
                <p className="text-sm text-gray-500">Munich</p>
              </div>

              {/* Animación de ruta con avión */}
              <div className="relative h-24 bg-blue-50 rounded-lg overflow-hidden">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 300 100"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Línea punteada de ruta */}
                  <line
                    x1="20"
                    y1="50"
                    x2="280"
                    y2="50"
                    stroke="#f87171"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />

                  {/* Punto de inicio */}
                  <circle cx="20" cy="50" r="4" fill="#ef4444" />

                  {/* Punto de destino */}
                  <circle cx="280" cy="50" r="4" fill="#f87171" />

                  {/* Avión animado */}
                  <g style={{ animation: 'moveRight 4s ease-in-out infinite' }}>
                    <path d="M 140 40 L 150 50 L 140 60 Z" fill="#ef4444" />
                  </g>
                </svg>

                {/* Estilos de animación */}
                <style>{`
                  @keyframes moveRight {
                    0% { transform: translateX(-130px); }
                    50% { transform: translateX(0); }
                    100% { transform: translateX(130px); }
                  }
                `}</style>
              </div>

              <div>
                <h3 className="font-bold text-xl text-gray-900">LXR</h3>
                <p className="text-sm text-gray-500">London</p>
              </div>
            </div>

            {/* Fecha y número de vuelo */}
            <div className="grid grid-cols-2 gap-4 mt-6">
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
        </div>

        {/* Contenido principal */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Header móvil */}
          <div className="lg:hidden bg-white rounded-2xl p-4 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <button className="text-gray-400">&lt;</button>
              <span className="text-sm text-gray-500">0/2</span>
              <button className="text-gray-400">O</button>
            </div>

            {/* Card de información del vuelo en móvil */}
            <div className="bg-blue-400 rounded-2xl p-4 text-white mb-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-bold text-lg">MUC</p>
                  <p className="text-xs opacity-80">Munich</p>
                </div>
                <div className="text-center">
                  <svg
                    className="w-6 h-6 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">LXR</p>
                  <p className="text-xs opacity-80">London</p>
                </div>
              </div>
            </div>

            {/* Leyenda de estados */}
            <div className="flex gap-4 justify-center text-xs">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-red-300" />
                <span className="text-gray-600">Free</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded bg-red-400 border-red-400" />
                <span className="text-gray-600">Yours</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded bg-gray-300 border-gray-300" />
                <span className="text-gray-600">Taken</span>
              </label>
            </div>
          </div>

          {/* Header desktop con leyenda */}
          <div className="hidden lg:block">
            <div className="flex gap-4 justify-center mb-6">
              <span className="text-xs text-gray-500">0/2</span>
            </div>

            <div className="flex gap-8 justify-center mb-8">
              <label className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 border-2 border-red-400 rounded"></div>
                <span className="text-gray-600">Available</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 bg-red-400 rounded"></div>
                <span className="text-gray-600">Selected</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <span className="text-gray-600">Taken</span>
              </label>
            </div>
          </div>

          {/* Grid de selección de asientos */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            {seatClasses.map((seatClass) => (
              <SeatClassSection
                key={seatClass.name}
                seatClass={seatClass}
                selectedSeats={selectedSeats}
                onSeatSelect={handleSeatSelect}
              />
            ))}
          </div>

          {/* Sección de precio - Desktop */}
          <div className="hidden lg:block bg-white rounded-2xl p-8 shadow-lg">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Seats</span>
                <span className="font-bold text-gray-900">
                  {selectedSeats.length > 0
                    ? selectedSeats.map((s) => s.seatNumber).join(', ')
                    : 'None'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Taxes & fees</span>
                <span className="font-bold text-gray-900">$0</span>
              </div>
              <div className="border-t pt-4 flex justify-between items-center">
                <span className="text-gray-600">Total</span>
                <span className="text-4xl font-bold text-gray-900 transition-all duration-500">
                  ${totalPrice}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedSeats([])}
              className="w-full mt-6 bg-red-100 text-red-400 font-semibold py-3 px-6 rounded-full hover:bg-red-200 transition-colors duration-300"
            >
              Select a seat
            </button>
          </div>

          {/* Sección de precio - Mobile */}
          <div className="lg:hidden bg-red-50 rounded-b-2xl p-4 sticky bottom-0">
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                Total
                <span className="ml-2 text-2xl font-bold text-gray-900 transition-all duration-500">
                  ${totalPrice}
                </span>
              </div>
              <button className="w-full bg-gray-300 text-gray-500 font-semibold py-3 px-4 rounded-full">
                Select a seat
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar derecho - Your selection (Solo en desktop) */}
        <div className="hidden lg:flex flex-col w-72 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-gray-900 mb-4">Your selection</h3>

            <div className="bg-red-50 rounded-lg p-4 mb-4 text-center">
              <p className="text-sm text-gray-500 mb-2">Pick up to 2 seats from the cabin map</p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Seats</p>
                <p className="font-bold text-gray-900">
                  {selectedSeats.length > 0
                    ? selectedSeats.map((s) => s.seatNumber).join(', ')
                    : 'None'}
                </p>
              </div>

              <div className="border-t pt-4">
                <p className="text-xs text-gray-500 uppercase mb-2">Taxes & fees</p>
                <p className="font-bold text-gray-900">$0</p>
              </div>

              <div className="border-t pt-4">
                <p className="text-xs text-gray-500 uppercase mb-2">Total</p>
                <p className="text-3xl font-bold text-gray-900 transition-all duration-500">
                  ${totalPrice}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedSeats([])}
              className="w-full mt-6 bg-red-100 text-red-400 font-semibold py-3 px-6 rounded-full hover:bg-red-200 transition-colors duration-300"
            >
              Select a seat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
