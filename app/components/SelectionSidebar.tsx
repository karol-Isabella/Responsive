'use client';

import { Seat } from './SeatButton';
import { AnimatedPrice } from './AnimatedPrice';

interface SelectionSidebarProps {
  selectedSeats: Seat[];
  totalPrice: number;
  onSeatRemove: (seat: Seat) => void;
}

// Componente para mostrar información de clase de asiento
function getClassInfo(classType: string) {
  switch (classType) {
    case 'business':
      return { name: 'Business Class', description: 'Window - extra legroom', color: 'bg-red-400' };
    case 'first':
      return { name: 'First Class', description: 'Window - extra legroom', color: 'bg-red-400' };
    case 'economy':
      return { name: 'Economy Class', description: 'Window - extra legroom', color: 'bg-red-400' };
    default:
      return { name: 'Seat', description: 'Standard', color: 'bg-red-400' };
  }
}

// Componente de sidebar con selección de asientos
export function SelectionSidebar({ selectedSeats, totalPrice, onSeatRemove }: SelectionSidebarProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg backdrop-blur-sm bg-opacity-95 sticky top-8 max-h-[calc(100vh-64px)] overflow-y-auto">
      <h3 className="font-bold text-gray-900 mb-6 text-lg">Your selection</h3>

      {/* Lista de asientos seleccionados */}
      <div className="space-y-3 mb-8 min-h-[140px]">
        {selectedSeats.length > 0 ? (
          selectedSeats.map((seat) => {
            const classInfo = getClassInfo(seat.classType);
            return (
              <div key={seat.id} className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
                <div className={`w-12 h-12 ${classInfo.color} rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0`}>
                  {seat.seatNumber}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm">{classInfo.name}</p>
                  <p className="text-xs text-gray-500">{classInfo.description}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-gray-900">${seat.price}</p>
                  <button
                    onClick={() => onSeatRemove(seat)}
                    className="text-gray-400 hover:text-gray-600 text-lg"
                  >
                    ×
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">No seats selected</p>
          </div>
        )}
      </div>

      {/* Separador */}
      <div className="border-t border-b py-4 mb-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">Seats</span>
          <span className="font-bold text-gray-900">
            {selectedSeats.length > 0
              ? selectedSeats.map((s) => s.seatNumber).join(', ')
              : 'None'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">Taxes & fees</span>
          <span className="font-bold text-gray-900">$0</span>
        </div>
      </div>

      {/* Total */}
      <div className="mb-6 space-y-1">
        <p className="text-gray-600 text-sm">Total</p>
        <p className="text-4xl font-bold text-gray-900">
          $<AnimatedPrice value={totalPrice} />
        </p>
      </div>

      <button
        className="w-full bg-red-400 text-white font-semibold py-3 px-6 rounded-full hover:bg-red-500 transition-colors duration-300"
      >
        Buy ticket
      </button>
    </div>
  );
}
