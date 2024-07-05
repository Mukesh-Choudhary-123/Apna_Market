import { Link } from "react-router-dom";

export default function CategorySection() {
  const categories = [
    {
      bestcategory: "laptops",
      title: "Electronic",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv0rX1K_7xKDM9mIGbArJqNRHw3hrXls9dZg&s",
    },
    {
      bestcategory: "groceries",
      title: "Grocery",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqPWvDtVQxcMNOFpFd-H_htx-2VlvoHc9p-w&s",
    },
    {
      bestcategory: "sunglasses",
      title: "Fashion",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO7erzGvxJ-U3A0HPQMUKjg1SXP0B7DhISUhS_dbZ17v6sGzXiIUy-XJf3UVxY6tcThN8&usqp=CAU",
    },
    {
      bestcategory: "automotive",
      title: "Toy",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfZWR3dgGJmMCbLsrDEXuGHe5r82d-HPvg9w&s",
    },
  ];
  const handlebestCategory = (category) => {
    console.log(category);
  };
  return (
    <div className=" py-12 sm:py-12 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className=" lg:text-2xl text-center sm:text-lg font-semibold leading-8 text-gray-900">
          These will get your attention
        </h2>
        <div className="mx-auto mt-6 grid overflow-x-auto  max-w-lg grid-cols-4 items-center lg:gap-x-8 md:gap-x-8 gap-x-44 gap-y-10 sm:max-w-xl sm:grid-cols-4 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {categories?.map((category) => (
            <div className="mt-6 grid grid-cols-1 gap-x-6   justify-center text-center  xl:gap-x-8">
              <Link
                to={`category-productlist?category=${category.bestcategory}`}
                // className="flex justify-center"
              >
                {/* <div className="group relative  border-solid border-[rgb(255,255,255)]  border-2 rounded-full"> */}
                <div className=" lg:h-72 lg:w-60 h-32 w-32 aspect-h-1 aspect-w-1    lg:aspect-none group-hover:opacity-75 ">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="h-full w-full object-cover object-center lg:h-60 lg:w-60 rounded-full "
                  />
                  {/* </div> */}
                  <div className="-mt-8 lg:mt-2  flex justify-center">
                    <div>
                      <h3 className="md:text-lg  lg:text-lg  text-gray-700">
                        <p href={category.title} className="mt-2">
                          {category.title}
                        </p>
                      </h3>
                    </div>
                  </div>
                </div>
                {/* <div className=" mt-7 flex justify-center">
                  <div>
                    <h3 className="md:text-lg  lg:text-lg  text-gray-700">
                      <p href={category.title}>{category.title}</p>
                    </h3>
                  </div>
                </div> */}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
