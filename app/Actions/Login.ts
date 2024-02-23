import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const Login = async (
    email: string,
    password: string
) => {
    if(!email || !password) return ({error: 'Something Went Wrong!', ok: false, status: 400});

    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false
        })
        return { success: "email sent", status: 200, ok: true};
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!", status: 422, ok: false};
                default:
                    return { error: "Something went wrong!", status: 400, ok: false };
            }
        }
        throw error;
    }
}