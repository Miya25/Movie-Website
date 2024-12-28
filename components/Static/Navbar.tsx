import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import Link from 'next/link';
import {
  FaChevronDown,
  FaUser,
  FaFingerprint,
  FaUserCog,
  FaFileContract,
  FaShieldAlt,
  FaCookieBite,
  FaPalette,
  FaChevronRight,
  FaBars,
  FaPlus,
} from 'react-icons/fa';
import { useState } from 'react';

const menuItems = [
  { name: 'Profile', description: 'View your profile', href: '/user/', icon: FaUser },
  { name: 'Security Settings', description: 'Manage your security settings', href: '/user/settings/security', icon: FaShieldAlt },
  { name: 'Privacy Settings', description: 'Control your privacy preferences', href: '/user/settings/privacy', icon: FaFingerprint },
  { name: 'Profile Settings', description: 'Update your profile settings', href: '/user/settings/general', icon: FaUserCog },
  { name: 'TOS', description: 'Read our terms of service', href: '/legal/tos', icon: FaFileContract },
  { name: 'Privacy Policy', description: 'Understand our privacy policy', href: '/legal/privacy', icon: FaShieldAlt },
  { name: 'Cookie Policy', description: 'Learn about our cookie policy', href: '/legal/cookie', icon: FaCookieBite },
];

interface MenuItem {
  name: string;
  description: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

function MobileMenu({ items }: { items: MenuItem[] }) {
  return (
    <div className="w-80 border border-gray-800 overflow-hidden rounded-xl backdrop-blur-sm shadow-lg">
      <div className="p-4">
        {items.map((item) => (
          <div key={item.name} className="group relative flex items-center gap-x-4 rounded-lg p-3 hover:bg-gray-800/80 transition-all">
            <div className="flex w-10 h-10 flex-none items-center justify-center rounded-lg bg-gray-800 group-hover:bg-indigo-600/20">
              <item.icon aria-hidden="true" className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300" />
            </div>
            <div>
              <a href={item.href} className="font-medium text-white text-sm">
                {item.name}
                <span className="absolute inset-0" />
              </a>
              <p className="text-gray-400 text-xs">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DesktopMenu({ items }: { items: MenuItem[] }) {
  return (
    <div className="w-80 border border-primary overflow-hidden rounded-xl bg-black shadow-lg">
      <div className="p-4">
        {items.map((item) => (
          <div key={item.name} className="group relative flex items-center gap-x-4 rounded-lg p-3 hover:bg-gray-800/80 transition-all">
            <div className="flex w-10 h-10 flex-none items-center justify-center rounded-lg bg-gray-800">
              <item.icon aria-hidden="true" className="w-5 h-5 text-primary group-hover:text-primary" />
            </div>
            <div className="flex-1">
              <a href={item.href} className="font-medium text-white text-sm">
                {item.name}
                <span className="absolute inset-0" />
              </a>
              <p className="text-white text-xs">{item.description}</p>
            </div>
            <FaChevronRight className="w-5 h-5 text-primary" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const avatarUrl = `https://api.dicebear.com/6.x/avataaars/svg?seed=${Math.random()}`;

  return (
    <div className="top-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm py-4">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center justify-between w-full">
          <Link href="/">
            <span className="inline-flex items-center gap-x-2 text-xl font-semibold dark:text-white">
              <span>
                VickTor
                </span>
            </span>
          </Link>
          <Popover className="sm:hidden">
            <PopoverButton className="text-white">
              <FaBars className="w-6 h-6" />
            </PopoverButton>
            <PopoverPanel className="absolute right-0 z-10 mt-5 w-80 px-4">
              <MobileMenu items={menuItems} />
            </PopoverPanel>
          </Popover>
        </div>
        <div className="hidden sm:flex sm:items-center sm:gap-4">
          {isLoggedIn ? (
            <Popover className="relative">
              <PopoverButton className="inline-flex items-center">
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full hover:ring-2 hover:ring-indigo-600"
                />
                <FaChevronDown className="w-6 h-6 ml-2 text-white" />
              </PopoverButton>
              <PopoverPanel className="absolute right-0 z-10 mt-5">
                <DesktopMenu items={menuItems} />
              </PopoverPanel>
            </Popover>
          ) : (
            <Link href="/login" className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
