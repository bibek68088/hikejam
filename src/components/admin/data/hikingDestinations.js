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
]

export default hikingDestinations

