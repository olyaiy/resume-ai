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

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const router = useRouter()

  function validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email) ? "" : "Please enter a valid email address"
  }

  function validatePasswords(password: string, confirmPassword: string) {
    if (password.length < 8) {
      return "Password must be at least 8 characters long"
    }
    if (password !== confirmPassword) {
      return "Passwords do not match"
    }
    return ""
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const emailValidationError = validateEmail(email)
    const passwordValidationError = validatePasswords(password, confirmPassword)
    
    setEmailError(emailValidationError)
    setPasswordError(passwordValidationError)

    if (emailValidationError || passwordValidationError) return

    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const result = await createProfile(
      formData.get("first-name") as string,
      formData.get("last-name") as string,
      formData.get("username") as string,
      email,
      password,
      confirmPassword
    )

    setIsLoading(false)

    if (result.success) {
      router.push("/dashboard")
    } else {
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
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setEmailError("")
              }}
              onBlur={(e) => setEmailError(validateEmail(e.target.value))}
            />
            {emailError && <p className="text-sm text-red-500">{emailError}</p>}
          </div>

          {/* Password Input */}
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setPasswordError("")
              }}
              onBlur={() => setPasswordError(validatePasswords(password, confirmPassword))}
            />
            {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
          </div>

          {/* Confirm Password Input */}
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              name="confirm-password"
              type="password"
              placeholder="Confirm your password"
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                setPasswordError("")
              }}
              onBlur={() => setPasswordError(validatePasswords(password, confirmPassword))}
            />
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