export interface Flight {
    id: string;
    airline: string;
    airlineLogo: string;
    flightNumber: string;
    departure: {
        code: string;
        city: string;
        time: string;
    };
    arrival: {
        code: string;
        city: string;
        time: string;
    };
    duration: string;
    price: number;
    stops: number;
}

export const airlines = [
    { name: "Emirates", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg" },
    { name: "Qatar Airways", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Qatar_Airways_Logo.svg/1200px-Qatar_Airways_Logo.svg.png" },
    { name: "British Airways", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/British_Airways_Logo.svg/1200px-British_Airways_Logo.svg.png" },
    { name: "Singapore Airlines", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Singapore_Airlines_Logo_2.svg/1200px-Singapore_Airlines_Logo_2.svg.png" },
    { name: "Lufthansa", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lufthansa_Logo_2018.svg/1200px-Lufthansa_Logo_2018.svg.png" },
    { name: "Air France", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Air_France_Logo.svg/1200px-Air_France_Logo.svg.png" },
    { name: "Delta", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Delta_logo.svg/1200px-Delta_logo.svg.png" },
    { name: "United", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/United_Airlines_Logo.svg/1200px-United_Airlines_Logo.svg.png" },
];

const generateFlights = (): Flight[] => {
    const flightList: Flight[] = [];
    const routes = [
        { from: "LHR", to: "DXB", basePrice: 450, baseDuration: 7 },
        { from: "JFK", to: "LHR", basePrice: 600, baseDuration: 7 },
        { from: "DXB", to: "SIN", basePrice: 380, baseDuration: 7.5 },
        { from: "SIN", to: "HND", basePrice: 420, baseDuration: 6.5 },
        { from: "LHR", to: "JFK", basePrice: 650, baseDuration: 8 },
        { from: "FRA", to: "HKG", basePrice: 800, baseDuration: 11 },
        { from: "CDG", to: "DXB", basePrice: 500, baseDuration: 6.5 },
        { from: "DXB", to: "LHR", basePrice: 450, baseDuration: 7 },
    ];

    let idCounter = 1;

    routes.forEach(route => {
        airlines.forEach(airline => {
            // Direct
            flightList.push({
                id: `FL-${idCounter++}`,
                airline: airline.name,
                airlineLogo: airline.logo,
                flightNumber: `${airline.name.substring(0, 2).toUpperCase()}${Math.floor(Math.random() * 900) + 100}`,
                departure: { code: route.from, city: getCity(route.from), time: getRandomTime() },
                arrival: { code: route.to, city: getCity(route.to), time: getRandomTime(true) }, // Simplified, not real duration math for mock
                duration: `${route.baseDuration}h ${Math.floor(Math.random() * 59)}m`,
                price: route.basePrice + Math.floor(Math.random() * 300),
                stops: 0,
            });

            // 1 Stop
            flightList.push({
                id: `FL-${idCounter++}`,
                airline: airline.name,
                airlineLogo: airline.logo,
                flightNumber: `${airline.name.substring(0, 2).toUpperCase()}${Math.floor(Math.random() * 900) + 100}`,
                departure: { code: route.from, city: getCity(route.from), time: getRandomTime() },
                arrival: { code: route.to, city: getCity(route.to), time: getRandomTime(true) },
                duration: `${route.baseDuration + 3}h ${Math.floor(Math.random() * 59)}m`,
                price: route.basePrice - 50 + Math.floor(Math.random() * 200),
                stops: 1,
            });

            // Another Variant
            flightList.push({
                id: `FL-${idCounter++}`,
                airline: airline.name,
                airlineLogo: airline.logo,
                flightNumber: `${airline.name.substring(0, 2).toUpperCase()}${Math.floor(Math.random() * 900) + 100}`,
                departure: { code: route.from, city: getCity(route.from), time: getRandomTime() },
                arrival: { code: route.to, city: getCity(route.to), time: getRandomTime(true) },
                duration: `${route.baseDuration}h ${Math.floor(Math.random() * 59)}m`,
                price: route.basePrice + 100 + Math.floor(Math.random() * 400),
                stops: 0,
            });
        });
    });

    return flightList.sort(() => Math.random() - 0.5); // Shuffle
};

const getCity = (code: string) => {
    const cities: { [key: string]: string } = {
        "LHR": "London", "DXB": "Dubai", "JFK": "New York", "SIN": "Singapore",
        "HND": "Tokyo", "CDG": "Paris", "FRA": "Frankfurt", "HKG": "Hong Kong"
    };
    return cities[code] || "City";
};

const getRandomTime = (isArrival = false) => {
    const hour = Math.floor(Math.random() * 24);
    const minute = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    return `${hour.toString().padStart(2, '0')}:${minute}`;
}

export const flights = generateFlights();

export const airports = [
    { code: "LHR", city: "London" },
    { code: "DXB", city: "Dubai" },
    { code: "JFK", city: "New York" },
    { code: "SIN", city: "Singapore" },
    { code: "HND", city: "Tokyo" },
    { code: "CDG", city: "Paris" },
    { code: "FRA", city: "Frankfurt" },
    { code: "HKG", city: "Hong Kong" },
];
