import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import { Star } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
// import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

const ReviewCard = ({ review }) => {
    const { userName, userPhoto, rating, feedback, date } = review;

    return (
        <Card className="w-full bg-white border rounded-md shadow-md">
            <CardHeader className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={userPhoto} alt={userName} />
                </Avatar>
                <div>
                    <CardTitle className="text-sm font-medium">{userName}</CardTitle>
                    <CardDescription className="text-xs text-gray-500">
                        {date}
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                        <Star
                            key={i}
                            className={`h-4 w-4 ${i < rating ? "text-yellow-400" : "text-gray-300"
                                }`}
                        />
                    ))}
                </div>
                <p className="text-sm text-gray-700 line-clamp-2">{feedback}</p>
            </CardContent>
        </Card>
    );
};

export default ReviewCard;
