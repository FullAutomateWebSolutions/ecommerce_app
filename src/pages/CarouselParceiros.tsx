import { Carousel } from "antd";
import a from '../assets/1.png';

const parceiroStyle: React.CSSProperties = {
  height: 100,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const CarouselParceiros = () => {
  return (
    <div>

        
      <Carousel autoplay dots={false} autoplaySpeed={3000} slidesToShow={3} style={{ marginBottom: 60 }}>
        <div style={parceiroStyle}><img src={a} alt="Parceiro 1" style={{ width: 80 }} /></div>
        <div style={parceiroStyle}><img src="/parceiro2.png" alt="Parceiro 2" style={{ width: 80 }} /></div>
        <div style={parceiroStyle}><img src="/parceiro3.png" alt="Parceiro 3" style={{ width: 80 }} /></div>
      </Carousel>
    </div>
  )
}

export default CarouselParceiros