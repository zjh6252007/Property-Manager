import './index.scss'
import GridHeader from '.';

const Paymentlist =() =>{
    return(
        <div>
            paymentlist
        </div>
    )
}


const Payment = () =>{
    return(
        <GridHeader title={"Payment"} body={<Paymentlist/>}/>
    )
}

export default Payment;