'use client'
import {useSession} from "next-auth/react";
import {useState, useEffect} from "react";
import Loading from "@/app/components/Loading";
import axios from "axios";
import {redirect} from "next/navigation";
import {Button, Divider, Input, Link} from "@nextui-org/react";
import {toast} from "sonner";
import Image from "next/image";


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
    const [daVinciResolveDl, setDaVinciResolveDl] = useState([])
    const [premiereProDl, setPremiereProDl] = useState([])
    const [finalCutProDl, setFinalCutProDl] = useState([])
    const [afterEffectsDl, setAfterEffectsDl] = useState([])
    
    useEffect(() => {
        if (status === 'authenticated' && session && session?.user?.email) {
            axios.all([
                axios.post('/api/tool/artlist', {
                    email: session?.user?.email
                }),
                axios.post('/api/tool/credits', {
                    email: session?.user?.email
                })

            ]).then(axios.spread((res, res2) => {
                setLimits(res.data.data.artlist)
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
            const res = await axios.post('/api/download/artlist-templates', data)

            res.data.data.data.afterEffects.success && res.data.data.data.afterEffects.downloadUrls[0] !== 'NA' ? setAfterEffectsDl(res.data.data.data.afterEffects.downloadUrls) : setAfterEffectsDl([])

            res.data.data.data.finalCutPro.success && res.data.data.data.finalCutPro.downloadUrls[0] !== 'NA' ? setFinalCutProDl(res.data.data.data.finalCutPro.downloadUrls) : setFinalCutProDl([])

            res.data.data.data.premierePro.success && res.data.data.data.premierePro.downloadUrls[0] !== 'NA' ? setPremiereProDl(res.data.data.data.premierePro.downloadUrls) : setPremiereProDl([])

            res.data.data.data.daVinciResolve.success && res.data.data.data.daVinciResolve.downloadUrls[0] !== 'NA' ? setDaVinciResolveDl(res.data.data.data.daVinciResolve.downloadUrls) : setDaVinciResolveDl([])

            // @ts-ignore
            if (limits?.artlist > 0) {
                setLimits({
                    // @ts-ignore
                    ...limits,
                    // @ts-ignore
                    artlist: limits.artlist - 1
                })
            } else {
                setMonthlyLimit({
                    // @ts-ignore
                    ...monthlyLimit,
                    // @ts-ignore
                    artlist: monthlyLimit.artlist - 1
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
                <div className={'w-full flex min-h-full items-center justify-center p-4'}>
                    <div className={'border p-4 rounded-md space-y-8 w-full max-w-[700px]'}>
                        <div className={'flex gap-5 items-center'}>
                            <Image
                                src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnDyPwJORgv4ebryiGXIFpwcDb49bRr-mkyl666aBjxw&s'}
                                alt={'Artlist Downloader'}
                                width={50}
                                height={50}
                                className={'rounded-full'}
                            />
                            <div className={'font-semibold text-xl'}>
                                Artlist Video Template Downloader
                            </div>
                        </div>
                        <Divider className={'h-[0.5px]'}/>
                        <div className={'grid grid-cols-2 gap-5 text-xs font-thin'}>
                            <div className={'p-4 border rounded-md text-center'}>
                                {/* @ts-ignore */}
                                Quota: <span
                                // @ts-ignore
                                className={'font-semibold'}>{limits?.artlist === 0 ? monthlyLimit.artlist : limits?.artlist}</span>
                            </div>
                            <div className={'p-4 border rounded-md text-center'}>
                                Credits: <span className={'font-semibold'}>0</span>
                            </div>
                        </div>
                        <form className={'space-y-8'} onSubmit={submit}>
                            <div className={'space-y-2'}>
                                <Input
                                    label={'Artlist URL'}
                                    placeholder={'Enter Artlist URL'}
                                    variant={'flat'}
                                    value={envatoUrl}
                                    onChange={(e) => setEnvatoUrl(e.target.value)}
                                />
                                <div className={'font-light text-xs translate-x-2 text-default-400'}>
                                    example: https://artlist.io/video-templates/modular-beat-typography/131466
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
                        {premiereProDl.length > 0 &&
                            <div>
                                <div className={'font-semibold text-lg'}>
                                    Premiere Pro Files
                                </div>
                                <div className={`grid ${premiereProDl.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-5`}>
                                    {premiereProDl.map((item: any, i: number) => (
                                        <div key={i} className={'w-full'}>
                                            <Link href={item} className={'w-full'} target={'_blank'}>
                                                <Button
                                                    fullWidth
                                                    variant={'flat'}
                                                    color={'success'}
                                                >
                                                    Download Premiere Pro {i + 1}
                                                </Button>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                        {afterEffectsDl.length > 0 &&
                            <div>
                                <div className={'font-semibold text-lg'}>
                                    After Effects Files
                                </div>
                                <div
                                    className={`grid ${afterEffectsDl.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-5`}>
                                    {afterEffectsDl.map((item: any, i: number) => (
                                        <div key={i} className={'w-full'}>
                                            <Link href={item} className={'w-full'} target={'_blank'}>
                                                <Button
                                                    fullWidth
                                                    variant={'flat'}
                                                    color={'success'}
                                                >
                                                    Download After Effects {i + 1}
                                                </Button>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                        {finalCutProDl.length > 0 &&
                            <div>
                                <div className={'font-semibold text-lg'}>
                                    Final Cut Pro Files
                                </div>
                                <div
                                    className={`grid ${finalCutProDl.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-5`}>
                                    {finalCutProDl.map((item: any, i: number) => (
                                        <div key={i} className={'w-full'}>
                                            <Link href={item} className={'w-full'} target={'_blank'}>
                                                <Button
                                                    fullWidth
                                                    variant={'flat'}
                                                    color={'success'}
                                                >
                                                    Download Final Cut Pro {i + 1}
                                                </Button>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }

                        {daVinciResolveDl.length > 0 &&
                            <div>
                                <div className={'font-semibold text-lg'}>
                                    DaVinci Resolve Files
                                </div>
                                <div
                                    className={`grid ${daVinciResolveDl.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-5`}>
                                    {daVinciResolveDl.map((item: any, i: number) => (
                                        <div key={i} className={'w-full'}>
                                            <Link href={item} className={'w-full'} target={'_blank'}>
                                                <Button
                                                    fullWidth
                                                    variant={'flat'}
                                                    color={'success'}
                                                >
                                                    Download DaVinci Resolve {i + 1}
                                                </Button>
                                            </Link>
                                        </div>
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