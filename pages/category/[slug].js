import React from 'react'
import { useRouter } from 'next/router'

import { JobDetail, Employers, JobWidget, Loader } from '../../components'
import { getCategories, getJobsByCategory, getJobDetails } from '../../services'

const JobDetailsByCategory = ({ job, category }) => {
    const router = useRouter()
    if (router.isFallback) {
        return <Loader />
    }

    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="col-span-1 lg:col-span-8">
                    <JobDetail job={job} />
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="relative lg:sticky top-8">
                        <JobWidget slug={job.slug} category={category} employers={job.employers.map((employer) => employer.slug)} />
                        <Employers />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default JobDetailsByCategory

export async function getStaticProps({ params }) {
    const jobs = await getJobsByCategory(params.slug)
    const data = await getJobDetails(jobs[0].node.slug)
    return {
        props: {
            job: data, category: params.slug
        },
    }
}

export async function getStaticPaths() {
    const categories = await getCategories()
    return {
        paths: categories.map(({ slug }) => ({ params: { slug } })),
        fallback: true,
    }
}