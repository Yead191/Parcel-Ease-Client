import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Send, Phone, MapPin, Mail } from "lucide-react";
import emailjs from "@emailjs/browser";
import SectionHeading from "@/components/SectionHeading";
import { motion } from 'framer-motion'

export default function Contact() {
    useEffect(() => {
        document.title = "Contact | Parcel Ease";
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await emailjs.send(
                "service_nkk37bh",
                "template_7hx8mpf",
                formData,
                "1imU4eav_aXPPbbtx"
            );

            if (result.text === "OK") {
                setStatus("Message sent successfully!");
                setFormData({ name: "", email: "", subject: "", message: "" });
            }
        } catch (error) {
            setStatus("Failed to send the message. Please try again.");
            console.error("EmailJS error:", error);
        }
    };

    return (
        <main className=" min-h-screen">

            <SectionHeading heading={"Contact Us"}></SectionHeading>
            <section className="container mx-auto py-16 px-6 md:px-12">
                <Card className="shadow-lg">
                    <CardContent className="grid lg:grid-cols-2 gap-12 p-6 lg:p-16">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ x: '-50vh', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 2, ease: 'easeInOut' }}
                            className="space-y-8">
                            <CardHeader>
                                <CardTitle className="text-4xl font-bold text-gradient">
                                    Chat to our friendly team
                                </CardTitle>
                                <p className="text-muted-foreground">
                                    We'd love to hear from you. Please fill out this form or shoot
                                    us an email.
                                </p>
                            </CardHeader>
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-muted p-3 rounded-lg">
                                        <Mail className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Email</h3>
                                        <p className="text-muted-foreground">yead191@gmail.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="bg-muted p-3 rounded-lg">
                                        <Phone className="w-6 h-6 text-secondary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Phone</h3>
                                        <p className="text-muted-foreground">+8801624343171</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="bg-muted p-3 rounded-lg">
                                        <MapPin className="w-6 h-6 text-accent" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Location</h3>
                                        <p className="text-muted-foreground">
                                            Dhaka, Bangladesh
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ x: '100vh', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 2, ease: 'easeInOut' }}
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <Input
                                    type="text"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                />
                                <Input
                                    type="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                />
                                <Input
                                    type="text"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={(e) =>
                                        setFormData({ ...formData, subject: e.target.value })
                                    }
                                />
                                <Textarea
                                    placeholder="Your Message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={(e) =>
                                        setFormData({ ...formData, message: e.target.value })
                                    }
                                />
                                <Button type="submit" className="w-full">
                                    <Send className="w-4 h-4 mr-2" />
                                    Send Message
                                </Button>
                            </form>
                            {status && (
                                <div
                                    className={`mt-4 text-center ${status.includes("successfully")
                                        ? "text-green-500"
                                        : "text-red-500"
                                        }`}
                                >
                                    <p>{status}</p>
                                </div>
                            )}
                        </motion.div>
                    </CardContent>
                </Card>
            </section>
        </main>
    );
}
