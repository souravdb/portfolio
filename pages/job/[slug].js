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
    const data = await getJobDetails(params.slug)
    return {
        props: {
            job: data,
        },
    }
}

export async function getStaticPaths() {
    const jobs = await getJobs()
    return {
        paths: jobs.map(({ node: { slug } }) => ({ params: { slug } })),
        fallback: true,
    }
}