"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle, MessageCircle, Share2, Printer, Home } from "lucide-react";
import Link from "next/link";

export default function ConfirmationPage() {
    const searchParams = useSearchParams();
    const [bookingDetails, setBookingDetails] = useState<any>(null);

    const ref = searchParams.get("ref") || "SKY-892341";
    const name = searchParams.get("name") || "John Doe";
    const price = searchParams.get("price") || "1250";

    // WhatsApp Config
    const WHATSAPP_NUMBER = "8801630431664"; // Configurable Number

    useEffect(() => {
        // In reality, fetch from API
        setBookingDetails({
            ref,
            passenger: name,
            total: price,
            flight: "LHR - DXB",
            date: "Tue, 24 Oct"
        });
    }, [ref, name, price]);

    const handleWhatsAppRedirect = () => {
        if (!bookingDetails) return;

        const message = `
*Confirm My Booking* ✈️
        
*Reference:* ${bookingDetails.ref}
*Passenger:* ${bookingDetails.passenger}
*Flight:* ${bookingDetails.flight}
*Date:* ${bookingDetails.date}
*Total Price:* $${bookingDetails.total}

Please finalize my booking and send tickets.
        `.trim();

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        window.open(whatsappUrl, "_blank");
    };

    const handlePrint = () => {
        window.print();
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My Flight Booking',
                    text: `Checking out this flight to DXB! Ref: ${ref}`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Booking link copied to clipboard!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

                {/* Success Header */}
                <div className="bg-green-600 p-8 text-center text-white">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Booking Initiated!</h1>
                    <p className="text-green-100 font-medium">Reference: <span className="font-mono bg-white/10 px-2 py-0.5 rounded ml-1">{ref}</span></p>
                </div>

                <div className="p-8">
                    <p className="text-gray-600 text-center mb-8 text-lg">
                        Your flight details have been received. To instantly confirm your ticket and receive your boarding pass, please simple complete the process via WhatsApp.
                    </p>

                    {/* Action Area - The Critical Requirement */}
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 text-center print:hidden">
                        <h3 className="text-green-800 font-bold text-lg mb-2">Instant Confirmation</h3>
                        <p className="text-green-600 mb-6 text-sm">Click below to open a pre-filled chat with our agent.</p>

                        <button
                            onClick={handleWhatsAppRedirect}
                            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] shadow-lg shadow-green-500/30"
                        >
                            <MessageCircle className="w-6 h-6" />
                            Complete Booking on WhatsApp
                        </button>
                        <p className="text-xs text-gray-400 mt-3">Opens WhatsApp Web or App</p>
                    </div>

                    {/* Summary Card */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8">
                        <h3 className="font-bold text-gray-900 border-b border-gray-200 pb-3 mb-4 uppercase text-xs tracking-wider">Booking Summary</h3>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Passenger Name</span>
                                <span className="font-medium text-gray-900">{name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Flight Route</span>
                                <span className="font-medium text-gray-900">LHR (London) → DXB (Dubai)</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Travel Date</span>
                                <span className="font-medium text-gray-900">Tue, 24 Oct 2023</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                                <span className="font-bold text-gray-700">Total Amount</span>
                                <span className="font-bold text-primary text-lg">Approx ${price}</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex justify-center gap-4 print:hidden">
                        <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium text-sm px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Home className="w-4 h-4" /> Return Home
                        </Link>
                        <button onClick={handleShare} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium text-sm px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Share2 className="w-4 h-4" /> Share
                        </button>
                        <button onClick={handlePrint} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium text-sm px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Printer className="w-4 h-4" /> Print
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
