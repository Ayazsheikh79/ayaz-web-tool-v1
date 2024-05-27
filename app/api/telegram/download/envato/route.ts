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
            const register = axios.post('https://tuitionlink.in/api/telegram/register', {
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

        const envato = await prisma.envato.findUnique({
            where: {
                userId: tgUser.id
            }
        });

        if (!envato) {
            return Response.json({
                message: 'Something went wrong',
            }, {
                status: 400
            })
        }

        if (envato.envato <= 0) {
            return Response.json({
                message: 'You have reached your download limit. Please try again later. Limit resets at 12:00 AM UTC',
            }, {
                status: 400
            })
        }

        const link = url.split('?')[0];
        const fileId = link.substring(link.lastIndexOf("-") + 1);

        if (!fileId) {
            return Response.json({
                message: 'Invalid URL',
            }, {
                status: 400
            })
        }

        const res = await axios.get(`https://envato-web-server-vrhv2.ondigitalocean.app/api/envato?fileId=${fileId}`)

        if (!res.data.success) {
            return Response.json({
                message: 'Failed to download file',
            }, {
                status: 400
            })
        }

        const updateEnvato = await prisma.envato.update({
            where: {
                userId: tgUser.id
            },
            data: {
                envato: {
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