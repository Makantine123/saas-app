import CompanionCard from '@/components/CompanionCard';
import CompanionsList from '@/components/CompanionsList';
import Cta from '@/components/CTA';
import { recentSessions } from '@/constants';
import React from 'react';

const Page = () => {
  return (
    <main>
      <h1>Dashboard</h1>

      <section className="home-section">
        <CompanionCard
          id={'1'}
          subject={'maths'}
          topic={'Differential Equations'}
          name={'Mak'}
          duration={0}
          color={'#ffda6e'}
          bookmarked={false}
        />{' '}
        <CompanionCard
          id={'2'}
          subject={'history'}
          topic={'SA History'}
          name={'The rise of PW Botha'}
          duration={17}
          color={'#e5d0ff'}
          bookmarked={false}
        />{' '}
        <CompanionCard
          id={'3'}
          subject={'finance'}
          topic={'Neural Network of the Brain'}
          name={'Neura the Brainy Explorer'}
          duration={87}
          color={'#C8FFDF'}
          bookmarked={false}
        />
      </section>

      <section className="home-section">
        <CompanionsList
          title="Recently completed sessions"
          companions={recentSessions}
          classNames="w-2/3 max-lg:w-full"
        />
        <Cta />
      </section>
    </main>
  );
};

export default Page;
