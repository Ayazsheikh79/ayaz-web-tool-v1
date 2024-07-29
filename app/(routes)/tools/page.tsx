'use client'

import {Button, Divider, Link} from "@nextui-org/react";
import Image from "next/image";
import tools from "@/app/data/subscription-tools";
import {router} from "next/client";
import {useRouter} from "next/navigation";

export default function Page() {
    const router = useRouter()
    return (
        <div>
            <div style={{ height: `calc(100% - 64px)` }} className={'w-full'}>
                <div className={'w-full min-h-full space-y-8 p-4 lg:px-20'}>
                    <div className={'grid grid-cols-1 lg:grid-cols-2 gap-5'}>
                        <div className={'w-full select-none bg-white p-4 space-y-4 text-medium font-medium rounded-sm shadow-sm text-default-700'}>
                            <div>
                                <div className={'text-secondary capitalize'}>
                                    Download with subscription
                                </div>
                                <div className={'text-xs text-default-400'}>
                                    Subscribe to access all our premium tools. Purchase any plan to unlock full access.
                                </div>
                            </div>
                            <Divider/>
                            <div className={'w-full h-96 overflow-auto space-y-4'}>
                                {tools.sort((a, b) => a.provider.localeCompare(b.provider)).map((tool, index) => (
                                    <div key={index}>
                                        <div className={'flex justify-between items-center p-2 bg-[#F4F4F5] rounded-md shadow-sm'}>
                                            <div className={'flex gap-2 items-center text-sm text-danger'}>
                                                <Image
                                                    src={tool.image}
                                                    width={30}
                                                    height={30}
                                                    alt={'image'}
                                                    className={'rounded-full'}
                                                />
                                                <div>
                                                    {tool.provider}
                                                </div>
                                            </div>
                                            <div>
                                                <Button
                                                    color={'primary'}
                                                    className={'text-sm'}
                                                    size={'sm'}
                                                    variant={'flat'}
                                                    onClick={() => router.push(tool.path)}
                                                >
                                                    Access
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={'w-full select-none bg-white p-4 space-y-4 text-medium font-medium rounded-sm shadow-sm text-default-700'}>
                            <div>
                                <div className={'text-secondary'}>
                                    Download With Credits
                                </div>
                                <div className={'text-xs text-default-400'}>
                                    Use your credits to download premium files. Purchase credits to unlock full access.
                                </div>
                            </div>
                            <Divider/>
                            <div>
                                <div
                                    className={'flex justify-between items-center p-2 bg-[#F4F4F5] rounded-md shadow-sm'}>
                                    <div className={'flex gap-2 items-center text-sm text-danger'}>
                                        <div className={'px-4'}>
                                            Single File Downloader
                                        </div>
                                    </div>
                                    <div>
                                        <Button
                                            color={'primary'}
                                            className={'text-sm'}
                                            size={'sm'}
                                            variant={'flat'}
                                            onClick={() => router.push('/on-demand-downloader')}
                                        >
                                            Access
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <Divider/>
                            <div className={'text-danger text-xs'}>
                                This tool downloads files from all providers. You can use your credits to download files from any provider. You can check the provider list and pricing <Link href={'/#provider-information'} className={'text-xs hover:underline'}>here</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}