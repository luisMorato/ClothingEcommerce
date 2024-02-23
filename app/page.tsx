'use client';
import { useEffect, useState } from "react";

import Brands from "@/app/Components/Home/Brands";
import InfoIsland from "@/app/Components/Home/InfoIsland";
import NewProdcuts from "@/app/Components/Home/NewProducts";
import Slider from "@/app/Components/Home/Slider";
import TopMenu from "@/app/Components/Layout/TopMenu";
import OurFacilities from "@/app/Components/Home/OurFacilities";
import Cards from "@/app/Components/Home/Cards";
import ClothesAdvertising from "@/app/Components/Home/ClothesAdvertising";

export default function Home() {
  return (
      <div className="flex flex-col w-full">
        <TopMenu />
        <main>
          <Slider />
          <InfoIsland />
          <NewProdcuts />
          <Brands />
          <OurFacilities />
          <Cards />
          <ClothesAdvertising />
        </main>
      </div>
  );
}
