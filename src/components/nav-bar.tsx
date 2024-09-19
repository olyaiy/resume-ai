import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { UserMenu } from "./UserMenu";


export default function NavBar() {
  const cookie = cookies().get('pb_auth');

  if (!cookie) {
    redirect('/');
  }

  const { model } = JSON.parse(cookie.value);

  return (
    <div className="absolute z-10 w-full h-auto bg-secondary border-b-2 border-border p-2 flex flex-row justify-between items-center">
      <div className="flex flex-row gap-2">
        <Link href="/dashboard" passHref>
          <Button variant="ghost">Dashboard</Button>
        </Link>
        <Link href="/editor" passHref>
          <Button variant="ghost">New Resume</Button>
        </Link>
        <Link href="/resumes" passHref>
          <Button variant="ghost">Resumes</Button>
        </Link>
        <Link href="/profile" passHref>
          <Button variant="ghost">Profile</Button>
        </Link>
        <Link href="/settings" passHref>
          <Button variant="ghost">Settings</Button>
        </Link>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <UserMenu email={model.email} />
        <ModeToggle />
      </div>
    </div>
  );
}