'use client'

import {useSession} from "next-auth/react";
import axios from "axios";
import {Button} from "@nextui-org/react";
import {toast} from "sonner";

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

            const cardPayload = {
                payment_session_id: res.data.data.payment_session_id,
                payment_method: {
                    card: {
                        channel: 'link',
                        card_number: '4706131211212123',
                        card_holder_name: 'Tushar Gupta',
                        card_expiry_mm: '03',
                        card_expiry_yy: '28',
                        card_cvv: '123'
                    }
                }
            }

            const upiPayload = {
                payment_session_id: res.data.data.payment_session_id,
                payment_method: {
                    upi: {
                        channel: 'link',
                        vpa: '7705097077@ptaxis'
                    }
                }
            }

            const url = 'https://api.cashfree.com/pg/orders/sessions'

            const orderPay = await axios.post(url, upiPayload, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Client-Id': process.env.NEXT_PUBLIC_CASHFREE_CLIENT_ID,
                    'X-Client-Secret': process.env.NEXT_PUBLIC_CASHFREE_CLIENT_SECRET,
                    'x-api-version':'2023-08-01',
                }
            })

            console.log(orderPay.data)

            window.open(orderPay.data.data.url, '_blank')

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <Button
                onClick={submit}
            >
                pay
            </Button>
        </div>
    )
}