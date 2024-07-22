import { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateEmployee = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const [courses, setCourses] = useState({
    BCA: false,
    BSC: false,
    MCA: false,
    MSC: false,
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleCourseChange = (e) => {
    setCourses({
      ...courses,
      [e.target.value]: e.target.checked,
    });
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("id", data.id || "");
      formData.append("name", data.name || "");
      formData.append("email", data.email || "");
      formData.append("mobile", data.mobile || "");
      formData.append("designation", data.designation || "");
      formData.append("gender", data.gender || "");
      
      const selectedCourses = Object.keys(courses).filter(course => courses[course]);
      formData.append("course", JSON.stringify(selectedCourses));
      
      if (imageFile) {
        formData.append("image", imageFile);
      }
  
      // Log FormData for debugging
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      
      const response = await axios.post("http://localhost:4000/api/createEmployee", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      toast.success("Employee created successfully!");
      navigate("/employee-list")
      console.log(response.data);
      
    } catch (error) {
      toast.error("Error creating employee: " + (error.response?.data?.message || error.message));
      console.error("Error creating employee:", error.response?.data || error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-center w-full mt-10">
        <div className="relative">
          <img
            src={selectedImage || ""}
            className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
            alt=""
          />
          <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleImage}
            />
            <label htmlFor="image">
              <AiOutlineCamera />
            </label>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full px-[100px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-wrap gap-[10vh]">
            <div className="flex-1 min-w-[200px]">
              <label className="block pb-2">Employee ID</label>
              <input
                type="text"
                {...register("id", { required: "Employee ID is required" })}
                className={`${styles.input} w-full mb-4 ${
                  errors.id ? "border-red-500" : ""
                }`}
              />
              {errors.id && <p className="text-red-500">{errors.id.message}</p>}
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block pb-2">Employee Name</label>
              <input
                type="text"
                {...register("name", { required: "Employee Name is required" })}
                className={`${styles.input} w-full mb-4 ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-[10vh]">
            <div className="flex-1 min-w-[200px]">
              <label className="block pb-2">Email Address</label>
              <input
                type="email" // Changed to email type for better validation
                {...register("email", {
                  required: "Email Address is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                className={`${styles.input} w-full mb-4 ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block pb-2">Mobile Number</label>
              <input
                type="text" // Changed to text to prevent issues with long numbers
                {...register("mobile", {
                  required: "Mobile Number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid mobile number, must be exactly 10 digits",
                  },
                })}
                className={`${styles.input} w-full mb-4 ${
                  errors.mobile ? "border-red-500" : ""
                }`}
              />
              {errors.mobile && (
                <p className="text-red-500">{errors.mobile.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-[10vh]">
            <div className="flex-1 min-w-[200px]">
              <label className="block pb-2">Designation</label>
              <select
                {...register("designation", {
                  required: "Designation is required",
                })}
                className={`${styles.input} w-full mb-4 ${
                  errors.designation ? "border-red-500" : ""
                }`}
              >
                <option value="" disabled>
                  Select Designation
                </option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </select>
              {errors.designation && (
                <p className="text-red-500">{errors.designation.message}</p>
              )}
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block pb-2">Gender</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...register("gender", { required: "Gender is required" })}
                    value="Male"
                    className="mr-2"
                  />
                  Male
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...register("gender", { required: "Gender is required" })}
                    value="Female"
                    className="mr-2"
                  />
                  Female
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...register("gender", { required: "Gender is required" })}
                    value="Other"
                    className="mr-2"
                  />
                  Other
                </label>
              </div>
              {errors.gender && (
                <p className="text-red-500">{errors.gender.message}</p>
              )}
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block pb-2">Course</label>
              <div className="flex gap-4">
                {Object.keys(courses).map((course) => (
                  <label key={course} className="flex items-center">
                    <input
                      type="checkbox"
                      value={course}
                      checked={courses[course]}
                      onChange={handleCourseChange}
                      className="mr-2"
                    />
                    {course}
                  </label>
                ))}
              </div>
              {errors.courses && (
                <p className="text-red-500">{errors.courses.message}</p>
              )}
            </div>
          </div>

          <button
            className="w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer"
            type="submit">Create Employee</button>
        </form>
        <div className="mb-5"></div>
      </div>
    </div>
  );
};

export default CreateEmployee;
