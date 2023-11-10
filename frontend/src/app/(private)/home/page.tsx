"use client";

import * as S from "./style";
import DashboardComponent from "@/components/dashboardComponent";

export default function Home() {
  return (
    <S.Container>
      <S.Component>
        <DashboardComponent className=" w-auto min-h-[12rem]">
          <S.Bubble $top={'-40%'}/>
          <S.TitleComponent>
            <div>Teste</div>
            <div>25.3%</div>
          </S.TitleComponent>
        </DashboardComponent>
        <DashboardComponent className=" w-auto min-h-[12rem] ">
          <S.Bubble $top={'20%'}/>
          <S.TitleComponent>
            <div>Teste</div>
            <div>25.3%</div>
          </S.TitleComponent>
        </DashboardComponent>
        <DashboardComponent className=" w-auto min-h-[12rem] ">
          <S.Bubble $top={'-50%'} $left="40%"/>
          <S.TitleComponent>
            <div>Teste</div>
            <div>25.3%</div>
          </S.TitleComponent>
        </DashboardComponent>
      </S.Component>
      <S.Component>
        <DashboardComponent className=" w-auto min-h-[12rem]">
          <S.Bubble $left="-70%" $top={'0%'}/>
          <S.Bubble $left="70%" $top={'30%'}/>
          <S.TitleComponent>
            <div>Teste</div>
            <div>25.3%</div>
          </S.TitleComponent>
        </DashboardComponent>
      </S.Component>
      <S.Component>
        <DashboardComponent className=" w-auto min-h-[12rem]">
          <S.Bubble $top="20%"/>
          <S.TitleComponent>
            <div>Teste</div>
            <div>25.3%</div>
          </S.TitleComponent>
        </DashboardComponent>
        <DashboardComponent className=" w-auto min-h-[12rem] ">
          <S.Bubble $top="60%"/>
          <S.Bubble $top="-60%"/>
          <S.TitleComponent>
            <div>Teste</div>
            <div>25.3%</div>
          </S.TitleComponent>
        </DashboardComponent>
      </S.Component>
    </S.Container>
  );
}
