import { NextPage } from "next";
import Link from 'next/link'
import { Routes } from "../routes/routes.enum";

/* eslint-disable @next/next/no-img-element */

type HeaderProps = {
    logout?(): void
    showModal?(): void
}

const Header: NextPage<HeaderProps> = ({
    logout,
    showModal
}) => {
    
    const fullName = (typeof window !== 'undefined') ? window.localStorage.getItem('userName') : null;
    const firstName = fullName?.split(' ')[0] || '';

    return (
        <div className="container-header">            
            <Link href={Routes.Home}>
                <a><img src="/logo.svg" alt="Logo Fiap" className="logo" /></a>
            </Link>            
            { 
                firstName ?
                <>
                    <button onClick={showModal}><span>+</span> Adicionar Tarefa</button>
                    <div className="mobile">
                        <span>Olá, {firstName}</span>
                        <img src="/exit-mobile.svg" alt="Sair" className="logout" onClick={logout} />
                    </div>
                    <div className="desktop">
                        <span>Olá, {firstName}</span>
                        <img src="/exit-desktop.svg" alt="Sair" className="logout" onClick={logout} />
                    </div>
                </> :
                <></>
            }
        </div>
    );
}
export { Header }
