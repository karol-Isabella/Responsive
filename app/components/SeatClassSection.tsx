'use client';

import { Seat } from './SeatButton';
import { StandardSeatGrid, FirstClassSeatGrid, EconomySeatGrid } from './SeatGrids';

export interface SeatClass {
  name: string;
  seats: Seat[];
  price: number;
  layout: 'standard' | 'first' | 'economy';
}

interface SeatClassSectionProps {
  seatClass: SeatClass;
  selectedSeats: Seat[];
  onSeatSelect: (seat: Seat) => void;
}

// Componente que renderiza cada clase de asientos
export function SeatClassSection({ seatClass, selectedSeats, onSeatSelect }: SeatClassSectionProps) {
  return (
    <div className="mb-10">
      <h3 className="text-center font-bold text-gray-800 mb-6">{seatClass.name}</h3>
      {seatClass.layout === 'economy' ? (
        <EconomySeatGrid
          seats={seatClass.seats}
          selectedSeats={selectedSeats}
          onSeatSelect={onSeatSelect}
        />
      ) : seatClass.layout === 'first' ? (
        <FirstClassSeatGrid
          seats={seatClass.seats}
          selectedSeats={selectedSeats}
          onSeatSelect={onSeatSelect}
        />
      ) : (
        <StandardSeatGrid
          seats={seatClass.seats}
          selectedSeats={selectedSeats}
          onSeatSelect={onSeatSelect}
        />
      )}
    </div>
  );
}
