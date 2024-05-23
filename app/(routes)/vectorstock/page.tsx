'use client'
import {useSession} from "next-auth/react";
import {useState, useEffect} from "react";
import Loading from "@/app/components/Loading";
import axios from "axios";
import {redirect} from "next/navigation";
import {Button, Divider, Input, Link} from "@nextui-org/react";
import {toast} from "sonner";
import Image from "next/image";
import {object} from "prop-types";


export default function Page() {
    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/auth/login?callbackUrl=' + window.location.pathname)
        }
    });
    const [isLoading, setIsLoading] = useState(true)
    const [limits, setLimits] = useState()
    const [credits, setCredits] = useState(0)
    const [monthlyLimit, setMonthlyLimit] = useState()
    const [envatoUrl, setEnvatoUrl] = useState('')
    const [isDownloading, setIsDownloading] = useState(false)
    const [downloadUrls, setDownloadUrls] = useState(null)
    
    useEffect(() => {
        if (status === 'authenticated' && session && session?.user?.email) {
            axios.all([
                axios.post('/api/tool/vectorstock', {
                    email: session?.user?.email
                }),
                axios.post('/api/tool/credits', {
                    email: session?.user?.email
                })

            ]).then(axios.spread((res, res2) => {
                setLimits(res.data.data.vectorstock)
                setMonthlyLimit(res.data.data.monthly)
                setCredits(res2.data.data)
                setIsLoading(false)
            })).catch((e:any) => {
                toast.error(e.response.data.message)
                setIsLoading(false)
            })
        }
    }, [session, status])

    const submit = async (e:any) => {
        e.preventDefault()
        try {
            if (!envatoUrl) {
                toast.error('Artlist URL is required')
                return
            }
            const data = {
                url: envatoUrl,
                // @ts-ignore
                userId: limits?.userId
            }
            setIsDownloading(true)
            const res = await axios.post('/api/download/vectorstock', data)
            setDownloadUrls(res.data.data.data.download.file_urls)
            // @ts-ignore
            if (limits?.vectorStock > 0) {
                setLimits({
                    // @ts-ignore
                    ...limits,
                    // @ts-ignore
                    vectorStock: limits.vectorStock - 1
                })
            } else {
                setMonthlyLimit({
                    // @ts-ignore
                    ...monthlyLimit,
                    // @ts-ignore
                    vectorStock: monthlyLimit.vectorStock - 1
                })
            }
            setIsDownloading(false)
        } catch (e:any) {
            toast.error(e.response.data.message)
            setIsDownloading(false)
        }
    }

    return (
        <div className={'w-full'} style={{ height: `calc(100% - 64px)`}}>
            {isLoading && <Loading />}
            {!isLoading &&
                <div className={'w-full h-full flex justify-center items-center p-4'}>
                    <div className={'border p-4 rounded-md space-y-8 w-full max-w-[700px]'}>
                        <div className={'flex gap-5 items-center'}>
                            <Image
                                src={'https://cdn.vectorstock.com/img/icons/vectorstock-fb-logo.jpg'}
                                alt={'vectorstock'}
                                width={50}
                                height={50}
                                className={'rounded-full'}
                            />
                            <div className={'font-semibold text-xl'}>
                                Vectorstock Downloader
                            </div>
                        </div>
                        <Divider className={'h-[0.5px]'} />
                        <div className={'grid grid-cols-2 gap-5 text-xs font-thin'}>
                            <div className={'p-4 border rounded-md text-center'}>
                                {/* @ts-ignore */}
                                Quota: <span className={'font-semibold'}>{limits?.vectorStock === 0 ? monthlyLimit.vectorStock : limits?.vectorStock}</span>
                            </div>
                            <div className={'p-4 border rounded-md text-center'}>
                                Credits: <span className={'font-semibold'}>0</span>
                            </div>
                        </div>
                        <form className={'space-y-8'} onSubmit={submit}>
                            <div className={'space-y-2'}>
                                <Input
                                    label={'Vectorstock URL'}
                                    placeholder={'Enter Vectorstock URL'}
                                    variant={'flat'}
                                    value={envatoUrl}
                                    onChange={(e) => setEnvatoUrl(e.target.value)}
                                />
                                <div className={'font-light text-xs translate-x-2 text-default-400'}>
                                    example: https://www.vectorstock.com/royalty-free-vector/summer-holidays-background-vector-2473133
                                </div>
                            </div>
                            <Button
                                fullWidth
                                variant={'flat'}
                                color={'secondary'}
                                type={'submit'}
                                isLoading={isDownloading}
                            >
                                Download
                            </Button>
                        </form>
                        {downloadUrls &&
                            <div className={'w-full grid grid-cols-2 gap-5'}>
                                {Object.keys(downloadUrls).map((key:any) => (
                                    <div key={key} className={'w-full'}>
                                        <Link href={downloadUrls[key]} target={'_blank'} className={'w-full'}>
                                            <Button
                                                variant={'flat'}
                                                color={'success'}
                                                fullWidth
                                                className={'uppercase'}
                                            >
                                                Download {key}
                                            </Button>
                                        </Link>
                                    </div>
                                ))}

                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}