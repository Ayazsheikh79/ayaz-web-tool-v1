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

        const user = await prisma.user.findUnique({
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

        const dailyPlan = await prisma.plan.findMany({
            where: {
                userId: user.id,
                endDate: {
                    gt: new Date()
                },
                code: {
                    in: [1, 2, 3, 4]
                }
            }
        })

        if (dailyPlan.length < 1) {
            await prisma.dailyLimit.update({
                where: {
                    userId: user.id
                },
                data : {
                    limit: 0,
                    code: 0
                }
            })
        }

        const monthlyPlan = await prisma.plan.findMany({
            where: {
                userId: user.id,
                endDate: {
                    gt: new Date()
                },
                code: {
                    in: [5, 6, 7, 8]
                }
            }
        });

        if (monthlyPlan.length < 1) {
            await prisma.monthlyLimit.update({
                where: {
                    userId: user.id
                },
                data : {
                    limit: 0,
                    code: 0
                }
            })
        }

        const dailyLimit = await prisma.dailyLimit.findUnique({
            where: {
                userId: user.id
            }
        });
        const monthlyLimit = await prisma.monthlyLimit.findUnique({
            where: {
                userId: user.id
            }
        });

        return Response.json({
            message: 'Success',
            data: {
                dailyLimit,
                monthlyLimit
            }
        }, {
            status: 200
        });


    } catch (error) {
        return Response.json({
            message: 'Something went wrong, please try again later'
        }, {
            status: 400
        });
    }
}