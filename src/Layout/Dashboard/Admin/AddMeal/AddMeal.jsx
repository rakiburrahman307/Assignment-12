
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import PageHelmet from '../../../../Hooks/pageHelmet';
const AddMeal = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const mealType = data.mealType;
    const mealTitle = data.mealTitle;
    const mealImage = data.mealImage;
    const ingredients = data.ingredients;
    const mealDescription = data.mealDescription;
    const price = data.price;
    const rating = data.rating;
    const adminName = data.adminName;
    const gmail = data.adminEmail;
    const postTime = new Date().toISOString();
    const likes = 0;
    const reviews = [];
    const mealInfo = { mealType, mealTitle, mealImage, ingredients, mealDescription, price, rating, adminName, gmail, postTime, likes, reviews }
    axiosSecure.post('/add_meal',mealInfo)
    .then(res=>{
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Meal Added",
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
    .catch(err => console.log(err.message));
  };


  const onAddToUpcoming = (data) => {
    const mealType = data.mealType;
    const mealTitle = data.mealTitle;
    const mealImage = data.mealImage;
    const ingredients = data.ingredients;
    const mealDescription = data.mealDescription;
    const price = data.price;
    const rating = data.rating;
    const adminName = data.adminName;
    const gmail = data.adminEmail;
    const postTime = new Date().toISOString();
    const likes = 0;
    const reviews = [];
    const mealInfo = { mealType, mealTitle, mealImage, ingredients, mealDescription, price, rating, adminName, gmail, postTime, likes, reviews }
    axiosSecure.post('/add_meal_upcoming',mealInfo)
    .then(res=>{
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Meal Added Upcoming",
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
    .catch(err => console.log(err.message));
  };
 

  return (
    <div className="card shrink-0 w-full shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
    <PageHelmet title='Add Meals'></PageHelmet>
        <div className="form-control">
          <label htmlFor="mealTitle" className="label">
            <span className="label-text">Meal Title</span>
          </label>
          <input className="input input-bordered w-full " {...register('mealTitle')} type="text" id="mealTitle" required />
        </div>

        <div className="form-control">
          <label htmlFor="mealType" className="label">
            <span className="label-text">Meal Type</span>
          </label>
          <input className="input input-bordered w-full " {...register('mealType')} type="text" id="mealType" required />
        </div>
        <div className="form-control">
          <label htmlFor="mealImage" className="label">
            <span className="label-text">Meal Image URL</span>
          </label>
          <input className="input input-bordered w-full" {...register('mealImage')} type="text" id="mealImage" required />
        </div>

        <div className="form-control">
          <label htmlFor="ingredients" className="label">
            <span className="label-text">Ingredients</span>
          </label>
          <textarea className="textarea textarea-bordered textarea-xs w-full"  {...register('ingredients')} id="ingredients" required />
        </div>


        <div className="form-control">
          <label htmlFor="mealDescription" className="label">
            <span className="label-text">Meal Description</span>
          </label>
          <textarea className="textarea textarea-bordered textarea-xs w-full "  {...register('mealDescription')} id="mealDescription" required />
        </div>

        <div className="form-control">
          <label htmlFor="price" className="label">
            <span className="label-text">Price</span>
          </label>
          <input className="input input-bordered w-full " {...register('price')} type="number" id="price" required />
        </div>

        <div className="form-control">
          <label htmlFor="rating" className="label">
            <span className="label-text">Rating</span>
          </label>
          <input className="input input-bordered w-full" {...register('rating')} type="number" id="rating" step="0.1" required />
        </div>


        <div className="form-control">
          <label htmlFor="adminName" className="label">
            <span className="label-text">Admin/Distributor Name</span>
          </label>
          <input className="input input-bordered w-full" {...register('adminName')} type="text" id="adminName" required />
        </div>
        <div className="form-control">
          <label htmlFor="adminEmail" className="label">
            <span className="label-text">Admin/Distributor Email</span>
          </label>
          <input className="input input-bordered w-full" {...register('adminEmail')} type="email" id="adminEmail" required />
        </div>

        <button className="btn btn-sm">Add Meal</button>
        <button className="btn btn-sm" onClick={handleSubmit(onAddToUpcoming)}>
          Add to Upcoming
        </button>
      </form>
    </div>
  );
};

export default AddMeal;
