import React, { use, useEffect } from 'react'
import { motion, easeInOut } from 'framer-motion'
import {FaUtensils, FaTshirt, FaPlug, FaCouch, FaBook} from 'react-icons/fa'
import category from '@/pages/categories'
import Link from 'next/link'

const Categories = () => {
  const [events, setEvents] = React.useState([])
  const [filledEvents, setFilledEvents] = React.useState([])
  const [selectedCategory, setSelectedCategory] = React.useState('eventsServices')
  const [profileSettings, setProfileSettings] = React.useState([])
  
  const categories = [
    { id: 'all', name: 'All events', icon: 'book.png', color: 'bg-red-500'},
    { id: 'academicProgram', name: 'Academic Program', icon: 'book.png', color: 'bg-red-500', subcategories: ["academicServices", "integratedArtificialIntelligence", "learnerServices"] },
    { id: 'eventsServices', name: 'Events & Services', icon: 'coffee.png', color: 'bg-blue-500', subcategories: ["corporateAndInternationalTrainingSolutions", "corporateTraining", "craneAndHoistingOperatorBoomTruck"] },
    { id: 'studentServices', name: 'student Services', icon: 'service.png', color: 'bg-yellow-500', subcategories: ["currentStudents", "careerAdvancementServices", "futureStudents", "internationalStudents", "indigenousStudents"] },
    { id: 'careerTraining', name: 'Career Training', icon: 'briefcase.png', color: 'bg-green-500', subcategories: ["bachelorOfAppliedBusinessAdministration", "bachelorOfAppliedTechnologyGeographicInformationSystems", "bachelorOfAppliedTechnologyPetroleumEngineering", "bachelorOfBusinessAdministration", "bachelorOfHospitalityAndTourismManagement", "bachelorOfScienceConstructionProjectManagement"] },
    { id: 'campusFacilities', name: 'Campus & facilities', icon: 'home.png', color: 'bg-purple-500', subcategories: ["ireneLewisAtriumStanGradCentre", "johnWareBuilding", "johnsonCobbeEnergyCentre", "library", "macphail", "sait", "saitMainCampus", "stanGradCentre"] },
    { id: 'technologyInnovation', name: 'Technology & Innovation', icon: 'lightbulb.png', color: 'bg-red-500', subcategories: ["informationAndRecordsManagement", "informationSecurityAnalystFullTime", "informationSession", "informationSystemsSecurity", "objectOrientedSoftwareDevelopment", "online", "webDeveloper"] },
    { id: 'businessIndustry', name: 'Business & Industry', icon: 'note2.png', color: 'bg-blue-500', subcategories: ["business", "businessAdministrationAutomotiveManagement", "businessAndEntrepreneurship", "businessAndIndustry", "businessIntelligenceDataAnalysisAndReporting", "finance", "marketing", "managementAndLeadership", "manufacturing"] },
    { id: 'diversityInclusion', name: 'Diversity & Inclusion', icon: 'extense.png', color: 'bg-yellow-500', subcategories: ["indigenousStudents"] },
    { id: 'foodServices', name: 'Food Services', icon: 'food.png', color: 'bg-green-500', subcategories: ["hospitality", "hospitalityAndTourismManagement"] },
    { id: 'healthWellness', name: 'Tech Tools & Platform', icon: 'online.png', color: 'bg-purple-500', subcategories: ["health", "respiratoryTherapy"] },
    { id: 'sports', name: 'Sports', icon: 'sports.png', color: 'bg-green-500', subcategories: ["recreationVehicleServiceTechnician"] },
    { id: 'others', name: 'Others', icon: 'others.png', color: 'bg-purple-500', subcategories: ["other"] },
  ];
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        ease: easeInOut,
        duration: 0.5,
        delayChildren: 0.2,
        staggerChildren: 0.3
      }
    }
  }

  const compareDates = (a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  };  
  const getEvents = async () => {
    const url = '/data.json'
    try {
      const response = await fetch(url);
      if (response.ok) {
        const jsonData = await response.json();
        setEvents(jsonData);
      } else {
        console.error('Error fetching data:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  useEffect(() => {
    const selectedCategoriesCookie = document.cookie.split('; ').find(row => row.startsWith('selectedCategories='));
    if (selectedCategoriesCookie) {
      const selectedCategoriesValue = selectedCategoriesCookie.split('=')[1];
      const profileSettings = selectedCategoriesValue.split(',');
      setProfileSettings(profileSettings)
      console.log('profileSettings:', profileSettings);
    } else {
      setProfileSettings([])  
      console.log('The "selectedCategories" cookie does not exist.');
    }
    getEvents()
  }, [])

  const filler = (category) => {
    const preEvents = [...events.data]
    const newEvents = preEvents.sort(compareDates)
    const newFilledEvents = []
    if (category === 'all') {
      newEvents.map((event) => {
        newFilledEvents.push(
          { description: event.recordObj.summary,
            category: event.metaData.categories,
            date: event.recordObj.dateTimes.displayDate,
            time: event.recordObj.dateTimes.displayTime,
            enddate: event.recordObj.dateTimes.end.date,
            link: event.url,
            thumbnail: event.recordObj?.thumbnail?.absoluteURL,
            title: event.title,
          }
        )}
      )

      setFilledEvents(newFilledEvents)
      setSelectedCategory('all')
    } else {
      newEvents.map((event) => {
        categories.find(cat => cat.id === category).subcategories.map((subcat) => {
          if (event.metaData.categories.all.includes(subcat)) {
            // console.log('here')
            newFilledEvents.push(
              { description: event.recordObj.summary,
                category: event.metaData.categories,
                date: event.recordObj.dateTimes.displayDate,
                time: event.recordObj.dateTimes.displayTime,
                enddate: event.recordObj.dateTimes.end.date,
                link: event.url,
                thumbnail: event.recordObj?.thumbnail?.absoluteURL,
                title: event.title,
              }
            )}
        })
      })
      setFilledEvents(newFilledEvents)
      setSelectedCategory(category)
    }
  }

  console.log(filledEvents)
    
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      id="top"
      className="w-full h-full min-h-screen bg-transparent p-2 flex flex-col justify-start items-center"
    >
      <motion.div
        className='w-full flex flex-row justify-start items-center mt-[2rem]'
        onClick={()=>{filler('all')}}
      >
        <motion.img src="/images/Note-1.png" alt="SAIT logo" className='w-[5rem]'/>
        <h3 className='text-lg font-bold'>All Events</h3>
      </motion.div>
      <motion.div
        className='w-full p-2 m-2 '
      >
        <h3 className='text-lg font-bold mb-2 ml-2'>By Categories</h3>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // transition={{ delay: 0.4, duration: 0.5 }}
          className='max-w-full grid grid-cols-4 gap-1 md:gap-4'
        >
          {categories.filter(category => (category.id != 'all' && (profileSettings.includes(category.id) || profileSettings.length==0))).map((category, index) => (
            <motion.button
              // initial={{ x: -20  , y: -20 , opacity: 0 }}
              // animate={{ x: 0, y:0, opacity: 1 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: (0.6 + index * 0.08) , duration: 0.3 }} 
              key={index}
              className={`min-w-[4rem] min-h-[4rem] p-2 m-1 flex flex-col justify-center items-center rounded-lg shadow-lg hover:scale-110 hover:bg-p1/20 duration-200`}
              onClick={() => {filler(category.id)}}
            >
              <img src={`/images/${category.icon}`}  alt={category.name}/>
              <p className='text-sm font-semibold'>{category.name}</p>
            </motion.button>
          ))}  
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}      
        className="min-h-[60rem] w-full bg-[url('/images/background-blue.svg')] p-2 flex flex-col justify-start items-center rounded-tl-[3rem] rounded-tr-[3rem] "
      >
        <motion.div
          className='flex flex-row justify-start items-center w-full p-2'
        >
          <motion.img src={`/images/${categories.find(item => item.id === selectedCategory).icon}`} alt="SAIT logo" className='w-[4rem]'/> 
          <h2 className='text-2xl font-bold text-white p-2'>
            {categories.find(item => item.id === selectedCategory).name}  
          </h2>
        </motion.div>
        <motion.div
          className='max-w-full flex flex-col items-center justify-center overflow-y-auto'
        >
          {filledEvents.map((event, index) => (
            <motion.div
              initial={{ scale: 0.6 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              key={index}
              className='bg-gray-700/60 text-white p-6 rounded-xl mb-4'
            > 
                <p> {index + 1}. This event title is called {event.title} and its content is as following
                <span className='mb-2' dangerouslySetInnerHTML={{ __html: event.description }}></span>
                It start at {event.date} and {event.time}. For more information, please refer to {event.link} &nbsp;</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className='w-full  justify-self-end  p-4 flex flex-row justify-center items-center'
        >
            <a href="#top"
              className='bg-s1 py-2 px-8 rounded-md shadow-md hover:scale-110 hover:bg-s2  hover:text-white duration-200 mr-4'
            >
              Back
            </a>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Categories