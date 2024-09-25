// import { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate, useParams} from "react-router-dom";
import { FaMapMarker } from "react-icons/fa";
import { toast } from "react-toastify";
import ConfirmationModal from "../components/ConfirmationModal ";
import { useState } from "react";

 const JobPage = ({deleteJob}) => {
    const { id } = useParams();
    const job = useLoaderData()
    const navigate = useNavigate()




    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);

  const openModal = (jobId) => {
    setSelectedJobId(jobId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedJobId(null);
    setModalIsOpen(false);
  };






    const onDeleteClick = () => {
    
        try {
            deleteJob(selectedJobId);
            navigate('/jobs');
        } catch (error) {
            toast.error('Failed to delete job. Please try again.');
        }finally {
            closeModal();
          }
 
      };
    
    // const [job, setJob] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     const fetchJobs = async () => {
    //         try {
    //             const res = await fetch(`/api/jobs/${id}`);
    //             const data = await res.json();
    //             setJob(data);
    //         } catch (error) {
    //             console.log("Error fetching data", error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchJobs();
    // }, []);

    return (
        <>
            <section>
                <div className="container m-auto py-6 px-6">
                    <Link
                        to="/jobs"
                        className="text-teal-700 hover:text-teal-800 flex items-center"
                    >
                        <i className="fas fa-arrow-left mr-2"></i> Back to Job Listings
                    </Link>
                </div>
            </section>
          
                <section className="bg-teal-50">
                    <div className="container m-auto py-10 px-6">
                        <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                            <main>
                                <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                                    <div className="text-gray-500 mb-4">{job.type}</div>
                                    <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
                                    <div className="text-orange-700 mb-4 flex align-middle justify-center md:justify-start">
                                        <FaMapMarker className="inline text-lg mb-1 mr-1" />
                                        <p>{job.location}</p>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                                    <h3 className="text-teal-800 text-lg font-bold mb-6">
                                        Job Description
                                    </h3>

                                    <p className="mb-4">{job.description}</p>

                                    <h3 className="text-teal-800 text-lg font-bold mb-2">
                                        Salary
                                    </h3>

                                    <p className="mb-4">{job.salary} / Year</p>
                                </div>
                            </main>

                            <aside>
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-xl font-bold mb-6">Company Info</h3>

                                    <h2 className="text-2xl">{job.company.name}</h2>

                                    <p className="my-2">{job.company.description}</p>

                                    <hr className="my-4" />

                                    <h3 className="text-xl">Contact Email:</h3>

                                    <p className="my-2 bg-teal-100 p-2 font-bold">
                                        {job.company.contactEmail}
                                    </p>

                                    <h3 className="text-xl">Contact Phone:</h3>

                                    <p className="my-2 bg-teal-100 p-2 font-bold">
                                        {job.company.contactPhone}
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                                    <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                                    <Link
                                        to={`/jobs/edit/${id}`}
                                        className="bg-teal-600 hover:bg-teal-700 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                                    >
                                        Edit Job
                                    </Link>
                                    <button   onClick={() => openModal(id)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                                        Delete Job
                                    </button>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>
                  <ConfirmationModal
                   isOpen={modalIsOpen}
                   onRequestClose={closeModal}
                   onConfirm={onDeleteClick}
                   message="Are you sure you want to delete this listing?"
                  />
            
        </>
    );
};

const jobLoader = async ({params}) => {
    const res = await fetch(`/api/jobs/${params.id}`)
    const data = await res.json()
    return data
}


export {JobPage as default , jobLoader};
