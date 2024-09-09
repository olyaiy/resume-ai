import { LoginForm } from "@/components/login-form";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Page({
    searchParams,
  }: {
    searchParams: { [key: string]: string | string[] | undefined }
  }) {
    const error = searchParams.error;
  
    return (
      <main className="flex flex-col justify-center items-center min-h-screen">
        {error === 'AuthFailed' && (
          <Alert variant="destructive" className="mb-4 max-w-sm">
            <AlertDescription>
              Authentication failed. Please try again.
            </AlertDescription>
          </Alert>
        )}
        <LoginForm />
      </main>
    );
  }