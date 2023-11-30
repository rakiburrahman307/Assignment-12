import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import PageHelmet from '../../../Hooks/pageHelmet';

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: reviews = [], refetch } = useQuery({
    queryKey: ['reviewsData'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${user?.email}`);
      return res.data;
    }
  })

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedText, setUpdatedText] = useState('');
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  const handleUpdateComment = (id) => {
    setSelectedReviewId(id);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setUpdatedText('');
    setSelectedReviewId(null);
  };

  const handleUpdateText = () => {
    if (!updatedText.trim()) {
      toast.error('Please enter a valid comment.');
      return;
    }
    const updatedComment = String(updatedText);
    axiosSecure.patch(`/reviews/${selectedReviewId}`, { updatedText: updatedComment })
      .then((res) => {
        if (res.data.updatedCount > 0) {
          toast.success('Comment updated successfully.');
          handleModalClose();
          refetch();
        }
      })
      .catch((error) => {
        console.log(error.message);
        toast.error('Failed to update comment.');
      });
  };

  const handleDeleteComment = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/reviews/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your comment has been deleted.",
                icon: "success"
              });
              refetch();
            }
          })
          .catch((error) => console.log(error.message))
      }
    });
  };

  useEffect(() => {
    console.log("Modal Open (Effect):", isModalOpen);
  }, [isModalOpen]);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <div>
           <h2 className='text-center text-3xl py-5 font-bold'>My Reviews</h2>
      <PageHelmet title='My Review'></PageHelmet>
      <div className="py-10">
        <h2 className="text-3xl font-bold text-center py-5">Customer Comment</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mx-5">
          {reviews.map((review) => (
            <div key={review._id} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{review?.customerName}</h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">{review?.text}</p>
              <div className='mt-5 flex items-center gap-6 justify-between'>
                <button onClick={() => handleUpdateComment(review?._id)} className="btn btn-sm">Update</button>
                <button onClick={() => handleDeleteComment(review?._id)} className="btn btn-sm bg-red-500 text-white hover:text-black">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        style={customStyles}
        onAfterOpen={() => console.log("Modal Open (Effect):", isModalOpen)}
        onRequestClose={handleModalClose}
        contentLabel="Update Comment Modal"
      >
        <h2 className="text-xl font-bold mb-4">Update Comment</h2>
        <textarea
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
          placeholder="Enter updated comment"
          className="w-full h-40 p-2 border rounded mb-4"
        />
        <button onClick={handleUpdateText} className="btn btn-primary">Update Comment</button>
        <button onClick={handleModalClose} className="btn btn-secondary ml-2">Cancel</button>
      </Modal>
    </div>
  );
};

export default MyReviews;
