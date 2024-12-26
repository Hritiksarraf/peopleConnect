import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import Image from 'next/image';

export default function page() {
  return (
    <>
      <div className="pt-20">
        <div className='w-[100vw] h-[80vh] bg-[#9b5810] bg-cover bg-center pt-20 bg-[url("/assets/about-pic.png")]'>
          <div className="md:w-[60vw]">
            <h1 className="px-3 md:px-10 py-5 text-5xl md:text-8xl font-bold text-left text-blue-500">Looking for a Mentor?</h1>
            <h1 className="px-3 md:px-10 pt-5 text-5xl md:text-8xl font-bold text-left text-white">Find Your Guide at People Connect</h1>
            
            <h1 className="px-3 md:px-10 text-xl md:text-4xl font-bold text-left text-black">Scroll down to begin your mentorship journey <KeyboardArrowDownIcon className='text-3xl text-blue-700' /> </h1>
          </div>
        </div>

        <section>
          <div>
            <h1 className="pt-5 text-4xl md:text-7xl text-center text-black">For Mentees</h1>
            <h1 className="pt-5 text-4xl md:text-7xl text-center text-black">Find Your Ideal Mentor</h1>
          </div>

          <div className="bg-cover bg-center w-full my-8 flex flex-col md:flex-row text-center md:text-left bg-gradient-to-b md:bg-gradient-to-r from-[#0E2041] to-[#0E2041]">
            <div className="flex bg-white rounded-b-[9rem] md:rounded-r-[17rem] justify-center items-center md:w-[55%]">
              <div className='h-full'>
                <img className='object-cover h-full md:w-[50vw] shadow-2xl rounded-b-[6rem] md:rounded-r-[17rem]' src="https://images.pexels.com/photos/2179205/pexels-photo-2179205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
              </div>
            </div>
            <div className="w-full md:w-[60%] px-7 py-10 md:px-20 md:py-20">
              <h1 className="text-3xl md:text-5xl text-left md:pr-10 text-white" style={{ fontFamily: "poppins" }}>
                Connect with Expert Mentors in JEE, NEET, Web Development, and More!
              </h1>
              <p className="md:text-sm mt-2 md:mt-5 m-auto md:pr-40 font-serif text-left text-white text-[0.6rem]">
                People Connect is a platform where students can find experienced mentors across various fields. Whether you are preparing for JEE, NEET, looking to hone your Web Development skills, or want to improve your Video Editing abilities, our mentors are here to guide you every step of the way. Join today and get the support you need to succeed!
              </p>
              <div className='mt-9'>
                <div className='flex'>
                  <div className='bg-[#9558EC] rounded-md h-full inline-block p-1'><CameraAltOutlinedIcon className='text-3xl md:text-4xl text-white' /></div>
                  <div className='ml-2 text-white'>
                    <h1 className='text-xl md:text-3xl text-left font-serif'>Learn from Industry Experts</h1>
                    <p className="md:text-sm text-left md:pr-64 font-serif text-[0.6rem]">Connect with experienced professionals who have mastered their fields and are ready to guide you.</p>
                  </div>
                </div>

                <div className='flex mt-8'>
                  <div className='bg-blue-500 rounded-md h-full inline-block p-1'><CameraAltOutlinedIcon className='text-3xl md:text-4xl text-white' /></div>
                  <div className='ml-2 text-white'>
                    <h1 className='text-xl md:text-3xl font-serif text-left'>Personalized Mentorship</h1>
                    <p className="md:text-sm text-left md:pr-64 font-serif text-[0.6rem]">Get personalized guidance tailored to your goals and aspirations, ensuring your success in every step of your journey.</p>
                  </div>
                </div>

                <div className='flex mt-8'>
                  <div className='bg-yellow-500 rounded-md h-full inline-block p-1'><CameraAltOutlinedIcon className='text-3xl md:text-4xl text-white' /></div>
                  <div className='ml-2 text-white'>
                    <h1 className='text-xl md:text-3xl font-serif text-left'>Simple Registration Process</h1>
                    <p className="md:text-sm md:pr-64 text-left font-serif text-[0.6rem]">Join the platform in just a few simple steps: register, fill out your profile, and start connecting with mentors who match your needs.</p>
                  </div>
                </div>
              </div>
              <div className="pt-8 flex mx-auto w-full justify-center md:justify-start">
                <button className="bg-yellow-500 text-white px-6 py-3 rounded-full mr-4">Contact Us</button>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div>
            <h1 className="pt-5 text-4xl md:text-7xl text-center text-black">For Mentors</h1>
            <h1 className="pt-5 text-4xl md:text-7xl text-center text-black">Become a Mentor</h1>
          </div>

          <div className="bg-cover bg-center w-full my-8 flex flex-col md:flex-row-reverse text-center md:text-left bg-gradient-to-b md:bg-gradient-to-r from-[#F5AA2B] to-[#F5AA2B]">
            <div className="flex bg-white rounded-b-[9rem] md:rounded-l-[17rem] justify-center items-center md:w-[55%]">
              <div className='h-full'>
                <img className='object-cover h-full md:w-[50vw] shadow-2xl rounded-b-[9rem] md:rounded-br-0 md:rounded-l-[17rem]' src="https://images.pexels.com/photos/4307935/pexels-photo-4307935.jpeg" alt="" />
              </div>
            </div>
            <div className="w-full md:w-[60%] px-7 py-10 md:px-10 md:py-20">
              <h1 className="text-3xl md:text-5xl text-left md:pr-10 text-black" style={{ fontFamily: "poppins" }}>
                Share Your Expertise and Help Students Succeed
              </h1>
              <p className="md:text-sm mt-2 md:mt-5 m-auto md:pr-20 font-serif text-left text-black text-[0.6rem]">
                As a mentor on People Connect, you can guide students through their academic journey in JEE, NEET, Web Development, and more. By offering personalized advice and mentorship, you will help students reach their potential while enhancing your own career and professional network.
              </p>
              <div className='mt-9'>
                <div className='flex'>
                  <div className='bg-[#9558EC] rounded-md h-full inline-block p-1'><CameraAltOutlinedIcon className='text-3xl md:text-4xl text-white' /></div>
                  <div className='ml-2'>
                    <h1 className='text-xl md:text-3xl text-left font-serif'>Inspire the Next Generation</h1>
                    <p className="md:text-sm text-left text-black md:pr-64 font-serif text-[0.6rem]">Use your expertise to inspire and guide young minds to excel in their chosen fields.</p>
                  </div>
                </div>

                <div className='flex mt-8'>
                  <div className='bg-blue-500 rounded-md h-full inline-block p-1'><CameraAltOutlinedIcon className='text-3xl md:text-4xl text-white' /></div>
                  <div className='ml-2'>
                    <h1 className='text-xl md:text-3xl font-serif text-left'>Flexible Schedule</h1>
                    <p className="md:text-sm text-left text-black md:pr-64 font-serif text-[0.6rem]">Mentoring on your terms – set your own schedule and mentor students at your convenience.</p>
                  </div>
                </div>

                <div className='flex mt-8'>
                  <div className='bg-yellow-500 rounded-md h-full inline-block p-1'><CameraAltOutlinedIcon className='text-3xl md:text-4xl text-white' /></div>
                  <div className='ml-2'>
                    <h1 className='text-xl md:text-3xl font-serif text-left'>Make a Difference</h1>
                    <p className="md:text-sm text-left md:pr-64 font-serif text-[0.6rem]">Help students achieve their goals, and make a lasting impact on their lives and careers.</p>
                  </div>
                </div>
              </div>
              <div className="pt-8 flex mx-auto w-full justify-center md:justify-start">
                <button className="bg-yellow-500 text-white px-6 py-3 rounded-full mr-4">Become a Mentor</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
