'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import OTPInput from 'react-otp-input';
import { auth } from '@/app/firebase.config';
import { BsFillShieldLockFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import Location from '@/components/location/Location';





export default function Page() {
    const router = useRouter()
    const [selectedCategories, setSelectedCategories] = useState({});
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [otpValue, setOtpValue] = useState('')
    const [loading, setLoading] = useState(false);


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        profilePhoto: null,
        aboutYourself: "",
        role: ''
    });

    const [formErrors, setFormErrors] = useState({});




    // Validation rules
    const validate = () => {
        let errors = {};
        if (!formData.name.trim()) {
            errors.name = "Name is required";
        }
        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email address is invalid";
        }
        if (!formData.phone) {
            errors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phone)) {
            errors.phone = "Phone number must be 10 digits";
        }
        if (!formData.password) {
            errors.password = "Password is required";
        } else if (formData.password.length < 8) {
            errors.password = "Password must be at least 8 characters";
        }
        if (steps == 3) {

            if (!formData.profilePhoto) {
                errors.profilePhoto = "Profile photo is required";
            }
            if (place == '') {
                errors.city = "City is required";
            }
            if (!formData.address) {
                errors.address = "Address is required";
            }
            Object.entries(selectedCategories).forEach(([category, details]) => {
                if (!errors[category]) errors[category] = {};

                // Validate subcategories
                if (!details.subcategories || details.subcategories.length === 0) {
                    errors[category].subcategories = "Please select at least one subcategory";
                }

                // Validate prices
                if (!errors[category].price) errors[category].price = {};
                if (details.price.fullDayPrice === '') {
                    errors[category].price.fullDayPrice = "Full day price is required";
                }
                if (details.price.halfDayPrice === '') {
                    errors[category].price.halfDayPrice = "Half day price is required";
                }
                if (details.price.extraHourPrice === '') {
                    errors[category].price.extraHourPrice = "Extra hour price is required";
                }

                // Validate wedding prices only if 'Wedding' subcategory is selected
                if (details.subcategories && details.subcategories.includes('Wedding')) {
                    if (!errors[category].weddingPrice) errors[category].weddingPrice = {};
                    if (details.weddingPrice.fullDayPrice === '') {
                        errors[category].weddingPrice.fullDayPrice = "Wedding full day price is required";
                    }
                    if (details.weddingPrice.halfDayPrice === '') {
                        errors[category].weddingPrice.halfDayPrice = "Wedding half day price is required";
                    }
                    if (details.weddingPrice.extraHourPrice === '') {
                        errors[category].weddingPrice.extraHourPrice = "Wedding extra hour price is required";
                    }
                }

                // Validate LED details
                if (category === "LED wall" || category === "LED TV") {
                    if (!details.ledDetails || !details.ledDetails.size) {
                        if (!errors[category].ledDetails) errors[category].ledDetails = {};
                        errors[category].ledDetails.size = "LED size is required";
                    }
                }
            });
            if (!formData.aboutYourself) {
                errors.aboutYourself = "About yourself is required";
            }
        }

        return errors;
    };

    const step1 = (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length === 0) {
            // Proceed to the next step if no errors
            setStep((prevState) => ({ ...prevState, currentStep: 2 }));
        } else {
            setFormErrors(errors);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "file" ? files[0] : value,
        }));
    };


    const handleRegister = async (e) => {
        e.preventDefault();
    
        if (!isTermsAccepted) {
            alert("You must accept the Terms and Conditions to proceed.");
            return;
        }
    
        setLoading(true); // Start loading
    
        try {
            // Step 1: Handle profile photo upload to Cloudinary
            let profilePhotoUrl = "";
            if (formData.profilePhoto) {
                const imgData = new FormData();
                imgData.append("file", formData.profilePhoto);
                imgData.append("upload_preset", "social");
                imgData.append("cloud_name", "hritiksarraf");
    
                const imgResponse = await fetch("https://api.cloudinary.com/v1_1/hritiksarraf/image/upload", {
                    method: "POST",
                    body: imgData,
                });
    
                if (imgResponse.ok) {
                    const imgResult = await imgResponse.json();
                    profilePhotoUrl = imgResult.url; // Get the URL from Cloudinary response
                } else {
                    throw new Error("Image upload failed");
                }
            }
    
            const payload = {
                ...formData,
                profilePhoto: profilePhotoUrl,
                skills,
                interest: Intrest,
                isTermsAccepted: true,
            };
    
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
    
            const response = await res.json();
    
            if (response.success) {
                toast.success("Signup Successful", {
                    position: "top-left",
                    autoClose: 5000,
                    theme: "light",
                });
    
                setTimeout(() => {
                    router.push("/log-in");
                }, 2000);
            } else {
                toast.error(response.error, {
                    position: "top-left",
                    autoClose: 5000,
                    theme: "light",
                });
            }
        } catch (error) {
            toast.error("Signup Failed", {
                position: "top-left",
                autoClose: 5000,
                theme: "light",
            });
        } finally {
            setLoading(false); // Stop loading
        }
    };
    




    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };









    const [steps, setStep] = useState({
        stepsItems: ["Details", "Skills", "Profile"],
        currentStep: 1
    });


    const [skillInput, setSkillInput] = useState("");
    const [skills, setSkills] = useState([]);
    const [intrestInput, setIntrestInput] = useState("");
    const [Intrest, setIntrest] = useState([]);

    const addSkill = () => {
        if (skillInput.trim() && !skills.includes(skillInput)) {
            setSkills([...skills, skillInput]);
            setSkillInput("");
        }
    };

    const addJobPreference = () => {
        if (intrestInput.trim() && !Intrest.includes(intrestInput)) {
            setIntrest([...Intrest, intrestInput]);
            setIntrestInput("");
        }
    };

    const removeItem = (item, setList, list) => {
        setList(list.filter((i) => i !== item));
    };



    return (
        <div>
            <ToastContainer />
            <div className="max-w-2xl mx-auto mt-10 p-4   shadow-2xl ">
                <ul aria-label="Steps" className="items-center text-gray-600 font-medium flex">
                    {steps.stepsItems.map((item, idx) => (
                        <li
                            aria-current={steps.currentStep === idx + 1 ? "step" : false}
                            key={idx}
                            className="flex-1 last:flex-none flex gap-x-2 md:items-center"
                        >
                            <div className="flex items-center flex-col gap-x-2">
                                <div
                                    className={`w-8 h-8 rounded-full border-2 flex-none flex items-center justify-center ${steps.currentStep > idx + 1
                                        ? "bg-indigo-600 border-indigo-600"
                                        : "" || steps.currentStep === idx + 1
                                            ? "border-indigo-600"
                                            : ""
                                        }`}
                                >
                                    <span
                                        className={`${steps.currentStep > idx + 1
                                            ? "hidden"
                                            : "" || steps.currentStep === idx + 1
                                                ? "text-indigo-600"
                                                : ""
                                            }`}
                                    >
                                        {idx + 1}
                                    </span>
                                    {steps.currentStep > idx + 1 && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-5 h-5 text-white"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4.5 12.75l6 6 9-13.5"
                                            />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <div className="h-8 flex items-center md:h-auto">
                                <h3
                                    className={`text-sm ${steps.currentStep === idx + 1 ? "text-indigo-600" : ""
                                        }`}
                                >
                                    {item}
                                </h3>
                            </div>
                            <hr
                                className={`hidden mr-2 w-full md:border md:block ${idx + 1 === steps.stepsItems.length
                                    ? "hidden"
                                    : "" || steps.currentStep > idx + 1
                                        ? "md:border-indigo-600"
                                        : ""
                                    }`}
                            />
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                {steps.currentStep === 1 && (
                    <section>
                        {/* this is details section */}
                        <section className="bg-gradient-to-b from-white to-yellow-200 h-[100vh]">
                            <div className="flex flex-col items-center  h-[80vh] px-6 py-2 mx-auto md:h-screen lg:py-0">
                                <Link
                                    href="/"
                                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                                >
                                    <Image
                                        className="mr-2"
                                        src="/assets/logo-light.png"
                                        width={150}
                                        height={50}
                                        alt="fotodukaan logo"
                                    />
                                </Link>
                                <div className="w-full rounded-lg shadow dark:border dark:border-gray-700 md:mt-0 text-black sm:max-w-md xl:p-0 bg-gradient-to-r from-white to-white">
                                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                                            Sign-up as a Mentor and start earning
                                        </h1>
                                        <form className="space-y-4 md:space-y-6" onSubmit={step1}>
                                            <div>
                                                <label
                                                    htmlFor="name"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                                >
                                                    Your Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-100 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Hritik Sarraf"
                                                    required
                                                />
                                                {formErrors.name && <p className="text-red-600">{formErrors.name}</p>}
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                                >
                                                    Your email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-100 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="name@company.com"
                                                    required
                                                />
                                                {formErrors.email && <p className="text-red-600">{formErrors.email}</p>}
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="phone"
                                                    className="block mb-2 text-sm font-medium text-black dark:text-black"
                                                >
                                                    Your Phone Number
                                                </label>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    id="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-100 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="7061652485"
                                                    required
                                                />
                                                {formErrors.phone && <p className="text-red-600">{formErrors.phone}</p>}
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="password"
                                                    className="block mb-2 text-sm font-medium text-black dark:text-black"
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    placeholder="••••••••"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-100 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    required
                                                />
                                                {formErrors.password && <p className="text-red-600">{formErrors.password}</p>}
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full text-white bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                            >
                                                Next
                                            </button>
                                            <p className="text-sm font-light text-gray-900 dark:text-black">
                                                Already have an account?{" "}
                                                <Link href="#" className="font-medium text-yellow-600 hover:underline dark:text-primary-500">
                                                    Login here
                                                </Link>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                )}
                {steps.currentStep === 2 && (

                    <section className="bg-gradient-to-b md:min-h-[100vh] min-h-[100vh]  from-white to-yellow-200 ">
                        <div className="flex flex-col items-center    px-6  mx-auto ">
                            <Link href="/" className="flex items-center  text-2xl font-semibold text-gray-900 dark:text-white">
                                <Image className="mr-2" src="/assets/logo-light.png" width={150} height={50} alt="fotodukaan logo" />
                            </Link>
                        </div>
                        <div className="flex flex-col items-center   justify-center shadow-2xl bg-white  border-2 w-[90vw] md:w-[30vw]  px-6 py-10 mx-auto  lg:py-10">

                            <h1 className="text-xl font-bold mt-5 md:mt-15 leading-tight tracking-tight text-blue-500 md:text-3xl ">
                                Step-2
                            </h1>
                            <h1 className="text-lg font-bold mt-4 mb-10 leading-tight tracking-tight text-black md:text-4xl ">
                                Add your Skills and Intrest
                            </h1>
                            <div className="p-6 max-w-md mx-auto">
                                {/* Skills Section */}
                                <h2 className="text-gray-500 mt-6 mb-2 font-semibold">Skills</h2>
                                <div className="flex mb-4">
                                    <input
                                        type="text"
                                        placeholder="Add a skill"
                                        className="flex-1 bg-gray-100 rounded-md p-3 mr-2"
                                        value={skillInput}
                                        onChange={(e) => setSkillInput(e.target.value)}
                                    />
                                    <button
                                        onClick={addSkill}
                                        className="bg-blue-500 px-4 rounded-md text-white"
                                    >
                                        Add
                                    </button>
                                </div>
                                <div className="flex flex-wrap">
                                    {skills.map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => removeItem(item, setSkills, skills)}
                                            className="bg-blue-200 px-3 py-2 rounded-3xl text-center mr-2 mb-2"
                                        >
                                            {item}{" "}
                                            <span className="text-red-700 font-bold cursor-pointer">X</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Job Preferences Section */}
                                <h2 className="text-gray-500 mt-6 mb-2 font-semibold">Intrest</h2>
                                <div className="flex mb-4">
                                    <input
                                        type="text"
                                        placeholder="Add a Intrest"
                                        className="flex-1 md:w-[35vw]  bg-gray-100 rounded-md p-3 mr-2"
                                        value={intrestInput}
                                        onChange={(e) => setIntrestInput(e.target.value)}
                                    />
                                    <button
                                        onClick={addJobPreference}
                                        className="bg-blue-500 px-4 rounded-md text-white"
                                    >
                                        Add
                                    </button>
                                </div>
                                <div className="flex flex-wrap">
                                    {Intrest.map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => removeItem(item, setIntrest, Intrest)}
                                            className="bg-blue-200 px-3 py-2 rounded-3xl text-center mr-2 mb-2"
                                        >
                                            {item}{" "}
                                            <span className="text-red-700 font-bold cursor-pointer">X</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setStep((prevState) => ({ ...prevState, currentStep: 1 }))}
                                        type="button"
                                        className="w-full md:w-[10vw] text-white bg-blue-400 hover:bg-blue-700 focus:ring-4  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (skills.length > 0 && Intrest.length > 0) {
                                                setStep((prevState) => ({ ...prevState, currentStep: 3 }));
                                            } else {
                                                alert("Please select at least one skill and one interest before proceeding.");
                                            }
                                        }}
                                        className="w-full md:w-[10vw] text-white bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {steps.currentStep === 3 && (
                    <section>
                        {/* this is profile section */}
                        <section className="bg-gradient-to-b min-h-[100vh] from-white py-5 to-yellow-200">
                            <div className="flex flex-col items-center my-auto justify-center px-6 py-8 mx-auto lg:py-0">
                                <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                                    <Image className="mr-2" src="/assets/logo-light.png" width={150} height={50} alt="fotodukaan logo" />
                                </Link>
                                <div className="w-full rounded-lg shadow dark:border dark:border-gray-700 md:mt-0 text-black sm:max-w-md xl:p-0 bg-gradient-to-r from-white to-white">
                                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                                            Set Up Your Profile
                                        </h1>
                                        <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
                                            {/* Profile Photo */}
                                            <div>
                                                <label htmlFor="profile-photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                                                    Profile Photo
                                                </label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    name="profilePhoto"
                                                    id="profile-photo"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                {formErrors.profilePhoto && <p className="text-red-500 text-sm">{formErrors.profilePhoto}</p>}
                                            </div>

                                            {/* About Yourself */}
                                            <div>
                                                <label htmlFor="about-yourself" className="block mb-2 text-sm font-medium text-black dark:text-black">
                                                    About Yourself
                                                </label>
                                                <textarea
                                                    name="aboutYourself"
                                                    id="about-yourself"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                                                    placeholder="Write a few sentences about yourself"
                                                    rows="4"
                                                    onChange={handleInputChange}
                                                    value={formData.aboutYourself}
                                                    required
                                                ></textarea>
                                                {formErrors.aboutYourself && <p className="text-red-500 text-sm">{formErrors.aboutYourself}</p>}
                                            </div>

                                            {/* Role Selection */}
                                            <div>
                                                <label htmlFor="role" className="block mb-2 text-sm font-medium text-black dark:text-black">
                                                    Role
                                                </label>
                                                <select
                                                    name="role"
                                                    id="role"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                                                    onChange={handleInputChange}
                                                    value={formData.role}
                                                    required
                                                >
                                                    <option value="" disabled>Select your role</option>
                                                    <option value="mentor">Mentor</option>
                                                    <option value="mentee">Mentee</option>
                                                </select>
                                                {formErrors.role && <p className="text-red-500 text-sm">{formErrors.role}</p>}
                                            </div>

                                            {/* Terms and Conditions */}
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    id="terms"
                                                    checked={isTermsAccepted}
                                                    onChange={(e) => setIsTermsAccepted(e.target.checked)}
                                                />
                                                <label htmlFor="terms">
                                                    I accept the <a className='text-blue-500' href="#" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
                                                </label>
                                            </div>

                                            {/* Buttons */}
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={() => setStep((prevState) => ({ ...prevState, currentStep: 2 }))}
                                                    type="button"
                                                    className="w-full text-white bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                                >
                                                    Back
                                                </button>
                                                <button
                                                    type="submit"
                                                    className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                                        }`}
                                                    disabled={loading} // Disable button while loading
                                                >
                                                    {loading ? (
                                                        <div className="flex items-center justify-center gap-2">
                                                            <CgSpinner className="animate-spin" size={20} />
                                                            <span>Loading...</span>
                                                        </div>
                                                    ) : (
                                                        "Sign-Up"
                                                    )}
                                                </button>

                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </section>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}
