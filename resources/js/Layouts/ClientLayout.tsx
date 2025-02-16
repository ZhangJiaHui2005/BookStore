import Navigationbar from "@/Components/Client/Navbar";
import { Flowbite } from "flowbite-react";
import React, { PropsWithChildren } from "react";

export default function ClientLayout({ children }: PropsWithChildren) {
    return (
        <Flowbite>
            <Navigationbar />

            <div className="px-10 py-20 2xl:px-40">
                {children}
            </div>
        </Flowbite>
    )
}