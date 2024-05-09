import React from "react";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { CiPhone } from "react-icons/ci";
import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";
const ContactUs = () => {
  return (
    <section className="max-w-screen-xl mx-auto sm:grid sm:grid-cols-2 sm:items-center mb-4 ">
      <div className="px-4 py-12 md:p-12 lg:px-16 lg:py-24">
        <div className="mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl mb-10">
            Contact Us
          </h2>
          <h4 className="text-lg font-bold mb-2 text-slate-700">Aetos FPH Financial Insurance Agency, Inc.</h4>

          <ul className=" mb-10 text-slate-700">
            <li className="flex items-center gap-2 mb-5"><FiMapPin /> 40th Fl PBCom Tower Paseo de Roxas, Makati City</li>
            <li className="flex items-center gap-2 mb-5"><MdOutlineEmail /> customercare@aetosfph.com</li>
            <li className="flex items-center gap-2 "><CiPhone />0998 569 9034</li>
          </ul>

          <div className="flex gap-5 text-lg text-gray-600">

            <FaTwitter />
            <FaInstagram />
            <FaFacebook />
          </div>
        </div>
      </div>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.7124608693143!2d121.01668977414876!3d14.558428678109646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c94ae4f2887d%3A0x4f8768415d368f09!2sPBCom%20Tower!5e0!3m2!1sen!2sph!4v1702624262978!5m2!1sen!2sph" className="h-full w-full object-cover" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </section>
  );
};

export default ContactUs;
