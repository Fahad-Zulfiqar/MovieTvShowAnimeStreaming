import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import MTVData from "../data/MTVData.json";
// import { baseImage } from "../constants";
import { Link } from "react-router-dom";

interface MTV {
  id: number;
  poster: string;
  name: string;
  overview: string;
  media_type?: string;
}

// SwiperSlider component
const SwiperSlider = () => {
  const items: MTV[] = MTVData;
  return (
    <div className="h-[80vh] max-w[85vw] rounded-xl overflow-hidden mb-5">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]} // Pass modules here
        navigation={{
          nextEl: ".swiper-button-next-ex2",
          prevEl: ".swiper-button-prev-ex2",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 10000 }}
        className="swiper  mx-auto h-full  "
        id="slider2"
      >
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <img
              src={`https://image.tmdb.org/t/p/original${item.poster}`}
              className="w-full h-full object-cover"
              alt="itemImage"
            />
            <div className="absolute inset-0 bg-black opacity-40 z-[998]"></div>
            <div className="absolute bottom-10 z-[999] text-white  ltr:left-12 rtl:right-12">
              <div className="sm:text-3xl text-base font-bold">{item.name}</div>
              <div className="mt-1 w-4/5 text-base sm:block hidden font-medium">
                {item.overview}
              </div>
              <div className="flex mt-4">
                <Link
                  to={
                    item.media_type === "tv"
                      ? `watch/tv/${item.id}/1/1`
                      : `watch/movie/${item.id}`
                  }
                  className=" w-36 btn btn-primary"
                >
                  Watch Now
                </Link>
                <Link
                  to={
                    item.media_type === "tv"
                      ? `/tv/${item.id}`
                      : `/movie/${item.id}`
                  }
                  className="ml-2 w-36 btn btn-dark"
                >
                  More Info
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
        {/* <button className="swiper-button-prev-ex2 grid place-content-center ltr:left-2 rtl:right-2 p-1 transition text-primary hover:text-white border border-primary hover:border-primary hover:bg-primary rounded-full absolute z-[999] top-1/2 -translate-y-1/2">
          <svg>...</svg>
        </button>
        <button className="swiper-button-next-ex2 grid place-content-center ltr:right-2 rtl:left-2 p-1 transition text-primary hover:text-white border border-primary hover:border-primary hover:bg-primary rounded-full absolute z-[999] top-1/2 -translate-y-1/2">
          <svg>...</svg>
        </button> */}
      </Swiper>
    </div>
  );
};

export default SwiperSlider;
