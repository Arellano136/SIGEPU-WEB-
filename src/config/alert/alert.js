import Swal from 'sweetalert2';
import withReactContent  from 'sweetalert2-react-content';

const AlertClient = withReactContent(Swal);
//Mensajes definidos tanto para sucess,para error ,como para confirmar algo 

//Alerta definada de error,success,confirm
export const customAlert = (title,text,icon) =>{
    return AlertClient.fire({
        title,
        text,
        icon,
        confirmButtonColor:"#3085d6",
        confirmButtonText:'Aceptar',
    });
};