'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface GenreCardProps {
  title: string
  image: string
  href: string
}

export function GenreCard({ title, image, href }: GenreCardProps) {
  return (
    <Link href={href}>
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="relative overflow-hidden rounded-lg"
      >
        <Image
          src={image}
          alt={title}
          width={200}
          height={100}
          className="aspect-video object-cover brightness-75 transition-all hover:brightness-100"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
      </motion.div>
    </Link>
  )
}

