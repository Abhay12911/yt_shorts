"use server"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

import { z } from "zod"
import { redirect } from "next/navigation"
const uploadShortsSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(5),
    video: z.string()
})

type uploadShortsState = {
    errors: {
        title?: string[],
        description?: string[],
        video?: string[]
        formError?: string[]
    }
}

export const uploadShortsAction = async (previousState: uploadShortsState, formData: FormData): Promise<uploadShortsState> => {
    const result = uploadShortsSchema.safeParse({
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        video: formData.get("video") as string
    })

    if (!result.success) {
        errors: result.error.flatten().fieldErrors
    }

    //clerk authentication

    const { userId } = await auth(); // in bakcend auth  syntax is used to get the userId
    if (!userId) {
        return {
            errors: {
                formError: ["Please login first to create a short"]
            }
        }
    }
    const user = await prisma.user.findUnique({
        where: { clerkUserId: userId },
    })

    try {
        if (!user?.id) {
            return {
                errors: {
                    formError: ["User not found"]
                }
            }
        }

        await prisma.short.create({
            data: {
                title: result.data?.title,
                description: result.data?.description,
                url: result.data?.video,
                userId: user.id,


            } 
        })

    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    formError: [error.message]
                }
            }
        } else {
            return {
                errors: {
                    formError: ["Something went wrong"]

                }
            }
        }
    }
    revalidatePath("/");
    redirect("/");
    
    return {
        errors: {}
    };
}