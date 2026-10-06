import type { AuthSession, SignInCredentials } from "@/auth/types";

const DEMO_ERROR_EMAIL = "error@medicineplatform.test";

export async function signInWithMockService(
  credentials: SignInCredentials
): Promise<AuthSession> {
  await new Promise((resolve) => setTimeout(resolve, 650));

  if (credentials.email.toLowerCase() === DEMO_ERROR_EMAIL) {
    throw new Error("We couldn’t sign you in. Check your details and try again.");
  }

  return {
    user: {
      id: credentials.email.toLowerCase(),
      name: credentials.email.split("@")[0].replace(/[._-]/g, " "),
      email: credentials.email.toLowerCase()
    }
  };
}
