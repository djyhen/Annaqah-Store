import React from 'react';
import { categories } from '../assets/data';

const Categories = ({ category, setCategory }) => {

  return (
    <section id="categories" className="max-padd-container pt-16 px-4">
      {/* Title */}
      <div className="flex flex-col items-center pb-20 text-center">
        <h4 className="text-4xl font-extrabold leading-none font-ace">
          <span className="block text-lg">Select</span>
          Categories
        </h4>
      </div>
      <hr className="hr-custom" />

      {/* Container */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((item) => (
          <div
            key={item.name}
            id={item.name}
            className="flex flex-col items-center"
            onClick={() => setCategory((prev) => (prev === item.name ? "All" : item.name))}
          >
            <div className="p-8 rounded-full cursor-pointer bg-secondary shadow-lg">
              <img
                src={item.image}
                alt={item.name}
                className="object-cover h-32 w-32"
              />
            </div>
            <h4
              className={`mt-6 text-lg font-semibold text-center ${category === item.name ? "border-b-4 border-primary" : "border-b-4 border-white"}`}
            >
              {item.name}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
