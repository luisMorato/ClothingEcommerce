import bcrypt from 'bcryptjs';
import { db } from '@/app/lib/db';
import { auth } from '@/auth';
import { getUserByEmail, getUserById } from '@/app/utils/GetUser';

export const updateUserData = async (body: { 
    userName?: string, 
    userEmail?: string, 
    userPassword?: string, 
    userNewPassword?: string | undefined, 
    twoFactor?: boolean}
) => {
    const session = await auth();
    if(session && session.user){
        const currentUser = await getUserById(session.user.id as string);

        if(!currentUser){
            return ({error: "Unauthorized!", status: 422, ok: false});
        }

        let { userName, userEmail, userPassword, userNewPassword, twoFactor } = body;

        if(!userPassword && session.user.provider === 'credentials'){
            return ({error: "Password is a required field!", status: 422, ok: false});
        }

        if(userEmail !== currentUser.email){
            const existingUser = await getUserByEmail(userEmail as string);

            if(existingUser && existingUser.id === currentUser.id){
                return ({error: "Email already in use!", status: 400, ok: false});
            }
        }

        if(!userNewPassword){
            userNewPassword = userPassword;
        }

        if(userNewPassword && userPassword){
            const passwordMatch = await bcrypt.compare(
                userPassword,
                currentUser.hashedPassword as string
            );

            if(!passwordMatch){
                return ({error: "Wrong Password!", status: 422, ok: false});
            }

            const hashedNewPassword = await bcrypt.hash(userNewPassword, 10);

            userPassword = hashedNewPassword;
            userNewPassword = undefined;
        }

        const update = await db.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                name: userName as string,
                email: userEmail as string,
                hashedPassword: userPassword as string,
            }
        });

        if(update) return ({success: 'Settings Updated!', status: 200, ok: true});
        return ({error: 'Something Went Wrong!', status: 400, ok: false});
    }
}