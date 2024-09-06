import Link from "next/link";
import { Button } from "./ui/button";
import { logout } from "@/app/actions";


export default function SideBar() {
    return (
        <div className="absolute h-full w-64 flex-row bg-secondary border-r-2 border-border">

        <div className="flex shrink-0 items-center flex-col h-full justify-center">
          <Link href="/dashboard" passHref>
            <Button variant="ghost" className="w-full">Dashboard</Button>
          </Link>
          <Link href="/editor" passHref>
            <Button variant="ghost" className="w-full">New Resume</Button>
          </Link>
          <Link href="/resumes" passHref>
            <Button variant="ghost" className="w-full">Resumes</Button>
          </Link>
          <Link href="/profile" passHref>
            <Button variant="ghost" className="w-full">Profile</Button>
          </Link>
          <Link href="/settings" passHref>
            <Button variant="ghost" className="w-full">Settings</Button>
          </Link>
          <form action={logout}>
                    <Button type="submit" variant="destructive" className="w-full">
                        Logout
                    </Button>
                </form>

        </div>


      </div>
    );
}