import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import NavItems from './NavItems';
import { getSignInUrl, withAuth } from '@workos-inc/authkit-nextjs';

const Navbar = async () => {
  const { user } = await withAuth();
  const signInUrl = await getSignInUrl();
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
          <button className="btn-signin">
            <Link href={signInUrl}>Sign In</Link>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
