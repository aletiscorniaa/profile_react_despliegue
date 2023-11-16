import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Form, Button } from "react-bootstrap";

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
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label htmlFor="nombre">Nombre:</Form.Label>
                    <Form.Control type="text" {...register("nombre", {
                        required: "Nombre requerido",
                        pattern: {
                            value: /^[A-Za-z]+$/i,
                            message: "El nombre debe incluir solo letras"
                        }
                    })} />
                    {errors.nombre && <p>{errors.nombre.message}</p>}
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="nombre">Apellido:</Form.Label>
                    <Form.Control type="text" {...register("apellido", {
                        required: "Apellido requerido",
                        pattern: {
                            value: /^[A-Za-z]+$/i,
                            message: "El apellido debe incluir solo letras"
                        }
                    })} />
                    {errors.apellido && <p>{errors.apellido.message}</p>}
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="email">Correo Electrónico:</Form.Label>
                    <Form.Control type="mail" {...register("email", { required: "Email requerido" })} />
                    {errors.email && <p>{errors.email.message}</p>}
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="email">Contraseña:</Form.Label>
                    <Form.Control type="password" {...register("password", { required: "Contraseña requerida" })} />
                    {errors.password && <p>{errors.password.message}</p>}
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="email">Confirmar Contraseña:</Form.Label>
                    <Form.Control className="form-control" type="password" {...register("secpass", { required: "Confirmar contraseña requerida", validate: validatePassword })} />
                    {errors.secpass && <p>{errors.secpass.message}</p>}
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3 mb-3" disabled={Object.keys(errors).length > 0}>Enviar</Button>
            </Form>
        </div>
    );
}

export default Formulario;
