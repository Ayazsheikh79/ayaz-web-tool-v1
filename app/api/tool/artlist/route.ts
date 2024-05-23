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

        const checkArtlistLimitDoc = await prisma.artlistLimit.findUnique({
            where: {
                userId: user.id
            }
        });

        const checkArtlistMonthlyLimitDoc = await prisma.artlistMonthlyLimit.findUnique({
            where: {
                userId: user.id
            }
        });

        if (!checkArtlistLimitDoc) {
            const createArtlistLimit = await prisma.artlistLimit.create({
                data: {
                    userId: user.id,
                    artlist: 0,
                    planCode: 0
                }
            });
        }

        if (!checkArtlistMonthlyLimitDoc) {
            const createArtlistMonthlyLimit = await prisma.artlistMonthlyLimit.create({
                data: {
                    userId: user.id,
                    artlist: 0,
                    planCode: 0
                }
            });
        }

        const plans = await prisma.plan.findMany({
            where: {
                userId: user.id,
                planCode: {
                    in: [41, 42, 43, 44, 45, 46]
                },
                active: true
            }
        });

        if (plans.length <= 0) {
            const updateArtlistLimits = await prisma.artlistLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    artlist: 0,
                    planCode: 0,
                }
            })

            const updateArtlistMonthly = await prisma.artlistMonthlyLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    artlist: 0,
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

            const updateArtlistimits = await prisma.artlistLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    artlist: 0,
                    planCode: 0,
                }
            })

            const updateArtlistMonthly = await prisma.artlistMonthlyLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    artlist: 0,
                    planCode: 0,
                }
            })
        }

        const artlistLimit = await prisma.artlistLimit.findUnique({
            where: {
                userId: user.id
            }
        });

        const artlistMonthlyLimits = await prisma.artlistMonthlyLimit.findUnique({
            where: {
                userId: user.id
            }
        });

        return Response.json({
            message: 'artlist limits fetched successfully',
            data: {
                artlist: artlistLimit,
                monthly: artlistMonthlyLimits
            }
        });

    } catch (error) {
        console.log(error);
        return Response.json({
            message: 'Something went wrong, please try again later'
        }, {
            status: 400
        });
    }
}