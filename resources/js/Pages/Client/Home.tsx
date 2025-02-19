import ClientLayout from "@/Layouts/ClientLayout";
import React from "react";
import { Card, Carousel } from "flowbite-react";
import { PageProps } from "@/types";
import { Link } from "@inertiajs/react";
import { FaArrowRight } from "react-icons/fa";

interface Book {
    book_id: number;
    title: string;
    author_id: number;
    category_id: number;
    price: number;
    isbn: string;
    description: string;
    image: string;
}

export default function Home({ books }: PageProps<{ books: Book }>) {
    return (
        <div className="flex flex-col gap-20">
            <Carousel className="h-56 sm:h-80 xl:h-80 2xl:h-96">
                <img src="/img/book-1868068_1920.jpg" alt="" className=" w-full h-full" />
                <img src="/img/book-6957870_1920.jpg" alt="" className="w-full h-full" />
                <img src="/img/woman-6864640_1920.jpg" alt="" className="w-full h-full" />
            </Carousel>

            <div className="flex flex-col justify-center items-center gap-6">
                <h1 className="text-xl sm:text-3xl font-bold">LATEST BOOK IN OUR STORE</h1>

                <div className="flex flex-col md:flex-row gap-10">
                    {books.map((book) => (
                        <Card
                            className="max-w-md hover:translate-x-3 hover:-translate-y-3 ease-in-out shadow-md duration-300"
                            imgAlt={book.title}
                            imgSrc={`/storage/${book.image}`}
                        >
                            <h5 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                                {book.title}
                            </h5>
                            <p className="font-normal text-center text-gray-700 dark:text-gray-400">
                                {book.description}
                            </p>

                            <div className="flex justify-end">
                                <Link href="#" className="hover:text-cyan-600 hover:underline flex items-center gap-2">See details <FaArrowRight /> </Link>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

Home.layout = (page: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined) => <ClientLayout children={page}></ClientLayout>