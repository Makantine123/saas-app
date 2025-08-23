'use client';

import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { subjects } from '@/constants';
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';
import Image from 'next/image';

const SubjectInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('subject') || '';

  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery === 'clear') {
        setSearchQuery('');

        return;
      }

      let newUrl = '';
      if (searchQuery) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'subject',
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === '/companions') {
          newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ['subject'],
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
      <Select
        onValueChange={setSearchQuery}
        value={searchQuery}
        defaultValue={''}>
        <SelectTrigger className="outline-none border-none bg-transparent">
          <SelectValue placeholder="Select a subject" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Subjects</SelectLabel>

            {subjects?.map((subject, index) => (
              <SelectItem key={index} value={subject}>
                {subject}
              </SelectItem>
            ))}
            <SelectItem value="clear">
              <Image
                src={'/icons/delete.svg'}
                alt="clear"
                width={20}
                height={20}
              />{' '}
              clear
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SubjectInput;
