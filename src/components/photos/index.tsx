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
    React.useEffect(() => {
        document.title = "Photo Gallery | Melanie and Andrew's Wedding Website";
    }, []);

    const [images, setImages] = React.useState<Array<Photo>>([]);
    const defaultImage = "/resources/img/default.png";

    const loadImage = (photoNumber: number, images: Array<Photo>): void => {
        const sourceImage: Photo = images[photoNumber];
        let imageJQElement = $(`#gallery-image-${sourceImage.id}`);
        let imageHTMLElement = document.getElementById(`gallery-image-${sourceImage.id}`);

        // @ts-expect-error
        if (!imageHTMLElement.src.endsWith(defaultImage)) { // If image was already loaded, skip
            return;
        }

        imageJQElement.attr('src', imageJQElement.data('src'));
    }

    React.useEffect(() => {
        axios.get(Routes.PHOTOS.LIST).then((res: { data: Array<Photo> }) => {
            setImages(res.data);

            $('#photoGallery').on('slid.bs.carousel', (e: any) => {
                loadImage(e.to, res.data);
                loadImage(e.to + 1, res.data);
            });
        });
    }, []);

    return (
        <>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"></link>
            <ThemeProvider theme={textTheme}>
                <ContentBox maxWidth={600}>
                    <div id="photoGallery" className="carousel slide shadowed" data-ride="carousel">
                        <ol className="carousel-indicators">
                            {
                                images.map((photo: Photo, idx: number): JSX.Element => {
                                    return <li key={photo.id} data-target="#photoGallery" data-slide-to={idx.toString()} className={idx === 0 ? "active" : ""}></li>;
                                })
                            }
                        </ol>
                        <div className="carousel-inner" >
                            {
                                images.map((photo: Photo, idx: number): JSX.Element => {
                                    return (
                                        <div className={`carousel-item${idx === 0 ? ' active' : ''}`} key={photo.id}>
                                            <img className="d-block w-100" id={`gallery-image-${photo.id}`} data-src={photo.image} src={idx <= 1 ? photo.image : defaultImage} alt="Photo Gallery Image" />
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
                </ContentBox>
            </ThemeProvider>
            <Footer />
        </>
    );
}