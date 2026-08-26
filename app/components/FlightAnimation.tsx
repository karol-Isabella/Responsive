'use client';

import { Plane } from 'lucide-react';

interface FlightAnimationProps {
  variant?: 'desktop' | 'mobile';
}

// Componente de animación de vuelo reutilizable
export function FlightAnimation({ variant = 'desktop' }: FlightAnimationProps) {
  if (variant === 'mobile') {
    return (
      <div className="relative w-full h-20 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl overflow-hidden flex items-center">
        <svg
          className="w-full h-full absolute"
          viewBox="0 0 300 80"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Línea punteada de ruta */}
          <path
            d="M 20 40 Q 150 10, 280 40"
            stroke="#f87171"
            strokeWidth="2"
            strokeDasharray="5,5"
            fill="none"
          />

          {/* Punto de inicio */}
          <circle cx="20" cy="40" r="3" fill="#ef4444" />

          {/* Punto de destino */}
          <circle cx="280" cy="40" r="3" fill="#f87171" />
        </svg>

        {/* Avión animado con icono de Lucide */}
        <div className="absolute animate-plane-mobile text-red-500">
          <Plane size={24} fill="currentColor" />
        </div>

        {/* Estilos de animación para móvil */}
        <style>{`
          @keyframes planeMobileCurve {
            0% {
              left: 5%;
              top: 60%;
            }
            50% {
              left: 50%;
              top: 20%;
            }
            100% {
              left: 95%;
              top: 60%;
            }
          }

          .animate-plane-mobile {
            animation: planeMobileCurve 4s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  // Versión desktop (la original)
  return (
    <div className="relative h-32 bg-blue-50 rounded-xl overflow-hidden flex items-center justify-center">
      <svg
        className="w-full h-full absolute"
        viewBox="0 0 300 100"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Línea punteada de ruta */}
        <path
          d="M 20 50 Q 150 20, 280 50"
          stroke="#f87171"
          strokeWidth="2"
          strokeDasharray="5,5"
          fill="none"
        />

        {/* Punto de inicio */}
        <circle cx="20" cy="50" r="4" fill="#ef4444" />

        {/* Punto de destino */}
        <circle cx="280" cy="50" r="4" fill="#f87171" />
      </svg>

      {/* Avión animado con icono de Lucide */}
      <div className="absolute animate-plane text-red-500">
        <Plane size={28} fill="currentColor" />
      </div>

      {/* Estilos de animación */}
      <style>{`
        @keyframes planeMove {
          0% {
            left: 5%;
            top: 65%;
          }
          50% {
            left: 50%;
            top: 25%;
          }
          100% {
            left: 95%;
            top: 65%;
          }
        }

        .animate-plane {
          animation: planeMove 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
