import Banner from "../../../components/Banner"
import Categories from "../Categories/Categories"
import OurServices from "../OurServices/OurServices"
import SpecialDishes from "../SpecialDishes/SpecialDishes"
import Testimonials from "../Testimonials/Testimonials"

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Categories></Categories>
      <SpecialDishes></SpecialDishes>
      <Testimonials></Testimonials>
      <OurServices></OurServices>
      
    </div>
  )
}

export default Home