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
            const data = {
                email: session?.user?.email
            }
            const res = await axios.post('/api/pay/order', data)
            console.log(res.data)
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