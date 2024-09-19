'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";


export default function NavBar() {
    const [isAuth, setIsAuth] = useState(false);
    const router = useRouter();

   
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
                {/* {isAuth ? (
                    <p>USER IS LOGGED IN</p>
                ) : (
                    <p>USER IS NOT LOGGED IN</p>
                )}
                 */}
                <ModeToggle />
            </div>
        </div>
    );
}