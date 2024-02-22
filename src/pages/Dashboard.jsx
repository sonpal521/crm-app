import "jspdf-autotable";

import jsPDF from "jspdf";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { AiOutlineDownload } from "react-icons/ai";

import TicketDetailsModal from "../components/TicketDetailsModal";
import useTickets from "../hooks/useTickets";
import HomeLayout from "../layouts/HomeLayout";

function Dashboard() {
  const [ticketState] = useTickets();
  const [selectedTicket, setSelectedTicket] = useState({});

  const columns = [
    { name: "Ticket Id", selector: (row) => row._id, reorder: true },
    { name: "Title", selector: (row) => row.title, reorder: true },
    { name: "Description", selector: (row) => row.description, reorder: true },
    { name: "Reporter", selector: (row) => row.assignedTo, reorder: true },
    {
      name: "Priority",
      selector: (row) => row.ticketPriority,
      sortable: true,
      reorder: true,
    },
    { name: "Assignee", selector: (row) => row.assignee, reorder: true },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      reorder: true,
    },
  ];

  const handleDownloadPDF = () => {
    const doc = new jsPDF("l", "pt", "a4");
    doc.text("Tickets Records", 40, 40);

    const tableData = ticketState.ticketList.map((ticket) => [
      ticket._id,
      ticket.title,
      ticket.description,
      ticket.assignedTo,
      ticket.ticketPriority,
      ticket.assignee,
      ticket.status,
    ]);

    doc.autoTable({
      head: [
        [
          "Ticket Id",
          "Title",
          "Description",
          "Reporter",
          "Priority",
          "Assignee",
          "Status",
        ],
      ],
      body: tableData,
      startY: 60,
    });

    doc.save("page.pdf");
  };
  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
        fontSize: "18px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };
  return (
    <HomeLayout>
      <div className="min-h-screen flex flex-col mt-14 mb-20 items-center justify-center gap-2 sm:gap-4 ">
        <div className="bg-yellow-500 w-full text-black text-center text-3xl py-4 font-bold hover:bg-yellow-400 transition-all ease-in-out duration-300">
          Tickets Records{" "}
          <AiOutlineDownload
            className="cursor-pointer inline "
            onClick={handleDownloadPDF}
          />
        </div>

        {/* Table */}
        <div className="flex flex-col w-full">
          {ticketState && (
            <DataTable
              onRowClicked={(row) => {
                setSelectedTicket(row);
                document.getElementById("ticket_modal").showModal();
              }}
              columns={columns}
              data={ticketState.ticketList}
              expandableRows
              customStyles={customStyles}
            />
          )}
          <TicketDetailsModal ticket={selectedTicket} key={selectedTicket._id} />
        </div>
      </div>
    </HomeLayout>
  );
}

export default Dashboard;
