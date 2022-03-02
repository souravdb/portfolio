import Markdown from 'react-markdown'
import Image from 'next/image'

const About = ({ about }) => {    
    return (
        <>
            <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
                <div className="relative overflow-hidden p-4">
                    <Image
                        data-cy="about-pic"
                        title={about.name}
                        width="200px"
                        height="200px"
                        src="/self.jpg"
                        className="align-middle rounded-full"
                    />
                </div>

                <div className="px-4 lg:px-0">
                    <h1 data-cy="about-me-label" className="transition duration-700 text-center mb-8 text-blue-900 text-3xl font-semibold">
                        About Me
                    </h1>
                    <div data-cy="about-intro" className='mb-6'>
                        <Markdown className='prose text-xl text-justify'>{about.introduction}</Markdown>
                    </div>

                    <h1 data-cy="about-contact-label" className="transition duration-700 mb-8 hover:text-blue-600 text-3xl font-semibold">
                        Contact
                    </h1>
                    <div data-cy="about-contact" className='mb-6'>
                        <Markdown className='prose text-sm'>{about.contactInfo}</Markdown>
                    </div>

                    <h1 data-cy="about-education-label" className="transition duration-700 mb-8 hover:text-blue-600 text-3xl font-semibold">
                        Education
                    </h1>
                    <div data-cy="about-education" className='mb-6'>
                        <Markdown className='prose text-sm'>{about.education}</Markdown>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About