import Link from 'next/link';
import NavLinks from '@/app/ui/nav-links';
import RahaLogo from '@/app/ui/raha-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import styles from '@/app/ui/Texture.module.css';


export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 md:px-2 relative" style={{ backgroundColor: '#5d552f' }}>
      <div className={`${styles.texture} absolute inset-0`}></div>
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