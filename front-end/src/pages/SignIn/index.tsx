import React, {useRef, useCallback, useContext} from  'react'
import {FiLogIn, FiMail, FiLock} from 'react-icons/fi'
import {FormHandles} from '@unform/core'
import {Form} from '@unform/web'
import * as Yup from 'yup'
import getValidationsErrors from '../../utils/getValidationErros'
import {AuthContext} from '../../context/AuthContext'
import {Container, Content, Background} from './styles'

import Input from '../../components/Input'
import Button from '../../components/Button'

import logoImg from '../../assets/logo.svg'


interface SignInFormData {
    email: string,
    password: string
}
const Signin: React.FC = () => {

    const formRef = useRef<FormHandles>(null)

    const {SignIn} = useContext(AuthContext)

    const handleSubmit = useCallback(async (data: SignInFormData) => {
        try{
            formRef.current?.setErrors({})

            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail Obrigaorio').email('Digite um E-mail valido'),
                password: Yup.string().required('Senha Obrigatoria'),
            })

            await schema.validate(data, {
                abortEarly: false//retorna todos os erros de uma vez so
            })

            SignIn({
                email: data.email,
                password: data.password
            })
        }catch(err) {
            const errors = getValidationsErrors(err)
            formRef.current?.setErrors(errors)
        }
    }, [SignIn])

    return (
    <Container>
        <Content>
            <img src={logoImg} alt="gobarber"/>

            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Faca seu logon</h1>

                <Input name="email" icon={FiMail} placeholder="E-mail"/>
                <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>

                <Button type="submit">Entrar</Button>

                <a href="forgot">Esquce minha senha</a>
            </Form>

            <a href="login">
                <FiLogIn />
                Criar conta
            </a>
        </Content>

        <Background />
    </Container>
)
}
export default Signin