import { Link } from "react-router-dom";

const LandingPage = () => {

    return (
        <div className="m-4">
            <header className="flex justify-center py-16 hero-page-animation relative">
                <div className="flex flex-col justify-center items-center gap-16 mt-24 px-4 text-center max-w-xl z-10">
                    <h1 className="flex flex-col justify-center items-center md:text-6xl text-3xl font-bold">
                        Make your profile
                        <span className="block text-accent-primary text-4xl md:text-[70px]">unforgettable.</span>
                    </h1>
                    <h2 className="text-lg md:text-xl text-text-secondary">
                        Avatar effects, animated profiles, custom themes and more - make your profile look as cool as you are.
                    </h2>
                    <div className="flex gap-4">
                        <button className="btn-primary">
                            <Link to="/signup">Get started free</Link>
                        </button>
                        <button className="btn-ghost">
                            <Link to="/effects">Explore effects</Link>
                        </button>
                    </div>
                </div>
                {/* bg glow */}
                <div
                    className="absolute -inset-12 md:bg-radial-[ellipse_35%_40%_at_50%_40%] from-accent-glow via-surface-alt to-bg-surface"
                ></div>
            </header>
            <div className="flex flex-col justify-center items-center gap-48 my-44">
                <section>Section 1</section>
                <section>Section 2</section>
                <section>Section 3</section>
                <section>Section 4</section>
                <section>Section 5</section>
            </div>
        </div>
    );
};

export default LandingPage;