import { router } from "better-auth/api";
import { authClient } from "./auth-client" // import the auth client

const { data: session, error } = await authClient.getSession()

await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      router.push("/login"); // redirect to login page
    },
  },
});


