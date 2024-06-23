// src/Components/UI/SwalAlert/StandartSwalAlert.js
import Swal from 'sweetalert2';

const StandartSwalAlert = ({ title, titleText, text, icon, position = 'top', timer = 5000, showConfirmButton, showCancelButton, confirmButtonText, cancelButtonText, showClass, hideClass }) => {
    return Swal.fire({
        title,
        titleText,
        text,
        icon,
        position,
        showConfirmButton,
        showCancelButton,
        confirmButtonText,
        cancelButtonText,
        timer,
        showClass,
        hideClass
    });
};

export default StandartSwalAlert;

