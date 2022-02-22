import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'

const JobWidget = ({ slug, category, employers }) => {
    const relatedJobs = [{
        createdAt: "2022-02-03T20:49:57.337418+00:00",
        featuredImage: { url: 'https://media.graphcms.com/WHG34KqRTmqiKfOlPNev' },
        slug: "alaska",
        timePeriod: "Since Aug, 2018",
        title: "Alaska Airlines",
    }]

    if (relatedJobs.length > 0) {
        return (
            <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-4">
                <h3 className="text-3xl mb-8 font-semibold border-b pb-4">{slug ? 'Related Jobs' : 'Recent Jobs'}</h3>
                {relatedJobs.map((job, index) => (
                    <div key={index} className="flex items-center w-full mb-4">
                        <div className="w-16 flex-none">
                            <Image
                                alt={job.title}
                                height="60px"
                                width="60px"
                                unoptimized
                                className="align-middle rounded-full"
                                src="https://media.graphcms.com/output=format:jpg/resize=width:100,height:100,fit:crop/YGzRFywYTYSasVxx6Nk3"
                            />
                        </div>
                        <div className="flex-grow ml-4">
                            <p className="text-gray-500 font-xs">{moment(job.startDate).format('MMM DD, YYYY')}</p>
                            <Link href={`/job/${job.slug}`} className="text-md" key={index}>{job.title}</Link>
                        </div>
                    </div>
                ))}
            </div>
        )
    } else {
        return (
            <></>
        )
    }
}

export default JobWidget