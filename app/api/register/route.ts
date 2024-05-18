import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
    const body = await req.json();
    const { name, email, password, tgId } = body;

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

        const createFreepikLimit = await prisma.freePikLimit.create({
            data: {
                userId: user.id
            }
        });

        const createEnvatoLimit = await prisma.envatoLimit.create({
            data: {
                userId: user.id,
            }
        })

        const envatoMonthlyLimit = await prisma.envatoMonthlyLimit.create({
            data: {
                userId: user.id,
            }
        });

        const freepikMonthlyLimit = await prisma.freePikMonthlyLimit.create({
            data: {
                userId: user.id,
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