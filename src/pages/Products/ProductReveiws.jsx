import React from "react";
import Heading from "../../ui/Heading/Heading";
import Ratings from "../../utiles/Ratings";

const ProductReviews = () => {
  const reviews = [
    {
      user: {
        name: "Shahtaz Rahman",
        image:
          "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2367",
      },
      comment:
        "This is really great products and I really loved it! All great nice and good stuff! I loved the color that I have taken",
      rating: 4,
    },
    {
      user: {
        name: "Solomon Damuen",
        image:
          "https://media.licdn.com/dms/image/v2/D4E03AQGfodhZKpCcJg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1712521421310?e=2147483647&v=beta&t=wmCDzs9ju1HnmtKz5y6-L8SSeY9UxuDarbttB6nUMzE",
      },
      comment:
        "Great color combination, like the products specefication and their good deal. Great staff! I want to take another one someday out of nothing",
      rating: 3,
    },
    {
      user: {
        name: "MD. Shoeb Munshi",
        image:
          "https://media.licdn.com/dms/image/v2/C4E03AQG_Su1kC_uifw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1655415134442?e=2147483647&v=beta&t=YzDpwzFWbLQQjOONCPcBcVXSRDEozNUnu6T4rOXHxoo",
      },
      comment:
        "This is really great products and I really loved it! All great nice and good stuff! I loved the color that I have taken",
      rating: 4.5,
    },
  ];

  return (
    <div>
      <Heading title={"Comments"} />
      <div className="flex flex-col gap-5">
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;

const ReviewCard = ({ review }) => {
  return (
    <div className="flex gap-3 bg-gray-50 p-3 rounded-xl">
      <div className="h-10 w-10">
        <img
          src={review?.user?.image}
          className="h-10 w-10 rounded-full object-cover"
          alt={review?.user?.name}
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">{review?.user?.name}</h2>
          <Ratings rating={review?.rating} />
        </div>
        <p className="mt-2 text-sm text-black/60">{review?.comment}</p>
      </div>
    </div>
  );
};
