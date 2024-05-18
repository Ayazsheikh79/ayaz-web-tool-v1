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