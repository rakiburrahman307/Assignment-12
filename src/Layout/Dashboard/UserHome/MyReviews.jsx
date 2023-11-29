
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch user reviews from the server
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/my_reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  const handleDeleteReview = async (reviewId) => {
    try {
      // Delete the review
      await axios.delete(`/delete_review/${reviewId}`);

      // Update the reviews state
      setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div>
      <h2>My Reviews</h2>
      <table>
        <thead>
          <tr>
            <th>Meal Title</th>
            <th>Likes Count</th>
            <th>Reviews Count</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>View Meal</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review._id}>
              <td>{review.mealTitle}</td>
              <td>{review.likesCount}</td>
              <td>{review.reviewsCount}</td>
              <td>
                <Link to={`/edit_review/${review._id}`}>Edit</Link>
              </td>
              <td>
                <button onClick={() => handleDeleteReview(review._id)}>Delete</button>
              </td>
              <td>
                <Link to={`/meal_detail/${review.mealId}`}>View Meal</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyReviews;
