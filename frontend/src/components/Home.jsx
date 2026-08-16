import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategorySection from './CategorySection'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs.jsx'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = () => {

  useGetAllJobs();

  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategorySection />
      <LatestJobs />
      <Footer />

    </div>
  )
}

export default Home
