import React from "react";
import { Navbar } from "flowbite-react";
import { Link } from "@inertiajs/react";

export default function Navigationbar() {
    return (
        <Navbar fluid rounded>
            <Navbar.Brand as={Link} href="https://flowbite-react.com">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Hui's Bookstore</span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar.Link href="#" active>
                    Home
                </Navbar.Link>
                <Navbar.Link as={Link} href="#">
                    About
                </Navbar.Link>
                <Navbar.Link href="#">Services</Navbar.Link>
                <Navbar.Link href="#">Pricing</Navbar.Link>
                <Navbar.Link href="#">Contact</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}