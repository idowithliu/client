import * as React from "react";

export const Home = (): JSX.Element => {
    React.useEffect(() => {
        document.title = "Home | Melanie and Andrew's Wedding Website";
    }, []);
    return (
        <>
            <div className="divider" />
            <div className="home-picture">
                <img alt="Home Page Banner" width="100%" height="275" src="//www.theknot.com/tk-media/images/2cc3d3c6-0115-46ab-8912-6164a628d1c7~rt_auto-cr_0.0.549.275-rs_768.h?ordering=explicit" className="css-1ago99h"></img>
            </div>
        </>
    );
}