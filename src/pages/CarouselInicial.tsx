import { Carousel } from "antd";
import a from '../assets/1.png';
import Home from "./Home";

const wrapperStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '1200px', // largura máxima
  margin: '0 auto 60px auto',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
};

// const contentStyle: React.CSSProperties = {
//   height: "280px",
//   width: "100%",
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
// };

// const imageStyle: React.CSSProperties = {
//   width: '100%',
//   height: '100%',
//   objectFit: 'cover',
// };

  //  <div style={contentStyle2}>
  //         <img src={a} alt="Slide 3" style={imageStyle} />
  //       </div>

const contentStyle2: React.CSSProperties = {
  height: "300px",
  // color: "#fff",
  lineHeight: "300px",
  // textAlign: "center",
  background: "#364d79",
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};


const CarouselInicial = () => {
  return (
    // <div style={wrapperStyle}>
      <Carousel autoplay autoplaySpeed={1000} dots>
        {/* <div style={contentStyle2}> */}
          <Home/>
        {/* </div> */}
        <div >
          <h3 style={contentStyle2}>12312123123</h3>
        </div>
     
      </Carousel>
    // </div>
  );
};

export default CarouselInicial;
