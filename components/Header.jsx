import React, { useState, useEffect } from 'react'
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
                <div className="float-right justify-evenly">
                    <Link href="/" passHref>
                        <span id="menu-about" className="md:float-right mt-2 align-middle text-sm text-amber-300 ml-4 px-4 font-semibold cursor-pointer">
                            About
                        </span>
                    </Link>
                </div>

                <div className="float-right justify-evenly">
                    {categories.map((category, index) => (
                        <Link key={index} href={`/category/${category.slug}`} passHref>
                            <span id={`menu-${index}`} className={`md:float-right mt-2 align-middle text-sm text-white ml-4 px-4 font-semibold cursor-pointer`}>
                                {/* {(() => {
                                    switch (category.name) {
                                        case 'Engineering':
                                            return <span id={`dot-${index}`} className="w-4 h-4 bg-amber-300 inline-block rounded-full mr-2"></span>
                                        case 'Leadership':
                                            return <span id={`dot-${index}`} className="w-4 h-4 bg-red-700 inline-block rounded-full mr-2"></span>
                                        case 'Consulting':
                                            return <span id={`dot-${index}`} className="w-4 h-4 bg-cyan-300 inline-block rounded-full mr-2"></span>
                                        default:
                                            return <span id={`dot-${index}`} className="w-4 h-4 bg-white inline-block rounded-full mr-2"></span>
                                    }
                                })()} */}
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