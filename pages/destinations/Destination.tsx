import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import SearchIcon from "../../public/search.png";

// Define TypeScript interfaces
interface Location {
  lat: number;
  lng: number;
}

interface Review {
  user: string;
  rating: number;
  comment: string;
}

interface HikingDestination {
  id: number;
  name: string;
  description: string;
  location: Location;
  difficulty: "Easy" | "Moderate" | "Challenging" | "Hard";
  duration: string;
  trailhead: string;
  trailheadLocation: Location;
  image: string;
  reviews: Review[];
}

interface Coords {
  latitude: number;
  longitude: number;
}

// Hiking destinations data
const hikingDestinations: HikingDestination[] = [
  {
    id: 1,
    name: "Shivapuri Nagarjun National Park",
    description:
      "Located on the northern edge of Kathmandu, Shivapuri Nagarjun National Park is a paradise for nature lovers and hikers. It offers several trails through lush forests with stunning views of the Kathmandu Valley, making it a perfect getaway for birdwatchers, nature enthusiasts, and those seeking a moderate adventure.",
    location: { lat: 27.7915, lng: 85.3638 },
    difficulty: "Moderate",
    duration: "4-5 hours",
    trailhead: "Budhanilkantha Temple",
    trailheadLocation: { lat: 27.7835, lng: 85.3632 },
    image: "/shivapuri.jpg",
    reviews: [
      { user: "John", rating: 5, comment: "Amazing hike!" },
      { user: "Sara", rating: 4, comment: "Good, but challenging." },
    ],
  },
  {
    id: 2,
    name: "Champadevi Hill",
    description:
      "A sacred hill located in the southern part of Kathmandu, Champadevi Hill offers a peaceful hiking experience with panoramic views of the Himalayas and the Kathmandu Valley. The trail, which passes through dense forests and Buddhist shrines, leads to the summit where a temple dedicated to Goddess Champadevi stands.",
    location: { lat: 27.6458, lng: 85.2714 },
    difficulty: "Moderate",
    trailheadLocation: { lat: 27.6269, lng: 85.2755 },
    duration: "5-6 hours",
    trailhead: "Pharping",
    image: "/shivapuri.jpg",
    reviews: [
      { user: "John", rating: 5, comment: "Amazing hike!" },
      { user: "Sara", rating: 4, comment: "Good, but challenging." },
    ],
  },
  {
    id: 3,
    name: "Nagarkot to Changunarayan Hike",
    description:
      "This scenic ridge walk connects the hill station of Nagarkot with the ancient temple of Changunarayan. Along the way, trekkers can enjoy stunning views of the Himalayas, lush green forests, and traditional villages. The hike is relatively easy and perfect for beginners, offering a mix of cultural heritage and natural beauty.",
    location: { lat: 27.7152, lng: 85.5207 },
    difficulty: "Easy",
    trailheadLocation: { lat: 27.7259, lng: 85.5211 },
    duration: "3-4 hours",
    trailhead: "Nagarkot Tower",
    image: "/shivapuri.jpg",
    reviews: [
      { user: "John", rating: 5, comment: "Amazing hike!" },
      { user: "Sara", rating: 4, comment: "Good, but challenging." },
    ],
  },
  {
    id: 4,
    name: "Phulchoki Hill",
    description:
      "Standing at 2,782 meters, Phulchoki Hill is the highest point around the Kathmandu Valley. The hike offers a challenging ascent through lush forests, particularly beautiful in spring when rhododendrons bloom. The summit offers panoramic views of the entire Kathmandu Valley and the surrounding mountains.",
    location: { lat: 27.5833, lng: 85.3833 },
    difficulty: "Challenging",
    trailheadLocation: { lat: 27.5764, lng: 85.4068 },
    duration: "6-7 hours",
    trailhead: "Godavari Botanical Garden",
    image: "/shivapuri.jpg",
    reviews: [
      { user: "John", rating: 5, comment: "Amazing hike!" },
      { user: "Sara", rating: 4, comment: "Good, but challenging." },
    ],
  },
  {
    id: 5,
    name: "Sundarijal to Chisapani",
    description:
      "This popular trek begins in Sundarijal, a charming village located northeast of Kathmandu. The trail takes hikers through dense forests, past waterfalls, and offers fantastic views of the surrounding mountains. The trek is well-known for its mix of nature, rural culture, and beautiful landscapes.",
    location: { lat: 27.9368, lng: 85.3153 },
    difficulty: "Moderate",
    trailheadLocation: { lat: 27.7783, lng: 85.3922 },
    duration: "5-6 hours",
    trailhead: "Sundarijal",
    image: "/shivapuri.jpg",
    reviews: [
      { user: "John", rating: 5, comment: "Amazing hike!" },
      { user: "Sara", rating: 4, comment: "Good, but challenging." },
    ],
  },
  {
    id: 6,
    name: "Gosaikunda Lake Trek",
    description:
      "Gosaikunda Lake, situated at 4,380 meters in Langtang National Park, is a high-altitude trek that attracts both trekkers and religious pilgrims. The trail takes you through dense forests, alpine meadows, and past several small lakes, culminating at the sacred Gosaikunda Lake surrounded by snow-capped peaks.",
    location: { lat: 28.1333, lng: 85.5 },
    difficulty: "Hard",
    trailheadLocation: { lat: 28.1172, lng: 85.2795 },
    duration: "7-9 hours",
    trailhead: "Dhunche",
    image: "/shivapuri.jpg",
    reviews: [
      { user: "John", rating: 5, comment: "Amazing hike!" },
      { user: "Sara", rating: 4, comment: "Good, but challenging." },
    ],
  },
  {
    id: 7,
    name: "Nagarkot Sunrise Trek",
    description:
      "The Nagarkot Sunrise Trek is a short but stunning hike. The trail leads you to the hilltop town of Nagarkot, which offers some of the best sunrise views in Nepal. From here, you can see the Annapurna, Langtang, and Everest mountain ranges bathed in golden light at dawn.",
    location: { lat: 27.6943, lng: 85.5066 },
    difficulty: "Easy",
    trailheadLocation: { lat: 27.6943, lng: 85.5066 },
    duration: "2-3 hours",
    trailhead: "Nagarkot",
    image: "/shivapuri.jpg",
    reviews: [
      { user: "John", rating: 5, comment: "Amazing hike!" },
      { user: "Sara", rating: 4, comment: "Good, but challenging." },
    ],
  },
  {
    id: 8,
    name: "Balthali Village Hike",
    description:
      "The Balthali Village hike is an easy and scenic trek that takes you through terraced fields, dense forests, and traditional Newar villages. The hike is perfect for those looking to explore rural life in Nepal while enjoying picturesque views of the Himalayas and lush green surroundings.",
    location: { lat: 27.5741, lng: 85.4289 },
    difficulty: "Easy",
    duration: "4-5 hours",
    trailheadLocation: { lat: 27.58, lng: 85.4063 },
    trailhead: "Panauti",
    image: "/shivapuri.jpg",
    reviews: [
      { user: "John", rating: 5, comment: "Amazing hike!" },
      { user: "Sara", rating: 4, comment: "Good, but challenging." },
    ],
  },
  {
    id: 9,
    name: "Kakani Hill Trek",
    description:
      "Kakani Hill, located just 23 kilometers north of Kathmandu, offers one of the best short hikes in the region. The trail is famous for its stunning views of the Langtang range and nearby hills. The hike is easy to moderate and perfect for those with limited time who want to experience mountain views near the city.",
    location: { lat: 27.9803, lng: 85.2634 },
    difficulty: "Easy",
    trailheadLocation: { lat: 27.9501, lng: 85.2394 },
    duration: "3-4 hours",
    trailhead: "Kakani",
    image: "/shivapuri.jpg",
    reviews: [
      { user: "John", rating: 5, comment: "Amazing hike!" },
      { user: "Sara", rating: 4, comment: "Accepted." },
    ],
  },
  {
    id: 10,
    name: "Helambu Trek",
    description:
      "Helambu, a region in the Langtang National Park, is known for its stunning views, lush forests, and unique Tamang culture. The Helambu Trek is a relatively easy and short trek from Kathmandu, offering a peaceful retreat from the city’s hustle. The trek is ideal for families and those seeking a cultural experience with breathtaking views.",
    location: { lat: 27.8181, lng: 85.4692 },
    difficulty: "Moderate",
    trailheadLocation: { lat: 27.7783, lng: 85.3922 },
    duration: "5-6 hours",
    trailhead: "Sundarijal",
    image: "/shivapuri.jpg",
    reviews: [
      { user: "John", rating: 5, comment: "Amazing hike!" },
      { user: "Sara", rating: 4, comment: "Good, but challenging." },
    ],
  },
];

const center: Location = { lat: 27.700769, lng: 85.30014 };

// Dynamically import react-leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

// Simple ErrorBoundary component
const ErrorBoundary: React.FC<{
  children: React.ReactNode;
  FallbackComponent: React.ComponentType;
}> = ({ children, FallbackComponent }) => {
  try {
    return <>{children}</>;
  } catch (error) {
    return <FallbackComponent />;
  }
};

const Destination: React.FC = () => {
  const [selectedDestination, setSelectedDestination] =
    useState<HikingDestination | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [favorites, setFavorites] = useState<HikingDestination[]>(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("favorites") || "[]")
      : []
  );
  const [currentLocation, setCurrentLocation] = useState<Coords | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 1200);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredDestinations = useMemo(
    () =>
      hikingDestinations.filter((destination) => {
        const query = searchQuery.toLowerCase();
        return (
          destination.name.toLowerCase().includes(query) ||
          destination.description.toLowerCase().includes(query) ||
          destination.difficulty.toLowerCase().includes(query)
        );
      }),
    [searchQuery]
  );

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation(position.coords);
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoadingLocation(false);
        }
      );
    }
  }, []);

  const handleSelect = (destination: HikingDestination) => {
    setSelectedDestination(destination);
  };

  const handleFavorite = (destination: HikingDestination) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === destination.id);
      const newFavorites = isFavorite
        ? prevFavorites.filter((fav) => fav.id !== destination.id)
        : [...prevFavorites, destination];

      if (typeof window !== "undefined") {
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
      }
      return newFavorites;
    });
  };

  const calculateDistance = (destination: HikingDestination): string => {
    if (!currentLocation) {
      return isLoadingLocation ? "Loading..." : "Enable location";
    }

    const toRad = (x: number) => (x * Math.PI) / 180;
    const R = 6371; // Earth radius in km

    const dLat = toRad(destination.location.lat - currentLocation.latitude);
    const dLon = toRad(destination.location.lng - currentLocation.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(currentLocation.latitude)) *
        Math.cos(toRad(destination.location.lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return `${(R * c).toFixed(1)} km`;
  };

  const getStaticMapUrl = (destination: HikingDestination | null): string => {
    if (!destination) {
      return `https://static-maps.yandex.ru/1.x/?lang=en_US&ll=${center.lng},${center.lat}&z=12&l=map`;
    }

    const { lat: startLat, lng: startLng } = destination.trailheadLocation;
    const { lat: endLat, lng: endLng } = destination.location;
    const zoom = 13;

    return `https://static-maps.yandex.ru/1.x/?lang=en_US&ll=${
      (startLng + endLng) / 2
    },${
      (startLat + endLat) / 2
    }&z=${zoom}&l=map&pt=${startLng},${startLat},pm2bl~${endLng},${endLat},pm2rdl&pl=${startLng},${startLat},${endLng},${endLat}`;
  };

  // Inline styles
  const destinationPageStyle = {
    padding: "2rem",
    maxWidth: "1600px",
    margin: "0 auto",
    background: "linear-gradient(135deg, #f8f9fa 0%, #f0f2f5 100%)",
    minHeight: "100vh",
    fontFamily: '"Inter", sans-serif',
    color: "#2b2d42",
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    gap: "2rem",
  };

  const destinationHeaderStyle = {
    textAlign: "center" as const,
    padding: "2rem",
    background:
      "linear-gradient(135deg, #ffffff 0%, #f5f7fa 50%, #e8ecf2 100%)",
    borderRadius: "1.5rem",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)",
    position: "relative" as const,
    overflow: "hidden" as const,
  };

  const headerH1Style = {
    fontSize: "2.5rem",
    marginBottom: "1rem",
    fontFamily: '"Playfair Display", serif',
    fontWeight: 700,
    background: "linear-gradient(135deg, #1a1c2e 0%, #2d3748 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    ...(isMobile && { fontSize: "2rem" }),
  };

  const searchBarContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative" as const,
    width: isMobile ? "90%" : "30%",
    margin: "0 auto",
    marginTop: "1rem",
  };

  const searchBarStyle = {
    width: "100%",
    padding: "1rem 3.5rem 1rem 2rem",
    border: "1px solid rgba(226, 232, 240, 0.8)",
    borderRadius: "1rem",
    fontSize: "1.1rem",
    background: "rgba(255, 255, 255, 0.5)",
    boxShadow:
      "0 4px 20px rgba(0, 0, 0, 0.09), inset 0 2px 4px rgba(0, 0, 0, 0.06)",
    transition: "all 0.3s ease",
  };

  const searchBarFocusStyle = {
    outline: "none",
    boxShadow:
      "0 4px 20px rgba(74, 144, 226, 0.1), 0 0 0 3px rgba(74, 144, 226, 0.1)",
    transform: "translateY(-1px)",
  };

  const searchIconStyle = {
    position: "absolute" as const,
    right: "1rem",
    top: "50%",
    transform: "translateY(-50%)",
    width: "20px",
    height: "20px",
    opacity: 0.5,
    pointerEvents: "none" as const,
  };

  const destinationContainerStyle = {
    display: "grid",
    gridTemplateColumns: isTablet ? "1fr" : "minmax(0, 1.2fr) minmax(0, 1fr)",
    gap: "2rem",
    height: isTablet ? "auto" : "calc(100vh - 250px)",
    position: "relative" as const,
  };

  const trailsListStyle = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1.25rem",
    overflowY: "auto" as const,
    paddingRight: "1rem",
    scrollbarWidth: "thin" as const,
    scrollbarColor: "#4a90e2 transparent",
    ...(isTablet && { maxHeight: "none", overflow: "visible" }),
  };

  const trailCardStyle = (isActive: boolean) => ({
    background: isActive
      ? "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 247, 250, 0.98) 100%)"
      : "rgba(255, 255, 255, 0.95)",
    padding: "1.5rem",
    borderRadius: "1rem",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    border: isActive
      ? "2px solid #4a90e2"
      : "1px solid rgba(226, 232, 240, 0.8)",
    cursor: "pointer",
    ...(isActive && { boxShadow: "0 10px 30px rgba(74, 144, 226, 0.1)" }),
  });

  const trailCardHoverStyle = {
    transform: "translateY(-2px) scale(1.01)",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.02)",
  };

  const trailCardH3Style = {
    fontSize: "1.25rem",
    marginBottom: "0.75rem",
    color: "#1a1c2e",
  };

  const trailMetaStyle = {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    marginBottom: "0.75rem",
  };

  const difficultyStyle = (difficulty: string) => ({
    padding: "0.4rem 1rem",
    borderRadius: "2rem",
    fontSize: "0.85rem",
    fontWeight: 600,
    letterSpacing: "0.5px",
    textTransform: "uppercase" as const,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    ...(difficulty.toLowerCase() === "easy" && {
      background: "linear-gradient(135deg, #f0fff4 0%, #dcfce7 100%)",
      color: "#166534",
    }),
    ...(difficulty.toLowerCase() === "moderate" && {
      background: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
      color: "#b45309",
    }),
    ...(difficulty.toLowerCase() === "challenging" && {
      background: "linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)",
      color: "#be123c",
    }),
    ...(difficulty.toLowerCase() === "hard" && {
      background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
      color: "#1e40af",
    }),
  });

  const durationStyle = {
    color: "#4a5568",
  };

  const trailInfoStyle = {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "1rem",
    marginTop: "1rem",
    paddingTop: "1rem",
    borderTop: "1px solid rgba(226, 232, 240, 0.8)",
  };

  const trailInfoPStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#4a5568",
    fontSize: "0.95rem",
  };

  const favoriteButtonStyle = {
    marginLeft: "auto",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "0.75rem",
    background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
    color: "#4a5568",
    fontSize: "0.95rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  };

  const favoriteButtonHoverStyle = {
    background: "linear-gradient(135deg, yellow 0%, yellow 50%)",
    color: "black",
    transform: "translateY(-1px)",
  };

  const mapContainerStyle = {
    position: isTablet ? ("relative" as const) : ("sticky" as const),
    top: isTablet ? "auto" : "2rem",
    height: isTablet ? "400px" : "100%",
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: "1rem",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    overflow: "hidden" as const,
    ...(isTablet && { order: -1 }),
  };

  const staticMapStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  };

  const hikingTipsStyle = {
    padding: "2rem",
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 247, 250, 0.95) 100%)",
    borderRadius: "1rem",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
  };

  const tipsGridStyle = {
    display: "grid",
    gridTemplateColumns: isMobile
      ? "1fr"
      : "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1.5rem",
    marginTop: "1.5rem",
  };

  const tipCardStyle = {
    background: "rgba(255, 255, 255, 0.9)",
    padding: "1.5rem",
    borderRadius: "1rem",
    border: "1px solid rgba(226, 232, 240, 0.8)",
    transition: "all 0.3s ease",
  };

  const tipCardHoverStyle = {
    transform: "translateY(-3px)",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.06)",
  };

  const tipCardH3Style = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "0.75rem",
    color: "#2d3748",
  };

  // State for hover effects
  const [hoveredTrail, setHoveredTrail] = useState<number | null>(null);
  const [hoveredFavorite, setHoveredFavorite] = useState<number | null>(null);
  const [hoveredTip, setHoveredTip] = useState<number | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

  return (
    <div style={destinationPageStyle}>
      <div style={destinationHeaderStyle}>
        <h1 style={headerH1Style}>Hiking Trails Near Kathmandu</h1>
        <p style={{ color: "#4a5568" }}>
          Explore these beautiful hiking destinations within 1-2 hours from the
          city
        </p>

        <div style={searchBarContainerStyle}>
          <input
            type="text"
            placeholder="Search trails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            style={{
              ...searchBarStyle,
              ...(isSearchFocused && searchBarFocusStyle),
            }}
            aria-label="Search hiking trails"
          />
          <Image
            src={SearchIcon}
            alt="Search"
            style={searchIconStyle}
            width={20}
            height={20}
          />
        </div>
      </div>

      <div style={destinationContainerStyle}>
        <div style={trailsListStyle}>
          {filteredDestinations.map((destination) => (
            <div
              key={destination.id}
              style={{
                ...trailCardStyle(selectedDestination?.id === destination.id),
                ...(hoveredTrail === destination.id && trailCardHoverStyle),
              }}
              onClick={() => handleSelect(destination)}
              onMouseEnter={() => setHoveredTrail(destination.id)}
              onMouseLeave={() => setHoveredTrail(null)}
            >
              <h3 style={trailCardH3Style}>{destination.name}</h3>
              <div style={trailMetaStyle}>
                <span style={difficultyStyle(destination.difficulty)}>
                  {destination.difficulty}
                </span>
                <span style={durationStyle}>⏱ {destination.duration}</span>
              </div>
              <p style={{ color: "#4a5568" }}>{destination.description}</p>
              <div style={trailInfoStyle}>
                <p style={trailInfoPStyle}>
                  🗺 Trailhead: {destination.trailhead}
                </p>
                <p style={trailInfoPStyle}>
                  📏 Distance: {calculateDistance(destination)}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavorite(destination);
                  }}
                  style={{
                    ...favoriteButtonStyle,
                    ...(hoveredFavorite === destination.id &&
                      favoriteButtonHoverStyle),
                  }}
                  onMouseEnter={() => setHoveredFavorite(destination.id)}
                  onMouseLeave={() => setHoveredFavorite(null)}
                  aria-label={
                    favorites.some((fav) => fav.id === destination.id)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  {favorites.some((fav) => fav.id === destination.id)
                    ? "★"
                    : "☆"}{" "}
                  Favourite
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={mapContainerStyle}>
          <ErrorBoundary
            FallbackComponent={() => <div>Failed to load map.</div>}
          >
            <Image
              src={getStaticMapUrl(selectedDestination)}
              alt="Static map"
              style={staticMapStyle}
              width={600}
              height={400}
            />
          </ErrorBoundary>
        </div>
      </div>

      <div style={hikingTipsStyle}>
        <h2
          style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#2d3748" }}
        >
          Hiking Preparation Tips
        </h2>
        <div style={tipsGridStyle}>
          {[
            { title: "⏰ Timing", text: "Start early (6-7 AM recommended)" },
            {
              title: "🎒 Essentials",
              text: "Carry sufficient water and snacks",
            },
            { title: "👟 Footwear", text: "Wear proper hiking shoes" },
            {
              title: "☀️ Protection",
              text: "Use sun protection (hat, sunscreen)",
            },
            { title: "🧭 Navigation", text: "Carry a local SIM for maps" },
          ].map((tip, index) => (
            <div
              key={index}
              style={{
                ...tipCardStyle,
                ...(hoveredTip === index && tipCardHoverStyle),
              }}
              onMouseEnter={() => setHoveredTip(index)}
              onMouseLeave={() => setHoveredTip(null)}
            >
              <h3 style={tipCardH3Style}>{tip.title}</h3>
              <p style={{ color: "#4a5568" }}>{tip.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destination;
