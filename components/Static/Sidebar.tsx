'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiSearch, FiHome, FiList, FiCalendar, FiMusic, FiSettings, FiHelpCircle } from 'react-icons/fi'
import { FaDiscord } from 'react-icons/fa'

const sidebarItems = [
  { icon: FiSearch, label: 'Find', href: '/find' },
  { icon: FiHome, label: 'Home', href: '/' },
  { icon: FiList, label: 'Explore', href: '/explore' },
  { icon: FiCalendar, label: 'This Week', href: '/calendar' },
]

const bottomItems = [
  { icon: FiSettings, label: 'Settings', href: '/user/settings' },
  { icon: FiHelpCircle, label: 'Help', href: '/help' },
  { icon: FaDiscord, label: 'Discord', href: '/discord' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <motion.aside 
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 z-40 flex h-screen w-16 flex-col bg-black/10 backdrop-blur-md"
    >
      <Link href="/" className="flex h-16 items-center justify-center">
        <h1 className="text-xl font-bold text-white">V</h1>
      </Link>
      
      <nav className="flex flex-1 flex-col items-center gap-4 pt-4">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`group relative rounded-lg p-2 hover:bg-white/10 ${
              pathname === item.href ? 'bg-white/10' : ''
            }`}
          >
            <item.icon className="h-6 w-6 text-white" />
            <span className="absolute left-12 ml-2 hidden rounded-md bg-black/80 px-2 py-1 text-sm text-white group-hover:block">
              {item.label}
            </span>
          </Link>
        ))}
      </nav>

      <div className="flex flex-col items-center gap-4 pb-8">
        {bottomItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group relative rounded-lg p-2 hover:bg-white/10"
          >
            <item.icon className="h-6 w-6 text-white" />
            <span className="absolute left-full ml-2 hidden rounded-md bg-black/80 px-2 py-1 text-sm text-white group-hover:block">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </motion.aside>
  )
}

