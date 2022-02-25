import React from 'react'
import { useRouter } from 'next/router'

import { JobDetail, Employers, JobWidget, Loader } from '../../components'

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

// Fetch data at build time
export async function getStaticProps({ params }) {
    const data = {
        timePeriod: 'Since Aug, 2018',
        slug: 'alaska',
        title: 'Alaska Airlines',
        content: '> paragraph 1...\n' +
            '- bullet 1\n' +
            '- bullet 2\n' +
            '- bullet 3\n' +
            '> paragraph 2',
        featuredImage: { url: 'https://media.graphcms.com/WHG34KqRTmqiKfOlPNev' },
        employers: [{name: 'Cognizant Technologies', slug: 'cognz'}]
    }

    return {
        props: { job: data, category: params.slug },
    }
}

export async function getStaticPaths() {
    const categories = [{slug: 'engg'}]
    return {
        paths: categories.map(({ slug }) => ({ params: { slug } })),
        fallback: true,
    }
}