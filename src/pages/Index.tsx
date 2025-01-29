import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";

interface Car {
  id: string;
  createdAt: Date;
}

const Index = () => {
  const [cars, setCars] = useState<Car[]>([]);

  const handleAddCar = () => {
    const newCar = {
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setCars((prevCars) => [...prevCars, newCar]);
  };

  return (
    <div className="min-h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.05] bg-grid-black/[0.05] relative flex items-center justify-center">
      <div className="relative z-10">
        {cars.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-4"
          >
            <Button
              onClick={handleAddCar}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-xl flex items-center gap-2 text-lg transition-all duration-300 hover:scale-105"
            >
              <PlusCircle className="w-6 h-6" />
              Add Car
            </Button>
          </motion.div>
        ) : (
          <div className="flex flex-wrap gap-4 p-4 justify-center">
            {/* Car cards will be added here later */}
            <Button
              onClick={handleAddCar}
              className="bg-primary hover:bg-primary/90 text-white p-4 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
            >
              <PlusCircle className="w-6 h-6" />
            </Button>
          </div>
        )}
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default Index;