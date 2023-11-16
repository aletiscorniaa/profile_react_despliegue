import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";

const Formulario = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const password = React.useRef({});
    password.current = watch("password", "");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const validatePassword = (value) => {
        if (value === password.current) {
            return true;
        } else {
            return "Las contraseñas no coinciden";
        }
    };


    const onSubmit = (data) => {
        console.log(data);
        setShowSuccessMessage(true);
    }
    return (
        <div className="container mt-5">
            {showSuccessMessage && <Alert variant="success">¡El formulario se envió con éxito!</Alert>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input className="form-control" type="text" {...register("nombre", {
                        required: "Nombre requerido",
                        pattern: {
                            value: /^[A-Za-z]+$/i,
                            message: "El nombre debe incluir solo letras"
                        }
                    })} />
                    {errors.nombre && <p>{errors.nombre.message}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="nombre">Apellido:</label>
                    <input className="form-control" type="text" {...register("apellido", {
                        required: "Apellido requerido",
                        pattern: {
                            value: /^[A-Za-z]+$/i,
                            message: "El apellido debe incluir solo letras"
                        }
                    })} />
                    {errors.apellido && <p>{errors.apellido.message}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input className="form-control" type="mail" {...register("email", { required: "Email requerido" })} />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Contraseña:</label>
                    <input className="form-control" type="password" {...register("password", { required: "Contraseña requerida" })} />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Confirmar Contraseña:</label>
                    <input className="form-control" type="password" {...register("secpass", { required: "Confirmar contraseña requerida", validate: validatePassword })} />
                    {errors.secpass && <p>{errors.secpass.message}</p>}
                </div>

                <div className="mb-3 mt-3">
                    <button className="btn btn-primary" type="submit" disabled={Object.keys(errors).length > 0}>Enviar</button>
                </div>
            </form>
        </div>
    );
}

export default Formulario;
