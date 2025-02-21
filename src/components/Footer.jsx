import { GitHub, Instagram, LinkedIn, Telegram } from "@mui/icons-material";
import Link from "next/link";
import React from "react";

const Footer = () => {
    const social_media = [
        { key: 1, link: "https://instagram.com/mrphoenixuz", icon: <Instagram /> },
        { key: 2, link: "https://t.me/Fenix_Qaqnus", icon: <Telegram />  },
        { key: 3, link: "https://www.linkedin.com/in/karimov-muhammadyahyo-60b2a3315/", icon: <LinkedIn /> },
        { key: 4, link: "https://github.com/mrphoenixUz", icon: <GitHub /> },   
      ];
    return (
        <footer className="bg-black text-white py-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h2 className="font-bold text-xl mb-6">Phoenix</h2>
                    <p className="mb-4 text-base font-normal">Subscribe</p>
                    {/* <div className="flex items-center rounded border-[1.5px] border-[#FAFAFA] overflow-hidden">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-transparent px-3 py-3 text-sm outline-none placeholder:opacity-80"
                        />
                        <button className="">
                            <img src="./send-icon.svg" alt="Submit" width={24} height={24} />
                        </button>
                    </div> */}
                </div>

                <div>
                    <h2 className="font-bold text-xl mb-6">Support</h2>
                    <ul className="text-base font-normal flex flex-col">
                        <li>Uzbekistan, Fergana</li>
                        <li>Najot ta'limda</li>
                        <li className="my-4">karimovmoff@gmail.com</li>
                        <li>+998 90 409 36 55</li>
                    </ul>
                </div>

                <div>
                    <h2 className="font-medium text-xl mb-6">Account</h2>
                    <ul className="text-base font-normal flex flex-col gap-4">
                        <li><Link href={'/account'} className="hover:underline">My account</Link></li>
                        <li><Link href={'/login'} className="hover:underline">Login</Link></li>
                        <li><Link href={'/register'} className="hover:underline">Register</Link></li>
                        <li><Link href={'/cart'} className="hover:underline">Cart</Link></li>
                        <li><Link href={'/wishlist'} className="hover:underline">Wishlist</Link></li>
                        <li><Link href={'/products'} className="hover:underline">Shop</Link></li>
                    </ul>
                </div>

                <div>
                    <h2 className="font-bold text-xl mb-4">Download App</h2>
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
                        {social_media?.map((media) => (
                            <div
                                key={media.key}
                                className="hover:text-orange-600 cursor-pointer"
                            >
                                <a href={media.link} target="_blank">
                                    {media.icon}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-12 border-t border-gray-700 opacity-45 pt-6 text-center text-sm">
                © Copyright Phoenix 2022. All right reserved.
            </div>
        </footer>
    );
};

export default Footer;
