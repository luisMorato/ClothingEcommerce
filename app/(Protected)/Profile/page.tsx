import { auth } from "@/auth";
import { getCurrentUser } from "@/app/utils/GetUser";

import UserSettings from "@/app/Components/(protected)/Profile/UserSettings";
import UserServices from "@/app/Components/(protected)/Profile/UserServices";
import UserCards from "@/app/Components/(protected)/Profile/UserCards";

const Profile = async () => {
    const currentUser = await getCurrentUser();
    const session = await auth();
    
    return currentUser && session && (
        <div 
            className="w-full mx-auto py-5 px-2
            md:px-3
            lg:w-fit"
        >
            <h1 className="text-4xl relative inline-block ml-3 after:absolute after:top-full after:left-0 after:bg-rose-500 after:h-[2px] after:w-full md:ml-0">Account</h1>
            <div 
                className="flex flex-col items-center gap-20 mt-5
                md:gap-10
                md:flex-row
                md:items-start"
            >
                <UserCards 
                    currentUserName={currentUser.name}
                    currentUserImage={currentUser.image}
                />
                <div 
                    className="flex flex-col 
                    md:max-w-[500px]
                    lg:max-w-[400px]"
                >
                    <div className="border border-neutral-300 rounded-3xl px-6 py-3">
                        <h2 className="text-[32px] text-neutral-600 mb-5">Settings</h2>
                        <UserSettings
                            userProvider={session.user.provider}
                            userName={currentUser.name as string}
                            userEmail={currentUser.email as string}
                        />
                    </div>
                    <UserServices />
                </div>
            </div>
        </div>
    )
}

export default Profile;