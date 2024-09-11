
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isAuthenticated } from "./actions";
import { redirect } from "next/navigation";
import Link from "next/link";





export default async function Page() {
  if (await isAuthenticated()) {
    redirect('/dashboard');
  }



  return (
    <div className="w-full h-screen flex items-center justify-center flex-col ">
      
      <h1>Welcome</h1>
      
      <h2>Please login or sign-up to get started</h2>

      <div className="flex flex-row gap-4 mt-4">
        {/* Login */}
        <Button asChild>
          <Link href="/sign-in">Login</Link>
        </Button>
        {/* Sign Up */}
        <Button asChild>
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </div>

    </div>

  );
}
