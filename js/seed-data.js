
window.SEED = {
  "fundis": [
    {
      "id": "f001",
      "username": "jpelectric",
      "name": "Jean Paul Habimana",
      "trade": "Electrician",
      "location": "Kacyiru, Kigali",
      "rate": 5000,
      "rateUnit": "per hour",
      "rating": 4.8,
      "bio": "10 years wiring homes and offices across Kigali."
    },
    {
      "id": "f002",
      "username": "aliceplumb",
      "name": "Alice Uwase",
      "trade": "Plumber",
      "location": "Kimironko, Kigali",
      "rate": 4500,
      "rateUnit": "per hour",
      "rating": 4.6,
      "bio": "Specialist in leak repair and bathroom installations."
    },
    {
      "id": "f003",
      "username": "erictailor",
      "name": "Eric Nshimiyimana",
      "trade": "Tailor",
      "location": "Nyamirambo, Kigali",
      "rate": 3000,
      "rateUnit": "per item",
      "rating": 4.9,
      "bio": "Custom suits, dresses, and quick alterations."
    },
    {
      "id": "f004",
      "username": "dianewood",
      "name": "Diane Mukamana",
      "trade": "Carpenter",
      "location": "Remera, Kigali",
      "rate": 6000,
      "rateUnit": "per hour",
      "rating": 4.7,
      "bio": "Custom furniture and home repairs, 8 years experience."
    }
  ],
  "users": [
    {
      "username": "client1",
      "password": "client123",
      "role": "client",
      "name": "Olivier C."
    },
    {
      "username": "client2",
      "password": "client123",
      "role": "client",
      "name": "Sandrine K."
    },
    {
      "username": "jpelectric",
      "password": "fundi123",
      "role": "fundi",
      "name": "Jean Paul Habimana"
    },
    {
      "username": "aliceplumb",
      "password": "fundi123",
      "role": "fundi",
      "name": "Alice Uwase"
    },
    {
      "username": "erictailor",
      "password": "fundi123",
      "role": "fundi",
      "name": "Eric Nshimiyimana"
    },
    {
      "username": "dianewood",
      "password": "fundi123",
      "role": "fundi",
      "name": "Diane Mukamana"
    }
  ],
  "bookings": [
    {
      "id": "b001",
      "clientUsername": "client1",
      "fundiUsername": "jpelectric",
      "category": "Electrician",
      "date": "2026-09-25",
      "description": "Fix a tripping circuit breaker in the kitchen.",
      "status": "pending"
    },
    {
      "id": "b002",
      "clientUsername": "client1",
      "fundiUsername": "aliceplumb",
      "category": "Plumber",
      "date": "2026-09-28",
      "description": "Bathroom sink is leaking under the counter.",
      "status": "accepted"
    },
    {
      "id": "b003",
      "clientUsername": "client2",
      "fundiUsername": "jpelectric",
      "category": "Electrician",
      "date": "2026-09-30",
      "description": "Install two new ceiling lights in the living room.",
      "status": "pending"
    }
  ]
};
