 import prisma from "@/app/libs/prismadb";
 import {response} from "express";

export async function POST(req: Request) {
    const body = await req.json();
    const {email} = body;
    try {
        if (!email) {
            return Response.json({
                message: 'Email is required'
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

        const credits = await prisma.credit.findUnique({
            where: {
                userId: user.id
            }
        });

        if (!credits) {
            const newCredits = await prisma.credit.create({
                data: {
                    userId: user.id,
                }
            });

            return Response.json({
                success: true,
                message: 'Credits fetched successfully',
                data: newCredits
            }, {
                status: 200
            })
        }

        return Response.json({
            success: true,
            message: 'Credits fetched successfully',
            data: credits
        }, {
            status: 200
        });

    } catch (error) {
        return Response.json({
            message: 'Something went wrong, please try again later'
        }, {
            status: 400
        });
    }
}