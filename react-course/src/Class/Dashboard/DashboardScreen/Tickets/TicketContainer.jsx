import TicketHeader from "./TicketHeader";
import TicketTable from "./TicketTable";

const TicketContainer = ()=>{
    return(
        <div className="ticket_container">
            <TicketHeader/>
            <TicketTable />
        </div>
    )
}

export default TicketContainer;