'use client'

import {useRouter} from "next/navigation";
import {useState, useEffect} from "react";
import {useSession, signIn} from "next-auth/react";
import Loading from "@/app/components/Loading";
import {Button, Divider, Input, Link} from "@nextui-org/react";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import {motion} from "framer-motion";
import {toast} from "sonner";

export default function Login() {
    const router = useRouter();
    const {data: session, status} = useSession();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const callbackUrl = new URLSearchParams(window.location.search).get("callbackUrl")
        if (status === 'authenticated') {
            if (!callbackUrl) {
                return router.push('/')
            }
            return router.push(callbackUrl)
        } else {
            setIsLoading(false);
        }
    }, [status, router]);

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = async (e:any) => {
        e.preventDefault();
        try {
            if (!email || !password) {
                toast.error('Please fill all fields')
                return
            }
            if (!email.includes('@')) {
                toast.error('Invalid email address')
                return
            }
            if (password.length < 4) {
                toast.error('Password must be at least 6 characters')
                return
            }
            if (password.length > 26) {
                toast.error('Password must not exceed 12 characters')
                return
            }

            const data = {
                email,
                password,
            }

            signIn('credentials', {
                ...data,
                redirect: false,
            }).then((callback) => {
                if (callback?.error) {
                    setIsSubmitting(false)
                    toast.error(callback.error)
                } else {

                }
            })
        } catch (e) {
            setIsSubmitting(false)
        }
    }

    return (
        <div className={'w-full'} style={{ height: `calc(100% - 64px)` }}>
            {isLoading && <Loading />}
            {!isLoading &&
                <motion.div className={'h-full w-full flex justify-center items-center p-4 md:p-4 lg:p-8'}
                            initial={{opacity: 0, scale: 0.5}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{duration: 0.5}}
                >
                    <div className={'w-full max-w-[35rem] border p-4 rounded-md'}>
                        <div className={'space-y-8'}>
                            <div className={'font-semibold text-2xl'}>
                                Faça login na sua conta
                            </div>
                            <div>
                                <form className={'space-y-4'} onSubmit={handleLogin}>
                                    <Input
                                        label={'E-mail'}
                                        placeholder={'Enter your email'}
                                        variant={'flat'}
                                        className={'w-full'}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <div>
                                        <Input
                                            label="Senha"
                                            variant="flat"
                                            placeholder="Enter your password"
                                            endContent={
                                                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                                    {isVisible ? (
                                                        <GoEyeClosed  className="text-2xl text-default-400 pointer-events-none" />
                                                    ) : (
                                                        <GoEye  className="text-2xl text-default-400 pointer-events-none" />
                                                    )}
                                                </button>
                                            }
                                            type={isVisible ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <div className={'text-end'}>
                                            <Link href={'https://t.me/sododemae'}
                                                  className={'text-primary hover:underline text-xs text-opacity-70 hover:text-opacity-100'}>
                                                Forgot password?
                                            </Link>
                                        </div>
                                    </div>
                                    <Button
                                        variant={'flat'}
                                        color={'primary'}
                                        fullWidth
                                        isLoading={isSubmitting}
                                        type={'submit'}
                                    >
                                        Login
                                    </Button>
                                    <Divider />
                                    <div className={'flex justify-center'}>
                                        <p className={'text-sm'}>
                                            Não tem uma conta? <Link className={'text-primary hover:underline text-sm'} href={'/auth/signup'}>Sign up</Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </motion.div>
            }
        </div>
    )
}