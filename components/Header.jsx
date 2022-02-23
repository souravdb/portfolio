import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { getCategories } from '../services'

const Header = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories().then((result) => {
            setCategories(result)
        })
    }, [])

    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="border-b w-full inline-block border-blue-400 py-8">

                <div className="md:hidden float-left justify-evenly">
                    <Link href='/about' passHref>
                        <span className="md:float-right mt-2 align-middle text-white ml-4 px-4 font-semibold cursor-pointer">
                        <Image
                                alt="SDB"
                                height="50px"
                                width="50px"
                                unoptimized
                                className="align-middle rounded-full"
                                src="https://media.graphcms.com/output=format:jpg/resize=width:100,height:100,fit:crop/YGzRFywYTYSasVxx6Nk3"
                            />
                        </span>
                    </Link>
                </div>

                <div className="hidden md:float-left md:contents justify-evenly">
                    <Link href="/about" passHref>
                        <span className='cursor-pointer'>
                            <Image
                                alt="SDB"
                                height="100px"
                                width="100px"
                                unoptimized
                                className="align-middle rounded-full"
                                src="https://media.graphcms.com/output=format:jpg/resize=width:100,height:100,fit:crop/YGzRFywYTYSasVxx6Nk3"
                            />
                        </span>
                    </Link>
                </div>

                <div className="float-right justify-evenly">
                    {categories.map((category, index) => (
                        <Link key={index} href={`/category/${category.slug}`} passHref>
                            <span className="md:float-right mt-2 align-middle text-white ml-4 px-4 font-semibold cursor-pointer">
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Header