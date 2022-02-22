import { request, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export const getJobs = async () => {
	const query = gql`
		query MyQuery {
			jobsConnection {
				edges {
					cursor
					node {
						timePeriod
						slug
						title
						# content {
						# 	raw
						# }
						content
						featuredImage {
							url
						}
						employers {
							name
							slug
						}
					}
				}
			}
		}
	`

	const result = await request(graphqlAPI, query)
	return result.jobsConnection.edges
}

export const getJobDetails = async (slug) => {
	const query = gql`
		query GetJobDetails($slug : String!) {
			job(where: {slug: $slug}) {
				title
				featuredImage {
					url
				}        
				timePeriod
				slug
				content
				employers {
					name
					slug
				}
			}
		}
	`

	const result = await request(graphqlAPI, query, { slug })
	return result.job
}

export const getSimilarJobs = async (employers, slug) => {
	const query = gql`
		query GetJobDetails($slug: String!, $employers: [String!]) {
			jobs(
				where: {slug_not: $slug, AND: {employers_some: {slug_in: $employers}}}
				first: 3
			) {
				title
				featuredImage {
					url
				}
				createdAt
				timePeriod
				slug
			}
		}
	`

	const result = await request(graphqlAPI, query, { slug, employers })
	return result.jobs
}

export const getSimilarJobsByCategory = async (category, slug) => {
	const query = gql`
		query GetJobDetails($slug: String!, $category: String!) {
			jobs(
				where: {slug_not: $slug, AND: {categories_some: {slug: $category}}}
				# first: 3
			) {
				title
				featuredImage {
					url
				}
    		categories {
				slug
			}
				createdAt
				timePeriod
				slug
			}
		}
	`

	const result = await request(graphqlAPI, query, { slug, category })
	return result.jobs
}

export const getRecentJobs = async () => {
	const query = gql`
		query GetJobDetails() {
			jobs(
				orderBy: createdAt_ASC
				first: 3
			) {
				title
				featuredImage {
					url
				}
				createdAt
				timePeriod
				slug
			}
		}
	`

	const result = await request(graphqlAPI, query)
	return result.jobs
}

export const getEmployers = async () => {
	const query = gql`
		query GetEmployers {
			employers {
				name
				description
				slug
				jobs(first: 1) {
					slug
				}
			}
		}
	`

	const result = await request(graphqlAPI, query)
	return result.employers
}

export const getJobsByCategory = async (slug) => {
	const query = gql`
		query GetJobsByCategory($slug: String!) {
			jobsConnection(
				where: {categories_some: {slug: $slug}}
				first: 1
			) {
				edges {
					cursor
					node {
						timePeriod
						slug
						title
						# moreContent {
						# 	markdown
						# }
						content
						featuredImage {
							url
						}
						categories {
							name
							slug
						}
					}
				}
			}
		}
	`

	const result = await request(graphqlAPI, query, { slug })
	return result.jobsConnection.edges
}

export const getCategories = async () => {
	const query = gql`
		query GetCategories() {			
			categories {
				name
				slug
			}
		}		
	`

	const result = await request(graphqlAPI, query)
	return result.categories
}
