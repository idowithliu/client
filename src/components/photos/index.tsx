import { default as axios } from "axios";

import { ThemeProvider } from "@mui/material";
import * as React from "react";
import { ContentBox, textTheme } from "../../util/misc";

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Photo } from "../../util/models";
import { Routes } from "../../util/routes";
import { Footer } from "../app/footer";

export const Photos = (): JSX.Element => {
    const [images, setImages] = React.useState<Array<Photo>>([]);

    React.useEffect(() => {
        axios.get(Routes.PHOTOS.LIST).then((res) => {
            setImages(res.data);
        }).catch(() => {

        });
    }, []);

    return (
        <>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"></link>
            <ThemeProvider theme={textTheme}>
                <ContentBox maxWidth={600}>
                    {/* <ImageList sx={{ width: "auto", height: "650px" }} cols={3} rowHeight={164} variant="woven">
                        {images.map((item: Photo) => (
                            <ImageListItem key={item.image}>
                                <img
                                    src={`${item.image}?w=164&h=164&fit=crop&auto=format`}
                                    srcSet={`${item.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.image}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList> */}
                    {/* <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", alignContent: "center" }}> */}
                    <div id="photoGallery" className="carousel slide shadowed" data-ride="carousel">
                        <ol className="carousel-indicators">
                            {
                                images.map((photo: Photo, idx: number): JSX.Element => {
                                    return <li data-target="#photoGallery" data-slide-to={idx.toString()} className={idx === 0 ? "active" : ""}></li>;
                                })
                            }
                        </ol>
                        <div className="carousel-inner" >
                            {
                                images.map((photo: Photo, idx: number): JSX.Element => {
                                    return (
                                        <div className={`carousel-item${idx === 0 ? ' active' : ''}`} key={photo.id}>
                                            <img className="d-block w-100" src={photo.image} alt="Photo Gallery Image" />
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <a className="carousel-control-prev" href="#photoGallery" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#photoGallery" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                    {/* </div> */}
                </ContentBox>
            </ThemeProvider>
            <Footer />
        </>
    );
}