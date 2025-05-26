import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon } from "leaflet";
import "./Destination.css";
import { ErrorBoundary } from "react-error-boundary";
import { useMemo } from "react";
import SearchIcon from "../assets/search.png";

// Hiking destinations data
const hikingDestinations = [
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
    image: "/assets/shivapuri.jpg",
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
    image: "/assets/shivapuri.jpg",
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
    image: "/assets/shivapuri.jpg",
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
    image: "/assets/shivapuri.jpg",
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
    image: "/assets/shivapuri.jpg",
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
    image: "/assets/shivapuri.jpg",
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
    image: "/assets/shivapuri.jpg",
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
    image: "/assets/shivapuri.jpg",
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
    image: "/assets/shivapuri.jpg",
    reviews: [
      { user: "John", rating: 5, comment: "Amazing hike!" },
      { user: "Sara", rating: 4, comment: "Good, but challenging." },
    ],
  },
  {
    id: 10,
    name: "Helambu Trek",
    description:
      "Helambu, a region in the Langtang National Park, is known for its stunning views, lush forests, and unique Tamang culture. The Helambu Trek is a relatively easy and short trek from Kathmandu, offering a peaceful retreat from the city's hustle. The trek is ideal for families and those seeking a cultural experience with breathtaking views.",
    location: { lat: 27.8181, lng: 85.4692 },
    difficulty: "Moderate",
    trailheadLocation: { lat: 27.7783, lng: 85.3922 },
    duration: "5-6 hours",
    trailhead: "Sundarijal",
    image: "/assets/shivapuri.jpg",
    reviews: [
      { user: "John", rating: 5, comment: "Amazing hike!" },
      { user: "Sara", rating: 4, comment: "Good, but challenging." },
    ],
  },
];

const center = { lat: 27.700769, lng: 85.30014 };

const Destination = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

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
    if (navigator.geolocation) {
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

  const handleSelect = (destination) => {
    setSelectedDestination(destination);
  };

  const handleFavorite = (destination) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === destination.id);
      const newFavorites = isFavorite
        ? prevFavorites.filter((fav) => fav.id !== destination.id)
        : [...prevFavorites, destination];

      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const calculateDistance = (destination) => {
    if (!currentLocation)
      return isLoadingLocation ? "Loading..." : "Enable location";

    const toRad = (x) => (x * Math.PI) / 180;
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

  const getStaticMapUrl = (destination) => {
    if (!destination)
      return `https://static-maps.yandex.ru/1.x/?lang=en_US&ll=${center.lng},${center.lat}&z=12&l=map`;

    const { lat: startLat, lng: startLng } = destination.trailheadLocation;
    const { lat: endLat, lng: endLng } = destination.location;
    const zoom = 13;

    return `https://static-maps.yandex.ru/1.x/?lang=en_US&ll=${
      (startLng + endLng) / 2
    },${
      (startLat + endLat) / 2
    }&z=${zoom}&l=map&pt=${startLng},${startLat},pm2bl~${endLng},${endLat},pm2rdl&pl=${startLng},${startLat},${endLng},${endLat}`;
  };

  return (
    <div className="destination-page">
      <div className="destination-header">
        <h1>Hiking Trails Near Kathmandu</h1>
        <p>
          Explore these beautiful hiking destinations within 1-2 hours from the
          city
        </p>

        <div className="search-bar-container">
          <input
            className="search-bar"
            type="text"
            placeholder="Search trails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search hiking trails"
          />
          <img src={SearchIcon} alt="Search" className="search-icon" />
        </div>
      </div>

      <div className="destination-container">
        <div className="trails-list">
          {filteredDestinations.map((destination) => (
            <div
              key={destination.id}
              className={`trail-card ${
                selectedDestination?.id === destination.id ? "active" : ""
              }`}
              onClick={() => handleSelect(destination)}
            >
              <h3>{destination.name}</h3>
              <div className="trail-meta">
                <span
                  className={`difficulty ${destination.difficulty.toLowerCase()}`}
                >
                  {destination.difficulty}
                </span>
                <span className="duration">⏱ {destination.duration}</span>
              </div>
              <p>{destination.description}</p>
              <div className="trail-info">
                <p>🗺 Trailhead: {destination.trailhead}</p>
                <p>📏 Distance: {calculateDistance(destination)}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavorite(destination);
                  }}
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

        <div className="map-container">
          <ErrorBoundary
            FallbackComponent={() => <div>Failed to load map.</div>}
          >
            <img
              src={getStaticMapUrl(selectedDestination)}
              alt="Static map"
              className="static-map"
            />
          </ErrorBoundary>
        </div>
      </div>

      <div className="hiking-tips">
        <h2>Hiking Preparation Tips</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <h3>⏰ Timing</h3>
            <p>Start early (6-7 AM recommended)</p>
          </div>
          <div className="tip-card">
            <h3>🎒 Essentials</h3>
            <p>Carry sufficient water and snacks</p>
          </div>
          <div className="tip-card">
            <h3>👟 Footwear</h3>
            <p>Wear proper hiking shoes</p>
          </div>
          <div className="tip-card">
            <h3>☀️ Protection</h3>
            <p>Use sun protection (hat, sunscreen)</p>
          </div>
          <div className="tip-card">
            <h3>🧭 Navigation</h3>
            <p>Carry a local SIM for maps</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destination;
