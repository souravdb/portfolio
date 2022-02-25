import Markdown from 'react-markdown'
import Image from 'next/image'

import { grpahCMSImageLoader } from '../util'

const About = ({ bio }) => {
    return (
        <>
            <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
                <div className="relative overflow-hidden mb-6">
                    <Image
                        unoptimized
                        loader={grpahCMSImageLoader}
                        id="bio-photo"
                        alt=""
                        width="300px"
                        height="300px"
                        src={bio.photo.url}
                        className="align-middle rounded-full p-10"
                    />
                </div>

                <div className="px-4 lg:px-0">
                    <h1 id="bio-name" className="transition duration-700 text-center mb-8 hover:text-green-600 text-3xl font-semibold">
                        {bio.name}
                    </h1>
                    <div id="bio-intro" className='mb-6'>
                        <Markdown className='prose text-xl text-justify'>{bio.intro}</Markdown>
                    </div>

                    <h1 id="bio-con-header" className="transition duration-700 mb-8 hover:text-green-600 text-3xl font-semibold">
                        Contact
                    </h1>
                    <div id="bio-con" className='mb-6'>
                        <Markdown className='prose text-sm'>{bio.contactInfo}</Markdown>
                    </div>

                    <h1 id="bio-edu-header" className="transition duration-700 mb-8 hover:text-green-600 text-3xl font-semibold">
                        Education
                    </h1>
                    <div id="bio-edu" className='mb-6'>
                        <Markdown className='prose text-sm'>{bio.education}</Markdown>
                    </div>

                    
                </div>
            </div>
        </>
    )
}

export default About