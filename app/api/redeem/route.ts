import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { code, email } = body;

        const options = [
            {label: 'Envato - Basic', planCode: 11},
            {label: 'Envato - Standard', planCode: 21},
            {label: 'Envato - Premium', planCode: 31},

            {label: 'FreePik - Basic', planCode: 12},
            {label: 'FreePik - Standard', planCode: 22},
            {label: 'FreePik - Premium', planCode: 32},

            {label: 'Envato - Basic - 100 - 1 Month', planCode: 14},
            {label: 'Envato - Standard - 200 - 1 Month', planCode: 24},
            {label: 'Envato - Premium - 300 - 1 Month', planCode: 34},

            {label: 'Freepik - Basic - 100 - 1 Month', planCode: 15},
            {label: 'Freepik - Standard - 200 - 1 Month', planCode: 25},
            {label: 'Freepik - Premium - 300 - 1 Month', planCode: 35},

            {label: 'Artlist - Basic', planCode: 41},
            {label: 'Artlist - Standard', planCode: 42},
            {label: 'Artlist - Premium', planCode: 43},

            {label: 'Artlist - Basic - 100 - 1 Month', planCode: 44},
            {label: 'Artlist - Standard - 200 - 1 Month', planCode: 45},
            {label: 'Artlist - Premium - 300 - 1 Month', planCode: 46},

            {label: 'VectorStock - Basic', planCode: 51},
            {label: 'VectorStock - Standard', planCode: 52},
            {label: 'VectorStock - Premium', planCode: 53},

            {label: 'VectorStock - Basic - 100 - 1 Month', planCode: 54},
            {label: 'VectorStock - Standard - 200 - 1 Month', planCode: 55},
            {label: 'VectorStock - Premium - 300 - 1 Month', planCode: 56},

            {label: 'On Demand Credits', planCode: 99}
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
        endDate.setDate(endDate.getDate() + 30);

        const group1 = [11, 21, 31]; // envato daily
        const group2 = [14, 24, 34]; // envato monthly
        const group3 = [12, 22, 32]; // freepik daily
        const group4 = [15, 25, 35]; // freepik monthly
        const group5 = [41, 42, 43]; // artlist daily
        const group6 = [44, 45, 46]; // artlist monthly
        const group7 = [51, 52, 53]; // vectorstock daily
        const group8 = [54, 55, 56]; // vectorstock monthly
        const group9 = [99]; // on demand credits

        if (group1.includes(redeemCode.planCode)) {
            const plans = await prisma.plan.findMany({
                where: {
                    userId: user.id,
                    planCode: {
                        in: group1
                    },
                    active: true,
                    endDate: {
                        gt: new Date()
                    }
                }
            });
            if (plans.length > 0) {
                const deactivatePlans = await prisma.plan.updateMany({
                    where: {
                        userId: user.id,
                        planCode: {
                            in: group1
                        }
                    },
                    data: {
                        active: false
                    }
                });
                const updateLimit = await prisma.envatoLimit.update({
                    where: {
                        userId: user.id
                    },
                    data: {
                        envato: 0,
                        planCode: 0
                    }
                })
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

            const updateEnvatoLimit = await prisma.envatoLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    envato: redeemCode.planCode === 11 ? 10 : redeemCode.planCode === 21 ? 20 : redeemCode.planCode === 31 ? 30 : 0,
                    planCode: redeemCode.planCode
                }
            });
        }

        if (group2.includes(redeemCode.planCode)) {
            const plans = await prisma.plan.findMany({
                where: {
                    userId: user.id,
                    planCode: {
                        in: group2
                    },
                    active: true,
                    endDate: {
                        gt: new Date()
                    }
                }
            });
            if (plans.length > 0) {
                const deactivatePlans = await prisma.plan.updateMany({
                    where: {
                        userId: user.id,
                        planCode: {
                            in: group2
                        }
                    },
                    data: {
                        active: false
                    }
                });
                const updateLimit = await prisma.envatoMonthlyLimit.update({
                    where: {
                        userId: user.id
                    },
                    data: {
                        envato: 0,
                        planCode: 0
                    }
                })
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

            const updateEnvatoLimit = await prisma.envatoMonthlyLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    envato: redeemCode.planCode === 14 ? 100 : redeemCode.planCode === 24 ? 200 : redeemCode.planCode === 34 ? 300 : 0,
                    planCode: redeemCode.planCode
                }
            });
        }

        if (group3.includes(redeemCode.planCode)) {
            const plans = await prisma.plan.findMany({
                where: {
                    userId: user.id,
                    planCode: {
                        in: group3
                    },
                    active: true,
                    endDate: {
                        gt: new Date()
                    }
                }
            });
            if (plans.length > 0) {
                const deactivatePlans = await prisma.plan.updateMany({
                    where: {
                        userId: user.id,
                        planCode: {
                            in: group3
                        }
                    },
                    data: {
                        active: false
                    }
                });
                const updateLimit = await prisma.freePikLimit.update({
                    where: {
                        userId: user.id
                    },
                    data: {
                        freepik: 0,
                        planCode: 0
                    }
                })
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

            const updateEnvatoLimit = await prisma.freePikLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    freepik: redeemCode.planCode === 12 ? 10 : redeemCode.planCode === 22 ? 20 : redeemCode.planCode === 32 ? 30 : 0,
                    planCode: redeemCode.planCode
                }
            });
        }

        if (group4.includes(redeemCode.planCode)) {
            const plans = await prisma.plan.findMany({
                where: {
                    userId: user.id,
                    planCode: {
                        in: group4
                    },
                    active: true,
                    endDate: {
                        gt: new Date()
                    }
                }
            });
            if (plans.length > 0) {
                const deactivatePlans = await prisma.plan.updateMany({
                    where: {
                        userId: user.id,
                        planCode: {
                            in: group4
                        }
                    },
                    data: {
                        active: false
                    }
                });
                const updateLimit = await prisma.freePikMonthlyLimit.update({
                    where: {
                        userId: user.id
                    },
                    data: {
                        freepik: 0,
                        planCode: 0
                    }
                })
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

            const updateEnvatoLimit = await prisma.freePikMonthlyLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    freepik: redeemCode.planCode === 15 ? 100 : redeemCode.planCode === 25 ? 200 : redeemCode.planCode === 35 ? 300 : 0,
                    planCode: redeemCode.planCode
                }
            });
        }

        if (group5.includes(redeemCode.planCode)) {
            const plans = await prisma.plan.findMany({
                where: {
                    userId: user.id,
                    planCode: {
                        in: group5
                    },
                    active: true,
                    endDate: {
                        gt: new Date()
                    }
                }
            });
            if (plans.length > 0) {
                const deactivatePlans = await prisma.plan.updateMany({
                    where: {
                        userId: user.id,
                        planCode: {
                            in: group5
                        }
                    },
                    data: {
                        active: false
                    }
                });

                const checkLimitDoc = await prisma.artlistLimit.findUnique({
                    where: {
                        userId: user.id
                    }
                });

                if (!checkLimitDoc) {
                    const createLimit = await prisma.artlistLimit.create({
                        data: {
                            userId: user.id,
                            artlist: 0,
                            planCode: 0
                        }
                    });
                }

                const updateLimit = await prisma.artlistLimit.update({
                    where: {
                        userId: user.id
                    },
                    data: {
                        artlist: 0,
                        planCode: 0
                    }
                })
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

            const updateArtlistLimit = await prisma.artlistLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    artlist: redeemCode.planCode === 41 ? 10 : redeemCode.planCode === 42 ? 20 : redeemCode.planCode === 43 ? 30 : 0,
                    planCode: redeemCode.planCode
                }
            });
        }

        if (group6.includes(redeemCode.planCode)) {
            const plans = await prisma.plan.findMany({
                where: {
                    userId: user.id,
                    planCode: {
                        in: group6
                    },
                    active: true,
                    endDate: {
                        gt: new Date()
                    }
                }
            });
            if (plans.length > 0) {
                const deactivatePlans = await prisma.plan.updateMany({
                    where: {
                        userId: user.id,
                        planCode: {
                            in: group6
                        }
                    },
                    data: {
                        active: false
                    }
                });

                const checkLimitDoc = await prisma.artlistMonthlyLimit.findUnique({
                    where: {
                        userId: user.id
                    }
                });

                if (!checkLimitDoc) {
                    const createLimit = await prisma.artlistMonthlyLimit.create({
                        data: {
                            userId: user.id,
                            artlist: 0,
                            planCode: 0
                        }
                    });
                }

                const updateLimit = await prisma.artlistMonthlyLimit.update({
                    where: {
                        userId: user.id
                    },
                    data: {
                        artlist: 0,
                        planCode: 0
                    }
                })
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

            const updateArtlistLimit = await prisma.artlistMonthlyLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    artlist: redeemCode.planCode === 44 ? 100 : redeemCode.planCode === 45 ? 200 : redeemCode.planCode === 46 ? 300 : 0,
                    planCode: redeemCode.planCode
                }
            });
        }

        if (group7.includes(redeemCode.planCode)) {
            const plans = await prisma.plan.findMany({
                where: {
                    userId: user.id,
                    planCode: {
                        in: group7
                    },
                    active: true,
                    endDate: {
                        gt: new Date()
                    }
                }
            });
            if (plans.length > 0) {
                const deactivatePlans = await prisma.plan.updateMany({
                    where: {
                        userId: user.id,
                        planCode: {
                            in: group7
                        }
                    },
                    data: {
                        active: false
                    }
                });

                const checkLimitDoc = await prisma.vectorStockLimit.findUnique({
                    where: {
                        userId: user.id
                    }
                });

                if (!checkLimitDoc) {
                    const createLimit = await prisma.vectorStockLimit.create({
                        data: {
                            userId: user.id,
                            vectorStock: 0,
                            planCode: 0
                        }
                    });
                }

                const updateLimit = await prisma.vectorStockLimit.update({
                    where: {
                        userId: user.id
                    },
                    data: {
                        vectorStock: 0,
                        planCode: 0
                    }
                })
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

            const updateVectorStockLimit = await prisma.vectorStockLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    vectorStock: redeemCode.planCode === 51 ? 10 : redeemCode.planCode === 52 ? 20 : redeemCode.planCode === 53 ? 30 : 0,
                    planCode: redeemCode.planCode
                }
            });
        }

        if (group8.includes(redeemCode.planCode)) {
            const plans = await prisma.plan.findMany({
                where: {
                    userId: user.id,
                    planCode: {
                        in: group8
                    },
                    active: true,
                    endDate: {
                        gt: new Date()
                    }
                }
            });
            if (plans.length > 0) {
                const deactivatePlans = await prisma.plan.updateMany({
                    where: {
                        userId: user.id,
                        planCode: {
                            in: group8
                        }
                    },
                    data: {
                        active: false
                    }
                });

                const checkLimitDoc = await prisma.vectorStockMonthlyLimit.findUnique({
                    where: {
                        userId: user.id
                    }
                });

                if (!checkLimitDoc) {
                    const createLimit = await prisma.vectorStockMonthlyLimit.create({
                        data: {
                            userId: user.id,
                            vectorStock: 0,
                            planCode: 0
                        }
                    });
                }

                const updateLimit = await prisma.vectorStockMonthlyLimit.update({
                    where: {
                        userId: user.id
                    },
                    data: {
                        vectorStock: 0,
                        planCode: 0
                    }
                })
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

            const updateVectorStockLimit = await prisma.vectorStockMonthlyLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    vectorStock: redeemCode.planCode === 54 ? 100 : redeemCode.planCode === 55 ? 200 : redeemCode.planCode === 56 ? 300 : 0,
                    planCode: redeemCode.planCode
                }
            });
        }

        if (group9.includes(redeemCode.planCode)) {
            return Response.json({
                message: 'Coming soon'
            }, {
                status: 200
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