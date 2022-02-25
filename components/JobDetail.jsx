import Markdown from 'react-markdown'

const JobDetail = ({ job }) => {
    return (
        <>
            <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
                <div className="relative overflow-hidden shadow-md mb-6">
                    <img
                        alt=""
                        width="100%"
                        height="100%"
                        src={job.featuredImage.url}
                        className="object-top h-full w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
                    />
                </div>

                <div className="px-4 lg:px-0">
                    <div className="flex items-center mb-8 w-full">
                        <div className="font-medium text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="align-middle">{job.timePeriod}</span>
                        </div>
                    </div>

                    <h1 className="transition duration-700 text-center mb-8 hover:text-green-600 text-3xl font-semibold">
                        {job.title}
                    </h1>

                    <div className='mb-6 text-justify'>
                        {
                            job.content.split("> ").map((item, index) => (
                                (item.indexOf("- ") > 0) ?
                                    item.split("- ").map((node, subindex) => (
                                        (subindex > 0) ? <Markdown key={subindex} className='prose text-sm hover:text-blue-600'>{"- " + node}</Markdown> : <Markdown key={subindex} className='prose text-xl'>{"> " + node}</Markdown>
                                    )) :
                                <Markdown key={index} className='prose text-xl'>{"> " + item}</Markdown>
                            ))
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default JobDetail