import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const category = ["Frontend", "Backend", "Fullstack", "Data Science", "UI/UX Design"];

const CategorySection = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
      }

    return (
        <div>
            <Carousel className = "w-full max-w-xl mx-auto my-5">
                <CarouselContent>
                    {
                        category.map((cat, index) => {
                           return( <CarouselItem className ='md:basis-1/2 lg:basis-1/3' key={index}>
                              <Button onClick={() => searchJobHandler(cat)} variant="outline" className="rounded-full">{cat}</Button>
                            </CarouselItem>
                           );
                        })
                    }
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </div>
    )
}

export default CategorySection
