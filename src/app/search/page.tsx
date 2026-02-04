"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import FlightStrip from "@/components/results/FlightStrip";
import { flights, airlines } from "@/lib/mockData";
import { Filter, SlidersHorizontal } from "lucide-react";

function SearchContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // In a real app, use these to fetch data
    const _from = searchParams.get("from");
    const _to = searchParams.get("to");

    // Filter States
    const [maxPrice, setMaxPrice] = useState(3000);
    const [stops, setStops] = useState<number | null>(null);
    const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState("best");

    // Loading State
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    const handleAirlineToggle = (airlineName: string) => {
        if (selectedAirlines.includes(airlineName)) {
            setSelectedAirlines(selectedAirlines.filter(a => a !== airlineName));
        } else {
            setSelectedAirlines([...selectedAirlines, airlineName]);
        }
    };

    const handleSelectFlight = (id: string) => {
        router.push(`/book?flightId=${id}`);
    };

    // Filter Logic
    const filteredFlights = flights.filter(flight => {
        if (flight.price > maxPrice) return false;
        if (stops !== null && flight.stops !== stops) return false;
        if (selectedAirlines.length > 0 && !selectedAirlines.includes(flight.airline)) return false;
        return true;
    }).sort((a, b) => {
        if (sortBy === "cheapest") return a.price - b.price;
        if (sortBy === "fastest") return parseInt(a.duration) - parseInt(b.duration);
        return 0;
    });

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Pro Header - Compact Search Summary */}
            <div className="bg-secondary text-white border-b border-gray-800 shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-2xl tracking-tight">{_from || "LHR"}</span>
                            <span className="text-gray-500">→</span>
                            <span className="font-bold text-2xl tracking-tight">{_to || "DXB"}</span>
                        </div>
                        <div className="h-6 w-px bg-gray-700 hidden md:block"></div>
                        <div className="hidden md:flex flex-col leading-none">
                            <span className="text-gray-400 text-xs font-bold uppercase">Depart</span>
                            <span className="font-medium">Tue, 24 Oct</span>
                        </div>
                        <div className="hidden md:flex flex-col leading-none">
                            <span className="text-gray-400 text-xs font-bold uppercase">Return</span>
                            <span className="font-medium">Sat, 28 Oct</span>
                        </div>
                    </div>

                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* Pro Filters Sidebar */}
                    <aside className="w-full lg:w-64 space-y-6">
                        <div className="bg-white p-5 rounded-lg border border-gray-200">
                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                    <Filter className="w-4 h-4" /> Filters
                                </h3>
                                <button className="text-xs text-primary font-bold hover:underline">RESET</button>
                            </div>

                            {/* Stops */}
                            <div className="mb-6">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Stops</h4>
                                <div className="space-y-2">
                                    {[
                                        { l: "Any", v: null },
                                        { l: "Direct only", v: 0 },
                                        { l: "1 Stop", v: 1 }
                                    ].map((opt) => (
                                        <label key={opt.l} className="flex items-center gap-3 cursor-pointer group">
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${stops === opt.v ? "border-primary" : "border-gray-300 group-hover:border-primary"}`}>
                                                {stops === opt.v && <div className="w-2 h-2 bg-primary rounded-full" />}
                                            </div>
                                            <span className={`text-sm ${stops === opt.v ? "font-bold text-gray-900" : "text-gray-600"}`}>{opt.l}</span>
                                            <input type="radio" name="stops" className="hidden" onChange={() => setStops(opt.v as any)} checked={stops === opt.v} />
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Slider */}
                            <div className="mb-6">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Max Price</h4>
                                <div className="flex items-center justify-between text-xs text-gray-500 mb-2 font-mono">
                                    <span>$200</span>
                                    <span className="font-bold text-gray-900">${maxPrice}</span>
                                </div>
                                <input
                                    type="range"
                                    min="200" max="3000" step="50"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary-600"
                                />
                            </div>

                            {/* Airlines */}
                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Airlines</h4>
                                <div className="space-y-1">
                                    {airlines.map(airline => (
                                        <label key={airline.name} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 -mx-1.5 rounded transition-colors">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                                                checked={selectedAirlines.includes(airline.name)}
                                                onChange={() => handleAirlineToggle(airline.name)}
                                            />
                                            <span className="text-sm text-gray-600 flex-1 truncate">{airline.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Results */}
                    <main className="flex-1">
                        {/* Sort Bar */}
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-gray-500 font-medium text-sm"><span className="text-gray-900 font-bold">{filteredFlights.length}</span> results</p>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-gray-400 uppercase hidden sm:block">Sort by:</span>
                                <div className="flex bg-white rounded border border-gray-200 p-0.5">
                                    {["best", "cheapest", "fastest"].map(opt => (
                                        <button
                                            key={opt}
                                            onClick={() => setSortBy(opt)}
                                            className={`px-3 py-1 text-xs font-bold rounded uppercase transition-all ${sortBy === opt ? 'bg-secondary text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            // Skeleton Loader
                            <div className="space-y-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="bg-white rounded-lg h-32 animate-pulse border border-gray-200 p-4 flex items-center">
                                        <div className="w-16 h-16 bg-gray-100 rounded mr-6"></div>
                                        <div className="flex-1 space-y-3">
                                            <div className="h-4 bg-gray-100 rounded w-1/4"></div>
                                            <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // Results List
                            <div className="space-y-3">
                                {filteredFlights.length > 0 ? (
                                    filteredFlights.map((flight) => (
                                        <FlightStrip key={flight.id} flight={flight} onSelect={handleSelectFlight} />
                                    ))
                                ) : (
                                    <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
                                        <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                                            <SlidersHorizontal className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-sm font-bold text-gray-900 mb-1">No flights found</h3>
                                        <p className="text-xs text-gray-500">Adjust filters to see results.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center font-bold text-gray-400 uppercase tracking-widest animate-pulse">Searching Flights...</div>}>
            <SearchContent />
        </Suspense>
    );
}
