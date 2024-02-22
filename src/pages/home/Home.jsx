import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import { BsFillPencilFill } from "react-icons/bs";
import { MdCancel, MdOutlineDoneAll, MdPending } from "react-icons/md";
import { TbProgressBolt } from "react-icons/tb";

import Card from "../../components/Card";
import useCharts from "../../hooks/useCharts";
import useTickets from "../../hooks/useTickets";
import HomeLayout from "../../layouts/HomeLayout";

const Home = () => {
  const [ticketsState] = useTickets();
  const [pieChartData, lineChartData, barChartData] = useCharts();
  const setChartOptions = {
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily Revenue",
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };
  return (
    <>
      <HomeLayout>
        {ticketsState && (
          <div className="mt-10 flex flex-row justify-center items-center gap-5 flex-wrap">
            <Card
              titleText="Open"
              status={
                ticketsState.ticketDistribution.open /
                ticketsState.downloadedTickets.length
              }
              quantity={ticketsState.ticketDistribution.open}
              background="bg-yellow-300"
              borderColor="border-green-300"
              fontColor="text-black"
              dividerColor="bg-black"
            >
              <BsFillPencilFill className="inline mr-2" />
            </Card>
            <Card
              titleText="In Progress"
              status={
                ticketsState.ticketDistribution.inProgress /
                ticketsState.downloadedTickets.length
              }
              quantity={ticketsState.ticketDistribution.inProgress}
              background="bg-orange-300"
              borderColor="border-red-300"
              fontColor="text-black"
              dividerColor="bg-black"
            >
              <TbProgressBolt className="inline mr-2" />
            </Card>
            <Card
              titleText="Resolved"
              status={
                ticketsState.ticketDistribution.resolved /
                ticketsState.downloadedTickets.length
              }
              quantity={ticketsState.ticketDistribution.resolved}
              background="bg-purple-300"
              borderColor="border-blue-700"
              fontColor="text-black"
              dividerColor="bg-black"
            >
              <MdOutlineDoneAll className="inline mr-2" />
            </Card>
            <Card
              titleText="On Hold"
              status={
                ticketsState.ticketDistribution.onHold /
                ticketsState.downloadedTickets.length
              }
              quantity={ticketsState.ticketDistribution.onHold}
              background="bg-gray-300"
              borderColor="border-gray-800"
              fontColor="text-black"
              dividerColor="bg-black"
            >
              <MdPending className="inline mr-2" />
            </Card>
            <Card
              titleText="Cancelled"
              status={
                ticketsState.ticketDistribution.cancelled /
                ticketsState.downloadedTickets.length
              }
              quantity={ticketsState.ticketDistribution.cancelled}
              background="bg-blue-300"
              borderColor="border-violet-300"
              fontColor="text-black"
              dividerColor="bg-black"
            >
              <MdCancel className="inline mr-2" />
            </Card>
          </div>
        )}
        <div className="mt-10 flex xs:flex-col md:flex-row justify-center items-center  md:gap-0  lg:gap-5">
          <div className="w-full md:w-[20rem]  lg:w-[25rem] h-[25rem]">
            <Pie data={pieChartData} />
          </div>

          <div className="w-full md:w-[20rem]  lg:w-[25rem] h-[25rem] md:mt-0  lg:mt-0">
            <Doughnut data={pieChartData} />
          </div>
        </div>

        <div className="mt-10 mb-10 xs:flex-col justify-center items-center gap-10  flex flex-row xs:mb-20  xs:justify-center  xs:items-center   lg:gap-10">
          <div className=" h-[20rem]  xs:w-[18rem]  md:w-[25rem] xs:mb-5  w-[30rem] rounded-lg border p-4 md:col-span-2   bg-[wheat]">
            <Line data={lineChartData} options={setChartOptions} />
          </div>

          <div className=" h-[20rem] xs:w-[18rem]   md:w-[25rem] md:ml-10 w-[30rem] rounded-lg border p-4 md:col-span-2    bg-[wheat]  lg:mt-0">
            <Bar data={barChartData} options={setChartOptions} />
          </div>
        </div>
      </HomeLayout>
    </>
  );
};

export default Home;
