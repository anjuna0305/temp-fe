import { useEffect, useState } from "react"
import ApiCard from "../components/ApiCard"
import Footer from "../components/Footer"
import MainPageSection from "../components/MainPageSection"
import Navbar from "../components/Navbar"
import { getAllServices } from "../Api/ApiService"
import { ApiServiceData } from "../Api/Interfaces"

const HomePage = () => {
    const [apiServices, setApiServices] = useState<ApiServiceData[]>([])

    useEffect(() => {
        const fetchApiServices = async () => {
            const services = await getAllServices()
            if (services)
                setApiServices(services)
        }
        fetchApiServices()
    }, [])

    return (
        <>
            <Navbar />

            <div id="hero" className="w-100 d-flex justify-content-center">
                <div className="container row h-100">
                    <div className="col d-flex align-items-center justify-content-center">
                        <img src="src/assets/subasa_logo.png" alt="" />
                    </div>
                    <div className="col d-flex flex-column align-items-center justify-content-center text-light">
                        <div>
                            <div style={{ fontSize: "3rem" }}>Welcome to</div>
                            <div style={{ fontSize: "6rem" }}>SUBASA</div>
                        </div>
                    </div>
                    {/* <img src="src/assets/homepage_cover.png" alt="cover image" /> */}
                </div>
            </div>

            <MainPageSection sectionHeading="Section 1 heading" id="section_1">
                {apiServices.map((service: ApiServiceData) => <div className="col-4" key={service.id}><ApiCard serviceData={service} /></div>)}
            </MainPageSection>

            {/* <MainPageSection sectionHeading="Section 2 heading" id="section_2">
                <div className="col-4"><ApiCard /></div>
                <div className="col-4"><ApiCard /></div>
                <div className="col-4"><ApiCard /></div>
                <div className="col-4"><ApiCard /></div>
                <div className="col-4"><ApiCard /></div>
                <div className="col-4"><ApiCard /></div>
                <div className="col-4"><ApiCard /></div>
                <div className="col-4"><ApiCard /></div>
            </MainPageSection>

            <MainPageSection sectionHeading="Section 3 heading" id="section_3">
                <div className="col-4"><ApiCard /></div>
                <div className="col-4"><ApiCard /></div>
                <div className="col-4"><ApiCard /></div>
                <div className="col-4"><ApiCard /></div>
                <div className="col-4"><ApiCard /></div>
                <div className="col-4"><ApiCard /></div>
                <div className="col-4"><ApiCard /></div>
                <div className="col-4"><ApiCard /></div>
            </MainPageSection> */}

            <Footer />
        </>
    )
}

export default HomePage