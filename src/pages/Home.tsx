import React from "react";
import { Row, Col, Table, List, Carousel, Card, Typography, Space } from "antd";
import { BaseLayout } from "@/components/BaseLayout";
import BaseCardAjuste from "@/components/BaseCardAjuste";
import UserAdmin from "./userAdmin";

const Home = () => {
  return (<>
  
  <UserAdmin/>
  </>)
  // <BaseLayout 
  // childrenHeader={<h1 style={{ color: "#fff", margin: 0, fontSize: "20px" }}>1</h1>}
  // childrenContent={"11"}
  // childrenFooter={"33"}
  
  // />;
};

export default Home;
