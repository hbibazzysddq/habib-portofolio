import Social from "@/components/Social";
import { Button } from "@/components/ui/button";
import { FiDownload } from 'react-icons/fi';
import Photo from "@/components/Photo";



const page = () => {
  return (
    <section className="h-full  xl:h-[82.3vh] overflow-x-auto">
      <div className="container mx-auto h-full w-full">
        <div className="flex flex-col xl:flex-row items-center justify-evenly xl:pt-8 xl:pb-[108px]">
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl mb-1">Web Developer dan Mobile Developer</span>

            <h1 className="h2 mb-6">Hello, I am <br /> <span className="text-accent">Habib Azizy Siddiq</span></h1>

            <p className="max-w-[500px] mb-9 text-white/80">
            I am a student at SMKN 2 Padang Panjang, majoring in Software Engineering.
            </p>
            <div>
              <div className="mb-6 xl:mb-0">
                <Social 
                  containerStyles="flex gap-6" 
                  iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>
          
          <div className="order-1 xl:order-none mb-6 xl:mb-0">
            <Photo />
          </div>
        
        </div>    
      </div>
    </section> 
  );
};

export default page;