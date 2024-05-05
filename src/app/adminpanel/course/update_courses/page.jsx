'use client'
import { useState,useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import ReadComponent from "@/components/CoursesComponent.jsx/ReadComponent";
import SideBarComponent from "@/components/AdminComponent/components/SideBarComponent";
import LoadingSkeleton from "@/components/LoadingSkeleton/LoadingSkeleton";


export default function Update(){
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const user_course_id = useSelector(state => state.user.id);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true)
          const response = await axios.post('/api/getCourseUser', {user_course_id});
            if(response.status === 200){
              setCourses(response.data.getCoutsesUser);
            }
          } catch (error) {
              console.error('Failed to fetch courses:', error);
          }finally{
            setLoading(false);
          }
      };
      fetchData();
      }, []);
      
    return(
      <section className="flex">
        <SideBarComponent/>
        {loading 
          ?(
            <LoadingSkeleton />
          ):(
            <>
                <ReadComponent courses={courses}/>
            </>

        )}

      </section>
        
    )
}