import React , {InputHTMLAttributes, useEffect, useRef, useState, useCallback} from 'react'
import {IconBaseProps} from 'react-icons'
import {FiAlertCircle} from 'react-icons/fi'
import {Container, Error} from './styles'
import {useField} from '@unform/core'//hook que recebe o valor dos campos do input

//import Tooltip from '../Toltip'
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {/** obtem todas as props de um input normal */
    name: string;
    icon?: React.ComponentType<IconBaseProps>; //receber um componente como propriedade

}
const Input: React.FC<InputProps> = ({name, icon: Icon, ...rest}) => {

    const inputRef = useRef<HTMLInputElement>(null)
    const [isFocused, setIsFocused] = useState(false)//borda do input
    const [isFilled, setIsFilled] = useState(false)//manter o blur do icon laranja
    const {fieldName, defaultValue, error, registerField} = useField(name)

    const handleInputFocus = useCallback(() => {
        setIsFocused(true)
    }, [])

    const handleInputBlur = useCallback(() => {//useCallback - sempre usado quando queremos criar uma funcao dentro de um componente
        setIsFocused(false)

        if(inputRef.current?.value) {
            setIsFilled(true)
        }else {
            setIsFilled(false)
        }

        setIsFilled(!!inputRef.current?.value)
    }, [])
    useEffect(() => {
        registerField({
            name: fieldName,//nome do input
            ref: inputRef.current,//referencia do input(forma de armazenar elementos sem stado)
            path: 'value'
        })
    }, [fieldName, registerField])



    return (
        <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
        { Icon && <Icon size={20}/>} {/** se o icon existir so ai eu mostro ele */}
    <input 
    onFocus={handleInputFocus} //{/**dar focus e armazenalo no stado */}
    onBlur={handleInputBlur}
    defaultValue={defaultValue} //valor inicial do input
    ref={inputRef} 
    {...rest}/>

    {error && <Error title={error} ><FiAlertCircle color="#c53030" size={20}/></Error>}
    </Container>
    )
}

export default Input