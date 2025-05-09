import ShortCard from "@/components/shorts/short-card";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";


export default  async function Home() {

  const user = await currentUser();

  if(!user){
    return null;
  }

  const loggedInUser = await prisma.user.findUnique({
    where:{clerkUserId: user.id}
  });

  if(!loggedInUser){
    await prisma.user.create({
      data:{
        name:user.fullName || "Name",
        email: user.emailAddresses[0]?.emailAddress || "Email",
        clerkUserId: user.id,
      }
    })
  }

  const shorts = await prisma.shorts.findMany({
    where:{userId:loggedInUser?.id},
    include:{
      user:{
        select:{
          name: true,
          email: true,
        },
      },
    },
    orderBy:{
      createdAt:'desc'
    }
  })
  return (
   <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
        <div className="flex flex-col items-center">
            {shorts.map((short)=>(
            <div key={short.id} className="snap-start flex justify-center items-center h-screen">
            <ShortCard short={short} />
          </div>
            ))}
        </div>
   </div>
   
  );
}
 