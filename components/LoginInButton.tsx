import { useAuth } from '@workos-inc/authkit-react';

import React from 'react';

const LoginInButton = () => {
  const { user, organizationId } = useAuth();
  console.log(organizationId);

  return <div>LoginInButton</div>;
};

export default LoginInButton;
