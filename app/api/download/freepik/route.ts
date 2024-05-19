import prisma from "@/app/libs/prismadb";
import axios from "axios";

export async function POST (req: Request) {
    const body = await req.json();
    const {url, userId} = body;
    try {
        if (!url || !userId) {
            return Response.json({
                message: 'Missing required fields'
            }, {
                status: 400
            })
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            return Response.json({
                message: 'User not found'
            }, {
                status: 404
            })
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
            return Response.json({
                message: 'You need to subscribe to a plan to download files'
            }, {
                status: 400
            })
        }

        const validPlans = plans.filter((plan) => {
            return plan.endDate > new Date()
        });

        if (validPlans.length === 0) {
            for (const plan of plans) {
                await prisma.plan.update({
                    where: {
                        id: plan.id
                    },
                    data: {
                        active: false
                    }
                })
            }
            return Response.json({
                message: `You don't have an active plan`
            }, {
                status: 400
            })
        }

        const limit = await prisma.freePikLimit.findUnique({
            where: {
                userId
            }
        });

        const monthlyLimit = await prisma.freePikMonthlyLimit.findUnique({
            where: {
                userId
            }
        });

        if (!limit || !monthlyLimit) {
            return Response.json({
                message: 'User limit not found'
            }, {
                status: 404
            })
        }

        if (limit.freepik <= 0 && monthlyLimit.freepik <= 0) {
            return Response.json({
                message: 'You have reached your download limit. Please try again later. Limit resets at 12:00 AM UTC'
            }, {
                status: 400
            })
        }

        const link = url.split('#')[0];
        const fileId = url.split('_')[1].split('.')[0];

        if (!fileId) {
            return Response.json({
                message: 'Invalid URL'
            }, {
                status: 400
            })
        }

        const res = await axios.get(`https://server-4-9ctr2.ondigitalocean.app/api/freepik?fileId=${fileId}`)

        if (res.data.success) {
            if (limit.freepik <= 0) {
                await prisma.freePikMonthlyLimit.update({
                    where: {
                        userId
                    },
                    data: {
                        freepik: {
                            decrement: 1
                        }
                    }
                })
                return Response.json({
                    message: 'Downloaded',
                    data: res.data
                }, {
                    status: 200
                })
            }

            await prisma.freePikLimit.update({
                where: {
                    userId
                },
                data: {
                    freepik: {
                        decrement: 1
                    }
                }
            });

            return Response.json({
                message: 'Downloaded',
                data: res.data
            }, {
                status: 200
            })
        }

        const res0 = await axios.get(`https://envato-web-server-vrhv2.ondigitalocean.app/api/freepik?fileId=${fileId}`)

        if (res0.data.success) {
            if (limit.freepik <= 0) {
                await prisma.freePikMonthlyLimit.update({
                    where: {
                        userId
                    },
                    data: {
                        freepik: {
                            decrement: 1
                        }
                    }
                })
                return Response.json({
                    message: 'Downloaded',
                    data: res.data
                }, {
                    status: 200
                })
            }

            await prisma.freePikLimit.update({
                where: {
                    userId
                },
                data: {
                    freepik: {
                        decrement: 1
                    }
                }
            });

            return Response.json({
                message: 'Downloaded',
                data: res0.data
            }, {
                status: 200
            })
        }
        if (!res0.data.success) {
            console.log(res0.data)
        }

        const res1 = await axios.get(`https://server-1-sybxd.ondigitalocean.app/api/freepik?fileId=${fileId}`)

        if (res1.data.success) {
            if (limit.freepik <= 0) {
                await prisma.freePikMonthlyLimit.update({
                    where: {
                        userId
                    },
                    data: {
                        freepik: {
                            decrement: 1
                        }
                    }
                })
                return Response.json({
                    message: 'Downloaded',
                    data: res.data
                }, {
                    status: 200
                })
            }

            await prisma.freePikLimit.update({
                where: {
                    userId
                },
                data: {
                    freepik: {
                        decrement: 1
                    }
                }
            });

            return Response.json({
                message: 'Downloaded',
                data: res1.data
            }, {
                status: 200
            })
        }

        if (!res1.data.success) {
            console.log(res1.data)
        }

        const res2 = await axios.get(`https://server-2-kzcrw.ondigitalocean.app/api/freepik?fileId=${fileId}`)

        if (res2.data.success) {
            if (limit.freepik <= 0) {
                await prisma.freePikMonthlyLimit.update({
                    where: {
                        userId
                    },
                    data: {
                        freepik: {
                            decrement: 1
                        }
                    }
                })
                return Response.json({
                    message: 'Downloaded',
                    data: res.data
                }, {
                    status: 200
                })
            }

            await prisma.freePikLimit.update({
                where: {
                    userId
                },
                data: {
                    freepik: {
                        decrement: 1
                    }
                }
            });

            return Response.json({
                message: 'Downloaded',
                data: res2.data
            }, {
                status: 200
            })
        }

        return Response.json({
            message: 'Failed to download file'
        }, {
            status: 400
        })

    } catch (error) {
        console.log(error)
        return Response.json({
            message: 'Something went wrong'
        }, {
            status: 500
        })
    }
}