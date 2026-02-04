"use client";

import { Flight } from "@/lib/mockData";
import { ChevronDown, Briefcase, Info, Clock, MapPin } from "lucide-react";
import { PriceService } from "@/lib/priceService";
import { useState, useEffect } from "react";

interface FlightStripProps {
    flight: Flight;
    onSelect: (id: string) => void;
}

export default function FlightStrip({ flight, onSelect }: FlightStripProps) {
    const [displayPrice, setDisplayPrice] = useState(flight.price);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        // Hydration safe price fetch
        const p = PriceService.getPrice(flight.id, flight.price);
        setDisplayPrice(p);
    }, [flight.id, flight.price]);

    const toggleDetails = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200 mb-3 group">
            <div className="p-4 flex flex-col md:flex-row items-center gap-4 md:gap-8">

                {/* Airline - Fixed Width */}
                <div className="w-full md:w-48 flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center">
                        <img src={flight.airlineLogo} alt={flight.airline} className="max-w-full max-h-full object-contain" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-sm">{flight.airline}</h4>
                        <p className="text-xs text-gray-500">{flight.flightNumber}</p>
                    </div>
                </div>

                {/* Schedule & Route - Flex Grow */}
                <div className="flex-1 w-full grid grid-cols-3 items-center text-center">
                    <div className="text-left">
                        <p className="text-xl font-black text-gray-900">{flight.departure.time}</p>
                        <p className="text-xs font-bold text-gray-500">{flight.departure.code}</p>
                    </div>

                    <div className="flex flex-col items-center px-4">
                        <p className="text-xs text-gray-500 font-medium mb-1">{flight.duration}</p>
                        <div className="w-full flex items-center gap-1">
                            <div className="h-[2px] w-full bg-gray-200 relative">
                                {flight.stops > 0 && (
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border-2 border-red-500 bg-white"></div>
                                )}
                            </div>
                        </div>
                        <p className={`text-xs font-bold mt-1 ${flight.stops === 0 ? "text-green-600" : "text-red-500"}`}>
                            {flight.stops === 0 ? "Direct" : `${flight.stops} Stop`}
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-xl font-black text-gray-900">{flight.arrival.time}</p>
                        <p className="text-xs font-bold text-gray-500">{flight.arrival.code}</p>
                    </div>
                </div>

                {/* Separator */}
                <div className="hidden md:block w-px h-12 bg-gray-100 mx-2"></div>

                {/* Price & Action - Fixed Width */}
                <div className="w-full md:w-48 flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end gap-3 md:gap-1">
                    <div className="text-right">
                        <p className="text-xs text-gray-400">per adult</p>
                        <p className="text-2xl font-black text-primary">${displayPrice}</p>
                    </div>

                    <button
                        onClick={() => onSelect(flight.id)}
                        className="bg-secondary text-white font-bold py-2 px-6 rounded hover:bg-black/80 text-sm transition-colors"
                    >
                        Select
                    </button>
                </div>
            </div>

            {/* Footer / Expand */}
            <div
                className="bg-gray-50 border-t border-gray-100 px-4 py-2 flex justify-between items-center text-xs text-gray-500 rounded-b-lg cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={toggleDetails}
            >
                <div className="flex gap-4">
                    <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> Included: 23kg Bag</span>
                    <span className="flex items-center gap-1 text-primary underline decoration-dotted"><Info className="w-3 h-3" /> Flight Details</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
            </div>

            {/* Expanded Details - Timeline */}
            {isExpanded && (
                <div className="border-t border-gray-100 p-4 bg-gray-50 animate-in slide-in-from-top-2 duration-200">
                    <div className="space-y-6">

                        {/* Segment 1 */}
                        <div className="relative pl-6 border-l-2 border-gray-200 ml-2 space-y-6">
                            {/* Departure */}
                            <div className="relative">
                                <span className="absolute -left-[31px] bg-white border-2 border-gray-300 w-4 h-4 rounded-full"></span>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-lg font-bold text-gray-900">{flight.departure.time}</p>
                                        <p className="text-sm text-gray-600">{flight.departure.city} ({flight.departure.code})</p>
                                        <p className="text-xs text-gray-400 mt-1">Terminal 5</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-medium text-gray-900">{flight.airline}</p>
                                        <p className="text-xs text-gray-500">{flight.flightNumber} • Boeing 777</p>
                                    </div>
                                </div>
                            </div>

                            {/* Duration / Flight Info */}
                            <div className="py-2">
                                <div className="flex items-center gap-2 text-xs text-gray-500 bg-white border border-gray-200 rounded px-2 py-1 w-fit">
                                    <Clock className="w-3 h-3" />
                                    <span>Duration: {flight.duration}</span>
                                </div>
                            </div>

                            {/* Stopover (if any) or Arrival */}
                            {flight.stops > 0 && (
                                <div className="relative pb-6">
                                    <span className="absolute -left-[31px] top-1 bg-yellow-100 border-2 border-yellow-400 w-4 h-4 rounded-full"></span>
                                    <div className="bg-yellow-50 border border-yellow-100 rounded p-3 text-xs text-yellow-800 mb-4">
                                        <p className="font-bold mb-1">Layover in Munich (MUC)</p>
                                        <p>2h 15m Change of planes</p>
                                    </div>
                                </div>
                            )}

                            {/* Arrival */}
                            <div className="relative">
                                <span className="absolute -left-[31px] bg-gray-900 border-2 border-gray-900 w-4 h-4 rounded-full"></span>
                                <div>
                                    <p className="text-lg font-bold text-gray-900">{flight.arrival.time}</p>
                                    <p className="text-sm text-gray-600">{flight.arrival.city} ({flight.arrival.code})</p>
                                    <p className="text-xs text-gray-400 mt-1">Terminal 3</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
