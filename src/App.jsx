import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  User,
  ShoppingCart,
  Package,
  ChevronRight,
  ChevronLeft,
  Star,
  Menu,
  X,
  Bolt,
  CheckCircle,
  MapPin,
  CreditCard,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import MaterialAreas from "./MaterialAreas";
import imgFerramentas from "./assets/gear.jpg";
import imgIluminacao from "./assets/lampadas.jpg";
import imgDisjuntores from "./assets/disjuntores.png";

// --- Dados Mockados com Imagens do Picsum Photos ---
const allProducts = [
  // Ferramentas
  {
    id: 1,
    name: "Chave de Fenda Isolada",
    price: 25,
    image: "https://picsum.photos/seed/screwdriver/400/400",
    rating: 4.6,
    category: "Ferramentas",
    brand: "Marca D",
    voltage: "1000V",
    description: "Chave de fenda com isolamento para trabalhos elétricos seguros.",
  },
  {
    id: 2,
    name: "Martelo Unha 27mm",
    price: 32,
    image: "https://picsum.photos/seed/hammer/400/400",
    rating: 4.8,
    category: "Ferramentas",
    brand: "Marca E",
    voltage: "-",
    description: "Martelo de aço com cabo emborrachado para uso geral.",
  },
  {
    id: 3,
    name: "Alicate Universal 8''",
    price: 28,
    image: "https://picsum.photos/seed/pliers/400/400",
    rating: 4.9,
    category: "Ferramentas",
    brand: "Marca G",
    voltage: "-",
    description: "Alicate universal para cortes e apertos em geral.",
  },
  // Materiais Elétricos
  {
    id: 4,
    name: "Cabo Flexível 2.5mm 100m",
    price: 180,
    image: "https://picsum.photos/seed/cable/400/400",
    rating: 4.8,
    category: "Materiais Elétricos",
    brand: "Marca A",
    voltage: "750V",
    description: "Cabo flexível para instalações elétricas residenciais e comerciais. Rolo com 100 metros.",
  },
  {
    id: 5,
    name: "Disjuntor Monopolar 20A",
    price: 15,
    image: "https://picsum.photos/seed/breaker/400/400",
    rating: 4.9,
    category: "Materiais Elétricos",
    brand: "Marca B",
    voltage: "127/220V",
    description: "Disjuntor termomagnético para proteção de circuitos elétricos.",
  },
  {
    id: 6,
    name: "Tomada Dupla 10A",
    price: 12,
    image: "https://picsum.photos/seed/outlet/400/400",
    rating: 4.7,
    category: "Materiais Elétricos",
    brand: "Marca C",
    voltage: "250V",
    description: "Tomada dupla padrão brasileiro, ideal para qualquer ambiente.",
  },
  {
    id: 7,
    name: "Fita Isolante 20m",
    price: 5,
    image: "https://picsum.photos/seed/tape/400/400",
    rating: 4.5,
    category: "Materiais Elétricos",
    brand: "Marca B",
    voltage: "750V",
    description: "Fita isolante de alta qualidade para emendas e isolamentos.",
  },
  // Iluminação
  {
    id: 8,
    name: "Lâmpada LED Bulbo 9W",
    price: 8,
    image: "https://picsum.photos/seed/bulb/400/400",
    rating: 4.9,
    category: "Iluminação",
    brand: "Marca A",
    voltage: "Bivolt",
    description: "Lâmpada LED de baixo consumo e alta durabilidade. Luz branca.",
  },
  {
    id: 9,
    name: "Painel LED de Embutir 18W",
    price: 45,
    image: "https://picsum.photos/seed/panel/400/400",
    rating: 4.8,
    category: "Iluminação",
    brand: "Marca A",
    voltage: "Bivolt",
    description: "Painel de LED quadrado para forros de gesso. Design moderno e eficiente.",
  },
  // Ferramentas de Medição
  {
    id: 10,
    name: "Trena 5m",
    price: 18,
    image: "https://picsum.photos/seed/tape-measure/400/400",
    rating: 4.7,
    category: "Ferramentas de Medição",
    brand: "Marca F",
    voltage: "-",
    description: "Trena retrátil de 5 metros com trava automática.",
  },
  // Materiais Hidráulicos
  {
    id: 11,
    name: "Torneira PVC para Jardim",
    price: 14,
    image: "https://picsum.photos/seed/tap/400/400",
    rating: 4.6,
    category: "Materiais Hidráulicos",
    brand: "Marca H",
    voltage: "-",
    description: "Torneira de PVC resistente para uso externo.",
  },
  // Tubos e Conexões
  {
    id: 12,
    name: "Joelho 90º 25mm",
    price: 2,
    image: "https://picsum.photos/seed/elbow/400/400",
    rating: 4.8,
    category: "Tubos e Conexões",
    brand: "Marca I",
    voltage: "-",
    description: "Joelho de PVC para conexões hidráulicas.",
  },
  // Caixas d'Água
  {
    id: 13,
    name: "Caixa d'Água 500L",
    price: 320,
    image: "https://picsum.photos/seed/watertank/400/400",
    rating: 4.9,
    category: "Caixas d'Água",
    brand: "Marca J",
    voltage: "-",
    description: "Caixa d'água em polietileno, leve e resistente.",
  },
  // Tijolos e Blocos
  {
    id: 14,
    name: "Tijolo Cerâmico 9 Furos",
    price: 1.2,
    image: "https://picsum.photos/seed/brick/400/400",
    rating: 4.7,
    category: "Tijolos e Blocos",
    brand: "Marca K",
    voltage: "-",
    description: "Tijolo cerâmico para alvenaria estrutural.",
  },
  {
    id: 15,
    name: "Bloco de Concreto 14x19x39cm",
    price: 3.5,
    image: "https://picsum.photos/seed/concreteblock/400/400",
    rating: 4.8,
    category: "Tijolos e Blocos",
    brand: "Marca L",
    voltage: "-",
    description: "Bloco de concreto para construção de paredes.",
  },
  // Cimento e Argamassa
  {
    id: 16,
    name: "Cimento CP II 50kg",
    price: 38,
    image: "https://picsum.photos/seed/cement/400/400",
    rating: 4.9,
    category: "Cimento e Argamassa",
    brand: "Marca M",
    voltage: "-",
    description: "Saco de cimento para uso geral em obras.",
  },
  // Argamassa e Rejunte
  {
    id: 17,
    name: "Argamassa AC-1 20kg",
    price: 22,
    image: "https://picsum.photos/seed/mortar/400/400",
    rating: 4.7,
    category: "Argamassa e Rejunte",
    brand: "Marca N",
    voltage: "-",
    description: "Argamassa colante para assentamento de cerâmicas.",
  },
  {
    id: 18,
    name: "Rejunte Branco 1kg",
    price: 10,
    image: "https://picsum.photos/seed/grout/400/400",
    rating: 4.7,
    category: "Argamassa e Rejunte",
    brand: "Marca U",
    voltage: "-",
    description: "Rejunte branco para assentamento de pisos e azulejos.",
  },
  // Areia, Pedra e Brita
  {
    id: 19,
    name: "Areia Média Lavada 20kg",
    price: 7,
    image: "https://picsum.photos/seed/sand/400/400",
    rating: 4.8,
    category: "Areia, Pedra e Brita",
    brand: "Marca O",
    voltage: "-",
    description: "Areia lavada para uso em concreto e argamassa.",
  },
  {
    id: 20,
    name: "Brita 1 Ensacada 20kg",
    price: 8,
    image: "https://picsum.photos/seed/gravel/400/400",
    rating: 4.7,
    category: "Areia, Pedra e Brita",
    brand: "Marca P",
    voltage: "-",
    description: "Brita para preparo de concreto e drenagem.",
  },
  // Madeiras
  {
    id: 21,
    name: "Viga de Madeira 5x15cm 3m",
    price: 120,
    image: "https://picsum.photos/seed/woodbeam/400/400",
    rating: 4.8,
    category: "Madeiras",
    brand: "Marca MadeiraSul",
    voltage: "-",
    description: "Viga de madeira para estruturas de telhado.",
  },
  // Portas e Janelas
  {
    id: 22,
    name: "Porta de Madeira Lisa",
    price: 210,
    image: "https://picsum.photos/seed/door/400/400",
    rating: 4.8,
    category: "Portas e Janelas",
    brand: "Marca Q",
    voltage: "-",
    description: "Porta lisa de madeira para ambientes internos.",
  },
  {
    id: 23,
    name: "Janela de Alumínio 1,20x1,00m",
    price: 350,
    image: "https://picsum.photos/seed/window/400/400",
    rating: 4.9,
    category: "Portas e Janelas",
    brand: "Marca R",
    voltage: "-",
    description: "Janela de correr em alumínio branco.",
  },
  // Tintas e Pintura
  {
    id: 24,
    name: "Tinta Acrílica Fosca 18L",
    price: 210,
    image: "https://picsum.photos/seed/paint/400/400",
    rating: 4.8,
    category: "Tintas e Pintura",
    brand: "Marca T",
    voltage: "-",
    description: "Tinta acrílica para paredes internas e externas.",
  },
  // Ferragens
  {
    id: 25,
    name: "Dobradiça Aço 3''",
    price: 6,
    image: "https://picsum.photos/seed/hinge/400/400",
    rating: 4.7,
    category: "Ferragens",
    brand: "Marca MetalFix",
    voltage: "-",
    description: "Dobradiça de aço para portas e janelas.",
  },
  // Telhas e Coberturas
  {
    id: 26,
    name: "Telha Cerâmica Colonial",
    price: 2.5,
    image: "https://picsum.photos/seed/roof/400/400",
    rating: 4.7,
    category: "Telhas e Coberturas",
    brand: "Marca S",
    voltage: "-",
    description: "Telha cerâmica para cobertura de casas.",
  },
  // Fios e Cabos
  {
    id: 27,
    name: "Cabo de Aço 6mm 50m",
    price: 220,
    image: "https://picsum.photos/seed/steelcable/400/400",
    rating: 4.8,
    category: "Fios e Cabos",
    brand: "Marca CabosBrasil",
    voltage: "-",
    description: "Cabo de aço galvanizado para uso estrutural.",
  },
  // Caixas de Passagem
  {
    id: 28,
    name: "Caixa de Passagem 4x4",
    price: 4,
    image: "https://picsum.photos/seed/box/400/400",
    rating: 4.7,
    category: "Caixas de Passagem",
    brand: "Marca Elétrica",
    voltage: "-",
    description: "Caixa de passagem para instalações elétricas.",
  },
  // Escadas
  {
    id: 29,
    name: "Escada Alumínio 5 Degraus",
    price: 180,
    image: "https://picsum.photos/seed/ladder/400/400",
    rating: 4.9,
    category: "Escadas",
    brand: "Marca W",
    voltage: "-",
    description: "Escada dobrável de alumínio para uso doméstico e profissional.",
  },
  // Andaimes
  {
    id: 30,
    name: "Andaime Tubular 1,5m",
    price: 420,
    image: "https://picsum.photos/seed/scaffold/400/400",
    rating: 4.8,
    category: "Andaimes",
    brand: "Marca Z",
    voltage: "-",
    description: "Andaime tubular para trabalhos em altura.",
  },
  // Grades e Alambrados
  {
    id: 31,
    name: "Grade de Proteção Metálica",
    price: 110,
    image: "https://picsum.photos/seed/fence/400/400",
    rating: 4.7,
    category: "Grades e Alambrados",
    brand: "Marca AA",
    voltage: "-",
    description: "Grade metálica para proteção de áreas externas.",
  },
  // Pisos e Revestimentos
  {
    id: 32,
    name: "Piso Cerâmico 60x60cm",
    price: 39,
    image: "https://picsum.photos/seed/floor/400/400",
    rating: 4.8,
    category: "Pisos e Revestimentos",
    brand: "Marca BB",
    voltage: "-",
    description: "Piso cerâmico para ambientes internos.",
  },
  // Forros e Drywall
  {
    id: 33,
    name: "Forro de PVC Branco 6m",
    price: 75,
    image: "https://picsum.photos/seed/ceiling/400/400",
    rating: 4.7,
    category: "Forros e Drywall",
    brand: "Marca CC",
    voltage: "-",
    description: "Forro de PVC para acabamento de tetos.",
  },
  // Acabamentos
  {
    id: 34,
    name: "Espuma Expansiva 500ml",
    price: 28,
    image: "https://picsum.photos/seed/foam/400/400",
    rating: 4.8,
    category: "Acabamentos",
    brand: "Marca DD",
    voltage: "-",
    description: "Espuma expansiva para vedação e fixação.",
  },
  // Fixadores
  {
    id: 35,
    name: "Chave Inglesa 12''",
    price: 38,
    image: "https://picsum.photos/seed/wrench/400/400",
    rating: 4.8,
    category: "Fixadores",
    brand: "Marca EE",
    voltage: "-",
    description: "Chave inglesa ajustável para aperto de porcas e parafusos.",
  },
  // Transporte e Carrinhos
  {
    id: 36,
    name: "Carrinho de Mão Reforçado",
    price: 230,
    image: "https://picsum.photos/seed/wheelbarrow/400/400",
    rating: 4.8,
    category: "Transporte e Carrinhos",
    brand: "Marca X",
    voltage: "-",
    description: "Carrinho de mão para transporte de materiais em obras.",
  },
  // Impermeabilizantes
  {
    id: 37,
    name: "Impermeabilizante Líquido 18L",
    price: 120,
    image: "https://picsum.photos/seed/waterproof/400/400",
    rating: 4.8,
    category: "Impermeabilizantes",
    brand: "Marca V",
    voltage: "-",
    description: "Impermeabilizante para lajes e paredes.",
  },
  // EPI (Segurança)
  {
    id: 38,
    name: "EPI - Capacete de Segurança",
    price: 35,
    image: "https://picsum.photos/seed/helmet/400/400",
    rating: 4.9,
    category: "EPI (Segurança)",
    brand: "Marca Y",
    voltage: "-",
    description: "Capacete de proteção para uso em obras.",
  },
  // Gás e Aquecimento
  {
    id: 39,
    name: "Aquecedor a Gás 15L",
    price: 950,
    image: "https://picsum.photos/seed/gasheater/400/400",
    rating: 4.7,
    category: "Gás e Aquecimento",
    brand: "Marca Thermo",
    voltage: "Bivolt",
    description: "Aquecedor de água a gás para residências.",
  },
  // Serra e Corte
  {
    id: 40,
    name: "Disco de Corte Diamantado 110mm",
    price: 22,
    image: "https://picsum.photos/seed/cutdisc/400/400",
    rating: 4.8,
    category: "Serra e Corte",
    brand: "Marca CorteMax",
    voltage: "-",
    description: "Disco diamantado para corte de pisos e azulejos.",
  },
];
const categories = [
  "Todos",
  "Ferramentas",
  "Materiais Elétricos",
  "Iluminação",
  "Materiais Hidráulicos",
  "Tubos e Conexões",
  "Caixas d'Água",
  "Tijolos e Blocos",
  "Cimento e Argamassa",
  "Argamassa e Rejunte",
  "Areia, Pedra e Brita",
  "Madeiras",
  "Portas e Janelas",
  "Tintas e Pintura",
  "Ferragens",
  "Telhas e Coberturas",
  "Fios e Cabos",
  "Caixas de Passagem",
  "Escadas",
  "Andaimes",
  "Grades e Alambrados",
  "Pisos e Revestimentos",
  "Forros e Drywall",
  "Acabamentos",
  "Fixadores",
  "Transporte e Carrinhos",
  "Impermeabilizantes",
  "EPI (Segurança)",
  "Gás e Aquecimento",
  "Serra e Corte",
];
const initialOrders = [
  {
    id: "7d8f9a0b",
    date: "05/06/2025",
    total: "R$ 195,00",
    status: "Entregue",
    items: [allProducts[0], allProducts[1]],
  },
  {
    id: "3c4e5f6g",
    date: "10/06/2025",
    total: "R$ 37,00",
    status: "A caminho",
    items: [allProducts[4], allProducts[2]],
  },
];

const banners = [
  {
    id: 1,
    title: "Oferta em Ferramentas",
    subtitle: "Até 30% de desconto!",
    image: imgFerramentas,
    category: "Ferramentas",
  },
  {
    id: 2,
    title: "Tudo em Iluminação",
    subtitle: "Renove sua casa com nossas lâmpadas LED",
    image: imgIluminacao,
    category: "Iluminação",
  },
  {
    id: 3,
    title: "Segurança em Primeiro Lugar",
    subtitle: "Confira nossa linha de disjuntores",
    image: imgDisjuntores,
    category: "Disjuntores",
  },
];

// --- Componentes ---

const BackButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold"
  >
    <ArrowLeft size={20} />
    Voltar
  </button>
);

const Header = ({ navigateTo, cart, handleProtectedAction }) => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center gap-4">
          {/* Logo - hide on mobile search */}
          {!mobileSearchOpen && (
            <button
              onClick={() => navigateTo("home")}
              className="flex items-center gap-2 text-2xl font-bold text-blue-600 flex-shrink-0"
            >
              <Bolt /> L.S. Rodrigues
            </button>
          )}

          {/* Desktop search input */}
          <div className="flex-1 max-w-xl mx-4 hidden md:block relative">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigateTo(`searchResults`, {
                  searchTerm: e.target.elements.search.value,
                });
              }}
              className="relative"
            >
              <input
                name="search"
                type="text"
                placeholder="Buscar produtos..."
                className="w-full bg-gray-100 border border-gray-200 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
              >
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* Mobile search icon or expanded search */}
          <div className="flex-1 flex justify-end md:hidden">
            {mobileSearchOpen ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setMobileSearchOpen(false);
                  navigateTo("searchResults", {
                    searchTerm: e.target.elements.mobileSearch.value,
                  });
                }}
                className="flex w-full"
              >
                <input
                  name="mobileSearch"
                  autoFocus
                  type="text"
                  placeholder="Buscar produtos..."
                  className="w-full bg-gray-100 border border-gray-200 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="ml-2 text-gray-400 hover:text-blue-600"
                  onClick={() => setMobileSearchOpen(false)}
                  aria-label="Fechar busca"
                >
                  <X size={24} />
                </button>
                <button
                  type="submit"
                  className="ml-2 text-gray-600 hover:text-blue-600"
                  aria-label="Buscar"
                >
                  <Search size={24} />
                </button>
              </form>
            ) : (
              <button
                className="block md:hidden text-gray-600 hover:text-blue-600"
                onClick={() => setMobileSearchOpen(true)}
                aria-label="Buscar"
              >
                <Search size={24} />
              </button>
            )}
          </div>

          {/* Desktop nav */}
          {!mobileSearchOpen && (
            <nav className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => handleProtectedAction("profile")}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <User size={24} /> <span className="ml-2">Perfil</span>
              </button>
              <button
                onClick={() => handleProtectedAction("cart")}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors relative"
              >
                <ShoppingCart size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

const Carousel = ({ banners, navigateTo }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevious = () =>
    setCurrentIndex(currentIndex === 0 ? banners.length - 1 : currentIndex - 1);
  const goToNext = () =>
    setCurrentIndex(currentIndex === banners.length - 1 ? 0 : currentIndex + 1);

  const handleBannerClick = (banner) => {
    navigateTo("searchResults", {
      searchTerm: banner.category,
      category: banner.category,
    });
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto h-64 md:h-96 rounded-lg overflow-hidden shadow-lg mb-12 bg-gray-200">
      <div
        className="w-full h-full flex transition-transform ease-in-out duration-500"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {banners.map((b) => (
          <div
            key={b.id}
            onClick={() => handleBannerClick(b)}
            className="min-w-full h-full flex-shrink-0 relative cursor-pointer"
          >
            <img
              src={b.image}
              alt={b.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-4">
              <h2 className="text-3xl md:text-5xl font-bold text-center">
                {b.title}
              </h2>
              <p className="mt-2 text-lg text-center">
                {b.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-3/4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 opacity-50 hover:opacity-90 transition"
        style={{ zIndex: 2 }}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-3/4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 opacity-50 hover:opacity-90 transition"
        style={{ zIndex: 2 }}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

const ProductCard = ({ product, onProductClick }) => (
  <div
    onClick={() => onProductClick(product)}
    className="bg-white rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
  >
    <div className="w-full h-48 bg-gray-200">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-4">
      <h3 className="text-md font-semibold text-gray-800 truncate">
        {product.name}
      </h3>
      <div className="flex items-center my-2">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
            />
          ))}
        </div>
        <span className="text-xs text-gray-500 ml-2">({product.rating})</span>
      </div>
      <p className="text-lg font-bold text-gray-900">
        R$ {product.price.toFixed(2)}
      </p>
    </div>
  </div>
);

const FilterBar = ({ filters, setFilters }) => {
  // Filtra produtos pela categoria selecionada para montar filtros dinâmicos
  const filteredByCategory = filters.category && filters.category !== "Todos"
    ? allProducts.filter((p) => p.category === filters.category)
    : allProducts;

  // Opções únicas para cada filtro
  const brands = Array.from(new Set(filteredByCategory.map((p) => p.brand))).filter(Boolean);
  const voltages = Array.from(new Set(filteredByCategory.map((p) => p.voltage))).filter(Boolean);
  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* Categoria */}
        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-1">
            Categoria
          </label>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value, brand: "", voltage: "", minRating: "" })}
            className="w-full bg-gray-100 border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        {/* Marca */}
        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-1">
            Marca
          </label>
          <select
            value={filters.brand || ""}
            onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
            className="w-full bg-gray-100 border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        {/* Voltagem */}
        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-1">
            Voltagem
          </label>
          <select
            value={filters.voltage || ""}
            onChange={(e) => setFilters({ ...filters, voltage: e.target.value })}
            className="w-full bg-gray-100 border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas</option>
            {voltages.map((voltage) => (
              <option key={voltage} value={voltage}>
                {voltage}
              </option>
            ))}
          </select>
        </div>
        {/* Avaliação mínima */}
        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-1">
            Avaliação mínima
          </label>
          <select
            value={filters.minRating || ""}
            onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
            className="w-full bg-gray-100 border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas</option>
            {ratings.map((r) => (
              <option key={r} value={r}>
                {r} estrelas ou mais
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Preço */}
      <div className="mt-4">
        <label className="text-sm font-semibold text-gray-600 block mb-1">
          Preço Máximo: R$ {filters.maxPrice}
        </label>
        <input
          type="range"
          min="0"
          max="200"
          step="5"
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters({ ...filters, maxPrice: Number(e.target.value) })
          }
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};

const HomePage = ({ onProductClick, navigateTo }) => (
  <div className="bg-gray-50">
    <div className="container mx-auto px-4 py-8">
      <MaterialAreas onAreaClick={(area) => navigateTo("searchResults", { searchTerm: area, category: area })} />
      <Carousel banners={banners} navigateTo={navigateTo} />
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Produtos em Destaque
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {allProducts.slice(0, 8).map((p) => (
          <ProductCard key={p.id} product={p} onProductClick={onProductClick} />
        ))}
      </div>
    </div>
  </div>
);

const SearchResultsPage = ({
  onProductClick,
  initialSearchTerm,
  initialCategory,
}) => {
  const [filters, setFilters] = useState({
    searchTerm: initialSearchTerm || "",
    category: initialCategory || "Todos",
    maxPrice: 200,
  });

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchTerm: initialSearchTerm || "",
      category: initialCategory || "Todos",
    }));
  }, [initialSearchTerm, initialCategory]);

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Categoria
    if (filters.category && filters.category !== "Todos") {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    // Termo de busca (nome)
    if (
      filters.searchTerm &&
      (!filters.category || filters.category === "Todos" || filters.searchTerm !== filters.category)
    ) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Marca
    if (filters.brand && filters.brand !== "Todas") {
      filtered = filtered.filter((p) => p.brand === filters.brand);
    }

    // Voltagem
    if (filters.voltage && filters.voltage !== "Todas") {
      filtered = filtered.filter((p) => p.voltage === filters.voltage);
    }

    // Preço máximo
    filtered = filtered.filter((p) => p.price <= filters.maxPrice);

    // Avaliação mínima
    if (filters.minRating) {
      filtered = filtered.filter((p) => p.rating >= filters.minRating);
    }

    return filtered;
  }, [filters]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">
          Resultados para "{filters.searchTerm}"
        </h1>
        <FilterBar filters={filters} setFilters={setFilters} />
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onProductClick={onProductClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>Nenhum produto encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ProductDetailPage = ({ product, handleAddToCart, handleBuyNow }) => (
  <div className="bg-white min-h-screen">
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full h-96 rounded-lg shadow-lg bg-gray-200">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {product.name}
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            Marca: {product.brand} | Tensão: {product.voltage}
          </p>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  fill={
                    i < Math.floor(product.rating) ? "currentColor" : "none"
                  }
                />
              ))}
            </div>
            <span className="text-md text-gray-600 ml-2">
              ({product.rating} de 5)
            </span>
          </div>
          <p className="text-4xl font-bold text-blue-600 mb-6">
            R$ {product.price.toFixed(2)}
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => handleAddToCart(product)}
              className="w-full bg-blue-100 text-blue-700 font-semibold py-3 rounded-lg hover:bg-blue-200 flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} /> Adicionar ao Carrinho
            </button>
            <button
              onClick={() => handleBuyNow(product)}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              Comprar Agora
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CartPage = ({ cart, setCart, navigateTo, handleFinalizePurchase }) => {
  const total = useMemo(
    () => cart.reduce((acc, item) => acc + item.price, 0),
    [cart]
  );
  const removeFromCart = (index) => setCart(cart.filter((_, i) => i !== index));
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Meu Carrinho</h1>
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
              <ul className="divide-y divide-gray-200">
                {cart.map((item, index) => (
                  <li
                    key={`${item.id}-${index}`}
                    className="py-4 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="w-20 h-20 rounded-md mr-4 flex-shrink-0 bg-gray-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.brand}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">R$ {item.price.toFixed(2)}</p>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-red-500 hover:underline text-sm mt-1"
                      >
                        Remover
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold border-b pb-3 mb-4">
                  Resumo do Pedido
                </h2>
                <div className="flex justify-between text-gray-600 mb-2">
                  <span>Subtotal</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 mb-4">
                  <span>Frete</span>
                  <span>Grátis</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-4">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleFinalizePurchase}
                  className="mt-6 w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700"
                >
                  Finalizar Compra
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">
              Seu carrinho está vazio
            </h2>
            <p className="text-gray-500 mt-2 mb-6">
              Adicione produtos para vê-los aqui.
            </p>
            <button
              onClick={() => navigateTo("home")}
              className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700"
            >
              Voltar para a loja
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const LoginPage = ({ onLogin, handleBack }) => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="absolute top-6 left-6">
      <BackButton onClick={handleBack} />
    </div>
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Acesse sua Conta
      </h2>
      <p className="text-center text-gray-500">
        Para continuar, por favor, faça o login.
      </p>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          onLogin();
        }}
      >
        <label className="text-sm font-semibold text-gray-600">Email</label>
        <input
          type="email"
          defaultValue="usuario@exemplo.com"
          className="mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <label className="text-sm font-semibold text-gray-600">Senha</label>
        <input
          type="password"
          defaultValue="123456"
          className="mt-1 block w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full py-3 px-4 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Entrar
        </button>
        <button
          type="button"
          className="w-full py-3 px-4 font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Cadastre-se
        </button>
      </form>
    </div>
  </div>
);

const ProfilePage = ({ navigateTo, userOrders, handleLogout, initialTab }) => {
  const [activeTab, setActiveTab] = useState(initialTab || "data");
  const menuItems = [
    { id: "data", label: "Meus Dados", icon: User },
    { id: "addresses", label: "Endereços", icon: MapPin },
    { id: "payments", label: "Pagamento", icon: CreditCard },
    { id: "orders", label: "Meus Pedidos", icon: Package },
  ];
  const renderContent = () => {
    switch (activeTab) {
      case "data":
        return <ProfileData />;
      case "addresses":
        return <ProfileAddresses />;
      case "payments":
        return <ProfilePayments />;
      case "orders":
        return (
          <ProfileOrders navigateTo={navigateTo} userOrders={userOrders} />
        );
      default:
        return <ProfileData />;
    }
  };
  return (
    <div className="bg-gray-100 min-h-[calc(100vh-80px)]">
      <div className="container mx-auto p-4 md:p-8">
        <div className="md:grid md:grid-cols-4 md:gap-8">
          <aside className="md:col-span-1 mb-8 md:mb-0">
            <div className="bg-white rounded-lg shadow p-4">
              <nav className="flex flex-col space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-3 p-3 rounded-md text-left transition-colors ${activeTab === item.id
                        ? "bg-blue-100 text-blue-700 font-semibold"
                        : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 p-3 rounded-md text-left text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={20} />
                  <span>Sair</span>
                </button>
              </nav>
            </div>
          </aside>
          <main className="md:col-span-3">{renderContent()}</main>
        </div>
      </div>
    </div>
  );
};

const ProfileData = () => (
  <div className="bg-white p-8 rounded-lg shadow">
    <h2 className="text-2xl font-bold mb-6">Meus Dados</h2>
    <form className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold">Nome Completo</label>
          <input
            type="text"
            defaultValue="Usuário Exemplo"
            className="mt-1 block w-full input"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">CPF</label>
          <input
            type="text"
            defaultValue="123.456.789-00"
            disabled
            className="mt-1 block w-full input bg-gray-100 cursor-not-allowed"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold">Email</label>
        <input
          type="email"
          defaultValue="usuario.exemplo@email.com"
          className="mt-1 block w-full input"
        />
      </div>
      <div>
        <label className="text-sm font-semibold">Telefone</label>
        <input
          type="tel"
          defaultValue="(11) 99999-8888"
          className="mt-1 block w-full input"
        />
      </div>
      <div className="pt-4">
        <button type="submit" className="btn-primary">
          Salvar Alterações
        </button>
      </div>
    </form>
  </div>
);

const ProfileAddresses = () => (
  <div className="bg-white p-8 rounded-lg shadow">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Meus Endereços</h2>
      <button className="btn-primary">Adicionar Endereço</button>
    </div>
    <div className="space-y-4">
      <div className="border p-4 rounded-lg flex justify-between items-start">
        <p>
          <strong>Casa</strong>
          <br />
          Rua das Flores, 123
          <br />
          Jardim América, São Paulo - SP
          <br />
          CEP: 01425-000
        </p>
        <button className="text-blue-600 font-semibold">Editar</button>
      </div>
      <div className="border p-4 rounded-lg flex justify-between items-start">
        <p>
          <strong>Trabalho</strong>
          <br />
          Av. Faria Lima, 4500
          <br />
          Itaim Bibi, São Paulo - SP
          <br />
          CEP: 04538-132
        </p>
        <button className="text-blue-600 font-semibold">Editar</button>
      </div>
    </div>
  </div>
);

const ProfilePayments = () => (
  <div className="bg-white p-8 rounded-lg shadow">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Formas de Pagamento</h2>
      <button className="btn-primary">Adicionar Cartão</button>
    </div>
    <div className="space-y-4">
      <div className="border p-4 rounded-lg flex justify-between items-center">
        <div className="flex items-center gap-4">
          <CreditCard size={24} className="text-gray-500" />
          <div>
            <p className="font-semibold">Visa final 4242</p>
            <p className="text-sm text-gray-500">Expira em 12/2028</p>
          </div>
        </div>
        <button className="text-red-500 font-semibold">Remover</button>
      </div>
    </div>
  </div>
);

const ProfileOrders = ({ navigateTo, userOrders }) => (
  <div className="bg-white p-8 rounded-lg shadow">
    <h2 className="text-2xl font-bold mb-6">Meus Pedidos</h2>
    <ul className="divide-y divide-gray-200">
      {userOrders.map((order) => (
        <li
          key={order.id}
          className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between"
        >
          <div className="mb-4 sm:mb-0">
            <p className="font-bold text-lg">Pedido #{order.id}</p>
            <p className="text-sm text-gray-500">Realizado em: {order.date}</p>
            <p className="font-semibold mt-1">Total: {order.total}</p>
          </div>
          <div className="flex items-center w-full sm:w-auto">
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full ${order.status === "Entregue"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
                }`}
            >
              {order.status}
            </span>
            <button
              onClick={() => navigateTo("tracking", { order: order })}
              className="ml-4 text-blue-600 font-semibold flex items-center"
            >
              Acompanhar <ChevronRight size={20} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const OrderTrackingPage = ({ order }) => {
  if (!order || !order.items) return null; // Guard clause
  const steps = [
    "Pedido Recebido",
    "Pagamento Aprovado",
    "Em Preparação",
    "Enviado",
    "Entregue",
  ];
  const currentStep =
    order.status === "Entregue" ? 4 : order.status === "A caminho" ? 3 : 2;
  return (
    <div className="bg-gray-100 min-h-[calc(100vh-80px)]">
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Acompanhamento do Pedido
        </h1>
        <p className="text-gray-500 mb-8">Pedido #{order.id}</p>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center mb-8">
            {steps.map((step, index) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center text-center w-24">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${index <= currentStep
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-500"
                      }`}
                  >
                    {index < currentStep ? "✓" : index + 1}
                  </div>
                  <p
                    className={`mt-2 text-xs ${index <= currentStep
                        ? "text-blue-600 font-semibold"
                        : "text-gray-500"
                      }`}
                  >
                    {step}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 ${index < currentStep ? "bg-blue-600" : "bg-gray-200"
                      }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="border-t pt-6">
            <h3 className="font-bold text-lg mb-4">Itens do Pedido</h3>
            <ul className="space-y-4">
              {order.items.map((item, index) => (
                <li
                  key={`${order.id}-${item.id}-${index}`}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-md mr-4 object-cover"
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">Qtd: 1</p>
                    </div>
                  </div>
                  <p className="font-bold">R$ {item.price.toFixed(2)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const Toast = ({ message, show }) =>
  show && (
    <div className="fixed bottom-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in-out">
      <CheckCircle />
      <span>{message}</span>
    </div>
  );

// --- Componente Principal ---
export default function App() {
  const [pageHistory, setPageHistory] = useState([{ name: "home", props: {} }]);
  const [cart, setCart] = useState([]);
  const [userOrders, setUserOrders] = useState(initialOrders);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });

  const currentPage = pageHistory[pageHistory.length - 1];

  const navigateTo = (pageName, props = {}) =>
    setPageHistory((prev) => [...prev, { name: pageName, props }]);
  const handleBack = () =>
    pageHistory.length > 1 && setPageHistory((prev) => prev.slice(0, -1));

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const handleProductClick = (product) =>
    navigateTo("productDetail", { product });

  const handleProtectedAction = (pageName, props = {}) => {
    if (isLoggedIn) navigateTo(pageName, props);
    else navigateTo("login", { from: { pageName, props } });
  };

  const handleFinalizePurchase = () => {
    if (cart.length === 0) return;
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    const newOrder = {
      id: Math.random().toString(36).substring(2, 10),
      date: new Date().toLocaleDateString("pt-BR"),
      total: `R$ ${total.toFixed(2)}`,
      status: "Em preparação",
      items: cart,
    };
    setUserOrders((prevOrders) => [newOrder, ...prevOrders]);
    setCart([]);
    showToast("Compra finalizada com sucesso!");
    navigateTo("profile", { initialTab: "orders" });
  };

  const handleAddToCart = (product) =>
    handleProtectedAction("cartAction", { product, action: "add" });
  const handleBuyNow = (product) =>
    handleProtectedAction("cartAction", { product, action: "buy" });

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCart([]);
    setPageHistory([{ name: "home", props: {} }]);
    showToast("Você saiu da sua conta.");
  };

  useEffect(() => {
    if (currentPage.name === "cartAction") {
      const { product, action } = currentPage.props;
      setCart((prevCart) => [...prevCart, product]);
      if (action === "add") {
        showToast("Produto adicionado ao carrinho!");
        handleBack();
      } else {
        navigateTo("cart");
      }
    }
  }, [currentPage]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    const fromPage = currentPage.props.from || { pageName: "home", props: {} };
    setPageHistory([
      { name: "home" },
      { name: fromPage.pageName, props: fromPage.props },
    ]);
  };

  const renderPage = () => {
    const { name, props } = currentPage;
    switch (name) {
      case "home":
        return (
          <HomePage
            onProductClick={handleProductClick}
            navigateTo={navigateTo}
          />
        );
      case "searchResults":
        return (
          <SearchResultsPage
            onProductClick={handleProductClick}
            initialSearchTerm={props.searchTerm}
            initialCategory={props.category}
          />
        );
      case "productDetail":
        return (
          <ProductDetailPage
            product={props.product}
            handleAddToCart={handleAddToCart}
            handleBuyNow={handleBuyNow}
          />
        );
      case "cart":
        return (
          <CartPage
            cart={cart}
            setCart={setCart}
            navigateTo={navigateTo}
            handleFinalizePurchase={handleFinalizePurchase}
          />
        );
      case "login":
        return <LoginPage onLogin={handleLogin} handleBack={handleBack} />;
      case "profile":
        return (
          <ProfilePage
            navigateTo={navigateTo}
            userOrders={userOrders}
            handleLogout={handleLogout}
            initialTab={props.initialTab}
          />
        );
      case "tracking":
        return <OrderTrackingPage order={props.order} />;
      default:
        return (
          <HomePage
            onProductClick={handleProductClick}
            navigateTo={navigateTo}
          />
        );
    }
  };

  const showHeader = currentPage.name !== "login";
  const showBackButton = currentPage.name !== "home";

  return (
    <div className="font-sans">
      <style>{`.input { border: 1px solid #e2e8f0; padding: 0.5rem 0.75rem; border-radius: 0.375rem; width: 100%; } .btn-primary { background-color: #3b82f6; color: white; font-weight: 600; padding: 0.5rem 1rem; border-radius: 0.375rem; transition: background-color 0.2s; } .btn-primary:hover { background-color: #2563eb; }`}</style>
      {showHeader && (
        <Header
          navigateTo={navigateTo}
          cart={cart}
          handleProtectedAction={handleProtectedAction}
        />
      )}
      <main>
        {showBackButton && currentPage.name !== "login" && (
          <div className="container mx-auto px-4 pt-6 md:pt-8">
            <BackButton onClick={handleBack} />
          </div>
        )}
        {renderPage()}
      </main>
      <Toast message={toast.message} show={toast.show} />
    </div>
  );
}
