import { request, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

// Service called by "index", "category/[slug]" pages...
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

// Service called by "Employers" component...
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

// Service called by "JobWidget" component...
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

// Service called by "JobWidget" component...
export const getSimilarJobsExceptSlug = async (employers, slug) => {
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

// Service called by "JobWidget" component...
// These are jobs in similar category except the current one is display...
export const getSimilarJobsByCategoryExceptSlug = async (category, slug) => {
	const query = gql`
		query GetJobDetails($slug: String!, $category: String!) {
			jobs(
				where: {slug_not: $slug, AND: {categories_some: {slug: $category}}}
			) {
				title
				featuredImage {
					url
				}
				categories {
					slug
				}
				slug
			}
		}
	`

	const result = await request(graphqlAPI, query, { slug, category })
	return result.jobs
}

// Service called by "category/[slug]", "job/[slug]" pages...
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

// Service called by "category/[slug]" page...
export const getSimilarJobsByCategory = async (slug) => {
	const query = gql`
		query GetJobDetails($slug: String!) {
			jobsConnection(
				where: {categories_some: {slug: $slug}}
				first: 1
			) {
				edges {
					cursor
					node {
						slug
						title
						content
						timePeriod
						featuredImage {
							url
						}
						categories {
							slug
						}
						employers {
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

// Service called by "Header" component, "category/[slug]" page...
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

// Service called by "About" component...
export const getAbout = async () => {
	const query = gql`
		query GetAbout() {
			about(where: {id:"ckztdmx08a2r90f724pa2l32z"}) {
				name
				intro
				education
				contactInfo
				featuredImage {
					url
				}
			}
		}
	`

	const result = await request(graphqlAPI, query)
	return result.about
}