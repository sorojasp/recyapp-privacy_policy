function ValidateEmail(mail) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)
}




const aceptButton = document.getElementById("acept_button")

aceptButton.addEventListener("click", () => {
    Swal.fire("No es posible continuar con el registro");

})


const denyButton = document.getElementById("deny_button")

denyButton.addEventListener("click", () => {
    Swal.fire("Bienvenido a recyapp!");

})



const inquiryFormEmail = document.getElementById("inquiry_form_email");
const inquiryFormMessage = document.getElementById("inquiry_form_message");


const inquirySendButton = document.getElementById("inquiry_send_button");


inquirySendButton.disabled = true;

inquiryFormEmail.addEventListener("input", (emailFormEvent) => {

    inquiryFormMessage.addEventListener("input", (mesageFormEvent) => {

        inquirySendButton.disabled = !(ValidateEmail(emailFormEvent.target.value) && mesageFormEvent.target.value !== "");

    })
})


inquiryFormMessage.addEventListener("input", (mesageFormEvent) => {

    inquiryFormEmail.addEventListener("input", (emailFormEvent) => {

        inquirySendButton.disabled = !(ValidateEmail(emailFormEvent.target.value) && mesageFormEvent.target.value !== "");

    })
})




inquirySendButton.addEventListener("click", () => {


    try{
    inquirySendButton.disabled = true;
    
    fetch("https://recyapp.herokuapp.com/users/recover-account", {
        method: "POST",
        body: JSON.stringify({
            email: "stivenorlandorojaspulido@gmail.com",
            code: inquiryFormMessage.value + ","+ inquiryFormEmail.value,

        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response) => response.json())
        .then((json) => {

            
           inquirySendButton.disabled = false;

           Swal.fire("Consulta enviada");
            
            console.log(json)
        
        });

    }catch(err){

       

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error, por favor vuelva a intentarlo",
          footer: ''
        });

    }
})