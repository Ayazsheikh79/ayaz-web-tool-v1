import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
    const body = await req.json();
    const {telegramId, username} = body;
    try {
        if (!telegramId) {
            return Response.json({
                message: 'Invalid request body',
            }, {
                status: 400
            });
        }

        const telegramUser = await prisma.telegramUser.findUnique({
            where: {
                telegramId: telegramId
            }
        });

        if (!telegramUser) {
            const telegramUser = await prisma.telegramUser.create({
                data: {
                    telegramId: telegramId,
                    username: username
                }
            })

            const envato = await prisma.envato.create({
                data: {
                    userId: telegramUser.id
                }
            });

            const freepik = await prisma.freePik.create({
                data: {
                    userId: telegramUser.id
                }
            });

            const artlist = await prisma.artlist.create({
                data: {
                    userId: telegramUser.id
                }
            });

            const vectorStock = await prisma.vectorStock.create({
                data: {
                    userId: telegramUser.id
                }
            });

            const adobeStock = await prisma.adobestock.create({
                data: {
                    userId: telegramUser.id
                }
            });

            return Response.json({
                message: 'User registered successfully',
                data: {
                    user: telegramUser,
                    envato: envato,
                    freepik: freepik,
                    artlist: artlist,
                    vectorStock: vectorStock,
                    adobeStock: adobeStock
                }
            }, {
                status: 200
            });
        }

        let envato = await prisma.envato.findUnique({
            where: {
                userId: telegramUser.id
            }
        });

        if (!envato) {
            envato = await prisma.envato.create({
                data: {
                    userId: telegramUser.id
                }
            });
        }

        let freepik = await prisma.freePik.findUnique({
            where: {
                userId: telegramUser.id
            }
        });

        if (!freepik) {
            freepik = await prisma.freePik.create({
                data: {
                    userId: telegramUser.id
                }
            });
        }

        let artlist = await prisma.artlist.findUnique({
            where: {
                userId: telegramUser.id
            }
        });

        if (!artlist) {
            artlist = await prisma.artlist.create({
                data: {
                    userId: telegramUser.id
                }
            });
        }

        let vectorStock = await prisma.vectorStock.findUnique({
            where: {
                userId: telegramUser.id
            }
        });

        if (!vectorStock) {
            vectorStock = await prisma.vectorStock.create({
                data: {
                    userId: telegramUser.id
                }
            });
        }

        let adobeStock = await prisma.adobestock.findUnique({
            where: {
                userId: telegramUser.id
            }
        });

        if (!adobeStock) {
            adobeStock = await prisma.adobestock.create({
                data: {
                    userId: telegramUser.id
                }
            });
        }

        return Response.json({
            message: 'User Fetch successfully',
            data: {
                user: telegramUser,
                envato: envato,
                freepik: freepik,
                artlist: artlist,
                vectorStock: vectorStock,
                adobeStock: adobeStock
            }
        }, {
            status: 200
        });

    } catch (error) {
        console.log(error);
        return Response.json({
            message: 'Internal server error',
            error: error
        }, {
            status: 500
        });
    }
}