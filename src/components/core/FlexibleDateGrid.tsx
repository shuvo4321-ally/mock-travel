"use client";

export default function FlexibleDateGrid() {
    // Mock data for the grid
    const dates = [
        { day: "Mon 23", price: 420, isLowest: false },
        { day: "Tue 24", price: 380, isLowest: true },
        { day: "Wed 25", price: 450, isLowest: false },
    ];

    return (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-b-lg border border-t-0 border-gray-200 shadow-xl p-4 z-50 animate-in fade-in slide-in-from-top-1">
            <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase">Flexible Dates</span>
                <span className="text-xs text-primary cursor-pointer hover:underline">View Month</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
                {dates.map((d) => (
                    <div
                        key={d.day}
                        className={`
              flex flex-col items-center justify-center p-2 rounded border cursor-pointer transition-colors
              ${d.isLowest ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-100 hover:bg-gray-100"}
            `}
                    >
                        <span className="text-xs text-gray-500 font-medium">{d.day}</span>
                        <span className={`text-sm font-bold ${d.isLowest ? "text-green-600" : "text-gray-900"}`}>
                            ${d.price}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
