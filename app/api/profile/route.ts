import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
    const body = await req.json();
    const {email} = body;
    try {
        if (!email) {
            return Response.json({
                message: "Email is required",
            }, {
                status: 400
            })
        }

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return Response.json({
                message: "User not found",
            }, {
                status: 404
            })
        }

        const plans = await prisma.plan.findMany({
            where: {
                userId: user.id,
                endDate: {
                    gte: new Date()
                }
            }
        });

        return Response.json({
            success: true,
            data: {
                user,
                plans
            }
        })

    } catch (error) {
        console.log(error)
        return Response.json({
            message: "Internal Server Error",
        }, {
            status: 500
        })
    }

}