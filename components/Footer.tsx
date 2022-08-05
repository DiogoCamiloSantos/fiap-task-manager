

import { NextPage } from "next";
import { useState } from "react";

/* eslint-disable @next/next/no-img-element */

type FooterProps = {
    showModal(): void,
    hideOptions?: boolean
}

const Footer: NextPage<FooterProps> = ({
    showModal,
    hideOptions
}) => {

    const [notOptions] = useState(hideOptions);

    const getOptions = () => {
        if (!notOptions) 
            return <button onClick={showModal}><img  src="/add.svg" alt="Adicionar Tarefa"/> Adicionar Tarefa</button>;
        else
            return (<></>);
    }

    return (
        <div className="container-footer">
            {getOptions()}
            <span>© Copyright {new Date().getFullYear()}. Todos os direitos reservados.</span>
        </div>
    );
}

export { Footer }