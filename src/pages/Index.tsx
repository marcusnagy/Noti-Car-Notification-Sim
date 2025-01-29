import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";

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
    toast.success("Car added successfully!");
  };

  const handleDeleteCar = (id: string) => {
    setCars((prevCars) => prevCars.filter((car) => car.id !== id));
    toast.success("Car removed successfully!");
  };

  return (
    <div className="min-h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.05] bg-grid-black/[0.05] relative flex items-center justify-center p-4 md:p-8">
      <div className="relative z-10 w-full max-w-7xl">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {cars.map((car) => (
                <motion.div
                  key={car.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <CardContent className="p-6">
                      <img
                        src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
                        alt="Car placeholder"
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <div className="space-y-2">
                        <h3 className="font-medium text-lg">Car #{car.id.slice(0, 4)}</h3>
                        <p className="text-sm text-muted-foreground">
                          Added on {car.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button
                        variant="destructive"
                        size="sm"
                        className="w-full"
                        onClick={() => handleDeleteCar(car.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove Car
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="flex items-center justify-center h-full min-h-[360px] border border-dashed border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <Button
                    onClick={handleAddCar}
                    variant="ghost"
                    className="h-20 w-20 rounded-full"
                  >
                    <PlusCircle className="w-10 h-10" />
                  </Button>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default Index;