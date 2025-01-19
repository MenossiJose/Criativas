import * as yup from "yup";

export const cardSchema = yup.object().shape({
    category: yup.string().required("A categoria é obrigatório"),
    text: yup.string().required("A descrição é obrigatória"),
});