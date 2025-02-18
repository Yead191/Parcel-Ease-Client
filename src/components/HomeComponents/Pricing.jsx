import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Truck, CheckCircle, DollarSign } from "lucide-react";
import { motion } from "framer-motion";



const pricingPlans = [
    { weight: "Below 1kg", price: "50 TK" },
    { weight: "1-2kg", price: "100 TK" },
    { weight: "More than 2kg", price: "150 TK" }
];

export default function Pricing() {
    return (
        <>
            <section className="py-12 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl font-bold text-gray-800 mb-6"
                    >
                        Pricing Plans
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {pricingPlans.map((plan, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                            >
                                <Card className="shadow-lg rounded-2xl p-6">
                                    <CardHeader className="flex justify-center">
                                        <DollarSign size={40} className="text-yellow-500" />
                                    </CardHeader>
                                    <CardContent>
                                        <CardTitle className="text-lg font-semibold mb-2">{plan.weight}</CardTitle>
                                        <p className="text-gray-600 text-sm">{plan.price}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
