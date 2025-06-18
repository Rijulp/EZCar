// import { currentUser } from "@clerk/nextjs/server"
// import { db } from "./prisma";

// export const checkUser = async() => {
//     const user = await currentUser();

//     if (!user){
//         return null;
//     }

//     try {
//         const loggedInUser = await db.user.findUnique({
//             where: {
//                 clerkUserId: user.id,
//             },
//         });

//         if (loggedInUser) {
//             return loggedInUser;
//         }

//         const newUser = await db.user.create({
//             data: {
//                 clerkUserId: user.id,
//                 name: `${user.firstName} ${user.lastName}`,
//                 image: user.imageUrl,
//                 email: user.emailAddresses[0].emailAddress,
                
//             },
//         });

//         return newUser;
        
//     } catch (error) {
//         console.log(error.message);
//     }
// };








//github
import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    const name = `${user.firstName} ${user.lastName}`;

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    return newUser;
  } catch (error) {
    console.log(error.message);
  }
};










//gpt
// import { currentUser } from "@clerk/nextjs/server";
// import { db } from "./prisma";

// export const checkUser = async () => {
//   const user = await currentUser();

//   if (!user) {
//     return null;
//   }

//   try {
//     const loggedInUser = await db.user.findUnique({
//       where: {
//         clerkUserId: user.id,
//       },
//     });

//     // ✅ FIXED: Only return if user is found — otherwise create
//     if (loggedInUser) {
//       return loggedInUser;
//     }

//     const newUser = await db.user.create({
//       data: {
//         clerkUserId: user.id,
//         name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
//         image: user.imageUrl,
//         email: user.emailAddresses[0]?.emailAddress || "",
//         role: "user", // Optional: add role field if it's in your schema
//       },
//     });

//     return newUser;

//   } catch (error) {
//     console.log("checkUser error:", error.message);
//     return null;
//   }
// };
