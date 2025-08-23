'use client';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('topic') || '';

  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      let newUrl = '';
      if (searchQuery) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'topic',
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === '/companions') {
          newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ['topic'],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);

    return () => {
      clearTimeout(delayDebounce);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, router, searchQuery]);

  return (
    <div className="relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
      <Image src={'/icons/search.svg'} alt="search" width={15} height={15} />
      <Input
        placeholder="Search companions ..."
        className="outline-none border-none bg-transparent"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
