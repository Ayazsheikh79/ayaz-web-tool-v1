import prisma from "@/app/libs/prismadb";
import providers from "@/app/data/providers";
import axios from "axios";
import * as crypto from "node:crypto";

export async function POST(req: Request) {
    const body = await req.json();
    const {email, url} = body;
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
        const tool = providers.find((tool) => url.includes(tool.url));

        if (!tool) {
            return Response.json({
                message: 'Invalid URL'
            }, {
                status: 404
            });
        }

        const toolIndex = providers.findIndex((tool) => url.includes(tool.url));

        console.log(toolIndex)
        console.log(tool)

        const userCredits = await prisma.credit.findUnique({
            where: {
                userId: user.id
            }
        });

        if (!userCredits) {
            return Response.json({
                message: 'Server Error'
            }, {
                status: 500
            });
        }

        if (userCredits.amount < tool.price) {
            return Response.json({
                message: 'Insufficient Credits'
            }, {
                status: 400
            });
        }

        if (toolIndex === 0 || toolIndex === 7 || toolIndex === 8 || toolIndex === 9 || toolIndex === 10 || toolIndex === 11 || toolIndex === 12 || toolIndex === 13 || toolIndex === 14 || toolIndex === 15 || toolIndex === 16 || toolIndex === 17 || toolIndex === 18 || toolIndex === 23 || toolIndex === 24 || toolIndex === 32 || toolIndex === 33 || toolIndex === 34 || toolIndex === 35) {
            try {
                const res = await axios.post(`${process.env.NEXTAUTH_URL}/api/download/ondemand`, {url})

                const dlCode = await crypto.randomBytes(16).toString('hex');

                const createDownload = await prisma.download.create({
                    data: {
                        url,
                        dlUrl: res.data.data.downloadLink,
                        dlCode,
                        userId: user.id,
                        name: tool.provider
                    }
                })

                const updateCredits = await prisma.credit.update({
                    where: {
                        userId: user.id
                    },
                    data: {
                        amount: parseFloat((userCredits.amount - tool.price).toFixed(2))
                    }
                });

                return Response.json({
                    success: true,
                    message: 'Downloaded',
                    downloadURLs: [
                        {
                            type: 'Download',
                            url: `${process.env.NEXTAUTH_URL}/api/v1/download?dlcode=${dlCode}`
                        }
                    ]
                }, {
                    status: 200
                });

            } catch (e) {
                console.log(e)
                return Response.json({
                    success: false,
                    message: 'Failed to download'
                }, {
                    status: 500
                })
            }
        }

        if (toolIndex === 1) {
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


                const formats = ['wav', 'mp3'];


                let dlCodeWav;
                let dlCodeMp3;

                for (const format of formats) {
                    if (res.data.data.data[format] && res.data.data.data[format].success) {
                        const dlCode = await crypto.randomBytes(16).toString('hex');
                        const downloadUrl = res.data.data.data[format].downloadUrls[0];

                        const createDownload = await prisma.download.create({
                            data: {
                                url,
                                dlUrl: downloadUrl,
                                userId: user.id,
                                name: tool.provider,
                                dlCode,
                                type: format
                            }
                        });
                        if (format === 'wav') {
                            dlCodeWav = dlCode;
                        } else if (format === 'mp3') {
                            dlCodeMp3 = dlCode;
                        }
                    }
                }

                const updateCredits = await prisma.credit.update({
                    where: {
                        userId: user.id
                    },
                    data: {
                        amount: parseFloat((userCredits.amount - tool.price).toFixed(2))
                    }
                });

                return Response.json({
                    success: true,
                    message: 'Downloaded',
                    downloadURLs: [
                        {type: 'wav', url: `${process.env.NEXTAUTH_URL}/api/v1/download?dlcode=${dlCodeWav}`},
                        {type: 'mp3', url: `${process.env.NEXTAUTH_URL}/api/v1/download?dlcode=${dlCodeMp3}`},
                    ]
                }, {
                    status: 200
                })
            } catch (e) {
                console.log(e)
                return Response.json({
                    success: false,
                    message: 'Failed to download'
                }, {
                    status: 500
                })
            }
        }
        if (toolIndex === 2) {
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

                const formats = ['hd', 'proRes4k', 'mp4_4k'];

                let dlCodeHd;
                let dlCodeProRes4k;
                let dlCodeMp4_4k;

                for (const format of formats) {
                    if (res.data.data.data[format] && res.data.data.data[format].success) {
                        const dlCode = await crypto.randomBytes(16).toString('hex');
                        const downloadUrl = res.data.data.data[format].downloadUrls[0];

                        const createDownload = await prisma.download.create({
                            data: {
                                url,
                                dlUrl: downloadUrl,
                                userId: user.id,
                                name: tool.provider,
                                dlCode,
                                type: format
                            }
                        });
                        if (format === 'hd') {
                            dlCodeHd = dlCode;
                        } else if (format === 'proRes4k') {
                            dlCodeProRes4k = dlCode;
                        } else if (format === 'mp4_4k') {
                            dlCodeMp4_4k = dlCode;
                        }
                    }
                }

                const updateCredits = await prisma.credit.update({
                    where: {
                        userId: user.id
                    },
                    data: {
                        amount: parseFloat((userCredits.amount - tool.price).toFixed(2))
                    }
                });

                return Response.json({
                    success: true,
                    message: 'Downloaded',
                    downloadURLs: [
                        {type: 'hd', url: `${process.env.NEXTAUTH_URL}/api/v1/download?dlcode=${dlCodeHd}`},
                        {type: 'proRes4k', url: `${process.env.NEXTAUTH_URL}/api/v1/download?dlcode=${dlCodeProRes4k}`},
                        {type: 'mp4_4kmp4_4k', url: `${process.env.NEXTAUTH_URL}/api/v1/download?dlcode=${dlCodeMp4_4k}`},
                    ]
                }, {
                    status: 200
                })
            } catch (e) {
                console.log(e)
                return Response.json({
                    success: false,
                    message: 'Failed to download'
                }, {
                    status: 500
                })
            }
        }
        if (toolIndex === 3) {
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

                console.log(res.data.data)

                const formats = ['wav', 'aac',];

               let dlCodeWav;
               let dlCodeAac;

                for (const format of formats) {
                    if (res.data.data.data[format] && res.data.data.data[format].success) {
                        const dlCode = await crypto.randomBytes(16).toString('hex');
                        const downloadUrl = res.data.data.data[format].downloadUrls[0];

                        const createDownload = await prisma.download.create({
                            data: {
                                url,
                                dlUrl: downloadUrl,
                                userId: user.id,
                                name: tool.provider,
                                dlCode,
                                type: format
                            }
                        });
                        if (format === 'wav') {
                            dlCodeWav = dlCode;
                        } else if (format === 'aac') {
                            dlCodeAac = dlCode;
                        }
                    }
                }

                const updateCredits = await prisma.credit.update({
                    where: {
                        userId: user.id
                    },
                    data: {
                        amount: parseFloat((userCredits.amount - tool.price).toFixed(2))
                    }
                });

                return Response.json({
                    success: true,
                    message: 'Downloaded',
                    downloadURLs: [
                        {type: 'wav', url: `${process.env.NEXTAUTH_URL}/api/v1/download?dlcode=${dlCodeWav}`},
                        {type: 'aac', url: `${process.env.NEXTAUTH_URL}/api/v1/download?dlcode=${dlCodeAac}`},
                    ]
                }, {
                    status: 200
                })
            } catch (e) {
                // console.log(e)
                return Response.json({
                    success: false,
                    message: 'Failed to download'
                }, {
                    status: 500
                })
            }
        }
        if (toolIndex === 4) {
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

                let dlCodeFinalCutPro:any;
                let dlCodePremierePro:any;
                let dlCodeAfterEffects:any;

                for (const download of downloadURLs) {
                    const dlCode = await crypto.randomBytes(16).toString('hex');

                    const createDownload = await prisma.download.create({
                        data: {
                            url,
                            dlUrl: download.url,
                            userId: user.id,
                            name: tool.provider,
                            dlCode,
                            type: download.type
                        }
                    });

                    if (download.type === 'final cut pro') {
                        dlCodeFinalCutPro = dlCode;
                    } else if (download.type === 'premiere pro') {
                        dlCodePremierePro = dlCode;
                    } else if (download.type === 'after effects') {
                        dlCodeAfterEffects = dlCode;
                    }

                }


                const updateCredits = await prisma.credit.update({
                    where: {
                        userId: user.id
                    },
                    data: {
                        amount: parseFloat((userCredits.amount - tool.price).toFixed(2))
                    }
                });

                return Response.json({
                    success: true,
                    message: 'Downloaded',
                    downloadURLs: downloadURLs.map((download) => ({
                        type: download.type,
                        url: `${process.env.NEXTAUTH_URL}/api/v1/download?dlcode=${download.type === 'final cut pro' ? dlCodeFinalCutPro : download.type === 'premiere pro' ? dlCodePremierePro : dlCodeAfterEffects}`
                    }))
                }, {
                    status: 200
                });
            } catch (e) {
                console.log(e)
                return Response.json({
                    success: false,
                    message: 'Failed to download'
                }, {
                    status: 500
                })
            }
        }
        if (toolIndex === 5) {
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
                const formats = ['hd', 'proRes4k', 'mp4_4k'];

                let dlCodeHd;
                let dlCodeProRes4k;
                let dlCodeMp4_4k;

                for (const format of formats) {
                    if (res.data.data.data[format] && res.data.data.data[format].success) {
                        const dlCode = await crypto.randomBytes(16).toString('hex');
                        const downloadUrl = res.data.data.data[format].downloadUrls[0];

                        const createDownload = await prisma.download.create({
                            data: {
                                url,
                                dlUrl: downloadUrl,
                                userId: user.id,
                                name: tool.provider,
                                dlCode,
                                type: format
                            }
                        });
                        if (format === 'hd') {
                            dlCodeHd = dlCode;
                        } else if (format === 'proRes4k') {
                            dlCodeProRes4k = dlCode;
                        } else if (format === 'mp4_4k') {
                            dlCodeMp4_4k = dlCode;
                        }
                    }
                }

                const updateCredits = await prisma.credit.update({
                    where: {
                        userId: user.id
                    },
                    data: {
                        amount: parseFloat((userCredits.amount - tool.price).toFixed(2))
                    }
                });

                return Response.json({
                    success: true,
                    message: 'Downloaded',
                    downloadURLs: [
                        {type: 'hd', url: `${process.env.NEXTAUTH_URL}/api/v1/download?dlcode=${dlCodeHd}`},
                        {type: 'proRes4k', url: `${process.env.NEXTAUTH_URL}/api/v1/download?dlcode=${dlCodeProRes4k}`},
                        {type: 'mp4_4kmp4_4k', url: `${process.env.NEXTAUTH_URL}/api/v1/download?dlcode=${dlCodeMp4_4k}`},
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

                const dlCode = await crypto.randomBytes(16).toString('hex');

                const createDownload = await prisma.download.create({
                    data: {
                        url,
                        dlUrl: res.data.data.downloadURL,
                        userId: user.id,
                        name: tool.provider,
                        dlCode
                    }
                });

                const updateCredits = await prisma.credit.update({
                    where: {
                        userId: user.id
                    },
                    data: {
                        amount: parseFloat((userCredits.amount - tool.price).toFixed(2))
                    }
                });

                return Response.json({
                    success: true,
                    message: 'Downloaded',
                    downloadURLs: [
                        {type: 'Download', url: `${process.env.NEXTAUTH_URL}/api/v1/download?dlcode=${dlCode}`}
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
        if (toolIndex === 25) {
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

                const dlCode = await crypto.randomBytes(16).toString('hex');

                const createDownload = await prisma.download.create({
                    data: {
                        url,
                        dlUrl: res.data.data.data.url,
                        userId: user.id,
                        name: tool.provider,
                        dlCode
                    }
                });

                const updateCredits = await prisma.credit.update({
                    where: {
                        userId: user.id
                    },
                    data: {
                        amount: parseFloat((userCredits.amount - tool.price).toFixed(2))
                    }
                });

                return Response.json({
                    success: true,
                    message: 'Downloaded',
                    downloadURLs: [
                        {type: 'Download', url: `${process.env.NEXTAUTH_URL}/api/v1/download?dlcode=${dlCode}`}
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
        if (toolIndex === 26) {
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

                const dlCode = await crypto.randomBytes(16).toString('hex');

                const createDownload = await prisma.download.create({
                    data: {
                        url,
                        dlUrl: res.data.data.downloadLink,
                        userId: user.id,
                        name: tool.provider,
                        dlCode
                    }
                });

                const updateCredits = await prisma.credit.update({
                    where: {
                        userId: user.id
                    },
                    data: {
                        amount: parseFloat((userCredits.amount - tool.price).toFixed(2))
                    }
                });

                return Response.json({
                    success: true,
                    message: 'Downloaded',
                    downloadURLs: [
                        {type: 'Download', url: `${process.env.NEXTAUTH_URL}/api/v1/download?dlcode=${dlCode}`}
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
        if (toolIndex === 27) {
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

                const dlCode = await crypto.randomBytes(16).toString('hex');

                const createDownload = await prisma.download.create({
                    data: {
                        url,
                        dlUrl: res.data.data.downloadLink,
                        userId: user.id,
                        name: tool.provider,
                        dlCode
                    }
                });

                const updateCredits = await prisma.credit.update({
                    where: {
                        userId: user.id
                    },
                    data: {
                        amount: parseFloat((userCredits.amount - tool.price).toFixed(2))
                    }
                });

                return Response.json({
                    success: true,
                    message: 'Downloaded',
                    downloadURLs: [
                        {type: 'Download', url: `${process.env.NEXTAUTH_URL}/api/v1/download?dlcode=${dlCode}`}
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
        if (toolIndex === 30) {
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

                const dlCode = await crypto.randomBytes(16).toString('hex');

                const createDownload = await prisma.download.create({
                    data: {
                        url,
                        dlUrl: res.data.data.downloadLink,
                        userId: user.id,
                        name: tool.provider,
                        dlCode
                    }
                });

                const updateCredits = await prisma.credit.update({
                    where: {
                        userId: user.id
                    },
                    data: {
                        amount: parseFloat((userCredits.amount - tool.price).toFixed(2))
                    }
                });

                return Response.json({
                    success: true,
                    message: 'Downloaded',
                    downloadURLs: [
                        {type: 'Download', url: `${process.env.NEXTAUTH_URL}/api/v1/download?dlcode=${dlCode}`}
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
        if (toolIndex === 31) {
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

                const dlCode = await crypto.randomBytes(16).toString('hex');

                const createDownload = await prisma.download.create({
                    data: {
                        url,
                        dlUrl: res.data.data.downloadUrl,
                        userId: user.id,
                        name: tool.provider,
                        dlCode
                    }
                });

                const updateCredits = await prisma.credit.update({
                    where: {
                        userId: user.id
                    },
                    data: {
                        amount: parseFloat((userCredits.amount - tool.price).toFixed(2))
                    }
                });

                return Response.json({
                    success: true,
                    message: 'Downloaded',
                    downloadURLs: [
                        {type: 'Download', url: `${process.env.NEXTAUTH_URL}/api/v1/download?dlcode=${dlCode}`}
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

        if (toolIndex === 19 || toolIndex === 20 || toolIndex === 21 || toolIndex === 22 || toolIndex === 28 || toolIndex === 29) {
            return  Response.json({
                message: 'Please contact to buy this file'
            }, {
                status: 400
            })
        }

        return Response.json({
            message: 'Invalid URL! If you think this is a mistake, please contact us.',
        }, {
            status: 400
        });

    } catch (e) {
        console.log(e)
        return Response.json({
            success: false,
            message: 'Failed to download or Invalid URL'
        }, {
            status: 500
        })
    }
}