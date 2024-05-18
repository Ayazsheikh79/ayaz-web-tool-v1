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
                    in: [12, 22, 32, 15, 25, 35]
                },
                active: true
            }
        });

        if (!plans) {
            const updateFreepikLimit = await prisma.freePikLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    freepik: 0,
                    planCode: 0,
                }
            })

            const updateFreepikMonthly = await prisma.freePikMonthlyLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    freepik: 0,
                    planCode: 0,
                }
            })
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

            const updateFreepikLimits = await prisma.freePikLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    freepik: 0,
                    planCode: 0,
                }
            })

            const updateFreepikMonthly = await prisma.freePikMonthlyLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    freepik: 0,
                    planCode: 0,
                }
            })

        }

        const freepikLimits = await prisma.freePikLimit.findUnique({
            where: {
                userId: user.id
            }
        });

        const freepikMonthlyLimits = await prisma.freePikMonthlyLimit.findUnique({
            where: {
                userId: user.id
            }
        });

        return Response.json({
            message: 'Envato limits fetched successfully',
            data: {
                freepik: freepikLimits,
                monthly: freepikMonthlyLimits
            }
        });

    } catch (error) {
        return Response.json({
            message: 'Something went wrong, please try again later'
        }, {
            status: 400
        });
    }
}