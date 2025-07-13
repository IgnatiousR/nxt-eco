'use server'

import { signInFormSchema } from "../validator";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

//Sign in the user with credentials
export async function signWithCredentials( prevState: unknown, formData: FormData ) {
    try {
        const user = signInFormSchema.parse({
            email: formData.get('email'),
            password: formData.get('password')
        });

        await signIn('credentials', user);

        return {success: true, message: 'Signed in'}
    } catch (error) {
        if (isRedirectError(error)) throw error;
        return {success: false, message: 'Invalid credentials. Failed to sign in.'}
    }
}

//Sign out user
export async function signOutUser() {
    await signOut();
}