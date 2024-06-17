import prisma from "@/app/libs/prismadb";

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const code = searchParams.get('code');
    try {
        if (!code) {
            return Response.json({
                message: 'Invalid Request'
            }, {
                status: 400
            })
        }

        const redeemCode = await prisma.redeemCode.findUnique({
            where: {
                code: code
            }
        });

        if (!redeemCode) {
            return Response.json({
                message: 'Redeem code not found',
                success: false
            }, {
                status: 404
            });
        }

        if (!redeemCode.active) {
            return Response.json({
                message: 'Redeem code already redeemed',
                success: false
            }, {
                status: 200
            });
        }

        return Response.json({
            message: 'Success',
            success: true,
        }, {
            status: 200
        });

    } catch (error) {
        console.error(error);
        return Response.json({
            message: 'Internal Server Error',
            success: false
        }, {
            status: 500
        })
    }
}