import { CiBookmark } from "react-icons/ci";
import { FaBath, FaLocationDot } from "react-icons/fa6";
import { MdBedroomParent, MdOutlineMessage } from "react-icons/md";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  return (
    <div className=" mb-4 mx-0 p-2 bg-[#2c2c2c] transition-all ease-in duration-300 cursor-pointer rounded-2xl flex gap-2 flex-col md:flex-row">
      <Link to={`/${item.id}`} className=" w-full md:w-1/2 ">
        <div className="rounded-[10px] overflow-hidden">
          <img
            src={item.images}
            alt="Room image"
            className=" w-full max-h-[9.5rem] object-cover hover:scale-105 transition-all duration-300 ease-in"
          />
        </div>
      </Link>
      <div className="w-full flex flex-col justify-between p-1">
        {/* ----------------top card------------- */}
        <div>
          <Link to={`/${item.id}`}>
            <h3 className=" font-medium hover:text-red-300 transition-all duration-300 ease-in cursor-pointer">
              {item.title}
            </h3>
          </Link>
          <h5 className="flex my-[0.3rem] mx-0 items-center gap-1 text-sm text-gray-400 ">
            <FaLocationDot />
            {item.address}
          </h5>
        </div>
        {/* ---------------mid card--------------- */}
        <p className=" w-fit bg-[#fef08a] text-black py-[2px] px-[6px] rounded font-medium text-sm">
          ${item.price}
        </p>
        {/* --------------bottom card--------- */}
        <div className="flex items-center justify-between my-2.5 mx-0">
          <div className="flex items-center gap-2">
            <p className=" flex items-center gap-1 text-xs lg:text-[0.8rem] bg-[#ff4e00]  py-[1px] px-[2px] ">
              <MdBedroomParent />
              {item.bedroom} bedroom
            </p>
            <p className=" flex items-center gap-1 text-xs lg:text-[0.8rem] bg-[#005fff] py-[1px] px-[2px] ">
              <FaBath />
              {item.bathroom} bathroom
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CiBookmark />
            <MdOutlineMessage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
