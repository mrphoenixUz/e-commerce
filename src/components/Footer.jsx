import React from "react";

const Footer = () => {
    return (
        <footer className="bg-black text-white py-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
                <div>
                    <h2 className="font-bold text-xl mb-6">Exclusive</h2>
                    <p className="mb-4 text-base font-normal">Subscribe</p>
                    <p className="mb-4 text-base font-normal">Get 10% off your first order</p>
                    <div className="flex items-center rounded border-[1.5px] border-[#FAFAFA] overflow-hidden">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-transparent px-3 py-3 text-sm outline-none placeholder:opacity-80"
                        />
                        <button className="">
                            <img src="./send-icon.svg" alt="Submit" width={24} height={24} />
                        </button>
                    </div>
                </div>

                <div>
                    <h2 className="font-bold text-xl mb-6">Support</h2>
                    <ul className="text-base font-normal flex flex-col">
                        <li>111 Bijoy sarani, Dhaka,</li>
                        <li>DH 1515, Bangladesh.</li>
                        <li className="my-4">exclusive@gmail.com</li>
                        <li>+88015-88888-9999</li>
                    </ul>
                </div>

                <div>
                    <h2 className="font-medium text-xl mb-6">Account</h2>
                    <ul className="text-base font-normal flex flex-col gap-4">
                        <li>
                            <a href="#" className="hover:underline">
                                My Account
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Login / Register
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Cart
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Wishlist
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Shop
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 className="font-medium text-xl mb-6">Quick Link</h2>
                    <ul className="text-base font-normal flex flex-col gap-4">
                        <li>
                            <a href="#" className="hover:underline">
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Terms Of Use
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                FAQ
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 className="font-bold text-xl mb-4">Download App</h2>
                    <p className="mb-4 text-xs font-medium opacity-70">Save $3 with App New User Only</p>
                    <div className="flex gap-3 text-center">
                        <img
                            src="./qr-code.svg"
                            alt="QR Code"
                            className="mb-4 w-24 h-24"
                        />
                        <div className="flex gap-2 flex-col">
                            <img
                                src="./google-play.png"
                                alt="Google Play"
                                className="w-32 h-10"
                            />
                            <img
                                src="./app-store.png"
                                alt="App Store"
                                className="w-32 h-10"
                            />
                        </div>
                    </div>
                    <div className="flex space-x-4 mt-6">
                        <a href="https://facebook.com">
                            <img src="./facebook.svg" alt="Facebook" className="w-6 h-6" />
                        </a>
                        <a href="https://x.com">
                            <img src="./twitter.svg" alt="Twitter" className="w-6 h-6" />
                        </a>
                        <a href="https://instagram.com">
                            <img src="./instagram.svg" alt="Instagram" className="w-6 h-6" />
                        </a>
                        <a href="https://linkedin.com">
                            <img src="./linkedin.svg" alt="LinkedIn" className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-12 border-t border-gray-700 opacity-45 pt-6 text-center text-sm">
                © Copyright Rimel 2022. All right reserved.
            </div>
        </footer>
    );
};

export default Footer;
