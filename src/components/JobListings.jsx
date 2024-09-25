import { useEffect, useState } from "react";
import JobListing from "./JobListing";

const JobListings = ({ page = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobsListShow, setJobsListShow] = useState(30);

  const limitUrl = `/api/jobs${page ? `?_limit=3` : `?_limit=${jobsListShow}`}`;

  useEffect(() => {
    const fetchJobs = async () => {
      await fetch(limitUrl)
        .then((res) => res.json())
        .then((jobsData) => {
          setJobs(jobsData);
        })
        .catch((error) => {
          console.log("Error Fatching data ", error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchJobs();
  }, [jobsListShow]);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center">
          {page ? "Latest Jobs" : "Browse Jobs"}
        </h2>
        {!page ? (
          <>
            <div className="flex justify-end items-center mb-4">
              <label
                htmlFor="list-limit"
                className=" text-gray-700 font-medium mr-2"
              >
                Items to Show:
              </label>
              <select
                id="list-limit"
                onChange={(e) => setJobsListShow(e.target.value)}
                value={jobsListShow}
                className="bg-white border border-gray-300 text-gray-700 rounded-md shadow-sm p-1.5 pr-6 "
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
            </div>
            <div className="border border-gray-200 mb-4"></div>
          </>
        ) : (
          ""
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <h2>Loading....</h2>
          ) : (
            <>
              {jobs
                .slice()
                .reverse()
                .map((job) => (
                  <JobListing key={job.id} job={job} />
                ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobListings;
