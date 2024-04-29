import "./index.scss"
const Footer =() =>{
    const year = new Date().getFullYear()
    return(
    <div className='footer'>
        <p className='copyright'>©{year} JZ</p>
    </div>
    )
}

export default Footer