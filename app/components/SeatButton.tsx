'use client';

// Interface para representar un asiento individual
export interface Seat {
  id: string;
  seatNumber: string;
  classType: 'business' | 'first' | 'economy';
  status: 'available' | 'selected' | 'taken';
  price: number;
}

interface SeatButtonProps {
  seat: Seat;
  onSelect: (seat: Seat) => void;
  isSelected: boolean;
}

// Componente de botón individual para cada asiento
export function SeatButton({ seat, onSelect, isSelected }: SeatButtonProps) {
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
