'use client';

import { SeatButton, Seat } from './SeatButton';

interface GridProps {
  seats: Seat[];
  selectedSeats: Seat[];
  onSeatSelect: (seat: Seat) => void;
}

// Componente para renderizar grid de asientos estándar (2-1-2)
export function StandardSeatGrid({ seats, selectedSeats, onSeatSelect }: GridProps) {
  const rows: Seat[][] = [];
  for (let i = 0; i < seats.length; i += 4) {
    rows.push(seats.slice(i, i + 4));
  }

  return (
    <div className="flex justify-center gap-6">
      {/* Columna izquierda (A, B) */}
      <div className="flex flex-col gap-2">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.slice(0, 2).map((seat) => (
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

      {/* Números de fila (centro) */}
      <div className="flex flex-col gap-2 justify-center text-gray-400 text-sm font-semibold min-w-6">
        {rows.map((_, rowIndex) => (
          <div key={rowIndex} className="h-10 flex items-center justify-center">
            {rowIndex + 1}
          </div>
        ))}
      </div>

      {/* Columna derecha (C, D) */}
      <div className="flex flex-col gap-2">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.slice(2, 4).map((seat) => (
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

// Componente para renderizar grid de First Class (3-1-2)
export function FirstClassSeatGrid({ seats, selectedSeats, onSeatSelect }: GridProps) {
  const rows: Seat[][] = [];
  for (let i = 0; i < seats.length; i += 5) {
    rows.push(seats.slice(i, i + 5));
  }

  return (
    <div className="flex justify-center gap-6">
      {/* Columna izquierda (A, B, C) */}
      <div className="flex flex-col gap-2">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.slice(0, 3).map((seat) => (
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

      {/* Números de fila (centro) */}
      <div className="flex flex-col gap-2 justify-center text-gray-400 text-sm font-semibold min-w-6">
        {rows.map((_, rowIndex) => (
          <div key={rowIndex} className="h-10 flex items-center justify-center">
            {rowIndex + 1}
          </div>
        ))}
      </div>

      {/* Columna derecha (D, E) */}
      <div className="flex flex-col gap-2">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.slice(3, 5).map((seat) => (
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

// Componente para renderizar grid de Economy (3-1-3)
export function EconomySeatGrid({ seats, selectedSeats, onSeatSelect }: GridProps) {
  const rows: Seat[][] = [];
  for (let i = 0; i < seats.length; i += 6) {
    rows.push(seats.slice(i, i + 6));
  }

  return (
    <div className="flex justify-center gap-8">
      {/* Columna izquierda (A, B, C) */}
      <div className="flex flex-col gap-2">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.slice(0, 3).map((seat) => (
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

      {/* Centro - Números de fila */}
      <div className="flex flex-col gap-2 justify-center text-gray-400 text-sm font-semibold min-w-6">
        {rows.map((_, rowIndex) => (
          <div key={rowIndex} className="h-10 flex items-center justify-center">
            {rowIndex + 1}
          </div>
        ))}
      </div>

      {/* Columna derecha (D, E, F) */}
      <div className="flex flex-col gap-2">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.slice(3, 6).map((seat) => (
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
