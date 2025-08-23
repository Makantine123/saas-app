import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import NavItems from './NavItems';
import { withAuth } from '@workos-inc/authkit-nextjs';

const Navbar = async () => {
  const { user } = await withAuth();
  console.log(user);

  return (
    <nav className="navbar">
      <Link href={'/'}>
        <div className="flex items-center gap-2.5 cursor-pointer">
          <Image src={'/images/logo.svg'} alt="logo" width={46} height={44} />
        </div>
      </Link>
      <div
        className="
          flex items-center gap-8">
        <NavItems />

        {user ? (
          <button>Profle</button>
        ) : (
          <button className="btn-signin">Sign In</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
