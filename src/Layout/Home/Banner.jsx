const Banner = () => {
    const textField = (
        <div>
            <div className="absolute flex items-center h-full left-0 top-0 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)]">
                <div className="w-1/2 text-white pl-10 space-y-8" data-aos="zoom-in-left">
                    <h2 className="text-6xl font-bold">Radiance in Student Living</h2>
                    <p>
                        UniStayHub Where Every Student Discovers More than a Stay—A Home Where Connections Thrive and Memories Flourish. Experience Unmatched Comfort, Community, and Convenience. Your Journey Begins Here, at the Heart of Student Living.
                    </p>
                    <div className="flex" data-aos="flip-left">
                        <input type="text" placeholder="Type here" className="input input-bordered input-md w-48 max-w-md text-black rounded-none rounded-s-lg" />
                        <button className="btn btn-outline btn-accent rounded-e-full">Search</button>
                    </div>
                </div>
            </div>
        </div>
    );
    <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
        <a href="#slide6" className="btn btn-circle mr-5">❮</a>
        <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
    return (
        <div className="carousel w-full">
            <div id="slide1" className="carousel-item relative w-full">
                <img src="https://i.ibb.co/NWxdW4k/sasha-kaunas-7-ZD-JIwl410-unsplash.jpg" className="w-full" />
                <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0 z-10">
                    <a href="#slide4" className="btn btn-circle mr-5">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
                {textField}
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <img src="https://i.ibb.co/z8p5wQX/dad-hotel-P6-B7y6-Gnyzw-unsplash.jpg" className="w-full" />

                <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0 z-10">
                    <a href="#slide1" className="btn btn-circle mr-5">❮</a>
                    <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
                {textField}
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                <img src="https://i.ibb.co/4Pr2dxw/albert-vincent-wu-5-LNoi-Vd-L9-SI-unsplash.jpg" className="w-full" />

                <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0 z-10">
                    <a href="#slide2" className="btn btn-circle mr-5">❮</a>
                    <a href="#slide4" className="btn btn-circle">❯</a>
                </div>
                {textField}
            </div>
            <div id="slide4" className="carousel-item relative w-full">
                <img src="https://i.ibb.co/vJCkX0g/nicate-lee-k-T-Zyaiw-Be0-unsplash.jpg" className="w-full" />

                <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0 z-10">
                    <a href="#slide3" className="btn btn-circle mr-5">❮</a>
                    <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
                {textField}
            </div>
        </div>
    );
};

export default Banner;
