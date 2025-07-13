'use server'

import { signInFormSchema } from "../validator";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

//Sign in the user with credentials
export async function signInWithCredentials( prevState: unknown, formData: FormData ) {
    try {
        console.log("Try");
        const user = signInFormSchema.parse({
            email: formData.get('email'),
            password: formData.get('password')
        });
        console.log(user);

        await signIn('credentials', user);

        return {success: true, message: 'Signed in'}
    } catch (error) {
        console.log('Erroe');
        if (isRedirectError(error)) throw error;
        return {success: false, message: 'Invalid credentials. Failed to sign in.'}
    }
}

//Sign out user
export async function signOutUser() {
    await signOut();
}