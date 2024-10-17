
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Menubar } from 'primereact/menubar';
import { Link } from 'react-router-dom';


export default function Header() {
    const { user, logout } = useContext(AuthContext);
   
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => { window.location = "/"; }
            
        },
        {
            label: 'Usuários',
            icon: 'pi pi-users'
        },        
       
    ];

    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
            <button className="p-button p-component p-button-rounded p-button-text p-button-plain" onClick={logout}>
                <i className="pi pi-power-off"></i>
            </button>
        </div>
    );

    return (
        <div className="card">
            <Menubar model={items} start={start} end={end} />
        </div>
    )
}
        