import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Truck, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
    { icon: <Package size={40} className="text-blue-500" />, title: "Book a Parcel", description: "Enter details and book your parcel with ease." },
    { icon: <Truck size={40} className="text-green-500" />, title: "Parcel in Transit", description: "Track your shipment in real-time with live updates." },
    { icon: <CheckCircle size={40} className="text-purple-500" />, title: "Delivered Successfully", description: "Receive your parcel securely at your doorstep." }
];

export default function HowItWorks() {
    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-gray-800 mb-6"
                >
                    How It Works
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.4 }}
                            viewport={{ once: true }}

                        >
                            <Card className="shadow-lg rounded-2xl p-6">
                                <CardHeader className="flex justify-center items-center">
                                    {step.icon}
                                </CardHeader>
                                <CardContent>
                                    <CardTitle className="text-lg font-semibold mb-2">{step.title}</CardTitle>
                                    <p className="text-gray-600 text-sm">{step.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
