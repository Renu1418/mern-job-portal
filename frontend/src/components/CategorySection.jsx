import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Code2,
  Server,
  Layers3,
  Database,
  Palette,
} from "lucide-react";

const category = [
  {
    name: "Frontend",
    icon: Code2,
    description: "Build beautiful web experiences",
  },
  {
    name: "Backend",
    icon: Server,
    description: "Build powerful server systems",
  },
  {
    name: "Fullstack",
    icon: Layers3,
    description: "Work across the entire stack",
  },
  {
    name: "Data Science",
    icon: Database,
    description: "Turn data into insights",
  },
  {
    name: "UI/UX Design",
    icon: Palette,
    description: "Design meaningful experiences",
  },
];

const CategorySection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Explore opportunities
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Find jobs by category
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Explore roles across different fields and discover opportunities
            that match your skills.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mx-auto max-w-6xl px-8">
          <Carousel>
            <CarouselContent className="-ml-3">
              {category.map((cat) => {
                const Icon = cat.icon;

                return (
                  <CarouselItem
                    key={cat.name}
                    className="basis-full pl-3 sm:basis-1/2 lg:basis-1/3"
                  >
                    <button
                      type="button"
                      onClick={() => searchJobHandler(cat.name)}
                      className="group w-full rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/60"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-semibold text-slate-900">
                            {cat.name}
                          </h3>

                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {cat.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 text-xs font-semibold text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                        Explore jobs →
                      </div>
                    </button>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;