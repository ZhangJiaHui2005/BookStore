import ClientLayout from "@/Layouts/ClientLayout";
import React from "react";
import { Carousel } from "flowbite-react";

export default function Home() {
    return (
        <div>
            <Carousel className="h-56 sm:h-80 xl:h-80 2xl:h-96">
                <img src="/img/book-1868068_1920.jpg" alt="" className=" w-full h-full" />
                <img src="/img/book-6957870_1920.jpg" alt="" className="w-full h-full" />
                <img src="/img/woman-6864640_1920.jpg" alt="" className="w-full h-full" />
            </Carousel>

            
        </div>
    )
}

Home.layout = (page: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined) => <ClientLayout children={page}></ClientLayout>