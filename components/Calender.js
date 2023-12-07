import React, { use, useEffect } from 'react'
import { motion } from 'framer-motion'
import {FaUtensils, FaTshirt, FaPlug, FaCouch, FaBook} from 'react-icons/fa'
import category from '@/pages/categories'
import Link from 'next/link'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);


const Categories = () => {
  const [events, setEvents] = React.useState([])
  const [filledEvents, setFilledEvents] = React.useState([])
  const [selectedCategory, setSelectedCategory] = React.useState('all')
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
      id="top"
      className="w-full h-full min-h-screen bg-transparent p-4 flex flex-col justify-start items-center"
    >
      {/* <motion.div
        className='w-full flex flex-row justify-start items-center mt-[4rem]'
        onClick={()=>{filler('all')}}
      >
        <motion.img src="/images/Note-1.png" alt="SAIT logo" className='w-[5rem]'/>
        <h3 className='text-lg font-bold'>All Events</h3>
      </motion.div> */}
      <motion.div
        className="h-full  w-full p-2 m-2 "
      >
        <h3 className='text-lg font-bold mb-2 ml-2'>By Categories</h3>
        <motion.div
          className='max-w-full grid grid-cols-4 gap-1 md:grid-cols-6 md:gap-4'
        >
          {categories.filter(category => (category.id != 'all' && (profileSettings.includes(category.id) || profileSettings.length==0))).map((category, index) => (
            <button
              key={index}
              className={`min-w-[4rem] min-h-[4rem] p-2 m-2 flex flex-col justify-center items-center rounded-lg shadow-lg hover:scale-110 hover:bg-p1/20 duration-200`}
              onClick={() => {filler(category.id)}}
            >
              {/* <i className={`${category.icon} text-6xl ${category.color}`}></i> */}
              <img src={`/images/${category.icon}`}  alt={category.name}/>
              <p className='text-xs font-semibold'>{category.name}</p>
            </button>
          ))}  
        </motion.div>
      </motion.div>

      <motion.div
        className="w-full p-2 m-2 bg-[url('/images/background-orange.svg')] text-white rounded-lg shadow-lg"
      >
        <h1>Event Calendar</h1>
        <Calendar
          localizer={localizer}
          events={filledEvents}
          startAccessor="date"
          endAccessor="enddate"
          style={{ height: 600 }}
          views={['month', 'week', 'day']}
          eventPropGetter={(event) => ({
            className: 'cursor-pointer',
          })}
          onSelectEvent={(event) => window.open(event.link, '_blank')}
        />
      </motion.div>


    </motion.div>
  )
}

export default Categories