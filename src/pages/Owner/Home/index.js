import './index.scss'
const Home = () =>{
    return(
        <div className='home'>
            <div className='infomation'>
                <div className='title'>
                <p>Property Management</p>
                </div>
                <div className='infotext'>
                <p>Hello,thanks for open this website. I’ve designed this space to make managing properties as simple and efficient as possible.</p>
                    <ul>
                        <li><strong>Upload and manage contracts</strong> with ease.</li>
                        <li><strong>Add and organize properties</strong> with detailed information.</li>
                        <li><strong>Manage tenant details</strong>, from adding new tenants to updating their information.</li>
                        <li><strong>Secure your operations</strong> with email verification and robust password management.</li>
                        <li><strong>Facilitate tenant repair requests</strong> quickly and handle them effortlessly.</li>
                    </ul>
                    <p>Soon, I'll be introducing <strong>payment features</strong> to streamline rent transactions further!</p>
                    <p>Currently, mobile support is not available</p>
                    <p>Thanks</p>
              
                </div>
            </div>  
        </div>
    )
}

export default Home;