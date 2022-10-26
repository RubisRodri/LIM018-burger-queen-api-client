import exitImg from '../../Pictures/exit.png'
import logo from '../../Pictures/logo.png'
import './navbar.css'


export const Navbar = ()=> {
    return (
        <section>
            <div className="navbar">
                <div className="containerCenter">
                    <div className="logo"><img src={logo} className="logoImg" /></div>
                </div>
                <div className="containerRigth">
                    <div className="exit"><img src={exitImg} className="exittImg" /></div>
                </div>
            </div>
        </section>
    )
}


