import { withAuth } from '@workos-inc/authkit-nextjs';
import React, { ReactNode } from 'react';

const layout = async ({ children }: { children: ReactNode }) => {
  await withAuth({ ensureSignedIn: true });

  return <div className="flex min-h-screen">{children}</div>;
};

export default layout;
