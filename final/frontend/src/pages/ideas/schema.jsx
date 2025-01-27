import * as yup from "yup";

export const cardSchema = yup.object().shape({
    category: yup.string()
        .required("A categoria é obrigatório")
        .max(15, "A categoria deve ter no máximo 15 caracteres"),

    text: yup.string()
        .required("A descrição é obrigatória")
        .max(150, "A descrição deve ter no máximo 150 caracteres"),
});