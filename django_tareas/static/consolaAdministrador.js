function editarUsuario(button)
{
    

    /*
    PREGUNTA 3
    Capturar informacion del usuario desde base de datos y llenar
    inputs dentro de la ventana modal de editar usuario, permiter que
    el usuario pueda editar los datos. No olvida de cargar el ID en el innerHTML
    dentro del elemento H1 cuyo id es cargaId

    Los campos a editar son:
    Nro de celular
    Profesion del usuario

    El resto de campos:
    Nombre
    Apellido
    Email
    Fecha Ingreso
    Colocarlos como solo lectura (propiedad readonly en el tag HTML)
    
    */
    var row = button.closest('tr');
    var columns = row.getElementsByTagName('td');

    var userId = button.getAttribute('data-user-id'); // Obtener el ID del usuario
    var firstName = columns[0].innerText;
    var lastName = columns[1].innerText;
    var nroCelular = columns[2].innerText;
    var FechaIngreso = columns[3].innerText;
    var email = button.getAttribute('data-email');
    var profesion = button.getAttribute('data-profesion');

    // Llenar campos de edición
    document.getElementById('userid').innerText = userId;
    document.getElementById('fechaIngreso').value = FechaIngreso;
    document.getElementById('nombreUsuario').value = firstName;
    document.getElementById('apellidoUsuario').value = lastName;
    document.getElementById('emailUsuario').value =email;
    document.getElementById('profesionUsuario').value = profesion;
    document.getElementById('nroCelular').value = nroCelular;
   
}

function actualizarUsuario()
{
    /*
    PREGUNTA 4
    Capturar los datos de los campos input's de la ventana de editar usuario,
    el id del usuario lo puedes capturar de la carga realizada en el elemento
    H1 cuyo id es cargaId. Con los datos capturados postearlos en la base de datos
    y actualizar la informacion del usuario
    */
    var userId = document.getElementById('userid').innerText;
    var nuevoNroCelular = document.getElementById('nroCelular').value;
    var nuevaProfesion = document.getElementById('profesionUsuario').value;

    // Crear un objeto con los datos a enviar
    var datos = {
        userId: userId,
        nroCelular: nuevoNroCelular,
        profesion: nuevaProfesion
    };
    fetch('/actualizarUsuario',{
        method:"POST",
        headers:{
            "X-Requested-With":"XMLHttpRequest",
            "X-CSRFToken": getCookie("csrftoken"),
        },
        body:JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
}

function getCookie(name)
{
    let cookieValue = null;
    if(document.cookie && document.cookie !== "")
    {
        const cookies = document.cookie.split(';');
        for(let i = 0; i < cookies.length; i++)
        {
            const cookie = cookies[i].trim();
            if(cookie.substring(0,name.length + 1) === (name + "="))
            {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue 
}
