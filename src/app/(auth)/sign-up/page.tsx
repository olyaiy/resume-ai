
import SignUpForm from "@/components/signup-form"

import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SignUpPage(){

    return (
      <main className="flex flex-col justify-center items-center min-h-screen">
        <SignUpForm />
      </main>
    );
  }