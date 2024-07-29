'use client'

import {useSession} from "next-auth/react";
import axios from "axios";
import {Button} from "@nextui-org/react";
import {toast} from "sonner";
import Script from "next/script";

export default function Page() {
    const {data: session, status} = useSession({
        required: true
    });

    const submit = async () => {
        try {
            if (!session?.user?.email) {
                return toast.error('Email is required')
            }
            const orderPayload = {
                email: session?.user?.email
            }
            const res = await axios.post('/api/pay/order', orderPayload)
            console.log(res.data.data.payment_session_id)

            //@ts-ignore
            const cashfree = Cashfree({
                mode:"production" //or production
            });

            let checkoutOptions = {
                paymentSessionId: res.data.data.payment_session_id,
                redirectTarget: "_self" //optional ( _self, _blank, or _top)
            }

            cashfree.checkout(checkoutOptions)

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <div>

                <Button
                    onClick={submit}
                >
                    pay
                </Button>
            </div>
            <Script src="https://sdk.cashfree.com/js/v3/cashfree.js"/>
        </>
    )
}