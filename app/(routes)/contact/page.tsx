'use client'

import {Divider, Link} from "@nextui-org/react";

export default function Page() {
    return (
        <div style={{ height: `calc(100% - 64px)` }} className={'w-full'}>
            <div className={'flex w-full h-full justify-center items-center'}>
                <div className={'bg-white rounded-sm shadow-sm p-4 space-y-4 w-full max-w-[700px]'}>
                    <div className={'text-secondary text-medium font-medium'}>
                        Contact Us
                    </div>
                    <Divider/>
                    <div className={'text-sm font-semibold'}>
                        You can contact me at telegram: <Link href="https://t.me/ayazsheikh079" target="_blank" className={'text-blue-500'}>@ayazsheikh079</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}