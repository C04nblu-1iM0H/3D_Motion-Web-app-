import { React, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function Accordion({ title, items }) {

  const [open, setOpen] = useState(false);
  
  const toggleHandler = () => {
    setOpen(!open);
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/2 border-b-2">
        <div className="flex justify-between items-center cursor-pointer" onClick={toggleHandler}>
          <h3 className="text-2xl lg:text-3xl my-5">{title}</h3>
          <i className={`transition-transform duration-700 delay-100 transform ${open ? 'rotate-180' : ''}`}>
            <IoIosArrowDown />
          </i>
        </div>
        <div className={`transition-max-h ease-linear duration-700 ${open ? 'max-h-screen overflow-hidden' : 'max-h-0 overflow-hidden'}`}>
          <ol className="ml-16 list-decimal">
            {items.map((item, index) => (
              <li className="text-lg leading-10" key={index}>{item}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}