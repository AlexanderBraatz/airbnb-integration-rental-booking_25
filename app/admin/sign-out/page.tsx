import { signOut } from "../actions";

export default function SignOutPage() {
  return (
    <form>
      <p>Goodbye, see you again soon</p>
      <button formAction={signOut}>Sign out</button>
    </form>
  );
}
