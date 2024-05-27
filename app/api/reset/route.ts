import prisma from "@/app/libs/prismadb";

export async function POST (req: Request) {
    const body = await req.json();
    const {key} = body;
    try {
        if (!key) {
            return Response.json({
                message: 'Invalid request.'
            }, {
                status: 400
            })
        }

        if (key !== 'resetghfvuyedgchh') {
            return Response.json({
                message: 'Invalid key.'
            }, {
                status: 403
            })
        }

        const updateEnvatoLimits = await prisma.envatoLimit.updateMany({
            where: {
                planCode: 11
            },
            data: {
                envato: 10
            }
        });

        const updateEnvatoLimits2 = await prisma.envatoLimit.updateMany({
            where: {
                planCode: 21
            },
            data: {
                envato: 20
            }
        });

        const updateEnvatoLimits3 = await prisma.envatoLimit.updateMany({
            where: {
                planCode: 31
            },
            data: {
                envato: 30
            }
        });

        const updateFreepikLimits = await prisma.freePikLimit.updateMany({
            where: {
                planCode: 12
            },
            data: {
                freepik: 10
            }
        });

        const updateFreepikLimits2 = await prisma.freePikLimit.updateMany({
            where: {
                planCode: 22
            },
            data: {
                freepik: 20
            }
        });

        const updateFreepikLimits3 = await prisma.freePikLimit.updateMany({
            where: {
                planCode: 32
            },
            data: {
                freepik: 30
            }
        });

        const updateArtlistLimits = await prisma.artlistLimit.updateMany({
            where: {
                planCode: 41
            },
            data: {
                artlist: 10
            }
        });

        const updateArtlistLimits2 = await prisma.artlistLimit.updateMany({
            where: {
                planCode: 42
            },
            data: {
                artlist: 20
            }
        });

        const updateArtlistLimits3 = await prisma.artlistLimit.updateMany({
            where: {
                planCode: 43
            },
            data: {
                artlist: 30
            }
        });

        const updateVectorStockLimits = await prisma.vectorStockLimit.updateMany({
            where: {
                planCode: 51
            },
            data: {
                vectorStock: 10
            }
        });

        const updateVectorStockLimits2 = await prisma.vectorStockLimit.updateMany({
            where: {
                planCode: 52
            },
            data: {
                vectorStock: 20
            }
        });

        const updateVectorStockLimits3 = await prisma.vectorStockLimit.updateMany({
            where: {
                planCode: 53
            },
            data: {
                vectorStock: 30
            }
        });

        const envato = await prisma.envato.updateMany({
            data: {
                envato: 1
            }
        })

        const freePik = await prisma.freePik.updateMany({
            data: {
                freepik: 1
            }
        });

        const artlist = await prisma.artlist.updateMany({
            data: {
                artlist: 1
            }
        });


        const vectorStock = await prisma.vectorStock.updateMany({
            data: {
                vectorStock: 1
            }
        });

        const adobestock = await prisma.adobestock.updateMany({
            data: {
                adobestock: 1
            }
        });

        return Response.json({
            message: 'User limits updated successfully.'
        }, {
            status: 200
        });

    } catch (error) {
        return Response.json({
            message: 'Something went wrong.'
        }, {
            status: 500
        })
    }

}