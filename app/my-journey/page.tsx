import CompanionsList from '@/components/CompanionsList';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import {
  // getBookmarkedCompanions,
  getUserCompanions,
  getUserSessions,
} from '@/lib/actions/companion.actions';
import { withAuth } from '@workos-inc/authkit-nextjs';
import Image from 'next/image';
import React from 'react';

const MyJourney = async () => {
  const { user } = await withAuth({ ensureSignedIn: true });

  const companions = await getUserCompanions();
  const sessionHistory = await getUserSessions();
  // const bookmarkedCompanions = await getBookmarkedCompanions();

  return (
    <main className="min-lg:w-3/4">
      <section className="flex justify-between gap-4 max-sm:flex-col items-center">
        <div className="flex gap-4 items-center">
          <Image
            src={user.profilePictureUrl || '/icons/user.svg'}
            alt={user.firstName || 'user'}
            width={110}
            height={110}
          />
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit">
            <div className="flex gap-2 items-center">
              <Image
                src="/icons/check.svg"
                alt="checkmark"
                width={22}
                height={22}
              />
              <p className="text-2xl font-bold">{sessionHistory?.length}</p>
            </div>
            <div>Lessons completed</div>
          </div>
          <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit">
            <div className="flex gap-2 items-center">
              <Image src="/icons/cap.svg" alt="cap" width={22} height={22} />
              <p className="text-2xl font-bold">{companions?.length}</p>
            </div>
            <div>Companions created</div>
          </div>
        </div>
      </section>

      <Accordion type="multiple">
        {/* <AccordionItem value="bookmarks">
          <AccordionTrigger className="text-2xl font-bold">
            Bookmarked Companions {`(${bookmarkedCompanions.length})`}
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList
              companions={bookmarkedCompanions}
              title="Bookmarked Companions"
            />
          </AccordionContent>
        </AccordionItem> */}
        <AccordionItem value="recent">
          <AccordionTrigger className="text-2xl font-bold">
            Recent Sessions
          </AccordionTrigger>
          <AccordionContent>
            {
              <CompanionsList
                title={'Recent Sessions'}
                companions={sessionHistory}
              />
            }
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="companions">
          <AccordionTrigger className="text-2xl font-bold">
            My Companions {`(${companions?.length})`}
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList title="My Companions" companions={companions} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
};

export default MyJourney;
