'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { useState } from 'react';
import { Spinner } from './ui/shadcn-io/spinner';
import {
  getKindeServerSession,
  withAuth,
  LoginLink,
} from '@kinde-oss/kinde-auth-nextjs/server';

const ManageUser = ({
  isOpen,
  setIsOpen,
  user,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  user: User;
}) => {
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (!user) return;

      const userObject = {
        userId: user.id,
        firstName: firstName,
        lastName: lastName,
      };

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex flex-row items-center gap-2">
              <Image
                src={user?.profilePictureUrl || '/icons/user.svg'}
                width={35}
                height={35}
                alt="pic"
              />
              <div className="items-start justify-end">
                <DialogTitle className="text-2xl">
                  {user?.firstName} {user?.lastName}
                </DialogTitle>
                <DialogDescription>{user?.email}</DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            {isLoading ? (
              <Button disabled={!isLoading}>
                <Spinner variant={'circle'} /> {'Updating... '}
              </Button>
            ) : (
              <Button type="button" onClick={() => handleSubmit()}>
                Save changes
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default ManageUser;
