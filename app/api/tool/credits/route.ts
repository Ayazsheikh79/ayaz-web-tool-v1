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

        const plans = await prisma.plan.findMany({
            where: {
                userId: user.id,
                planCode: {
                    in: [99]
                },
                active: true
            }
        });

        if (!plans) {
            const updateCredit = await prisma.credit.updateMany({
                where: {
                    userId: user.id
                },
                data: {
                    amount: 0
                }
            });
        }

        const validPlans = plans.filter((plan) => {
            return plan.endDate > new Date()
        });

        if (validPlans.length === 0) {
            for (const plan of plans) {
                const updatePlan = await prisma.plan.update({
                    where: {
                        id: plan.id
                    },
                    data: {
                        active: false
                    }
                })
            }

            const updateCredit = await prisma.credit.updateMany({
                where: {
                    userId: user.id
                },
                data: {
                    amount: 0
                }
            })
        }

        const credits = await prisma.credit.findFirst({
            where: {
                userId: user.id,
                endDate: {
                    gte: new Date()
                },
                amount: {
                    gt: 0
                }
            }
        });

        if (!credits) {
            return Response.json({
                message: 'No credits found',
                data: 0
            }, {
                status: 200
            });
        }

        return Response.json({
            message: 'Credits fetched successfully',
            data: credits.amount
        }, {
            status: 200
        });

    } catch (error) {
        return Response.json({
            message: 'Internal server error'
        }, {
            status: 500
        });
    }
}