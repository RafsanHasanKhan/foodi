import { FaStar } from 'react-icons/fa';

const OurServices = () => {
  const serviceLists = [
    {
      id: 1,
      title: 'Catering',
      des: 'Delight your guests with our flavors and  presentation',
      image: '../../../../public/images/home/services/icon1.png',
    },
    {
      id: 2,
      title: 'Fast delivery',
      des: 'We deliver your order promptly to your door',
      image: '../../../../public/images/home/services/icon2.png',
    },
    {
      id: 3,
      title: 'Online Ordering',
      des: 'Explore menu & order with ease using our Online Ordering',
      image: '../../../../public/images/home/services/icon1.png',
    },
    {
      id: 4,
      title: 'Gift Cards',
      des: 'Give the gift of exceptional dining with Foodi Gift Cards',
      image: '../../../../public/images/home/services/icon1.png',
    },
  ];
  return (
    <div className="section-container my-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* text content */}
        <div className="w-1/2">
          {/* title */}
          <div className="text-center md:text-left md:w-4/5">
            <p className="subtitle">Our Story & Services</p>
            <h2 className="title md:w-[520px]">
              Our Culinary Journey And Services
            </h2>
            <p className="my-5 text-secondary leading-[30px]">
              Rooted in passion, we curate unforgettable dining experiences and
              offer exceptional services, blending culinary artistry with warm
              hospitality.
            </p>
            <button className="btn bg-green text-white px-8 py-3 rounded-full">
              Explore
            </button>
          </div>
        </div>
        {/* image */}
        <div className="w-1/2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {serviceLists.map((service, i) => (
              <div
                key={i}
                className="shadow-md rounded-md py-5 px-4 text-center space-y-2 text-green cursor-pointer hover:border hover:border-indigo-600 transition-all duration-200"
              >
                <img src={service.image} alt="" className="mx-auto" />
                <h5 className="pt-3 font-semibold">{service.title}</h5>
                <p className="text-[#90BD95]">{service.des}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
