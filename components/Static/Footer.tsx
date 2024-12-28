import React from 'react';
import { FaGithub, FaDiscord } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Vicktor
            </h3>
            <p className="text-sm sm:text-base text-gray-400">
              Building amazing web experiences with cutting-edge technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm sm:text-base hover:underline decoration-primary transition-all duration-300">
                  Home
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/legal/tos" className="text-sm sm:text-base hover:underline decoration-primary transition-all duration-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-sm sm:text-base hover:underline decoration-primary transition-all duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/cookie" className="text-sm sm:text-base hover:underline decoration-primary transition-all duration-300">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-3 sm:space-y-4 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold">Connect</h4>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a href="https://github.com/VicktorOSS" target="_blank" rel="noopener noreferrer" 
                className="hover:scale-110 hover:text-primary transition-all duration-300 text-xl sm:text-2xl">
                <FaGithub />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer"
                className="hover:scale-110 hover:text-primary transition-all duration-300 text-xl sm:text-2xl">
                <FaDiscord />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center text-gray-400 space-y-4 sm:space-y-0">
          <p className="hover:text-primary transition-all duration-300 text-center sm:text-left text-sm sm:text-base">
            Made with ❤️ Powered by RSenterprises
          </p>
          <p className="text-center sm:text-left text-sm sm:text-base">&copy; 2024 RSenterprises. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;