"use client";

import * as S from "./style";
import DashboardComponent from "@/components/dashboardComponent";

export default function Home() {
  return (
    <S.Container>
      <S.Component>
        <DashboardComponent className=" w-auto min-h-[12rem]">
          <S.Bubble $top={"-40%"} />

          <div className="flex flex-1 p-3 rounded-md flex-col z-40 backdrop-blur-xl">
            <S.TitleComponent>
              <div>Teste</div>
              <div>25.3%</div>
            </S.TitleComponent>
          </div>
        </DashboardComponent>
        <DashboardComponent className=" w-auto min-h-[12rem] ">
          <S.Bubble $top={"20%"} />

          <div className="flex flex-1 p-3 rounded-md flex-col z-40 backdrop-blur-xl">
            <S.TitleComponent>
              <div>Teste</div>
              <div>25.3%</div>
            </S.TitleComponent>
          </div>
        </DashboardComponent>
        <DashboardComponent className=" w-auto min-h-[12rem] ">
          <S.Bubble $top={"-50%"} $left="40%" />

          <div className="flex flex-1 p-3 rounded-md flex-col z-40 backdrop-blur-xl">
            <S.TitleComponent>
              <div>Teste</div>
              <div>25.3%</div>
            </S.TitleComponent>
          </div>
        </DashboardComponent>
      </S.Component>
      <S.Component>
        <DashboardComponent className=" w-auto min-h-[12rem]">
          <S.Bubble $left="-30%" $top={"0%"} />
          <S.Bubble $left="70%" $top={"30%"} />

          <div className="flex flex-1 p-3 rounded-md flex-col z-40 backdrop-blur-xl">
            <S.TitleComponent>
              <div>Teste</div>
              <div>25.3%</div>
            </S.TitleComponent>
          </div>
        </DashboardComponent>
      </S.Component>
      <S.Component>
        <DashboardComponent className=" w-auto min-h-[12rem]">
          <S.Bubble $top="20%" />

          <div className="flex flex-1 p-3 rounded-md flex-col z-40 backdrop-blur-xl">
            <S.TitleComponent>
              <div>Teste</div>
              <div>25.3%</div>
            </S.TitleComponent>
          </div>
        </DashboardComponent>
        <DashboardComponent className=" w-auto min-h-[12rem] ">
          <S.Bubble $top="60%" />

          <div className="flex flex-1 p-3 rounded-md flex-col z-40 backdrop-blur-xl">
            <S.TitleComponent>
              <div>Teste</div>
              <div>25.3%</div>
            </S.TitleComponent>
          </div>
        </DashboardComponent>
      </S.Component>
    </S.Container>
  );
}
