'use client'
import ServiceCard from '@/components/card/ServiceCard';
import Image from 'next/image';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import Slider from "react-slick";
import { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import Link from 'next/link';
import Modal from 'react-modal';
import SearchBar from '@/components/searchBar/SearchBar';
import Location from '@/components/location/Location';

export default function Home() {

 
  const Partner = [
    {
      title: "Amazone",
      img: "https://i.pinimg.com/originals/01/ca/da/01cada77a0a7d326d85b7969fe26a728.jpg"
    },
    {
      title: "Google",
      img: "https://cdn2.hubspot.net/hubfs/53/image8-2.jpg"
    },
    {
      title: "Allen",
      img: "https://bl-i.thgim.com/public/incoming/ky0mvh/article65526359.ece/alternates/FREE_1200/allen-logo.jpg"
    },
    {
      title: "PW",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Physics_wallah_logo.jpg/480px-Physics_wallah_logo.jpg"
    }
  ]


  //review section start here
 const TestimonialData = [
  {
    id: 1,
    name: "Hritik",
    text: "Finding a mentor on this platform was the best decision I made for my JEE preparation. My mentor guided me through complex concepts, and their personalized approach helped me improve significantly.",
    img: "https://res.cloudinary.com/hritiksarraf/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1728083418/Screenshot_2024-10-05_at_4.33.35_AM_vbm7sk.png",
    star: 5,
    skills: ['JEE Preparation', 'Mentorship']
  },
  {
    id: 2,
    name: "Mani",
    text: "The mentorship I received for web development was invaluable. My mentor helped me grasp core concepts, build projects, and gain the confidence to apply for internships in the industry.",
    img: "https://res.cloudinary.com/hritiksarraf/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1728083418/Screenshot_2024-10-05_at_4.33.35_AM_vbm7sk.png",
    star: 4,
    skills: ['Web Development', 'Mentorship']
  },
  {
    id: 3,
    name: "Piyush",
    text: "I was struggling with NEET preparation until I connected with a mentor through this platform. Their insights and structured study plan helped me improve my score drastically.",
    img: "https://res.cloudinary.com/hritiksarraf/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1728083418/Screenshot_2024-10-05_at_4.33.35_AM_vbm7sk.png",
    star: 5,
    skills: ['NEET Preparation', 'Mentorship']
  },
  {
    id: 4,
    name: "Saurav",
    text: "The mentorship program for video editing on this platform helped me develop my editing skills, from basic techniques to advanced storytelling. I'm now confident in my abilities and working on freelance projects.",
    img: "https://res.cloudinary.com/hritiksarraf/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1728083418/Screenshot_2024-10-05_at_4.33.35_AM_vbm7sk.png",
    star: 4,
    skills: ['Video Editing', 'Mentorship']
  },
  {
    id: 5,
    name: "Aditya",
    text: "I couldn't have asked for a better mentor for my web development journey. From building a portfolio to learning advanced frameworks, my mentor has been instrumental in my progress.",
    img: "https://res.cloudinary.com/hritiksarraf/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1728083418/Screenshot_2024-10-05_at_4.33.35_AM_vbm7sk.png",
    star: 5,
    skills: ['Web Development', 'Mentorship']
  },
  {
    id: 6,
    name: "Riya",
    text: "The mentor I found for video editing not only taught me the technical side but also helped me develop a creative vision. I am now confident in my skills and ready to pursue a career in video production.",
    img: "https://res.cloudinary.com/hritiksarraf/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1728083418/Screenshot_2024-10-05_at_4.33.35_AM_vbm7sk.png",
    star: 5,
    skills: ['Video Editing', 'Mentorship']
  },
  {
    id: 7,
    name: "Amit",
    text: "Mentoring for my JEE preparation has been a game-changer. My mentor helped me break down difficult topics into manageable chunks, allowing me to approach my studies with more clarity and confidence.",
    img: "https://res.cloudinary.com/hritiksarraf/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1728083418/Screenshot_2024-10-05_at_4.33.35_AM_vbm7sk.png",
    star: 4,
    skills: ['JEE Preparation', 'Mentorship']
  },
  {
    id: 8,
    name: "Sanya",
    text: "The platform helped me find a mentor for NEET who truly understood my struggles. They provided excellent guidance, motivational support, and the right resources to help me succeed.",
    img: "https://res.cloudinary.com/hritiksarraf/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1728083418/Screenshot_2024-10-05_at_4.33.35_AM_vbm7sk.png",
    star: 5,
    skills: ['NEET Preparation', 'Mentorship']
  },
  {
    id: 9,
    name: "Karthik",
    text: "Through this platform, I connected with an experienced mentor for video editing. Their feedback on my work and technical advice helped me take my editing skills to a professional level.",
    img: "https://res.cloudinary.com/hritiksarraf/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1728083418/Screenshot_2024-10-05_at_4.33.35_AM_vbm7sk.png",
    star: 5,
    skills: ['Video Editing', 'Mentorship']
  },
  {
    id: 10,
    name: "Anjali",
    text: "I found an excellent mentor for my web development journey here. They helped me learn everything from front-end to back-end development, making the learning process engaging and practical.",
    img: "https://res.cloudinary.com/hritiksarraf/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1728083418/Screenshot_2024-10-05_at_4.33.35_AM_vbm7sk.png",
    star: 4,
    skills: ['Web Development', 'Mentorship']
  }
];


  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const handleReadMoreClick = (review) => {
    setSelectedReview(review);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedReview(null);
  };

  const customModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      maxWidth: '600px',
      padding: '20px',
      borderRadius: '15px',
      backgroundColor: '#fff',
      boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
  };

  // review setiing ends here

  const imgurl = "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"


  var settings2 = {

    infinite: true,
    speed: 350,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 600,
        settings: {

          infinite: true,
          speed: 350,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 4000,
          pauseOnHover: true,
        }
      },]
  };

  var settings = {

    infinite: true,
    speed: 350,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 600,
        settings: {

          infinite: true,
          speed: 350,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 4000,
          pauseOnHover: true,
        }
      },]
  };

  var partnerSettings = {

    infinite: true,
    speed: 350,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 600,
        settings: {

          infinite: true,
          speed: 350,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 4000,
          pauseOnHover: true,
        }
      },]
  };


  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = ["JEE", "NEET", "Web Devlopement", "AI/Ml", "Gen AI", "Desginer",];
  const [freelancer, setFreelancer] = useState([])
  const period = 2000;

  const [category, setCategory] = useState("");
  const [place, setPlace] = useState("");

  const getFeelancer = async () => {
    // console.log('getting freelancer')
    const response = await fetch("/api/freelancer");
    const data = await response.json();
    // console.log('got freelancer', data)
    setFreelancer(data);
  };


  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  useEffect(() => {
    getFeelancer()
  }, [])

  const isSearchDisabled = !category;



  return (
    <div className="bg-gradient-to-r from-white overflow-x-hidden  to-white ">
      <section>

      </section>
      {/* Hero Section */}
      <section className="  bg-cover flex flex-col-reverse md:flex-row bg-gradient-to-t md:bg-gradient-to-r from-blue-800 to-blue-400   bg-center w-full h-full pt-20  text-center md:text-left ">
        <div className=" md:w-[70vw] p-5 md:p-10 md:px-15">

          <h1 className="text-5xl md:text-8xl font-bold text-left text-white">Find the Best Mentor <p className="text-yellow-500 h-12 " >{' '}<span className=' text-3xl md:text-6xl  my-7   md:block stikey '> <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "papper cups", "", "UI/UX Designer" ]'><span className="wrap border-r-4 px-1 border-yellow-950">{text}</span></span></span></p></h1>

          <p className='py-8 text-white text-lg'> Connect with experienced mentors who match your interests and skill requirements. Unlock guidance tailored to your aspirations and achieve your goals with ease!</p>
          <div className="mt-10 sm:mt-8  ">
            <div className="bg-white rounded-md shadow-lg  w-full sm:w-[45vw] f gap-9 space-y-4  space-x-4">

              <SearchBar />
            </div>
          </div>
          <div className="mt-8 flex mx-auto w-[100%] justify-center md:justify-start">

            <Link href={"/contact"} className="bg-yellow-600 text-white px-6 py-3 rounded-full mr-4">Contact Us</Link>

          </div>
        </div>
        <div className="  ">
          <img
            // src='https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            src='https://img.freepik.com/free-photo/researchers-looking-alternative-energy-souces_23-2149311465.jpg?t=st=1735122878~exp=1735126478~hmac=58c10a0545e57fa4193fff927ad3427b1bce9b84936ecd2eef8c2fbb011e0793&w=2000'
            // src='https://unsplash.com/photos/beautiful-indian-bride-and-groom-hand-with-mehandi-design-BDWH_GDKVCIhttps://plus.unsplash.com/premium_photo-1670524465634-93cf255ffa8b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWFuJTIwd2VkZGluZyUyMGltYWdlfGVufDB8fDB8fHwwhttps://plus.unsplash.com/premium_photo-1670524465634-93cf255ffa8b?q=80&w=3254&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            width={800}
            height={900}
            className=" rounded-lg shadow-lg md:w-[70vw]  object-cover rounded-b-[10rem] md:rounded-br-[0rem] md:rounded-bl-[25rem]  h-[40vh] md:h-[80vh]"
            alt="Camera"
          />
        </div>
      </section>

      <section>
        <div className='my-0 md:my-10'>
          <h1 className="text-4xl md:text-6xl pt-10 font-serif text-center text-gradient-to-r from-white to-blue-100"
            style={{
              fontFamily: "poppins"

            }}
          >Our Best Mentor</h1>
        </div>
        <div className='bg-gradient-to-r w-[100vw]  from-white to-white'>
          <Slider {...settings2}>
            {freelancer.map(({ _id, profilePhoto, name, startingPrice, stars, freelancerDetails, aboutYourself }) => {
              return (
                <>
                  <Link href={`/freelancer/${_id}`} className="">
                    <div key={_id} className='relative w-[90vw] md:w-[22vw] mx-auto bg-gradient-to-r   from-white to-white  dark:text-black my-6  shadow-lg flex flex-col bg-primary/10 px-5 '>
                      <div className='block h-64 w-64  mx-auto rounded-full pt-4'>
                        <img src={profilePhoto} alt="" className=' aspect-square object-cover rounded-md h-full w-full' />
                      </div>

                      <div className='flex flex-col items-center text-center mt-4'>
                        <p className='text-xl font-bold my-1'>{name}</p>
                        <p className='text-sm mx-3'> <span className=' text-sm'> {aboutYourself} </span >  </p>

                        <div className='h-5 flex'>
                          {Array(5).fill(0).map((_, index) => (
                            index < Number(stars.star) ? (
                              <StarIcon key={index} size="small" className="text-yellow-500" />
                            ) : (
                              <StarBorderIcon key={index} size="small" className="text-yellow-500" />
                            )
                          ))}
                        </div>

                        <Link href={`/freelancer/${_id}`} className="bg-blue-500 text-white px-6 py-3 my-4 rounded-full mr-4">Know more</Link>

                      </div>
                    </div>
                  </Link>
                </>
              )
            })}
          </Slider>
        </div>



      </section>


      <section className="bg-cover  bg-center w-full py-8  flex flex-col md:flex-row text-center md:text-left bg-gradient-to-b md:bg-gradient-to-r from-white to-blue-300">
        <div className="flex bg bg-white rounded-b-[9rem] p-5 md:p-0 md:rounded-r-[17rem] justify-center items-center  md:w-[40%]  ">
          <div className="md:w-[500px] md:h-[500px] rounded-t-[10rem]   flex justify-center  relative">
            <img
              src="https://images.unsplash.com/photo-1526948531399-320e7e40f0ca?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGZpbmFuY2UlMjBjb25zdWx0aW5nfGVufDB8fDB8fHww" // Ensure this image has a transparent background (e.g., PNG)

              objectFit="cover"
              width={1000}
              height={1000}
              className="rounded-[5rem] z-10 "
              alt="Camera"
            />
          </div>
        </div>
        <div className="w-full md:w-[60%] px-7  md:px-20">
  <h1 className="text-3xl md:text-4xl text-left md:pr-32 text-black">
    Find Your Perfect Mentor for a Successful Journey
  </h1>
  <p className="md:text-sm mt-2 md:mt-5 m-auto md:pr-40 font-serif text-left text-black text-[0.6rem]">
    Whether you’re preparing for JEE, NEET, mastering web development, or learning video editing, we’re here to connect you with experienced mentors who will guide you through every step of your journey. Our expert mentors offer personalized support and the right resources to help you succeed.
  </p>
  <div className='mt-9'>
    
    <div className='flex'>
      <div className='bg-[#9558EC] rounded-md h-full inline-block p-1'>
        <CameraAltOutlinedIcon className='text-2xl md:text-4xl text-white' />
      </div>
      <div className='ml-2 '>
        <h1 className='text-xl md:text-2xl text-left text-black'>
          For Mentees
        </h1>
        <p className="md:text-sm md:pr-64 text-left text-black font-serif text-[0.6rem]">
          At our platform, we empower mentees to find the right mentor who can help them excel in their chosen field. Whether you're a JEE aspirant, preparing for NEET, diving into web development, or exploring video editing, our mentors will guide you toward achieving your goals.
        </p>
      </div>
    </div>

    <div className='flex mt-8'>
      <div className='bg-yellow-500 rounded-md h-full inline-block p-1'>
        <CameraAltOutlinedIcon className='text-2xl md:text-4xl text-white' />
      </div>
      <div className='ml-2 '>
        <h1 className='text-xl md:text-2xl text-left text-black'>
          For Mentors
        </h1>
        <p className="md:text-sm text-left text-black md:pr-64 font-serif text-[0.6rem]">
          As a mentor, you have the opportunity to guide the next generation of achievers. Share your expertise in subjects like JEE, NEET, web development, or video editing, and help mentees grow and succeed in their academic or professional journey.
        </p>
      </div>
    </div>

    <div className='flex mt-8'>
      <div className='bg-blue-500 rounded-md h-full inline-block p-1'>
        <CameraAltOutlinedIcon className='text-2xl md:text-4xl text-white' />
      </div>
      <div className='ml-2 '>
        <h1 className='text-xl md:text-2xl text-left'>
          Our Mission
        </h1>
        <p className="md:text-sm text-left text-black md:pr-64 font-serif text-[0.6rem]">
          Our mission is to connect aspiring students with experienced mentors who can guide them through their journey to success. We aim to foster a community of learners and mentors where knowledge is shared, careers are built, and dreams are achieved.
        </p>
      </div>
    </div>

  </div>
  <div className="pt-8 flex mx-auto w-full justify-center md:justify-start">
    <Link href='/contact' className="bg-blue-500 text-white px-6 py-3 rounded-full mr-4">Contact Us</Link>
  </div>
</div>

      </section>

      

      <section>
        


        <div>
          <section class="text-gray-600 body-font">
            <div className='text-center  text-3xl lg:text-9xl'><h3 className='text-center py-24  text-[18px] lg:text-7xl  pt-10 font-extrabold  ' style={{ fontFamily: 'Caveat', }} >Our gallery</h3></div>
            <div class="container md:px-32 px-5  mx-auto flex flex-wrap">
              <div class="flex flex-col md:flex-row flex-wrap md:-m-2 -m-1">
                <div class="flex flex-col md:flex-row flex-wrap md:w-1/2">
                  <div class="md:p-2 p-1 md:w-1/2">
                    <img alt="gallery" class="w-full object-cover h-full object-center block" src={`https://images.unsplash.com/photo-1526948531399-320e7e40f0ca?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGZpbmFuY2UlMjBjb25zdWx0aW5nfGVufDB8fDB8fHww`} />
                  </div>
                  <div class="md:p-2 p-1 md:w-1/2">
                    <img alt="gallery" class="w-full object-cover h-full object-center block" src={`https://images.unsplash.com/photo-1642466311141-7bed50c8696b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGZpbmFuY2UlMjBjb25zdWx0aW5nfGVufDB8fDB8fHww`} />
                  </div>
                  <div class="md:p-2 p-1 md:w-full">
                    <img alt="gallery" class="w-full h-full object-cover object-center block" src={`https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjA3fHxmaW5hbmNlJTIwY29uc3VsdGluZ3xlbnwwfHwwfHx8MA%3D%3D`} />
                  </div>
                </div>
                <div class="md:flex flex-col hidden md:flex-row flex-wrap md:w-1/2">
                  <div class="md:p-2 p-1 w-full">
                    <img alt="gallery" class="w-full h-full object-cover object-center block" src={'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjA2fHxmaW5hbmNlJTIwY29uc3VsdGluZ3xlbnwwfHwwfHx8MA%3D%3D'} />
                  </div>
                  <div class="md:p-2 p-1 md:w-1/2">
                    <img alt="gallery" class="w-full object-cover h-full object-center block" src={`https://images.unsplash.com/photo-1652151368404-d9b0e7713bdb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODh8fGZpbmFuY2UlMjBjb25zdWx0aW5nfGVufDB8fDB8fHww`} />
                  </div>
                  <div class="md:p-2 p-1 md:w-1/2">
                    <img alt="gallery" class="w-full object-cover h-full object-center block" src={`https://images.unsplash.com/photo-1642465599822-f8c8caa350d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGZpbmFuY2UlMjBjb25zdWx0aW5nfGVufDB8fDB8fHww`} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className='mt-20'>
        <div className='bg-gradient-to-r from-blue-100 to-blue-300'>
          <div className='text-center text-3xl lg:text-9xl'>
            <h3 className='text-center py-5 text-[18px] lg:text-6xl font-extrabold' style={{ fontFamily: 'Caveat' }}>
              Testimonial
            </h3>
          </div>
          <div className=''>
            <Slider {...settings}>
              {TestimonialData.map(({ id, img, name, text, star }) => {

                const [readMore, setReadMore] = useState(true)
                const truncatedText = text.split(' ').length > 20
                  ? text.split(' ').slice(0, 20).join(' ')
                  : text;

                return (
                  <>
                    <div key={id} className='relative md:w-[30vw] mx-auto bg-gradient-to-r h-[21rem] md:h-80 from-white to-white  dark:text-black my-6  shadow-lg flex flex-col bg-primary/10 px-5 '>
                      <div className='block w-24 h-24 mx-auto rounded-full pt-4'>
                        <img src={img} alt="" className='rounded-full h-24 w-24' />
                      </div>
                      <div className='flex flex-col items-center text-center mt-10'>
                        <p className='text-sm h-28 md:h-20 text-center text-gray-500'>{truncatedText} {text.split(' ').length > 20 && <button onClick={() => handleReadMoreClick({ img, name, text, star })} className='blue1 inline-block'>...read more</button>}</p>

                        <div className='h-5 flex'>
                          {Array(5).fill(0).map((_, index) => (
                            index < star ? (
                              <StarIcon key={index} size="small" className="text-yellow-500" />
                            ) : (
                              <StarBorderIcon key={index} size="small" className="text-yellow-500" />
                            )
                          ))}
                        </div>

                        <p className='text-xl font-bold my-4'>{name}</p>
                        <p className='absolute top-0 right-0 dark:text-gray-400  text-9xl font-serif text-black/20'>,,</p>
                      </div>
                    </div>
                  </>
                )
              })}
            </Slider >
          </div>
        </div>

        {/* Modal */}
        {selectedReview && (
          <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customModalStyles} contentLabel="Review Modal">
            <div className="text-center">
              <img src={selectedReview.img} alt={selectedReview.name} className="rounded-full w-24 h-24 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">{selectedReview.name}</h2>
              <div className="flex justify-center mb-4">
                {Array(5)
                  .fill(0)
                  .map((_, index) =>
                    index < selectedReview.star ? (
                      <StarIcon key={index} size="small" className="text-yellow-500" />
                    ) : (
                      <StarBorderIcon key={index} size="small" className="text-yellow-500" />
                    )
                  )}
              </div>
              <p className="text-gray-700">{selectedReview.text}</p>
              <button
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </Modal>
        )}
      </section>

      <section>
        <div className='my-12'>
          <div className='text-center  text-3xl lg:text-9xl'><h3 className='text-center py-5  text-[18px] lg:text-6xl  font-extrabold  ' style={{ fontFamily: 'Caveat', }} >Our Partners</h3></div>
          <div className='bg-gradient-to-r  from-white to-white'>
            <Slider {...partnerSettings}>
              {Partner.map(({ id, img, title, }) => {

                const [readMore, setReadMore] = useState(true)
                const truncatedText = text.split(' ').length > 20
                  ? text.split(' ').slice(0, 20).join(' ')
                  : text;

                return (
                  <>
                    <div key={id} className=' md:w-[20vw] mx-auto bg-gradient-to-r   from-white to-white  dark:text-black my-6  shadow-xl  bg-primary/10  '>
                      <div className='block h-64 w-64  mx-auto rounded-full pt-4'>
                        <img src={img} alt="" className=' aspect-square object-cover rounded-md h-full w-full' />
                      </div>

                      <div className='flex flex-col items-center text-center my-4'>
                        <p className='text-xl font-bold my-1'>{title}</p>




                      </div>
                    </div>
                  </>
                )
              })}
            </Slider>
          </div>
        </div>
      </section>

      <section className='bg-gradient-to-tr from-white   to-blue-400'>
        <div id="contact" className="flex flex-col items-center lg:h-96 justify-center pt-10   text-black dark:text-black">
          <div className="text-black pb-12">
            <div className='text-center  text-3xl lg:text-9xl'><h3 className='text-center py-5  text-4xl lg:text-6xl  font-extrabold  ' style={{ fontFamily: 'Caveat', }} >Get in touch with us</h3></div>
          </div>
          <div useClassNames="false" data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000" mirror="false" className="flex flex-col lg:flex-row  items-center justify-center  text-white">
            <div className="flex flex-col items-center border-blue-600 lg:border-r md:h-48 p-5">
              <PermPhoneMsgIcon className='text-blue-600 text-5xl' />

              <p className="text-blue-700 ">Phone no</p>
              <div className='flex items-center'>

                <p className='text-black dark:text-black mx-2'>+917061652485</p>
              </div>

            </div>
            <div data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000" mirror="false" className="flex border-green-600  flex-col items-center whitespace-nowrap lg:border-r md:h-48 w-80 p-5">
              {/* <i class="fa-solid text-green-600 mb-4 fa-2xl fa-location-dot"></i> */}
              <EmailIcon className='text-blue-600 text-5xl' />
              <p className="text-blue-600 text-xl">Email</p>
              <p className='text-xl text-black dark:text-black'>info@PeopleConnect.com

              </p>

            </div>
            <div data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000" mirror="false" className="flex flex-col items-center  md:h-48 p-5">
              {/* <i class="fa-regular mb-4 text-green-600 fa-2xl fa-clock"></i> */}
              <LocationOnIcon className='text-blue-600 text-5xl' />
              <p className="text-blue-700 ">Location</p>
              <p className=' mt-3 px-5 text-center md:w-[10vw] text-black'>154,1st Floor,Maharaja Kameshwar Complex Fraser Road Patna</p>

            </div>
          </div>
        </div>
        <div className="" style={{ height: "80vh" }}>
          <form
            action="https://formspree.io/f/mgvewagv"
            method="post"
            className="flex flex-col items-center justify-center "
          >
            <h1
              useClassNames="false" data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000" mirror="false"
              className=" lg:text-5xl text-black text-4xl lg:mt-8 dark:text-black"
              style={{ fontFamily: "Roboto Condensed" }}
            >
              If you have any question{" "}
            </h1>
            <h1
              useClassNames="false" data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000" mirror="false"
              className=" lg:text-4xl text-2xl text-center text-black  my-4"
              style={{ fontFamily: "Roboto Condensed" }}
            >
              Please do not hesitate to send us a message
            </h1>

            <input
              useClassNames="false" data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000" mirror="false"
              className="w-4/5 lg:w-1/3  bg-blue-100 border-yellow-600 border-2 rounded-md dark:text-black text-black   h-12 p-2 my-2 "
              type="text"
              name="name"
              id="name"
              placeholder="Your name"
              required
            />
            <input
              useClassNames="false" data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000" mirror="false"
              className="w-4/5 lg:w-1/3 bg-blue-100 border-yellow-600 border-2 rounded-md dark:text-black text-black   h-12 p-2 my-2 "
              type="text"
              id="email"
              name="email"
              placeholder="Email"
            />
            <input
              useClassNames="false" data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000" mirror="false"
              className="w-4/5 lg:w-1/3 bg-blue-100 border-yellow-600 border-2 rounded-md dark:text-black text-black   h-12 p-2 my-2 "
              type="text"
              id="phone"
              name="phone"
              placeholder="Your Phone No"
              required
            />
            <textarea
              useClassNames="false" data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000" mirror="false"
              className="w-4/5 lg:w-1/3  border-yellow-600 border-2 rounded-md  bg-blue-100 dark:text-black text-black   h-48 p-2 my-2 "
              name="message"
              id="message"
              placeholder="How can we help you"
            ></textarea>
            <button useClassNames="false" data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000" mirror="false" className="w-40 h-12 my-2   bg-blue-600 text-white" type="submit">
              MESSAGE
            </button>
          </form>
        </div>
      </section>


    </div>
  );
}
