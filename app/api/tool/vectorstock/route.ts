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

        const checkVectorStockLimitDoc = await prisma.vectorStockLimit.findUnique({
            where: {
                userId: user.id
            }
        });

        const checkvectorStockMonthlyLimitDoc = await prisma.vectorStockMonthlyLimit.findUnique({
            where: {
                userId: user.id
            }
        });

        if (!checkVectorStockLimitDoc) {
            const createArtlistLimit = await prisma.vectorStockLimit.create({
                data: {
                    userId: user.id,
                    vectorStock: 0,
                    planCode: 0
                }
            });
        }

        if (!checkvectorStockMonthlyLimitDoc) {
            const createArtlistMonthlyLimit = await prisma.vectorStockMonthlyLimit.create({
                data: {
                    userId: user.id,
                    vectorStock: 0,
                    planCode: 0
                }
            });
        }

        const plans = await prisma.plan.findMany({
            where: {
                userId: user.id,
                planCode: {
                    in: [51, 52, 53, 54, 55, 56]
                },
                active: true
            }
        });

        if (plans.length <= 0) {
            const updateVectorStockLimits = await prisma.vectorStockLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    vectorStock: 0,
                    planCode: 0,
                }
            })

            const updateVectorStockMonthly = await prisma.vectorStockMonthlyLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    vectorStock: 0,
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

            const updateVectorStockLimits = await prisma.vectorStockLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    vectorStock: 0,
                    planCode: 0,
                }
            })

            const updateVectorStockMonthly = await prisma.vectorStockMonthlyLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    vectorStock: 0,
                    planCode: 0,
                }
            })
        }

        const vectorStockLimit = await prisma.vectorStockLimit.findUnique({
            where: {
                userId: user.id
            }
        });

        const vectorStockMonthlyLimits = await prisma.vectorStockMonthlyLimit.findUnique({
            where: {
                userId: user.id
            }
        });

        return Response.json({
            message: 'artlist limits fetched successfully',
            data: {
                vectorstock: vectorStockLimit,
                monthly: vectorStockMonthlyLimits
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