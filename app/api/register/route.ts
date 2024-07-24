import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
        return Response.json({
            message: 'Missing required fields'
        }, {
            status: 400
        });
    }

    if (password.length < 4) {
        return Response.json({
            message: 'Password should be at least 6 characters long'
        }, {
            status: 400
        });
    }

    try {
        const checkUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (checkUser) {
            return Response.json({
                message: 'Account with this email already exists'
            }, {
                status: 400
            });
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
            }
        })

        if (!user) {
            return Response.json({
                message: 'Error creating account'
            }, {
                status: 400
            });
        }

        const createLimit = await prisma.limit.create({
            data: {
                userId: user.id,
                limit: 0,
                code: 0
            }
        });

        return Response.json({
            message: 'Account created successfully'
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