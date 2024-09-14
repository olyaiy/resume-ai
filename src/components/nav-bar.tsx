import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { logout } from "@/app/actions";

export default function NavBar() {
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
            <div className="flex flex-row gap-2">
                <form action={logout}>
                        <Button type="submit" variant="destructive">
                            Logout
                        </Button>
                    </form>
                <ModeToggle />
            </div>
        </div>
    );
}