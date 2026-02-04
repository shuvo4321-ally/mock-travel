import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "UGS Travels - Premium Flight Booking",
    description: "Book your next adventure with UGS Travels.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={outfit.className}>
                <div className="min-h-screen flex flex-col bg-gray-50 relative">
                    <header className="bg-white border-b border-gray-200 shadow-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {/* Logo Image */}
                                <Link href="/" className="h-24 w-auto flex items-center justify-center overflow-hidden cursor-pointer">
                                    <img src="/logo-new.png" alt="UGS Travels" className="h-full object-contain" />
                                </Link>
                            </div>
                            {/* Navigation removed as this is a dedicated flight app */}
                        </div>
                    </header>
                    <main className="flex-grow">
                        {children}
                    </main>
                    <footer className="bg-gray-900 text-white py-12">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                <div>
                                    <h3 className="text-lg font-bold mb-4">SkyFly</h3>
                                    <p className="text-gray-400 text-sm">
                                        Your trusted partner for seamless travel experiences.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-4">Company</h4>
                                    <ul className="space-y-2 text-sm text-gray-400">
                                        <li><a href="#" className="hover:text-white">About Us</a></li>
                                        <li><a href="#" className="hover:text-white">Careers</a></li>
                                        <li><a href="#" className="hover:text-white">Press</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-4">Support</h4>
                                    <ul className="space-y-2 text-sm text-gray-400">
                                        <li><a href="#" className="hover:text-white">Help Center</a></li>
                                        <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                                        <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-4">Connect</h4>
                                    <div className="flex gap-4">
                                        {/* Social icons would go here */}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                                &copy; {new Date().getFullYear()} SkyFly. All rights reserved.
                            </div>
                        </div>
                    </footer>
                </div>
            </body>
        </html>
    );
}
