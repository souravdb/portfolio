import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'

import { getRecentJobs, getSimilarJobsExceptSlug, getSimilarJobsByCategoryExceptSlug } from '../services'

const JobWidget = ({ slug, category, employers }) => {
    const [relatedJobs, setRelatedJobs] = useState([])
    
    useEffect(() => {
        if (category) {
            getSimilarJobsByCategoryExceptSlug(category, slug).then((result) => {
                setRelatedJobs(result)
            })
        } else if (slug) {
            getSimilarJobsExceptSlug(employers, slug).then((result) => {
                setRelatedJobs(result)
            })
        } else {
            getRecentJobs().then((result) => {
                setRelatedJobs(result)
            })
        }
    }, [slug, category, employers])
    
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
                                src={job.featuredImage.url}
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