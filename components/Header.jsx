import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import { getCategories } from '../services'

const Header = () => {
    const [categories, setCategories] = useState([])
    // console.log(categories)

    useEffect(() => {
        getCategories().then((result) => {
            setCategories(result)
        })

        // setCategories([
        //     {name: 'Engineering', slug: 'engg'},
        //     {name: 'Consulting', slug: 'cons'},
        //     {name: 'Leadership', slug: 'lead'}
        // ])
        
    }, [])

    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="border-b w-full inline-block border-blue-400 py-8">
                <div className="float-right justify-evenly">
                    <Link href="/" passHref>
                        <span id="menu-about" className="md:float-right mt-2 align-middle text-sm text-white hover:text-amber-300 ml-4 px-4 font-semibold cursor-pointer">
                            About
                        </span>
                    </Link>
                </div>

                <div className="float-right justify-evenly">
                    {categories.map((category, index) => (
                        <Link key={index} href={`/category/${category.slug}`} passHref>
                            <span id={`menu-${index}`} className="md:float-right mt-2 align-middle text-sm text-white hover:text-amber-300 ml-4 px-4 font-semibold cursor-pointer">
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