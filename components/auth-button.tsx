import {
  getKindeServerSession,
  LoginLink,
  LogoutLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/server';
import { Button } from './ui/button';

export async function AuthButton() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!<LogoutLink className="text-subtle">Log out</LogoutLink>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={'outline'}>
        <LoginLink className="btn btn-ghost sign-in-btn">Sign in</LoginLink>
      </Button>
      <Button asChild size="sm" variant={'default'}>
        <RegisterLink className="btn btn-dark">Sign up</RegisterLink>
      </Button>
    </div>
  );
}
