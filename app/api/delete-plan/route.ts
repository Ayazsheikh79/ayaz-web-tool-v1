import prisma from "@/app/libs/prismadb";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    try {
        if (!id) {
            return Response.json({
                message: 'ID is required',
            }, {
                status: 400
            })
        }

        const plan = await prisma.plan.findUnique({
            where: {
                id: id
            }
        })

        if (!plan) {
            return Response.json({
                message: 'Plan not found',
            }, {
                status: 404
            })
        }

        const group1 = [11, 21, 31]; // envato daily
        const group2 = [14, 24, 34]; // envato monthly
        const group3 = [12, 22, 32]; // freepik daily
        const group4 = [15, 25, 35]; // freepik monthly
        const group5 = [99]; // credits

        if (group1.includes(plan.planCode)) {
            const updateEnvatoLimits = await prisma.envatoLimit.update({
                where: {
                    userId: plan.userId
                },
                data: {
                    envato: 0,
                    planCode: 0
                }
            });
        }

        if (group2.includes(plan.planCode)) {
            const updateEnvatoLimits = await prisma.envatoMonthlyLimit.update({
                where: {
                    userId: plan.userId
                },
                data: {
                    envato: 0,
                    planCode: 0
                }
            });
        }

        if (group3.includes(plan.planCode)) {
            const updateFreepikLimits = await prisma.freePikLimit.update({
                where: {
                    userId: plan.userId
                },
                data: {
                    freepik: 0,
                    planCode: 0
                }
            });
        }

        if (group4.includes(plan.planCode)) {
            const updateFreepikLimits = await prisma.freePikMonthlyLimit.update({
                where: {
                    userId: plan.userId
                },
                data: {
                    freepik: 0,
                    planCode: 0
                }
            });
        }

        if (group5.includes(plan.planCode)) {
            return Response.json({
                message: 'You cannot delete this plan',
            }, {
                status: 400
            })
        }


        const deletePlan = await prisma.plan.delete({
            where: {
                id: plan.id
            }
        });

        return Response.json({
            message: 'success',
        }, {
            status: 200
        })

    } catch (error) {
        console.error(error)
        return Response.json({
            message: 'Internal Server Error',
        }, {
            status: 500
        })
    }
}