import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { code, email } = body;

        const options = [
            {label: 'FreePik - 1 month', planCode: 1},
            {label: 'FreePik - 3 months', planCode: 2},
            {label: 'FreePik - 6 months', planCode: 3},
        ]

        if (!code || !email) {
            return Response.json({
                message: 'Invalid request'
            }, {
                status: 400
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            return Response.json({
                message: 'User not found'
            }, {
                status: 404
            });
        }

        const redeemCode = await prisma.redeemCode.findUnique({
            where: {
                code: code
            }
        });

        if (!redeemCode) {
            return Response.json({
                message: 'Invalid code'
            }, {
                status: 400
            });
        }

        if (!redeemCode.active) {
            return Response.json({
                message: 'Code is not active'
            }, {
                status: 400
            });
        }


        const startDate = new Date();
        const endDate = new Date(startDate);
        if (redeemCode.planCode === 1) {
            endDate.setDate(endDate.getDate() + 30);
        }

        if (redeemCode.planCode === 2) {
            endDate.setDate(endDate.getDate() + 90);
        }

        if (redeemCode.planCode === 3) {
            endDate.setDate(endDate.getDate() + 180);
        }

        const createPlan = await prisma.plan.create({
            data: {
                userId: user.id,
                name: redeemCode.name,
                startDate: startDate,
                endDate: endDate,
                planCode: redeemCode.planCode
            }
        });

        if (!createPlan) {
            return Response.json({
                message: 'Something went wrong'
            }, {
                status: 400
            });
        }

        const updateLimit = await prisma.limit.update({
            where: {
                userId: user.id
            },
            data: {
                limit: 20,
                code: 1
            }
        });

        const updateRedeemCode = await prisma.redeemCode.update({
            where: {
                code: code
            },
            data: {
                active: false
            }
        });

        return Response.json({
            message: 'Code redeemed successfully'
        }, {
            status: 200
        });


    } catch (error) {
        console.log(error);
        return Response.json({
            message: 'Something went wrong',
            error: error
        }, {
            status: 400
        });
    }
}