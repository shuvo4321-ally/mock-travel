"use client";

import FlightSearchForm from "@/components/core/FlightSearchForm";

export default function Home() {

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Immersive Hero Section */}
            <section className="relative h-[600px] w-full bg-secondary">
                {/* Background Image - High Quality Aircraft Tail/Sky */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2600&auto=format&fit=crop"
                        alt="Aviation Background"
                        className="w-full h-full object-cover opacity-60"
                    />
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-transparent"></div>
                </div>

                <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full pb-20">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 max-w-3xl leading-tight">
                        The World, <br />
                        <span className="text-primary">Within Reach.</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-xl font-light">
                        Professional flight booking for the modern traveler.
                        Precision, speed, and confidence in every journey.
                    </p>
                </div>
            </section>

            {/* Floating Command Center Search */}
            <div className="max-w-6xl mx-auto w-full px-4 -mt-32 relative z-20">
                <FlightSearchForm />
            </div>

            {/* Content Section - Value Props */}
            <section className="max-w-7xl mx-auto px-4 py-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="flex flex-col gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-secondary">Fastest Routing</h3>
                        <p className="text-gray-500 leading-relaxed">Our advanced algorithm finds the most direct connections to save you valuable travel time.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-secondary">Secure Booking</h3>
                        <p className="text-gray-500 leading-relaxed">Bank-grade encryption handles your data. We partner directly with 400+ airlines.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-secondary">Global Coverage</h3>
                        <p className="text-gray-500 leading-relaxed">From major hubs to remote airstrips, if a plane lands there, we can get you there.</p>
                    </div>
                </div>
            </section>

        </div>
    );
}
