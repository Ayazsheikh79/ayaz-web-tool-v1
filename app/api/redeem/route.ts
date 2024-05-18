import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { code, email } = body;

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
        endDate.setDate(endDate.getDate() + 30);

        const plan = await prisma.plan.create({
            data: {
                userId: user.id,
                name: redeemCode.name,
                startDate: startDate,
                endDate: endDate,
                planCode: redeemCode.planCode
            }
        })

        if (!plan) {
            return Response.json({
                message: 'Something went wrong'
            }, {
                status: 400
            });
        }


        if (redeemCode.planCode === 11 || redeemCode.planCode === 21 || redeemCode.planCode === 31) {
            const updateEnvatoLimit = await prisma.envatoLimit.update({
                where: {
                    userId: user.id
                },
                data : {
                    envato: redeemCode.planCode === 11 ? 10 : redeemCode.planCode === 21 ? 20 : redeemCode.planCode === 31 ? 30 : 0,
                    planCode: redeemCode.planCode
                }
            })

            if (!updateEnvatoLimit) {
                return Response.json({
                    message: 'Something went wrong'
                }, {
                    status: 400
                });
            }
        }

        if (redeemCode.planCode === 12 || redeemCode.planCode === 22 || redeemCode.planCode === 32) {
            const updateFreepikLimit = await prisma.freePikLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    freepik: redeemCode.planCode === 12 ? 10 : redeemCode.planCode === 22 ? 20 : redeemCode.planCode === 32 ? 30 : 0,
                    planCode: redeemCode.planCode
                }
            });

            if (!updateFreepikLimit) {
                return Response.json({
                    message: 'Something went wrong'
                }, {
                    status: 400
                });
            }
        }

        if (redeemCode.planCode === 14 || redeemCode.planCode === 24 || redeemCode.planCode === 34) {
            const updateEnvatoMonthly = await prisma.envatoMonthlyLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    envato: redeemCode.planCode === 14 ? 100 : redeemCode.planCode === 24 ? 200 : redeemCode.planCode === 34 ? 300 : 0,
                    planCode: redeemCode.planCode
                }
            });

            if (!updateEnvatoMonthly) {
                return Response.json({
                    message: 'Something went wrong'
                }, {
                    status: 400
                });
            }

        }

        if (redeemCode.planCode === 15 || redeemCode.planCode === 25 || redeemCode.planCode === 35) {
            const updateFreepikMonthly = await prisma.freePikMonthlyLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    freepik: redeemCode.planCode === 15 ? 100 : redeemCode.planCode === 25 ? 200 : redeemCode.planCode === 35 ? 300 : 0,
                    planCode: redeemCode.planCode
                }
            });

            if (!updateFreepikMonthly) {
                return Response.json({
                    message: 'Something went wrong'
                }, {
                    status: 400
                });
            }
        }


        if (redeemCode.planCode === 99) {
            const addCredits = await prisma.credit.create({
                data: {
                    userId: user.id,
                    amount: redeemCode.credit,
                    endDate: endDate
                }
            })
        }

        const updateRedeemCode = await prisma.redeemCode.update({
            where: {
                code: code
            },
            data: {
                active: false
            }
        });

        if (!updateRedeemCode) {
            return Response.json({
                message: 'Something went wrong'
            }, {
                status: 400
            });
        }

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