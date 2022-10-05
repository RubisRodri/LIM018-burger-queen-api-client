import './breakfast-dinner.css'

export default function BtnBreakDinner() {

    // function clikcDisplay () {
    //     const btn =document.getElementsByClassName('break-btn').style.display = 'none';

    // }


    return (
        <div className='container-btn'>
            <button type='button' className='break-btn' >Desayuno</button>
            <button type='button' className='dinner-btn'>Cena</button>
        </div>

    )
}