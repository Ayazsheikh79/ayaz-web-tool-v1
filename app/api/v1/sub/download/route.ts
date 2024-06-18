import prisma from "@/app/libs/prismadb";
import tools from "@/app/data/subscription-tools";
import axios from "axios";

export async function POST(req: Request) {
    const body = await req.json();
    const {email, url, path} = body;
    try {
        if (!email || !url) {
            return Response.json({
                message: 'Invalid Request'
            }, {
                status: 400
            });
        }
        const user = await prisma.user.findUnique({
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
        const tool = tools.find((tool) => url.includes(tool.url));
        if (!tool) {
            return Response.json({
                message: 'Invalid URL'
            }, {
                status: 404
            });
        }
        if (tool.path !== path) {
            return Response.json({
                message: 'Invalid URL'
            }, {
                status: 400
            });
        }

        const toolIndex = tools.findIndex((tool) => url.includes(tool.url));
        const dailyPlan = await prisma.plan.findMany({
            where: {
                userId: user.id,
                endDate: {
                    gt: new Date()
                },
                code: {
                    in: [1, 2, 3, 4]
                }
            }
        })
        if (dailyPlan.length < 1) {
            await prisma.dailyLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    limit: 0,
                    code: 0
                }
            })
        }
        const monthlyPlan = await prisma.plan.findMany({
            where: {
                userId: user.id,
                endDate: {
                    gt: new Date()
                },
                code: {
                    in: [5, 6, 7, 8]
                }
            }
        })
        if (monthlyPlan.length < 1) {
            await prisma.monthlyLimit.update({
                where: {
                    userId: user.id
                },
                data: {
                    limit: 0,
                    code: 0
                }
            })
        }
        if (dailyPlan.length < 0 && monthlyPlan.length < 0) {
            return Response.json({
                message: 'No active plan'
            }, {
                status: 400
            });
        }
        const dailyLimit = await prisma.dailyLimit.findUnique({
            where: {
                userId: user.id
            }
        });
        if (!dailyLimit) {
            return Response.json({
                message: 'Something went wrong'
            }, {
                status: 400
            });
        }
        const monthlyLimit = await prisma.monthlyLimit.findUnique({
            where: {
                userId: user.id
            }
        });
        if (!monthlyLimit) {
            return Response.json({
                message: 'Something went wrong'
            }, {
                status: 400
            });
        }
        if (dailyLimit.limit === 0 && monthlyLimit.limit === 0) {
            return Response.json({
                message: 'You have reached your limit. Please try again later'
            }, {
                status: 400
            })
        }

        if (toolIndex === 0) {
            try {
                const res = await axios.post(`${process.env.NEXTAUTH_URL}/api/download/envato`, {
                    url
                });
                if (!res.data.success) {
                    return Response.json({
                        message: 'Failed to download file'
                    }, {
                        status: 400
                    })
                }

                if (dailyLimit.limit < 1) {
                    await prisma.monthlyLimit.update({
                        where: {
                            userId: user.id
                        },
                        data: {
                            limit: {
                                decrement: 1
                            }
                        }
                    })
                }

                if (dailyLimit.limit > 0) {
                    await prisma.dailyLimit.update({
                        where: {
                            userId: user.id
                        },
                        data: {
                            limit: {
                                decrement: 1
                            }
                        }
                    })
                }

                return Response.json({
                    success: true,
                    message: 'Downloaded',
                    downloadURLs: [
                        {type: 'file', url: res.data.data.downloadLink}
                    ]
                }, {
                    status: 200
                })
            } catch (e) {
                return Response.json({
                    message: 'Failed to download file'
                }, {
                    status: 400
                })
            }
        }
        if (toolIndex === 1) {
            try {
                const res = await axios.post(`${process.env.NEXTAUTH_URL}/api/download/freepik`, {
                    url
                });
                if (!res.data.success) {
                    return Response.json({
                        message: 'Failed to download file'
                    }, {
                        status: 400
                    })
                }

                if (dailyLimit.limit < 1) {
                    await prisma.monthlyLimit.update({
                        where: {
                            userId: user.id
                        },
                        data: {
                            limit: {
                                decrement: 1
                            }
                        }
                    })
                }

                if (dailyLimit.limit > 0) {
                    await prisma.dailyLimit.update({
                        where: {
                            userId: user.id
                        },
                        data: {
                            limit: {
                                decrement: 1
                            }
                        }
                    })
                }
                return Response.json({
                    success: true,
                    message: 'Downloaded',
                    downloadURLs: [
                        {type: 'file', url: res.data.data.downloadLink}
                    ]
                }, {
                    status: 200
                })
            } catch (e) {
                return Response.json({
                    message: 'Failed to download file'
                }, {
                    status: 400
                })
            }
        }
        if (toolIndex === 2) {
            try {
                const res = await axios.post(`${process.env.NEXTAUTH_URL}/api/download/adobe-image`, {
                    url
                });
                if (!res.data.success) {
                    return Response.json({
                        message: 'Failed to download file'
                    }, {
                        status: 400
                    })
                }

                if (dailyLimit.limit < 1) {
                    await prisma.monthlyLimit.update({
                        where: {
                            userId: user.id
                        },
                        data: {
                            limit: {
                                decrement: 1
                            }
                        }
                    })
                }

                if (dailyLimit.limit > 0) {
                    await prisma.dailyLimit.update({
                        where: {
                            userId: user.id
                        },
                        data: {
                            limit: {
                                decrement: 1
                            }
                        }
                    })
                }
                return Response.json({
                    success: true,
                    message: 'Downloaded',
                    downloadURLs: [
                        {type: 'file', url: res.data.data.downloadLink}
                    ]
                }, {
                    status: 200
                })
            } catch (e) {
                return Response.json({
                    message: 'Failed to download file'
                }, {
                    status: 400
                })
            }
        }
        if (toolIndex === 3) {
            try {
                const res = await axios.post(`${process.env.NEXTAUTH_URL}/api/download/creative-fabrica`, {
                    url
                });
                if (!res.data.success) {
                    return Response.json({
                        message: 'Failed to download file'
                    }, {
                        status: 400
                    })
                }

                if (dailyLimit.limit < 1) {
                    await prisma.monthlyLimit.update({
                        where: {
                            userId: user.id
                        },
                        data: {
                            limit: {
                                decrement: 1
                            }
                        }
                    })
                }

                if (dailyLimit.limit > 0) {
                    await prisma.dailyLimit.update({
                        where: {
                            userId: user.id
                        },
                        data: {
                            limit: {
                                decrement: 1
                            }
                        }
                    })
                }
                return Response.json({
                    success: true,
                    message: 'Downloaded',
                    downloadURLs: [
                        {type: 'file', url: res.data.data.downloadURL}
                    ]
                }, {
                    status: 200
                })
            } catch (e) {
                return Response.json({
                    message: 'Failed to download file'
                }, {
                    status: 400
                })
            }
        }
        if (toolIndex === 4) {
            try {
                const res = await axios.post(`${process.env.NEXTAUTH_URL}/api/download/artlist-music`, {
                    url
                });
                if (!res.data.success) {
                    return Response.json({
                        message: 'Failed to download file'
                    }, {
                        status: 400
                    })
                }

                if (dailyLimit.limit < 1) {
                    await prisma.monthlyLimit.update({
                        where: {
                            userId: user.id
                        },
                        data: {
                            limit: {
                                decrement: 1
                            }
                        }
                    })
                }

                if (dailyLimit.limit > 0) {
                    await prisma.dailyLimit.update({
                        where: {
                            userId: user.id
                        },
                        data: {
                            limit: {
                                decrement: 1
                            }
                        }
                    })
                }
                return Response.json({
                    success: true,
                    message: 'Downloaded',
                    downloadURLs: [
                        {type: 'wav', url: res.data.data.data.wav.downloadUrls[0]},
                        {type: 'mp3', url: res.data.data.data.mp3.downloadUrls[0]},
                    ]
                }, {
                    status: 200
                })
            } catch (e) {
                console.log(e)
                return Response.json({
                    message: 'Failed to download file'
                }, {
                    status: 400
                })
            }
        }
        if (toolIndex === 5) {
            try {
                const res = await axios.post(`${process.env.NEXTAUTH_URL}/api/download/artlist-footage`, {
                    url
                });
                if (!res.data.success) {
                    return Response.json({
                        message: 'Failed to download file'
                    }, {
                        status: 400
                    })
                }

                if (dailyLimit.limit < 1) {
                    await prisma.monthlyLimit.update({
                        where: {
                            userId: user.id
                        },
                        data: {
                            limit: {
                                decrement: 1
                            }
                        }
                    })
                }

                if (dailyLimit.limit > 0) {
                    await prisma.dailyLimit.update({
                        where: {
                            userId: user.id
                        },
                        data: {
                            limit: {
                                decrement: 1
                            }
                        }
                    })
                }
                return Response.json({
                    success: true,
                    message: 'Downloaded',
                    downloadURLs: [
                        {type: 'hd', url: res.data.data.data.hd.downloadUrls[0]},
                        {type: 'proRes4k', url: res.data.data.data.proRes4k.downloadUrls[0]},
                        {type: 'mp4_4k', url: res.data.data.data.mp4_4k.downloadUrls[0]},
                    ]
                }, {
                    status: 200
                })
            } catch (e) {
                console.log(e)
                return Response.json({
                    message: 'Failed to download file'
                }, {
                    status: 400
                })
            }
        }
        if (toolIndex === 6) {
            try {
                const res = await axios.post(`${process.env.NEXTAUTH_URL}/api/download/artlist-sfx`, {
                    url
                });
                if (!res.data.success) {
                    return Response.json({
                        message: 'Failed to download file'
                    }, {
                        status: 400
                    })
                }

                if (dailyLimit.limit < 1) {
                    await prisma.monthlyLimit.update({
                        where: {
                            userId: user.id
                        },
                        data: {
                            limit: {
                                decrement: 1
                            }
                        }
                    })
                }

                if (dailyLimit.limit > 0) {
                    await prisma.dailyLimit.update({
                        where: {
                            userId: user.id
                        },
                        data: {
                            limit: {
                                decrement: 1
                            }
                        }
                    })
                }
                return Response.json({
                    success: true,
                    message: 'Downloaded',
                    downloadURLs: [
                        {type: 'wav', url: res.data.data.data.wav.downloadUrls[0]},
                        {type: 'aac', url: res.data.data.data.aac.downloadUrls[0]},
                    ]
                }, {
                    status: 200
                })
            } catch (e) {
                console.log(e)
                return Response.json({
                    message: 'Failed to download file'
                }, {
                    status: 400
                })
            }
        }
        if (toolIndex === 7) {
            try {
                const res = await axios.post(`${process.env.NEXTAUTH_URL}/api/download/artlist-templates`, {
                    url
                });
                if (!res.data.success) {
                    return Response.json({
                        message: 'Failed to download file'
                    }, {
                        status: 400
                    })
                }

                if (dailyLimit.limit < 1) {
                    await prisma.monthlyLimit.update({
                        where: {
                            userId: user.id
                        },
                        data: {
                            limit: {
                                decrement: 1
                            }
                        }
                    })
                }

                if (dailyLimit.limit > 0) {
                    await prisma.dailyLimit.update({
                        where: {
                            userId: user.id
                        },
                        data: {
                            limit: {
                                decrement: 1
                            }
                        }
                    })
                }
                let downloadURLs = [];

                if (res.data.data.data.finalCutPro.downloadUrls[0] !== 'NA') {
                    downloadURLs.push({ type: 'final cut pro', url: res.data.data.data.finalCutPro.downloadUrls[0] });
                }

                if (res.data.data.data.premierePro.downloadUrls[0] !== 'NA') {
                    downloadURLs.push({ type: 'premiere pro', url: res.data.data.data.premierePro.downloadUrls[0] });
                }

                if (res.data.data.data.afterEffects.downloadUrls[0] !== 'NA') {
                    downloadURLs.push({ type: 'after effects', url: res.data.data.data.afterEffects.downloadUrls[0] });
                }

                return Response.json({
                    success: true,
                    message: 'Downloaded',
                    downloadURLs: downloadURLs
                }, {
                    status: 200
                })
            } catch (e) {
                console.log(e)
                return Response.json({
                    message: 'Failed to download file'
                }, {
                    status: 400
                })
            }
        }
        if (toolIndex === 8) {
            try {
                const res = await axios.post(`${process.env.NEXTAUTH_URL}/api/download/artgrid`, {
                    url
                });
                if (!res.data.success) {
                    return Response.json({
                        message: 'Failed to download file'
                    }, {
                        status: 400
                    })
                }

                if (dailyLimit.limit < 1) {
                    await prisma.monthlyLimit.update({
                        where: {
                            userId: user.id
                        },
                        data: {
                            limit: {
                                decrement: 1
                            }
                        }
                    })
                }

                if (dailyLimit.limit > 0) {
                    await prisma.dailyLimit.update({
                        where: {
                            userId: user.id
                        },
                        data: {
                            limit: {
                                decrement: 1
                            }
                        }
                    })
                }
                return Response.json({
                    success: true,
                    message: 'Downloaded',
                    downloadURLs: [
                        {type: 'hd', url: res.data.data.data.hd.downloadUrls[0]},
                        {type: '4k prores', url: res.data.data.data.proRes4k.downloadUrls[0]},
                        {type: '4k mp4', url: res.data.data.data.mp4_4k.downloadUrls[0]},
                    ]
                }, {
                    status: 200
                })
            } catch (e) {
                console.log(e)
                return Response.json({
                    message: 'Failed to download file'
                }, {
                    status: 400
                })
            }
        }
        if (toolIndex === 9) {
            try {
                const res = await axios.post(`${process.env.NEXTAUTH_URL}/api/download/pixeden`, {
                    url
                });

                if (!res.data.success) {
                    return Response.json({
                        message: 'Failed to download file'
                    }, {
                        status: 400
                    })
                }

                if (dailyLimit.limit < 1) {
                    await prisma.monthlyLimit.update({
                        where: {
                            userId: user.id
                        },
                        data: {
                            limit: {
                                decrement: 1
                            }
                        }
                    })
                }

                if (dailyLimit.limit > 0) {
                    await prisma.dailyLimit.update({
                        where: {
                            userId: user.id
                        },
                        data: {
                            limit: {
                                decrement: 1
                            }
                        }
                    })
                }

                return Response.json({
                    success: true,
                    message: 'Downloaded',
                    downloadURLs: [
                        {type: 'file', url: res.data.data.downloadUrl}
                    ]
                }, {
                    status: 200
                })
            } catch (e) {
                return Response.json({
                    message: 'Failed to download file'
                }, {
                    status: 400
                })
            }
        }
        if (toolIndex === 10) {
            try {
                const res = await axios.post(`${process.env.NEXTAUTH_URL}/api/download/vecteezy`, {
                    url
                });

                if (!res.data.success) {
                    return Response.json({
                        message: 'Failed to download file'
                    }, {
                        status: 400
                    })
                }

                if (dailyLimit.limit < 1) {
                    await prisma.monthlyLimit.update({
                        where: {
                            userId: user.id
                        },
                        data: {
                            limit: {
                                decrement: 1
                            }
                        }
                    })
                }

                if (dailyLimit.limit > 0) {
                    await prisma.dailyLimit.update({
                        where: {
                            userId: user.id
                        },
                        data: {
                            limit: {
                                decrement: 1
                            }
                        }
                    })
                }

                return Response.json({
                    success: true,
                    message: 'Downloaded',
                    downloadURLs: [
                        {type: 'file', url: res.data.data.data.url}
                    ]
                }, {
                    status: 200
                })
            } catch (e) {
                return Response.json({
                    message: 'Failed to download file'
                }, {
                    status: 400
                })
            }
        }

        return Response.json({
            success: true,
        }, {
            status: 200
        });

    } catch (e) {
        console.log(e)
        return Response.json({
            success: false,
            message: 'Internal Server Error'
        }, {
            status: 500
        })
    }
}