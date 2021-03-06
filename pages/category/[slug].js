import React from 'react'
import { useRouter } from 'next/router'

import { JobDetail, Employers, JobWidget, Loader } from '../../components'
import { getCategories, getSimilarJobsByCategory } from '../../services'

const JobDetailsByCategory = ({ job, category }) => {
    const router = useRouter()
    
    if (router.isFallback) {
        return <Loader />
    }

    if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
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
    const jobs = await getSimilarJobsByCategory(params.slug)

    return {
        props: {
            job: jobs[0].node, category: params.slug
        },
    }
}

export async function getStaticPaths() {
    const categories = await getCategories()

    // Get the paths we want to pre-render based on categories
    const paths = categories.map(
        ({ slug }) => ({ params: { slug } })
    )

    return { paths, fallback: false }
}