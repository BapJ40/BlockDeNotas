const btn = document.querySelector(".boton-circula");
btn.addEventListener("click", () => {
    newVist()
})

function newVist(){
    const textoNotas = JSON.parse(localStorage.getItem("textoNotas")) || [];
    const newHtml = `
    <html>
    <head>
        <title> Nueva Nota </title>
        <link rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    </head>
    <body class="azul-clarito">
    <header class="encabezado">
        <span class="material-symbols-outlined flechita">
            arrow_back
            </span>
        <h1>Nueva Nota</h1>
    </header>
    <textarea placeholder="En que estas pensando?"></textarea>
    <button class="btnGuardar">Guardar</button>
    </body>
    </html>
    `
    document.open();
    document.write(newHtml);
    document.close();
    
    const btnPaTra = document.querySelector(".flechita");
    btnPaTra.addEventListener("click", () => {
    document.location.reload();
    })

    const btnGuardar = document.querySelector(".btnGuardar");
    btnGuardar.addEventListener("click", () => {
        const textoDeLaNota = document.querySelector("textarea").value;
    if(textoDeLaNota){
        const textoNota = document.querySelector("textarea").value;
        textoNotas.push(textoNota);
        
        localStorage.setItem("textoNotas", JSON.stringify(textoNotas));

        // agregar funcion aqui de guardar boton y que cree un modal o un anuncio
        alert("Nota guardada con exito");
        document.location.reload()        
    } else {
        alert("Debes escribir algo antes de guardar");
    }       
        
    })    
}

//Mostramos las notas que tenemos

//pasamos las notas a un arreglo
const notasString = localStorage.getItem("textoNotas");
const textoNotas = JSON.parse(notasString);

//por cada nota que esta en arreglo va hacer esto
textoNotas.forEach((nota, index)=> {
    //Creamo el div que donde van a ir las notas    
    const muestraDeNotas = document.createElement("div");
    //agregamos la clase
    muestraDeNotas.classList.add("muestra-notas");
    //Agregamos un id a cada div
    muestraDeNotas.setAttribute("id", index.toString());
    // un onclick para agregarle la funcion de poder editar la nota
    muestraDeNotas.setAttribute("onclick", `editaNota(${index})`);
    //Agregamos el texto que tiene la nota agrega solo la primera línea de la nota
    const primerosCaracteres = nota.substring(0, 96);
    muestraDeNotas.textContent = primerosCaracteres + "...";
    //busca el div padre para introducirlo dentro de el. UPAAAA
    const contenedorNotas = document.querySelector(".Contenedor-notas");
    //y por ultimo agregamos el div
    contenedorNotas.appendChild(muestraDeNotas);
    
});

function editaNota(index){
    const textoNota = textoNotas[index];
    const newHtml = `
    <html>
    <head>
        <title> Editar Nota </title>
        <link rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    </head>
    <body class="azul-clarito">
    <header class="encabezado">
        <span class="material-symbols-outlined flechita">
            arrow_back
            </span>
        <h1>Editar Nota</h1>
    </header>
    <textarea>${textoNota}</textarea>
    <div class="caja-btn">
    <button class="btnBorrar">Borrar</button>
    <button class="btnActualizar">Actualizar</button>
    </div>
    </body>
    </html>
    `
    document.open();
    document.write(newHtml);
    document.close();

    const btnPaTra = document.querySelector(".flechita");
    btnPaTra.addEventListener("click", () => {
    document.location.reload();
    })
    
    const btnActualizar = document.querySelector(".btnActualizar");
    btnActualizar.addEventListener("click", () => {
        const textoDeLaNota = document.querySelector("textarea").value;
        if(textoDeLaNota){
            const textoNota = document.querySelector("textarea").value;
            textoNotas[index] = textoNota;
        
            localStorage.setItem("textoNotas", JSON.stringify(textoNotas));

            alert("Nota actulizada con exito");
            document.location.reload();
        } else{
            alert("No puedes dejar la nota vacia")
        }

    })

    const btnBorrar = document.querySelector(".btnBorrar")
    btnBorrar.addEventListener("click", () => {
        if (confirm("¿Estas seguro de querer borrar esta nota?")) {
            borrarNota(index);
        }
    });
}
function borrarNota(index){
    textoNotas.splice(index, 1);
    localStorage.setItem("textoNotas", JSON.stringify(textoNotas));
    document.location.reload();
}