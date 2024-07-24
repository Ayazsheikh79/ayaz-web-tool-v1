'use client'

import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";
import {useSession, signOut} from "next-auth/react";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { IoCloudDownloadOutline } from "react-icons/io5";
import {useRouter} from "next/navigation";
import { IoHomeOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import Image from "next/image";

export default function NavbarComponent() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const {data: session, status} = useSession();
    const menuItems = [
        {
            name: 'Home',
            icon: <IoHomeOutline   />,
            href: 'https://brazil.uaitool.in/page/acessos_pro'
        },
        {
            name: 'Freepik Downloader',
            icon: <IoCloudDownloadOutline  />,
            href: '/freepik'
        },
        {
            name: 'Sign Out',
            icon: <LiaSignOutAltSolid />,
        }
    ];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} isBordered={true} className={'h-16'}>
            <NavbarContent>
                <NavbarBrand
                    className={'cursor-pointer'}
                >
                    <Link href={'/'} className={'text-black'}>
                        <Image
                            src={'/tools.png'}
                            alt={'logo'}
                            width={150}
                            height={150}
                        />
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="https://brazil.uaitool.in/page/acessos_pro" className={'flex gap-2 justify-center items-center'}>
                        <IoHomeOutline />
                        Home
                    </Link>
                </NavbarItem>
            </NavbarContent>

            {status === 'authenticated' &&
                <NavbarContent justify="end">
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className=""
                    />
                </NavbarContent>
            }
            {status !== 'authenticated' &&
                <NavbarContent justify="end">
                    <NavbarItem className={''}>
                        <Button as={Link} color={'default'} variant={'flat'} href={'/auth/login'}>Login</Button>
                    </NavbarItem>
                    <NavbarItem className="hidden lg:flex">
                        <Button as={Link} color="primary" href="/auth/signup" variant="flat">
                            Sign Up
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            }
            <NavbarMenu className={'gap-0'}>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className={'border-b w-full cursor-pointer flex gap-5 items-center py-4 px-4 text-base font-semibold'}
                            href={item.href}
                            size="lg"
                            onClick={() => {
                                index === menuItems.length - 1 && signOut();
                            }}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
