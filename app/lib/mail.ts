'use server';

import { Resend } from 'resend';

const domain = process.env.NEXT_PUBLIC_APP_URL;

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetPasswordEmail = async (email: string, token: string) => {
    const resetLink = `${domain}/NewPassword?token=${token}`;

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Reset Password Link',
        html: `<p>Click <a href=${resetLink}>Here</a> to Reset Your Password.</p>`
    });
}