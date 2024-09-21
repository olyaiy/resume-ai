"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createProfile } from "@/app/actions"

// ... existing description ...

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const result = await createProfile(
      formData.get("first-name") as string,
      formData.get("last-name") as string,
      formData.get("username") as string,
      formData.get("email") as string,
      formData.get("password") as string,
      formData.get("confirm-password") as string
    )

    setIsLoading(false)

    if (result.success) {
      router.push("/dashboard") // Redirect to dashboard or confirmation page
    } else {
      // Handle error (you might want to show an error message to the user)
      console.error(result.message)
    }
  }
  
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="grid gap-4">
          {/* Personal Information Section */}
          <div className="grid grid-cols-2 gap-4">
            {/* First Name Input */}
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" name="first-name" placeholder="Max" required />
            </div>
            {/* Last Name Input */}
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" name="last-name" placeholder="Robinson" required />
            </div>
            {/* Username Input */}
            <div className="col-span-2 grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" placeholder="maxrobinson" required />
            </div>
          </div>

          {/* Email Input */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>

          {/* Password Input */}
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" placeholder="Enter your password" required />
          </div>

          {/* Confirm Password Input */}
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" name="confirm-password" type="password" placeholder="Confirm your password" required />
          </div>

          {/* Sign Up Buttons */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create an account"}
          </Button>
          
          <Button type="button" variant="outline" className="w-full">
            Sign up with GitHub
          </Button>
        </form>

        {/* Sign In Link */}
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}