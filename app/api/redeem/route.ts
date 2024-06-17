import prisma from "@/app/libs/prismadb";
import {dailyDownloadPlan, monthlyDownloadPlan, creditPlan} from "@/app/data/plans";

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

        const plan = [...dailyDownloadPlan, ...monthlyDownloadPlan, ...creditPlan].find(plan => plan.code === redeemCode.planCode);

        if (!plan) {
            return Response.json({
                message: 'Invalid Plancode'
            }, {
                status: 400
            })
        }

        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 30);

        if (plan.code === 1) {
            const createPlan = await prisma.plan.create({
                data: {
                    userId: user.id,
                    name: plan.name,
                    code: plan.code,
                    startDate: startDate,
                    endDate: endDate,
                }
            })

            const updateLimit = await prisma.dailyLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    limit: 10,
                    code: plan.code
                }
            });
        }
        if (plan.code === 2) {
            const createPlan = await prisma.plan.create({
                data: {
                    userId: user.id,
                    name: plan.name,
                    code: plan.code,
                    startDate: startDate,
                    endDate: endDate,
                }
            })

            const updateLimit = await prisma.dailyLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    limit: 20,
                    code: plan.code
                }
            });
        }
        if (plan.code === 3) {
            const createPlan = await prisma.plan.create({
                data: {
                    userId: user.id,
                    name: plan.name,
                    code: plan.code,
                    startDate: startDate,
                    endDate: endDate,
                }
            })

            const updateLimit = await prisma.dailyLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    limit: 30,
                    code: plan.code
                }
            });
        }
        if (plan.code === 4) {
            const createPlan = await prisma.plan.create({
                data: {
                    userId: user.id,
                    name: plan.name,
                    code: plan.code,
                    startDate: startDate,
                    endDate: endDate,
                }
            })

            const updateLimit = await prisma.dailyLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    limit: 40,
                    code: plan.code
                }
            });
        }
        if (plan.code === 5) {
            const createPlan = await prisma.plan.create({
                data: {
                    userId: user.id,
                    name: plan.name,
                    code: plan.code,
                    startDate: startDate,
                    endDate: endDate,
                }
            })

            const updateLimit = await prisma.monthlyLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    limit: 50,
                    code: plan.code
                }
            });
        }
        if (plan.code === 6) {
            const createPlan = await prisma.plan.create({
                data: {
                    userId: user.id,
                    name: plan.name,
                    code: plan.code,
                    startDate: startDate,
                    endDate: endDate,
                }
            })

            const updateLimit = await prisma.monthlyLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    limit: 100,
                    code: plan.code
                }
            });
        }
        if (plan.code === 7) {
            const createPlan = await prisma.plan.create({
                data: {
                    userId: user.id,
                    name: plan.name,
                    code: plan.code,
                    startDate: startDate,
                    endDate: endDate,
                }
            })

            const updateLimit = await prisma.monthlyLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    limit: 200,
                    code: plan.code
                }
            });
        }
        if (plan.code === 8) {
            const createPlan = await prisma.plan.create({
                data: {
                    userId: user.id,
                    name: plan.name,
                    code: plan.code,
                    startDate: startDate,
                    endDate: endDate,
                }
            })

            const updateLimit = await prisma.monthlyLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    limit: 300,
                    code: plan.code
                }
            });
        }
        if (plan.code === 9) {
            const updateCredit = await prisma.credit.update({
                where: {
                    userId: user.id
                },
                data: {
                   amount : {
                       increment: 5
                   }
                }
            });
        }
        if (plan.code === 10) {
            const updateCredit = await prisma.credit.update({
                where: {
                    userId: user.id
                },
                data: {
                   amount : {
                       increment: 10
                   }
                }
            });
        }
        if (plan.code === 11) {
            const updateCredit = await prisma.credit.update({
                where: {
                    userId: user.id
                },
                data: {
                   amount : {
                       increment: 20
                   }
                }
            });
        }
        if (plan.code === 12) {
            const updateCredit = await prisma.credit.update({
                where: {
                    userId: user.id
                },
                data: {
                   amount : {
                       increment: 40
                   }
                }
            });
        }

        const updateCode = await prisma.redeemCode.update({
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