'use client'

import Image from "next/image";
import {motion} from "framer-motion";

export default function Loading() {
    return (
        <motion.div className={'flex justify-center items-center h-full w-full'}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.5}}
        >
            <Image
                src="/loading.png"
                alt="Loading"
                width={30}
                height={30}
                className={'animate-spin'}
            />
        </motion.div>
    )
}