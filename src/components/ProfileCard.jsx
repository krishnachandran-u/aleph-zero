import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

export default function ProfileCard({user}) {
    const router = useRouter()
    return (
        <main>
            <div className = "border rounded-lg shadow-md sm:w-[400px] w-full flex flex-col items-center p-8 gap-3">
                <div className = "">
                    <Avatar className = "w-30 h-30">
                        <AvatarImage src={user.profile_pic} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar> 
                </div>
                <div className = "flex flex-col items-start w-full">
                    <h1 className = "text-3xl font-bold">{user.name}</h1>
                    <p className = "text-gray-500 italic">@{user.username}</p>
                </div>
                <div className = "w-full gap-2 flex flex-col">
                        <Button className = "bg-gray-500" onClick={() => router.push(`/profile/${user.username}/edit-profile`)}>
                                <p className = "">Edit Profile</p>
                        </Button>
                    <Button className = "bg-black">
                        <p className = "">{user.college.name}</p>
                    </Button>
                </div>
                <div className = "flex flex-col w-full gap-2">
                    <div className = "font-bold">Note</div>
                    <div className = "w-full h-[100px] border rounded-lg shadow-md p-1 ">
                        <p>{user.note}</p>
                    </div>
                </div>
            </div>
        </main>
    )
}