import React, {useCallback, useRef} from  'react'
import {FiArrowLeft, FiMail, FiUser, FiLock} from 'react-icons/fi'
import {FormHandles} from '@unform/core'
import {Form} from '@unform/web'
import * as Yup from 'yup'
import getValidationsErrors from '../../utils/getValidationErros'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

import {Container, Content, Background} from './styles'

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null)
    const handleSubmit = useCallback(async (data: object) => {
        try{
            formRef.current?.setErrors({})

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome Obrigatorio'),
                email: Yup.string().required('E-mail Obrigaorio').email('Digite um E-mail valido'),
                password: Yup.string().min(6, 'No minimo 6 digitos'),
            })

            await schema.validate(data, {
                abortEarly: false//retorna todos os erros de uma vez so
            })


        }catch(err) {
            const errors = getValidationsErrors(err)
            formRef.current?.setErrors(errors)
        }
    }, [])

    return (
        <Container>
        <Background />

        <Content>
            <img src={logoImg} alt="gobarber"/>

            <Form ref={formRef} initialData={{ email: 'patricio@gmail.com'}} onSubmit={handleSubmit}>
                <h1>Faca seu Cadastro</h1>

                <Input name="name" icon={FiUser} placeholder="Nome"/>
                <Input name="email" icon={FiMail} placeholder="E-mail"/>
                <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>

                <Button type="submit">Entrar</Button>
            </Form>

            <a href="login">
                <FiArrowLeft />
                Voltar Para logon
            </a>
        </Content>
    </Container>
    )
}

export default SignUp