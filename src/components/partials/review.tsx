import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDate } from "@/lib/date.util";
import { useState } from "react";

export default function Review({ reviews }: { reviews?: string }) {
  const reviewData = JSON.parse(reviews || "");
  const [visibleReviews, setVisibleReviews] = useState(10);

  const handleViewMore = () => {
    setVisibleReviews((prev) => prev + 10);
  };

  const getInitials = (name: string) => {
    const nameParts = name.split(" ");
    const initials = nameParts
      .map((part) => part[0])
      .join("")
      .substring(0, 2);
    return initials.toUpperCase();
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="bg-background rounded-lg shadow-md p-6 mx-auto flex flex-col gap-10">
      {reviewData.slice(0, visibleReviews).map((review: any, index: any) => {
        return (
          <div className="grid gap-6" key={index}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-5">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-10 h-10 text-sm rounded-full flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: getRandomColor() }}
                    >
                      {getInitials(review.reviewerName)}
                    </div>
                    <div>
                      <h3 className="font-medium">{review.reviewerName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {review.reviewerEmail}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5 text-primary">
                      <StarIcon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium">{Number(review.rating).toFixed(1)}</span>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatDate(review.date)}
                </span>
              </div>
              <p className="text-muted-foreground">{review.comment}</p>
            </div>
          </div>
        );
      })}

      {visibleReviews < reviewData.length && (
        <button
          onClick={handleViewMore}
          className="mt-6 text-primary font-medium"
        >
          View More
        </button>
      )}
    </div>
  );
}

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
