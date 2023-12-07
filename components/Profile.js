import React from 'react'
import {motion} from 'framer-motion'
import { useRouter } from 'next/router'
import { parse } from 'cookie'
import { MdExitToApp } from "react-icons/md";

const Profile = () => {
  const router = useRouter()
  const logoff = () => {
    document.cookie = 'userLoggedIn=false; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax';
    document.cookie = 'userLoggedIn=false; max-age=3600';
    router.push('/')
    console.log('logout')
  }   
  const categories = [
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
  const [selectedCategories, setSelectedCategories] = React.useState(categories)
  const selected = (index) => {
    const newCategories = [...selectedCategories]
    newCategories[index].selected = !newCategories[index].selected
    setSelectedCategories(newCategories)
  }
  const handleApply = () => {
    let filteredCategories = []
    if (selectedCategories.find(category => category.selected == true) == undefined) {
      filteredCategories = categories.filter(category => category.id) 
    } else {
      filteredCategories = selectedCategories.filter(category => category.selected)
    }
    console.log('selectedCategories:', selectedCategories);
    console.log('filteredCategories:', filteredCategories);
    // const filteredCategories = selectedCategories.filter(category => category.selected)
    const result = []
    filteredCategories.map(category => {
      result.push(category.id)
    })
    // const selectedCategories = categories.filter(category => category.selected)
    document.cookie = `selectedCategories=${result}; max-age=360000000`;
    setTimeout(() => {
      router.push('/categories')
    }, 500)
  }
  return ( 
    <>
      <motion.div
        className="w-full h-full mt-[6rem] ml-3 mr-3 bg-[url('/images/background-orange.svg')] bg-cover flex flex-col justify-start items-center rounded-tl-[3rem] rounded-tr-[3rem] text-white relative"
      >
        <button
          className='absolute top-4 right-1 m-4'
          onClick={logoff} 
        >
          <MdExitToApp  className='w-8 h-8'/>
        </button>
        <h2 className='text-3xl py-5'>Profile</h2>
        <div className='flex flex-col justify-start items-center'>
          <p className='text-xl mb-1'>Name: George Cheng</p>
          <p className='text-xl'>Email: george.cheng@edu.sait.ca</p>
        </div>
        <motion.div
          className='w-full flex flex-col p-2 justify-center items-center'
        >
          <h3 className='text-2xl m-[1rem]'>Subscriptions</h3>
          <motion.div
            className=' grid grid-cols-2 gap-2 mx-auto'
          >
            {selectedCategories.map((category, index) => (
              // <div className='tooltip tooltip-open tooltip-bottom' data-tip={category.subcategories}>
                <button
                  key={index}
                  className={`${category.selected ? "bg-p1" : "bg-white"} ${category.selected ? "text-white" : "text-black"}  min-h-[7rem] p-2 m-2  flex flex-col justify-center items-center rounded-lg`}
                  onClick={() => {selected(index)}}
                >
                  <img src={`/images/${category.icon}`} alt="SAIT logo" className='w-[3rem]' />
                  <i className={`${category.icon} text-2xl {category.color}`}></i>
                  <p className='text-lg'>{category.name}</p>
                </button>
              // </div>
            ))}
          </motion.div>
          <motion.button
            className='btn bg-p2 my-6 rounded-md text-white text-lg  w-full max-w-xs'
            onClick={handleApply}
          >
            Apply
          </motion.button>
        </motion.div>
      </motion.div>
    </>    
  )
}

export default Profile