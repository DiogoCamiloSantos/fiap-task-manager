import { NextPage } from "next";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Routes } from "../routes/routes.enum";
import { executeRequest } from "../services/api";
import { logout } from "../services/logout";

/* eslint-disable @next/next/no-img-element */

export const User: NextPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const doCreate = async () => {
        try {
            setLoading(true);

            setError('');
            
            if (!name) {
                setError('Favor informar o nome.');
                setLoading(false);
                return;
            }

            if (!email && !password) {
                setError('Favor informar email e senha.');
                setLoading(false);
                return;
            }

            if (confirmPassword != password) {
                setError('Favor informar a mesma senha.');
                setLoading(false);
                return;
            }

            const body = {
                name,
                email,
                password
            }

            const result = await executeRequest('user', 'POST', body);
            if (result && result.data) {
                setShowModal(true);
            } else {
                setError('Não foi possível processar login, tente novamente.');
            }

        } catch (e: any) {
            console.log(e);

            if (e?.response?.data?.error) {
                setError(e?.response?.data?.error);
            } else {
                setError('Não foi possível processar login, tente novamente.');
            }
        }

        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }

    const backToLogin = () => {
        logout();
        window.location.href = Routes.Home;
    }

    return (
        <>
            <Header />
            <div className="container-register">
                <div className="container-form container-login">
                    <form>
                        <h6>Cadastro de Usuário</h6>
                        <div className="input">
                            <img src="/user.svg" alt="Informe seu nome" />
                            <input type="text" placeholder="Informe seu nome"
                                value={name} onChange={evento => setName(evento.target.value)} />
                        </div>
                        <div className="input">
                            <img src="/mail.svg" alt="Informe seu email" />
                            <input type="text" placeholder="Informe seu email"
                                value={email} onChange={evento => setEmail(evento.target.value)} />
                        </div>
                        <div className="input">
                            <img src="/lock.svg" alt="Informe sua senha" />
                            <input type={ showPassword ? "text" : "password" } placeholder="Informe sua senha"
                                value={password} onChange={evento => setPassword(evento.target.value)} />
                            <img onClick={evento => setShowPassword(!showPassword)} src={ showPassword ? '/eye-closed.svg' : '/eye.svg' } alt="Exibir senha" className="show-password" />
                        </div>
                        <div className="input">
                            <img src="/lock.svg" alt="Informe sua senha" />
                            <input type={ showConfirmPassword ? "text" : "password" } placeholder="Confirme sua senha"
                                value={confirmPassword} onChange={evento => setConfirmPassword(evento.target.value)} />
                            <img onClick={evento => setShowConfirmPassword(!showConfirmPassword)} src={ showConfirmPassword ? '/eye-closed.svg' : '/eye.svg' } alt="Exibir senha" className="show-password" />
                        </div>
                        <p className="error">{error}</p>
                        <button type="button" onClick={doCreate} disabled={isLoading}
                            className={isLoading ? 'loading' : ''}>
                            {isLoading ? '...Carregando' : 'Cadastrar'}
                        </button>
                    </form>
                    <Modal show={showModal}
                        className="container-modal">
                        <Modal.Body>
                            <p className="text-content">{`Usuário `} <span>{name}</span> {` cadastrado com sucesso! Logue para entrar na página inicial.`}</p>
                        </Modal.Body>                        
                        <Modal.Footer>
                            <div className="button col-12">
                                <button onClick={backToLogin}>Fechar</button>
                            </div>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>            
            <Footer showModal={() => setShowModal(true)} hideOptions={true} />
        </>
    );
}