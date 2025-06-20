import React, { useRef } from "react";
import {
  Hammer,
  Wrench,
  Layers,
  Ruler,
  PaintBucket,
  BrickWall,
  Droplets,
  Lightbulb,
  Home,
  Box,
  Truck,
  Shield,
  DoorOpen,
  Square,
  Bolt,
  Building2,
  Fence,
  ChevronLeft,
  ChevronRight,
  Plug,
  Flame,
  Mountain,
  SquareStack,
  SquareGanttChart,
  SquareEqual,
} from "lucide-react";

const areas = [
  { label: "Ferramentas", icon: <Hammer size={22} className="text-red-500" /> },
  { label: "Materiais Elétricos", icon: <Bolt size={22} className="text-yellow-500" /> },
  { label: "Materiais Hidráulicos", icon: <Droplets size={22} className="text-cyan-500" /> },
  { label: "Tijolos e Blocos", icon: <BrickWall size={22} className="text-orange-700" /> },
  { label: "Cimento e Argamassa", icon: <Layers size={22} className="text-gray-600" /> },
  { label: "Areia, Pedra e Brita", icon: <Mountain size={22} className="text-yellow-700" /> },
  { label: "Madeiras", icon: <Square size={22} className="text-yellow-800" /> },
  { label: "Portas e Janelas", icon: <DoorOpen size={22} className="text-blue-700" /> },
  { label: "Tintas e Pintura", icon: <PaintBucket size={22} className="text-pink-500" /> },
  { label: "Iluminação", icon: <Lightbulb size={22} className="text-yellow-400" /> },
  { label: "Ferragens", icon: <Box size={22} className="text-orange-500" /> },
  { label: "Telhas e Coberturas", icon: <Home size={22} className="text-gray-700" /> },
  { label: "Fios e Cabos", icon: <Plug size={22} className="text-indigo-500" /> },
  { label: "Caixas d'Água", icon: <Droplets size={22} className="text-blue-500" /> },
  { label: "Argamassa e Rejunte", icon: <Layers size={22} className="text-gray-400" /> },
  { label: "Ferramentas de Medição", icon: <Ruler size={22} className="text-blue-900" /> },
  { label: "Escadas", icon: <SquareStack size={22} className="text-gray-800" /> },
  { label: "Andaimes", icon: <Building2 size={22} className="text-gray-900" /> },
  { label: "Grades e Alambrados", icon: <Fence size={22} className="text-green-800" /> },
  { label: "Transporte e Carrinhos", icon: <Truck size={22} className="text-gray-700" /> },
  { label: "Impermeabilizantes", icon: <Shield size={22} className="text-blue-600" /> },
  { label: "Gás e Aquecimento", icon: <Flame size={22} className="text-orange-600" /> },
  { label: "Acabamentos", icon: <SquareGanttChart size={22} className="text-purple-700" /> },
  { label: "Forros e Drywall", icon: <Layers size={22} className="text-gray-500" /> },
  { label: "Pisos e Revestimentos", icon: <SquareEqual size={22} className="text-yellow-600" /> },
  { label: "Caixas de Passagem", icon: <Box size={22} className="text-gray-400" /> },
  { label: "Fixadores", icon: <Wrench size={22} className="text-blue-600" /> },
  { label: "Serra e Corte", icon: <Wrench size={22} className="text-red-700" /> },
];

export default function MaterialAreas({ onAreaClick }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = 140;
    container.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="bg-white rounded-lg shadow-md p-2 mb-6 relative">
      <h2 className="text-lg font-bold mb-2 text-gray-800 text-left">Áreas de Materiais</h2>
      <div className="relative">
        {/* Left Arrow */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-1 rounded-full hover:bg-blue-100 transition"
          style={{ display: "flex" }}
          onClick={() => scroll("left")}
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>
        {/* Scrollable Area */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-2 pb-1 no-scrollbar scroll-smooth"
          style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
        >
          {areas.map((area) => (
            <button
              key={area.label}
              onClick={() => onAreaClick?.(area.label)}
              className="flex flex-col items-center min-w-[90px] px-1 py-2 bg-gray-50 rounded-lg hover:bg-blue-50 transition"
              style={{ flex: "0 0 auto" }}
            >
              {area.icon}
              <span className="mt-1 text-xs font-semibold text-gray-700 text-center">{area.label}</span>
            </button>
          ))}
        </div>
        {/* Right Arrow */}
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-1 rounded-full hover:bg-blue-100 transition"
          style={{ display: "flex" }}
          onClick={() => scroll("right")}
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      {/* Hide scrollbar with custom CSS */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}