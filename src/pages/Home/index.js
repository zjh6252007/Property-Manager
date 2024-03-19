import Income from '../../components/mainpage/income';
import Payment from '../../components/mainpage/payments';
import Tenant from '../../components/mainpage/tenant';
import Unpaid from '../../components/mainpage/unpaid';
import './index.scss'
const Home = () =>{
    return(
        <div className='home'>
            <Income/>
            <Payment/>
            <Tenant/>
            <Unpaid/>
        </div>
    )
}

export default Home;