import Hero from "../components/Hero"
import HomeCards from "../components/HomeCards"
import JobListings from "../components/JobListings"
import ViewAllJobs from "../components/ViewAllJobs"

const HomePage = () => {
  return (
        <>
           <Hero/>
           <HomeCards/>
           <JobListings page={true} />
           <ViewAllJobs/>
        </>
  )
}

export default HomePage