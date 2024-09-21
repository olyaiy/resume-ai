import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "@/components/auth/login-form"
import SignUpForm from "@/components/auth/signup-form"

export default function Page() {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <Tabs defaultValue="signin" className="w-full max-w-sm">

        <TabsList className="grid w-full grid-cols-2 bg-foreground">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        {/* Sign In Form */}
        <TabsContent value="signin">
          <LoginForm />
        </TabsContent>

        {/* Sign Up Form */}
        <TabsContent value="signup">
          <SignUpForm />
        </TabsContent>

      </Tabs>

    </div>
  )
}