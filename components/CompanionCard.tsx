import { CompanionCardProps } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CompanionCard = ({
  id,
  bookmarked,
  color,
  duration,
  name,
  subject,
  topic,
}: CompanionCardProps) => {
  return (
    <article className="companion-card" style={{ backgroundColor: color }}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        <button className="companion-bookmark">
          <Image
            src={'/icons/bookmark.svg'}
            alt="bookmark"
            width={12.5}
            height={15}
          />
        </button>
      </div>
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-sm">Topic: {topic}</p>
      <div className="flex items-center gap-2">
        <Image
          src={'/icons/clock.svg'}
          alt="duration"
          width={13.5}
          height={13.5}
        />
        <p className="text-sm">{duration} mins </p>
      </div>
      <Link href={`/companions/${id}`}>
        <button className="btn-primary w-full justify-center">
          Launch Lesson
        </button>
      </Link>
    </article>
  );
};

export default CompanionCard;
