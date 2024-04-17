import React from 'react'
import CommonSection from '../shared/CommonSection'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import galleryImages from './galleryImages';
import { Container } from 'reactstrap';
import '../styles/gallery.css'

const Gallery = () => {
  return (
    <>

      <CommonSection title={"Gallery"}/>

      <section>
      <Container className='text-center'>
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 3, 992: 4 }}>
                <Masonry gutter="1rem">
                    {galleryImages.map((item, index) => (
                      <img
                        className="masonry__img"
                        src={item}
                        key={index}
                        alt=""
                        style={{ width: "100%", display: "block", borderRadius: "10px" }}
                      />
                    ))}
                </Masonry>
            </ResponsiveMasonry>

            <button className='showmore-btn primary__btn'>Show more</button>
        </Container>
      </section>  


    </>
  )
}

export default Gallery