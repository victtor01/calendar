import DashboardComponent from '../dashboardComponent';

// finance of registers
import { Registers } from './registers';

//last registers
import { ResumeFinance } from './resume-income';

//quantity of services
import { NewServices } from './services';

//income and expense
import { Finance } from './finance';

// clientes in month (graphic)
import { ClientsMonth } from './clients-month';

// quantity of clientes
import { NewClients } from './clients';

//top clientes
import { TopClients } from './topClients';

//quantity of events in month
import Events from './events';
import * as S from './style';


export default function ComponentsHome() {
  return (
    <>
      <S.Component>
        <DashboardComponent
          key={"resume-registers"}
          transition={{ delay: 0.2 }}
          className=" w-auto min-h-[10rem] bg-gradient-45 from-purple-600 to-blue-600 dark:from-purple-700 dark:to-blue-700 text-white"
        >
          <S.Bubble $top={"-40%"} />
          <ResumeFinance />
        </DashboardComponent>
        <DashboardComponent
          key={"events"}
          transition={{ delay: 0.2 }}
          className=" w-auto min-h-[10rem]"
        >
          <S.Bubble $top={"-40%"} />
          <Events />
        </DashboardComponent>
        <DashboardComponent
          key={"newClients"}
          transition={{ delay: 0.1 }}
          className=" w-auto min-h-[10rem]"
        >
          <S.Bubble $top={"20%"} />
          <NewClients />
        </DashboardComponent>
        <DashboardComponent
          key={"newServices"}
          transition={{ delay: 0.4 }}
          className=" w-auto min-h-[10rem]"
        >
          <S.Bubble $top={"-50%"} $left="40%" />
          <NewServices />
        </DashboardComponent>
      </S.Component>
      <S.Component>
        <DashboardComponent
          key={"finance"}
          style={{ flex: 4 }}
          transition={{ delay: 0.4 }}
          className=" w-auto h-[25rem]"
        >
          <S.Bubble $left="-30%" $top={"0%"} />
          <S.Bubble $left="70%" $top={"30%"} />
          <Finance />
        </DashboardComponent>
        <DashboardComponent
          key={"registers"}
          className="min-w-[15rem]"
          style={{
            flex: 2,
            overflowY: "auto",
            overflowX: "hidden",
            height: "25rem",
            padding: 0,
          }}
        >
          <S.Bubble $left="-30%" $top={"0%"} />
          <Registers />
        </DashboardComponent>
      </S.Component>
      <S.Component>
        <DashboardComponent
          key={"component1"}
          transition={{ delay: 0.5 }}
          className=" w-auto min-h-[20rem] p-3"
        >
          <S.Bubble $top="20%" />
          <ClientsMonth />
        </DashboardComponent>
      </S.Component>
      <S.Component>
        <DashboardComponent
          key={"component2"}
          transition={{ delay: 0.6 }}
          className=" w-auto min-h-[20rem] "
        >
          <S.Bubble $top="60%" />
          <TopClients />
        </DashboardComponent>
        <DashboardComponent
          key={"component3"}
          transition={{ delay: 0.8 }}
          className="w-auto min-h-[20rem] "
        >
          <S.Bubble $top="60%" />
          <TopClients />
        </DashboardComponent>
      </S.Component>
    </>
  );
}
