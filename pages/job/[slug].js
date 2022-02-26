import React from 'react'
import { useRouter } from 'next/router'

import { JobDetail, Employers, JobWidget, Loader } from '../../components'
import { getJobs, getJobDetails } from '../../services'

const JobDetails = ({ job }) => {
    const router = useRouter()
    if (router.isFallback) {
        return <Loader />
    }

    return (
        <>
            <div className="container mx-auto px-10 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="col-span-1 lg:col-span-8">
                        <JobDetail job={job} />
                    </div>
                    <div className="col-span-1 lg:col-span-4">
                        <div className="relative lg:sticky top-8">
                            <JobWidget slug={job.slug} category='' employers={job.employers.map((employer) => employer.slug)} />
                            <Employers />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default JobDetails

export async function getStaticProps({ params }) {
    // const data = await getJobDetails(params.slug)
    // console.log(data)

    const data = {
        title: 'AT&T (USA)',
        // featuredImage: { url: 'https://media.graphcms.com/m6zYxwmeR2qxYG0kkKyK' },
        timePeriod: 'Aug, 2017 to Aug, 2018',
        slug: 'att',
        content: '> xx In past 4 years, I have served Cognizant’s Quali… on availability of pilots and crew members, etc.',
        employers: [{ name: 'Cognizant Technologies', slug: 'cognz' }]
    }

    return {
        props: {
            job: data,
        },
    }
}

export async function getStaticPaths() {
    // const jobs = await getJobs()
    // console.log(jobs)
    
    const jobs = [
        {
            // cursor: 'ckz7gcs203vuw0b81vpobremw',
            node: {
                slug: 'alaska',
                title: 'Alaska Airlines',
                content: '> xx In past 4 years, I have served Cognizant’s Quali… on availability of pilots and crew members, etc.',
                timePeriod: 'Since Aug, 2018',
                // featuredImage: [Object],
                categories: [{ slug: 'engg'}],
                employers: [{ slug: 'cognz'}]
            }
        }
    ]

    return {
        paths: jobs.map(({ node: { slug } }) => ({ params: { slug } })),
        fallback: true,
    }
}