 import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
    const body = await req.json();
    const {email} = body;
    try {
        if (!email) {
            return Response.json({
                message: 'Email is required'
            }, {
                status: 400
            });
        }

        const user = await prisma.user.findFirst({
            where: {
                email
            }
        });

        if (!user) {
            return Response.json({
                message: 'User not found'
            }, {
                status: 404
            });
        }
        const plan = await prisma.plan.findFirst({
            where: {
                userId: user.id,
                endDate: {
                    gte: new Date()
                }
            }
        })

        if (!plan) {
            const updateLimit = await prisma.limit.update({
                where: {
                    userId: user.id
                },
                data: {
                    limit: 0,
                    code: 0
                }
            });
        }

        const limits = await prisma.limit.findUnique({
            where: {
                userId: user.id
            }
        });

        if (!limits) {
            return Response.json({
                message: 'User limit not found'
            }, {
                status: 404
            });
        }

        return Response.json({
            success: true,
            data: limits
        });

    } catch (error) {
        return Response.json({
            message: 'Something went wrong, please try again later'
        }, {
            status: 400
        });
    }
}