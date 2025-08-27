'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from '@workos-inc/authkit-nextjs';
import Image from 'next/image';
import ManageUser from './ManageUser';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { capitalizeAndCrop } from '@/lib/utils';

const ManageProfile = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false);

  const initials =
    capitalizeAndCrop(user?.firstName || '', 1) +
    capitalizeAndCrop(user?.lastName || '', 1);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="ring-3 ring-green-500 ring-offset-2 ring-offset-background cursor-pointer">
          <AvatarImage src={user?.profilePictureUrl || 'fallback'} alt="logo" />
          <AvatarFallback className="bg-green-500 text-white font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button className="flex w-full " onClick={() => setIsOpen(true)}>
            Profile{' '}
            <DropdownMenuShortcut>
              <Image
                src={'/icons/settings.svg'}
                alt="logo"
                width={20}
                height={20}
              />
            </DropdownMenuShortcut>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            onClick={async () => {
              await signOut();
            }}
            className="flex w-full ">
            Logout{' '}
            <DropdownMenuShortcut>
              <Image
                src={'/icons/exit.svg'}
                alt="logout"
                width={18}
                height={18}
              />
            </DropdownMenuShortcut>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
      <ManageUser isOpen={isOpen} setIsOpen={setIsOpen} user={user} />
    </DropdownMenu>
  );
};

export default ManageProfile;
