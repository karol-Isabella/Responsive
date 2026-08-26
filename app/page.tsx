'use client';

import { useState, useMemo } from 'react';
import { Seat } from './components/SeatButton';
import { SeatClass, SeatClassSection } from './components/SeatClassSection';
import { AnimatedPrice } from './components/AnimatedPrice';
import { FlightAnimation } from './components/FlightAnimation';
import { FlightDetails } from './components/FlightDetails';
import { SelectionSidebar } from './components/SelectionSidebar';
import { ProgressBar } from './components/ProgressBar';

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
        layout: 'standard',
        seats: Array.from({ length: 16 }, (_, i) => {
          const row = Math.floor(i / 4);
          const col = i % 4;
          const colLetters = ['A', 'B', 'C', 'D'];
          const seatLetter = colLetters[col];
          const seatNumber = seatLetter + (row + 1);
          const statuses = ['available', 'available', 'taken', 'available'];
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
        layout: 'first',
        seats: Array.from({ length: 30 }, (_, i) => {
          const row = Math.floor(i / 5);
          const col = i % 5;
          const colLetters = ['A', 'B', 'C', 'D', 'E'];
          const seatLetter = colLetters[col];
          const seatNumber = seatLetter + (row + 1);
          const statuses = ['available', 'taken', 'available', 'available', 'taken'];
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
        layout: 'economy',
        seats: Array.from({ length: 60 }, (_, i) => {
          const row = Math.floor(i / 6);
          const col = i % 6;
          const colLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
          const seatLetter = colLetters[col];
          const seatNumber = seatLetter + (row + 1);
          const statuses = ['available', 'taken', 'available', 'available', 'taken', 'available'];
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

  // Calcular precio total
  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Óvalos decorativos de fondo */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-red-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 -right-40 w-96 h-96 bg-red-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative flex flex-col lg:flex-row gap-6 p-4 md:p-8 max-w-7xl mx-auto">
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

          {/* Flight Details Component */}
          <FlightDetails />
        </div>

        {/* Contenido principal */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Barra de progreso arriba */}
          <ProgressBar selected={selectedSeats.length} total={2} />

          {/* Header móvil */}
          <div className="lg:hidden bg-white rounded-2xl p-4 shadow-md backdrop-blur-sm bg-opacity-95">
            <div className="flex items-center justify-between mb-3">
              <button className="text-gray-400">&lt;</button>
              <span className="text-sm text-gray-500">0/2</span>
              <button className="text-gray-400">O</button>
            </div>

            {/* Card de información del vuelo en móvil */}
            <div className="bg-blue-50 rounded-2xl p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-bold text-lg text-gray-900">MUC</p>
                  <p className="text-xs text-gray-500">Munich</p>
                </div>
                <div>
                  <p className="font-bold text-lg text-gray-900">LXR</p>
                  <p className="text-xs text-gray-500">London</p>
                </div>
              </div>
              
              {/* Animación de vuelo en móvil */}
              <FlightAnimation variant="mobile" />
            </div>

            {/* Leyenda de estados */}
            <div className="flex gap-3 justify-center text-xs">
              <label className="flex items-center gap-1.5">
                <div className="w-3 h-3 border-2 border-red-400 rounded"></div>
                <span className="text-gray-600">Free</span>
              </label>
              <label className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-red-400 rounded"></div>
                <span className="text-gray-600">Yours</span>
              </label>
              <label className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-gray-300 rounded"></div>
                <span className="text-gray-600">Taken</span>
              </label>
            </div>
          </div>

          {/* Header desktop con leyenda */}
          <div className="hidden lg:block">
            <div className="flex gap-4 justify-center mb-2">
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
          <div className="bg-white rounded-2xl p-8 shadow-lg backdrop-blur-sm bg-opacity-95 overflow-y-auto max-h-[500px]">
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
          <div className="hidden lg:block bg-white rounded-2xl p-8 shadow-lg backdrop-blur-sm bg-opacity-95">
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
                <span className="text-4xl font-bold text-gray-900">
                  $<AnimatedPrice value={totalPrice} />
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
                <span className="ml-2 text-2xl font-bold text-gray-900">
                  $<AnimatedPrice value={totalPrice} />
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
          <SelectionSidebar
            selectedSeats={selectedSeats}
            totalPrice={totalPrice}
            onSeatRemove={handleSeatSelect}
          />
        </div>
      </div>
    </div>
  );
}
