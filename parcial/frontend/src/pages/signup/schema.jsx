import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
    fullname: yup.string().required('O nome completo é obrigatório'),
    email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    password: yup.string()
        .min(6, 'A senha deve ter pelo menos 6 caracteres')
        .required('Senha é obrigatória'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'As senhas não conferem')
        .required('Confirmação de senha é obrigatória')
});

// Helper function to remove confirmPassword
export const getApiData = (formData) => {
    const { confirmPassword, ...apiData } = formData;
    return apiData;
};