import prisma from "@/app/libs/prismadb";
import axios from "axios";

export async function POST(req: Request) {
    const body = await req.json();
    const { id, url, username } = body;
    try {
        if (!id || !url) {
            return Response.json({
                message: 'Invalid Request',
            }, {
                status: 400
            })
        }

        let tgUser = await prisma.telegramUser.findUnique({
            where: {
                telegramId: id
            }
        });

        if (!tgUser) {
            const register = await axios.post('https://tuitionlink.in/api/telegram/register', {
                telegramId: id,
                username
            });
        }

        tgUser = await prisma.telegramUser.findUnique({
            where: {
                telegramId: id
            }
        });

        if (!tgUser) {
            return Response.json({
                message: 'User not found',
            }, {
                status: 400
            })
        }

        const freepik = await prisma.freePik.findUnique({
            where: {
                userId: tgUser.id
            }
        });

        if (!freepik) {
            return Response.json({
                message: 'Something went wrong',
            }, {
                status: 400
            })
        }

        if (freepik.freepik <= 0) {
            return Response.json({
                message: 'You have reached your download limit. Please try again later. Limit resets at 12:00 AM UTC',
            }, {
                status: 400
            })
        }

        const link = url.split('#')[0];
        const fileId = url.split('_')[1].split('.')[0];

        if (!fileId) {
            return Response.json({
                message: 'Invalid URL',
            }, {
                status: 400
            })
        }

        const res = await axios.get(`https://server-4-9ctr2.ondigitalocean.app/api/freepik?fileId=${fileId}`)

        if (!res.data.success) {
            return Response.json({
                message: 'FreePik is out of stock for today. Please try again tomorrow',
            }, {
                status: 400
            })
        }

        const updateFreepik = await prisma.freePik.update({
            where: {
                userId: tgUser.id
            },
            data: {
                freepik: {
                    decrement: 1
                }
            }
        });

        return Response.json({
            message: 'File downloaded successfully',
            data: res.data,
        }, {
            status: 200
        })

    } catch (error) {
        console.log(error);
        return Response.json ({
            message: 'Internal Server Error',
        }, {
            status: 500
        })
    }
}