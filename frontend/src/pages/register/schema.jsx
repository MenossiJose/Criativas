import * as yup from "yup";

export const registerSchema = yup.object().shape({
    first_name: yup.string().required("O primeiro nome é obrigatório"),
    last_name: yup.string().required("O segundo nome é obrigatória"),
    email: yup
        .string()
        .required("O email é obrigatório")
        .email("O email digitado é inválido"),
    date_of_birth: yup
        .date()
        .required("Data de Aniversário é obrigatória"),
    password: yup.string().required("A senha é obrigatória"),
});