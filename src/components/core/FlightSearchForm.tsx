"use client";

import { useState } from "react";
import { Plane, Calendar, User, Search, MapPin } from "lucide-react";
import FlexibleDateGrid from "./FlexibleDateGrid";
import { airports } from "@/lib/mockData";
import { useRouter } from "next/navigation";

export default function FlightSearchForm() {
    const router = useRouter();
    const [showFlexibleDates, setShowFlexibleDates] = useState(false);
    const [tripType, setTripType] = useState("return");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [depart, setDepart] = useState("");
    const [ret, setRet] = useState("");
    const [cabinClass, setCabinClass] = useState("Economy Class");
    const [passengers, setPassengers] = useState(1);
    const [showPassengerSelector, setShowPassengerSelector] = useState(false);

    const [flights, setFlights] = useState([
        { from: "", to: "", depart: "" },
        { from: "", to: "", depart: "" }
    ]);

    const handleSearch = () => {
        if (tripType === "multi-city") {
            const flightData = JSON.stringify(flights);
            const params = new URLSearchParams({ type: "multi-city", flights: flightData, class: cabinClass, passengers: passengers.toString() });
            router.push(`/search?${params.toString()}`);
        } else {
            const params = new URLSearchParams({
                from: from || "LHR",
                to: to || "DXB",
                depart,
                return: ret,
                class: cabinClass,
                passengers: passengers.toString()
            });
            router.push(`/search?${params.toString()}`);
        }
    }

    const updateFlight = (index: number, field: string, value: string) => {
        const newFlights = [...flights];
        // @ts-ignore
        newFlights[index][field] = value;
        setFlights(newFlights);
    };

    const addFlight = () => {
        setFlights([...flights, { from: "", to: "", depart: "" }]);
    };

    const removeFlight = (index: number) => {
        if (flights.length > 2) {
            const newFlights = flights.filter((_, i) => i !== index);
            setFlights(newFlights);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-2xl p-6 relative">
            {/* Top Tabs */}
            <div className="flex gap-6 border-b border-gray-200 pb-4 mb-6">
                {["Return", "One way", "Multi-city"].map(type => {
                    const val = type.toLowerCase().replace(" ", "-");
                    const isActive = tripType === val;
                    return (
                        <button
                            key={val}
                            onClick={() => setTripType(val)}
                            className={`
                   text-lg transition-all relative pb-2
                   ${isActive ? "font-bold text-primary" : "text-gray-500 hover:text-gray-800"}
                 `}
                        >
                            {type}
                            {isActive && (
                                <span className="absolute bottom-[-17px] left-0 w-full h-1 bg-primary rounded-t-sm"></span>
                            )}
                        </button>
                    )
                })}
            </div>



            {/* Form Grid */}
            <div className="flex flex-col gap-4">
                {/* Multi-city Vs Standard View */}
                {tripType === "multi-city" ? (
                    <div className="flex flex-col gap-4">
                        {flights.map((flight, index) => (
                            <div key={index} className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-700 ml-1">Flight {index + 1}</label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                                    {/* Flight Origin */}
                                    <div className="flex flex-col">
                                        <label className="text-sm font-medium text-gray-700 mb-1">From</label>
                                        <input
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                            placeholder="City or Airport"
                                            value={flight.from}
                                            onChange={e => updateFlight(index, 'from', e.target.value)}
                                            list="airports-list"
                                        />
                                    </div>

                                    {/* Flight Destination */}
                                    <div className="flex flex-col">
                                        <label className="text-sm font-medium text-gray-700 mb-1">To</label>
                                        <input
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                            placeholder="City or Airport"
                                            value={flight.to}
                                            onChange={e => updateFlight(index, 'to', e.target.value)}
                                            list="airports-list"
                                        />
                                    </div>

                                    {/* Flight Date */}
                                    <div className="flex flex-col relative">
                                        <label className="text-sm font-medium text-gray-700 mb-1">Depart</label>
                                        <input
                                            type="date"
                                            value={flight.depart}
                                            onChange={e => updateFlight(index, 'depart', e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all cursor-pointer"
                                        />

                                        {/* Remove Button for Flight 3+ */}
                                        {index > 1 && (
                                            <button
                                                onClick={() => removeFlight(index)}
                                                className="absolute -right-2 -top-1 bg-white rounded-full p-1 shadow hover:bg-red-50 text-gray-400 hover:text-red-500"
                                                title="Remove flight"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="mt-1 mb-2">
                            <button onClick={addFlight} className="flex items-center gap-2 text-primary font-bold hover:underline">
                                <span className="text-xl leading-none" style={{ marginTop: "-2px" }}>+</span> Add a flight
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Origin */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">From</label>
                            <input
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="City or Airport"
                                value={from}
                                onChange={e => setFrom(e.target.value)}
                                list="airports-list"
                            />
                        </div>

                        {/* Destination */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">To</label>
                            <input
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="City or Airport"
                                value={to}
                                onChange={e => setTo(e.target.value)}
                                list="airports-list"
                            />
                        </div>

                        {/* Dates */}
                        <div className="flex gap-4">
                            <div className="flex-1 flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">Depart</label>
                                <input
                                    type="date"
                                    value={depart}
                                    onChange={e => setDepart(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all cursor-pointer"
                                />
                            </div>
                            {tripType === 'return' && (
                                <div className="flex-1 flex flex-col">
                                    <label className="text-sm font-medium text-gray-700 mb-1">Return</label>
                                    <input
                                        type="date"
                                        value={ret}
                                        onChange={e => setRet(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all cursor-pointer"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Row 2: PAX, Class, Button */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Passengers */}
                    <div className="flex flex-col relative z-20">
                        <label className="text-sm font-medium text-gray-700 mb-1">Passengers</label>
                        <div className="relative">
                            <div
                                onClick={() => setShowPassengerSelector(!showPassengerSelector)}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-white flex items-center justify-between cursor-pointer focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                <span className="text-gray-900">{passengers} Adult{passengers > 1 ? 's' : ''}</span>
                                <User className="w-4 h-4 text-gray-400" />
                            </div>

                            {showPassengerSelector && (
                                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-gray-900">Adults</span>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setPassengers(Math.max(1, passengers - 1))}
                                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
                                                disabled={passengers <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="font-bold w-4 text-center">{passengers}</span>
                                            <button
                                                onClick={() => setPassengers(Math.min(9, passengers + 1))}
                                                className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100 flex justify-end">
                                        <button onClick={() => setShowPassengerSelector(false)} className="text-primary font-bold hover:underline">Done</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Class */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Class</label>
                        <div className="relative">
                            <select
                                value={cabinClass}
                                onChange={(e) => setCabinClass(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none bg-white cursor-pointer"
                            >
                                <option>Economy Class</option>
                                <option>Premium Economy</option>
                                <option>Business Class</option>
                                <option>First Class</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* Red Search Button */}
                    <button
                        onClick={handleSearch}
                        className="bg-primary hover:bg-primary-600 text-white text-lg font-bold rounded shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 h-[60px]"
                    >
                        Search flights
                    </button>
                </div>
            </div>

            {/* Datalist for Inputs */}
            <datalist id="airports-list">
                {airports.map(a => <option key={a.code} value={a.code}>{a.city}</option>)}
            </datalist>

            {/* Promo Code Link */}

        </div>
    );
}

// Simple Chevron Icon Component if needed locally, or import
const ChevronDown = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
);
