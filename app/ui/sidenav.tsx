import Link from 'next/link';
import NavLinks from '@/app/ui/nav-links';
import RahaLogo from '@/app/ui/raha-logo';
import { PowerIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  const textureStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23ffffff' fill-opacity='0.1' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
    backgroundRepeat: 'repeat' as const,
    opacity: 0.2,
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none' as const,
  };

  return (
    <div className="flex h-full flex-col px-3 md:px-2 relative" style={{ backgroundColor: '#5d552f' }}>
      <div style={textureStyle}></div>
      <Link
        className="flex h-16 items-center justify-center rounded-md relative z-10"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <RahaLogo colorScheme='balanced' showIcon={true} />
        </div>
      </Link>
      <div className="flex grow py-12 px-4 flex-col space-y-2 relative z-10">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
      </div>
    </div>
  );
}