
export const PriceService = {
    key: "ugs_flight_prices_v1",

    // Get current price for a flight ID
    getPrice: (flightId: string, basePrice: number) => {
        if (typeof window === "undefined") return basePrice; // Server-side fallback

        const data = PriceService.loadData();
        const now = Date.now();
        const fiveHours = 5 * 60 * 60 * 1000;

        // If no data or expired, refresh ALL prices
        if (!data.timestamp || (now - data.timestamp > fiveHours)) {
            return PriceService.refreshPrices(flightId, basePrice);
        }

        // Return stored price or base if not found
        return data.prices[flightId] || basePrice;
    },

    // Load from LocalStorage
    loadData: () => {
        try {
            const item = localStorage.getItem(PriceService.key);
            return item ? JSON.parse(item) : { timestamp: 0, prices: {} };
        } catch {
            return { timestamp: 0, prices: {} };
        }
    },

    // Simulate a new price and save it
    refreshPrices: (flightId: string, basePrice: number) => {
        const data = PriceService.loadData();
        const now = Date.now();

        // Only generate new prices if the ENTIRE set is expired (prevents jitter per flight)
        // For this demo, we'll just update the requested one if missing or expired.

        // Logic: Vary price by +/- 10%
        const variation = (Math.random() * 0.2) - 0.1; // -0.1 to +0.1
        const newPrice = Math.round(basePrice * (1 + variation));

        data.timestamp = now; // Update timestamp
        data.prices[flightId] = newPrice;

        localStorage.setItem(PriceService.key, JSON.stringify(data));
        return newPrice;
    }
};
