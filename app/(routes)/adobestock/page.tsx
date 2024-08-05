'use client'
import {useSession} from "next-auth/react";
import {useState, useEffect} from "react";
import Loading from "@/app/components/Loading";
import axios from "axios";
import {redirect} from "next/navigation";
import {Button, Divider, Input, Link} from "@nextui-org/react";
import {toast} from "sonner";
import {usePathname} from "next/navigation";

export default function Page() {
    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/auth/login?callbackUrl=' + window.location.pathname)
        }
    });
    const pathname = usePathname()
    const [isLoading, setIsLoading] = useState(true)
    const [limits, setLimits] = useState(null)
    const [envatoUrl, setEnvatoUrl] = useState('')
    const [isDownloading, setIsDownloading] = useState(false)
    const [downloadLink, setDownloadLink] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        if (session) {
            axios.post('/api/tool/limits', {
                email: session?.user?.email
            }).then((res) => {
                setLimits(res.data.data)
                setIsLoading(false)
            }).catch((e) => {
                setIsLoading(false)
                toast.error(e.response.data.message)
            })
        }
    }, [session, refresh])

    const submit = async (e:any) => {
        e.preventDefault()
        try {
            if (!envatoUrl) {
                toast.error('URL is required')
                return
            }
            const data = {
                url: envatoUrl,
                email: session?.user?.email,
                path: pathname
            }
            setDownloadLink([])
            setIsDownloading(true)
            const res = await axios.post('/api/v1/sub/download', data)
            setDownloadLink(res.data.data.downloadUrls)
            setRefresh(!refresh)
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
                <div className={'w-full min-h-full flex flex-col justify-center gap-5 items-center p-4'}>
                    <div className={'w-full max-w-[700px] bg-warning-100 p-5 rounded-md text-sm font-light'}>
                        <div className={''}>
                            ⚠️ Testing Phase Notice
                        </div>
                        <div>
                            During the testing phase, you can download unlimited files and no quota will be charged. Please use the service wisely to ensure everyone benefits.
                        </div>
                        <div>
                            If you encounter any issues, report them here: <Link className={'text-sm font-medium'} href={'https://t.me/AyazSheikh079'}>
                            Report Issue
                        </Link>
                        </div>
                    </div>
                    <div className={'border p-4 rounded-md space-y-8 w-full max-w-[700px]'}>
                        <div className={'font-semibold text-xl'}>
                            AdobeStock Downloader
                        </div>
                        <Divider className={'h-[0.5px]'} />
                        <div className={'text-xs font-thin w-fit'}>
                            <div className={'p-4 border rounded-md'}>
                                {/* @ts-ignore */}
                                Quota: <span className={'font-semibold'}>{limits?.dailyLimit.limit === 0 ? limits.monthlyLimit.limit : limits?.dailyLimit.limit}</span>
                            </div>
                        </div>
                        <form className={'space-y-8'} onSubmit={submit}>
                            <div className={'space-y-2'}>
                                <Input
                                    label={'AdobeStock URL'}
                                    placeholder={'Enter AdobeStock URL'}
                                    variant={'flat'}
                                    value={envatoUrl}
                                    onChange={(e) => setEnvatoUrl(e.target.value)}
                                />
                                <div className={'font-light text-xs translate-x-2 text-default-400'}>
                                    example: https://stock.adobe.com/images/aerial-view-of-flock-of-swans/632882689
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
                        {downloadLink.length > 0 &&
                            <div className={'space-y-4'}>
                                <Divider className={'h-[0.5px]'}/>
                                <div className={'grid grid-cols-2 gap-5'}>
                                    {downloadLink.map((link:any, index:number) => (
                                        <Button
                                            key={index}
                                            as={'a'}
                                            variant={'flat'}
                                            color={'primary'}
                                            href={link.url}
                                            target={'_blank'}
                                            className={'uppercase'}
                                        >
                                            {link.name}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}