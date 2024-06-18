import prisma from "@/app/libs/prismadb";
import axios from "axios";

export async function POST (req: Request) {
    const baseUrl = "https://auth.pixeden.com/graphql";
    const body = await req.json();
    const {url} = body;
    try {
        if (!url) {
            return Response.json({
                message: 'Missing required fields'
            }, {
                status: 400
            })
        }

        const pixeden = await prisma.pixedenToken.findFirst()

        if (!pixeden) {
            return Response.json({
                message: 'Pixeden token not found'
            }, {
                status: 404
            })
        }

        const bearerToken = await pixeden.token;

        const urlParts = await url.split('/').slice(3)

        const res = await axios.post(
            baseUrl,
            {
                operationName: "DownloadToken",
                variables: {
                    input: {
                        productKind: "premium",
                        slug: urlParts[1],
                        category: urlParts[0],
                        title: urlParts[1],
                        downloadFilename: `${urlParts[1]}-PIXEDEN.zip`
                    }
                },
                query: `mutation DownloadToken($input: DownloadTokenInput!) {
                generateDownloadToken(input: $input) {
                    token
                    error
                    remaining
                    remainingUntil
                    firstDownload
                    __typename
                }
            }`
            },
            {
                headers: {
                    'accept': '*/*',
                    'accept-language': 'en-US,en;q=0.9',
                    'authorization': `Bearer ${bearerToken}`,
                    'content-type': 'application/json',
                    'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-site',
                    'Referer': 'https://www.pixeden.com/',
                    'Referrer-Policy': 'strict-origin-when-cross-origin'
                }
            }
        )

        if (!res.data.data.generateDownloadToken.token) {
            return Response.json({
                success: false,
                message: 'Failed to download file'
            }, {
                status: 400
            })
        }

        const token = await res.data.data.generateDownloadToken.token;
        const downloadUrl = `https://downloads.pixeden.com/?token=${token}`;

        const data = {
            success: true,
            message: 'Downloaded',
            downloadUrl: downloadUrl
        }

        return Response.json({
            success: true,
            message: 'Downloaded',
            data: data
        }, {
            status: 200
        })

    } catch (error) {
        console.log(error)
        return Response.json({
            message: 'Something went wrong'
        }, {
            status: 500
        })
    }
}