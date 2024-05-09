import Advantages from "./components/Advantages";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import Testimonials from "./components/Testimonials";
import Welcome from "./components/Welcome";
import Work from "./components/Work";


export default function Home() {
  return (
    <div className="w-full">
      <NavBar />
      <Hero />
      <Welcome />
      <Advantages />
      <Work />
      <Testimonials />
      <ContactUs />
      <Footer />
    </div>
  )
}
