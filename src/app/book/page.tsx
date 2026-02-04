"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, ChevronRight, User, CreditCard, Shield, Plane } from "lucide-react";

export default function BookingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: "Mr",
        firstName: "",
        lastName: "",
        dob: "",
        nationality: "",
        passport: "",
        expiry: "",
        email: "",
        phone: "",
        insurance: false,
        bags: 0,
    });

    const handleInputChange = (field: string, value: string | boolean | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (step < 2) {
            setStep(step + 1);
            window.scrollTo(0, 0);
        } else {
            // Submit Booking
            setIsLoading(true);
            setTimeout(() => {
                const bookingRef = `UGS-${Math.floor(Math.random() * 900000) + 100000}`;
                const queryParams = new URLSearchParams({
                    ref: bookingRef,
                    name: `${formData.firstName} ${formData.lastName}`,
                    price: "1250",
                });
                router.push(`/confirmation?${queryParams.toString()}`);
            }, 2000);
        }
    };

    const steps = [
        { number: 1, title: "Passengers" },
        { number: 2, title: "Add-ons" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12 relative mt-16">
            {/* mt-16 to account for the absolute header if needed, strictly speaking the header is absolute top-0 so we might need padding-top */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Stepper */}
                <div className="mb-12 max-w-3xl mx-auto">
                    <div className="flex items-center justify-between relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-gray-200 -z-10"></div>
                        {steps.map((s) => (
                            <div key={s.number} className="flex flex-col items-center bg-gray-50 px-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all shadow-sm ${step >= s.number ? 'bg-secondary text-white ring-4 ring-gray-50' : 'bg-gray-200 text-gray-400'}`}>
                                    {step > s.number ? <Check className="w-5 h-5" /> : s.number}
                                </div>
                                <span className={`text-xs font-bold uppercase tracking-wider ${step >= s.number ? 'text-secondary' : 'text-gray-400'}`}>
                                    {s.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* Left: Forms */}
                    <div className="flex-1 w-full space-y-6">

                        {/* Step 1: Passenger */}
                        {step === 1 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                                <div className="bg-white p-8 rounded border border-gray-200 shadow-sm">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3 pb-4 border-b border-gray-100">
                                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                                            <User className="w-5 h-5" />
                                        </div>
                                        Adult 1 (Primary Contact)
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase">Title</label>
                                            <select
                                                className="w-full h-12 px-4 rounded border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                                                value={formData.title}
                                                onChange={(e) => handleInputChange("title", e.target.value)}
                                            >
                                                <option>Mr</option>
                                                <option>Mrs</option>
                                                <option>Ms</option>
                                                <option>Dr</option>
                                            </select>
                                        </div>
                                        <div className="hidden md:block"></div>

                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase">First Name</label>
                                            <input
                                                className="w-full h-12 px-4 rounded border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                                                placeholder="e.g. John"
                                                value={formData.firstName}
                                                onChange={(e) => handleInputChange("firstName", e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase">Last Name</label>
                                            <input
                                                className="w-full h-12 px-4 rounded border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                                                placeholder="e.g. Doe"
                                                value={formData.lastName}
                                                onChange={(e) => handleInputChange("lastName", e.target.value)}
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase">Nationality</label>
                                            <input
                                                className="w-full h-12 px-4 rounded border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                                                placeholder="e.g. United Kingdom"
                                                value={formData.nationality}
                                                onChange={(e) => handleInputChange("nationality", e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase">Date of Birth</label>
                                            <input
                                                type="date"
                                                className="w-full h-12 px-4 rounded border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                                                value={formData.dob}
                                                onChange={(e) => handleInputChange("dob", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-8 rounded border border-gray-200 shadow-sm">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Contact Details</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1 md:col-span-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                                            <input
                                                type="email"
                                                className="w-full h-12 px-4 rounded border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange("email", e.target.value)}
                                            />
                                            <p className="text-xs text-gray-500">Your booking confirmation will be sent here.</p>
                                        </div>
                                        <div className="space-y-1 md:col-span-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
                                            <input
                                                type="tel"
                                                className="w-full h-12 px-4 rounded border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                                                placeholder="+44 7000 000000"
                                                value={formData.phone}
                                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Add-ons */}
                        {step === 2 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                                <div className="bg-white p-8 rounded border border-gray-200 shadow-sm">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Baggage</h2>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 border rounded bg-gray-50/50">
                                            <div>
                                                <h4 className="font-bold text-gray-900">Cabin Bag</h4>
                                                <p className="text-sm text-gray-500">1x 7kg Carry-on Included</p>
                                            </div>
                                            <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded">FREE</span>
                                        </div>

                                        <label className={`flex items-center justify-between p-4 border rounded cursor-pointer transition-all ${formData.bags === 1 ? 'border-primary bg-primary-50' : 'hover:bg-gray-50'}`}>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    className="w-5 h-5 text-primary rounded focus:ring-primary"
                                                    checked={formData.bags === 1}
                                                    onChange={() => handleInputChange("bags", formData.bags === 1 ? 0 : 1)}
                                                />
                                                <div>
                                                    <h4 className="font-bold text-gray-900">23kg Checked Bag</h4>
                                                    <p className="text-sm text-gray-500">Best value for long haul</p>
                                                </div>
                                            </div>
                                            <span className="font-bold text-gray-900">+$65.00</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="bg-white p-8 rounded border border-gray-200 shadow-sm">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 pb-4 border-b border-gray-100">
                                        Travel Insurance
                                        <Shield className="w-5 h-5 text-green-600" />
                                    </h2>
                                    <label className={`flex gap-4 p-4 border rounded cursor-pointer transition-all ${formData.insurance ? 'border-green-500 bg-green-50' : 'hover:bg-gray-50'}`}>
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 text-green-600 rounded focus:ring-green-500 mt-1"
                                            checked={formData.insurance}
                                            onChange={(e) => handleInputChange("insurance", e.target.checked)}
                                        />
                                        <div>
                                            <h4 className="font-bold text-gray-900">Comprehensive Coverage</h4>
                                            <p className="text-sm text-gray-600 mt-1 mb-2">Medical expenses, Cancellation, Lost Baggage protection.</p>
                                            <p className="font-bold text-green-700">+$45.00</p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex justify-between pt-4">
                            {step > 1 ? (
                                <button
                                    onClick={() => setStep(step - 1)}
                                    className="text-gray-500 font-bold hover:text-gray-900 px-6 py-3"
                                >
                                    Back
                                </button>
                            ) : <div></div>}

                            <button
                                onClick={handleNext}
                                disabled={isLoading}
                                className="bg-primary hover:bg-primary-600 text-white font-bold py-3 px-8 rounded flex items-center gap-2 shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
                            >
                                {isLoading ? "Processing..." : step === 2 ? "Confirm Booking" : "Continue"}
                                {!isLoading && step < 2 && <ChevronRight className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Right: Summary */}
                    <div className="w-full lg:w-96 sticky top-24">
                        <div className="bg-white p-6 rounded border border-gray-200 shadow-sm">
                            <h3 className="font-bold text-gray-900 uppercase tracking-wider text-sm mb-4 border-b border-gray-100 pb-4">Trip Summary</h3>

                            <div className="flex items-center justify-between mb-6">
                                <div className="text-center">
                                    <span className="block text-3xl font-black text-gray-900">LHR</span>
                                    <span className="text-xs text-gray-500 font-bold uppercase">London</span>
                                </div>
                                <Plane className="w-5 h-5 text-gray-300" />
                                <div className="text-center">
                                    <span className="block text-3xl font-black text-gray-900">DXB</span>
                                    <span className="text-xs text-gray-500 font-bold uppercase">Dubai</span>
                                </div>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-gray-100">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Flight Fare</span>
                                    <span className="font-bold text-gray-900">Approx $1,250.00</span>
                                </div>
                                {formData.bags > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Extra Baggage</span>
                                        <span className="font-bold text-gray-900">Approx $65.00</span>
                                    </div>
                                )}
                                {formData.insurance && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Insurance</span>
                                        <span className="font-bold text-gray-900">Approx $45.00</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-4">
                                    <span className="font-bold text-secondary">TOTAL (Approx)</span>
                                    <span className="font-black text-3xl text-primary">
                                        ${1250 + (formData.insurance ? 45 : 0) + (formData.bags * 65)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
