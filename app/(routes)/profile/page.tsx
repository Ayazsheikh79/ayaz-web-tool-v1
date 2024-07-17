'use client'

import {useState, useEffect} from "react";
import Loading from "@/app/components/Loading";
import axios from "axios";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";

export default function Page() {
    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/auth/login?callbackUrl=' + window.location.pathname)
        }
    })
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [data, setData] = useState(null)


    useEffect(() => {
        if (session) {
            axios.all([
                axios.get(`/api/profile?email=${session?.user?.email}`)
            ]).then(axios.spread((res) => {
                setUser(res.data.data.user)
                setData(res.data.data.plans)
                setIsLoading(false)
            })).catch((e:any) => {
                console.error(e)
                setIsLoading(false)
            })
        }
    }, [session, session?.user?.email])

    return (
        <div className={'w-full'} style={{ height: `calc(100% - 64px)`}}>
            {isLoading && <Loading />}
            {!isLoading &&
                <div className={'p-4 space-y-8'}>
                    <div>
                        <h1 className={'text-2xl font-bold'}>Profile</h1>
                        {/* @ts-ignore */}
                        <p className={'text-gray-500'}>Welcome back, <span className={'text-lg font-semibold'}>{user?.name}</span></p>
                    </div>
                    <div className={' space-y-4'}>
                        <h2 className={'text-xl font-bold'}>Plans</h2>
                        {/* @ts-ignore */}
                        {data.length <=0 &&
                            <div className={'text-gray-500'}>
                                No plans found
                            </div>
                        }
                        {data &&
                            <div className={'space-y-4'}>
                                {/* @ts-ignore */}
                                {data.map((plan: any) => (
                                    <div key={plan.id}
                                         className={`border rounded-md p-4 ${
                                             new Date(plan.endDate) > new Date()
                                                 ? 'bg-green-200'
                                                 : 'bg-red-200'
                                         } text-sm font-medium space-y-1`}
                                    >
                                        <div>
                                            Name: {plan.name}
                                        </div>
                                        <div>
                                            Start Date: {new Date(plan.startDate).toDateString()}
                                        </div>
                                        <div>
                                            Expires At: {new Date(plan.endDate).toDateString()}
                                        </div>
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