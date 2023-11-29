
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddMealForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Send data to the database
      const response = await axios.post('/add_meal', data);

      // Show success toast
      toast.success('Meal added successfully!');

      // Clear the form
      reset();
    } catch (error) {
      console.error('Error adding meal:', error);

      // Show error toast
      toast.error('Error adding meal. Please try again.');
    }
  };

  const onAddToUpcoming = async (data) => {
    try {
      // Send data to the database and upcoming collection
      await axios.post('/add_meal', data);
      await axios.post('/add_to_upcoming', data);

      // Show success toast
      toast.success('Meal added to upcoming successfully!');

      // Clear the form
      reset();
    } catch (error) {
      console.error('Error adding meal to upcoming:', error);

      // Show error toast
      toast.error('Error adding meal to upcoming. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="mealTitle">Meal Title</label>
      <input {...register('mealTitle')} type="text" id="mealTitle" required />

      <label htmlFor="mealType">Meal Type</label>
      <input {...register('mealType')} type="text" id="mealType" required />

      <label htmlFor="mealImage">Meal Image URL</label>
      <input {...register('mealImage')} type="text" id="mealImage" required />

      <label htmlFor="ingredients">Ingredients</label>
      <textarea {...register('ingredients')} id="ingredients" required />

      <label htmlFor="mealDescription">Meal Description</label>
      <textarea {...register('mealDescription')} id="mealDescription" required />

      <label htmlFor="price">Price</label>
      <input {...register('price')} type="number" id="price" required />

      <label htmlFor="rating">Rating</label>
      <input {...register('rating')} type="number" id="rating" step="0.1" required />

      <label htmlFor="postTime">Post Time</label>
      <input {...register('postTime')} type="text" id="postTime" required />

      <label htmlFor="adminName">Admin/Distributor Name</label>
      <input {...register('adminName')} type="text" id="adminName" required />

      <label htmlFor="adminEmail">Admin/Distributor Email</label>
      <input {...register('adminEmail')} type="email" id="adminEmail" required />

      <button type="submit">Add Meal</button>
      <button type="button" onClick={handleSubmit(onAddToUpcoming)}>
        Add to Upcoming
      </button>
    </form>
  );
};

export default AddMealForm;
