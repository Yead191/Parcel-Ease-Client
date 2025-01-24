import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { format } from "date-fns";

const ReviewModal = ({ parcel, refetch }) => {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");
    const { user } = useAuth()
    const [isOpen, setIsOpen] = useState(false);
    // console.log(parcel);
    const axiosSecure = useAxiosSecure()

    const handleSubmit = (e) => {
        const date = format(new Date(), 'dd/MM/yyyy');
        const reviewInfo = {
            userName: user.displayName,
            userPhoto: user.photoURL,
            rating: rating,
            feedback: feedback,
            deliveryManName: parcel.deliveryName,
            deliveryManUID: parcel.deliveryManId,
            deliveryManEmail: parcel.deliveryEmail,
            parcelStatus: "reviewed",
            date: date

        }
        // console.log(reviewInfo);
        axiosSecure.post(`/reviews/${parcel._id}`, reviewInfo)
            .then(res => {
                if (res.data.insertedId) {
                    setFeedback("");
                    setRating(0);
                    setIsOpen(false);
                    refetch()
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Thanks for the Review!`,
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
            })

    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button disabled={parcel?.reviewStatus === "reviewed"} size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                    {
                        parcel?.reviewStatus === "reviewed" ?
                            "Reviewed"
                            :
                            "Review"
                    }

                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Give Review</DialogTitle>
                    <DialogDescription>
                        Provide your feedback and rating for the delivery.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">User's Name</label>
                        <Input value={user?.displayName || "N/A"} readOnly />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">User's Image</label>
                        <Input value={user?.photoURL || "N/A"} readOnly />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Rating (out of 5)</label>
                        <Input
                            type="number"
                            max={5}
                            min={1}
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            placeholder="Enter a rating"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Feedback</label>
                        <Textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Write your feedback"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white">
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ReviewModal;
