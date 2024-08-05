import "./LandingPage.css"
import CardMapper from "./CardMapper"
import LandingUpper from "./LandingUpper"
import LandingAside from "./LandingAside"

function LandingPage() {



    return (
        <>
            <section className="LPsection1">
                <LandingUpper />
            </section>

            <div className="LPcontainer">

                <section className="LPsection2">
                    <CardMapper />
                </section>

                <aside className="LPsection3">
                    <LandingAside />
                </aside>
            </div>
        </>
    )
}

export default LandingPage
