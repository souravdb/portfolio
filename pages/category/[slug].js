import React from 'react'
import { useRouter } from 'next/router'

import { JobDetail, Employers, JobWidget, Loader } from '../../components'
import { getCategories, getSimilarJobsByCategory } from '../../services'

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
    const jobs = (await getSimilarJobsByCategory(params.slug)) || []

    // console.log(jobs)

    // const jobs = [
    //     {
    //         // cursor: 'ckz7gcs203vuw0b81vpobremw',
    //         node: {
    //             slug: 'alaska',
    //             title: 'Alaska Airlines',
    //             content: '> xx In past 4 years, I have served Cognizant’s Quali… on availability of pilots and crew members, etc.',
    //             timePeriod: 'Since Aug, 2018',
    //             // featuredImage: [Object],
    //             categories: [{ slug: 'engg'}],
    //             employers: [{ slug: 'cognz'}]
    //         }
    //     }
    // ]

    return {
        props: {
            // job: data, category: params.slug
            job: jobs[0].node, category: params.slug
        },
    }
}

export async function getStaticPaths() {
    const categories = (await getCategories()) || []
    console.log(categories)

    // Get the paths we want to pre-render based on categories
    const paths = categories.map((slug) => ({
        params: { slug },
    }))
    console.log(paths)
    
    return { paths, fallback: false }
}