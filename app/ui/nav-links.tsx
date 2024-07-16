'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PhoneIcon, DocumentTextIcon, HomeIcon } from '@heroicons/react/24/outline';

const links = [
  { name: 'Home', href: '/home', icon: HomeIcon },
  { name: 'Calls', href: '/calls', icon: PhoneIcon },
  { name: 'Weekly Summaries', href: '/weekly-summaries', icon: DocumentTextIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center px-4 py-3 my-1 rounded-md transition-colors duration-200 ${
              isActive
                ? 'bg-[#716949] text-[#F0E6D2]'
                : 'text-[#D1C4A9] hover:bg-[#716949] hover:text-[#F0E6D2]'
            }`}
          >
            <LinkIcon className={`w-5 h-5 mr-3 ${isActive ? 'text-[#F0E6D2]' : 'text-[#D1C4A9]'}`} />
            <span className="text-sm font-medium">{link.name}</span>
          </Link>
        );
      })}
    </>
  );
}