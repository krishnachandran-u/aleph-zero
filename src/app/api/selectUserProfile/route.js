import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req){
    try {
        const url = new URL(req.url);
        const username = url.searchParams.get("username");
        const user = await prismadb.users.findUnique({
            where: {
                username: username,
            },
            select: {
                email: true,
                name: true,
                username:true,
                phoneNo:true,
                profile_pic:true,
                note:true,
                college:{
                    select:{
                        name:true,
                    }
                },
                products:{
                    select:{
                        id:true,
                        name:true,
                        price:true,
                        images:{
                            select:{
                                url:true,
                            }
                        },
                        description:true,
                        sold:true,
                    }
                }
            },
        });
        user.phoneNo = user.phoneNo.toString()
        if (user) {
            return new NextResponse(JSON.stringify(user),{status:200})
        }
        else {
            return new NextResponse(JSON.stringify({message:`User with username ${username} not found.`}),{status:404})
        }          

    }
    catch (error) {
        return new NextResponse(JSON.stringify({error:error}),{status:500})
    }
}