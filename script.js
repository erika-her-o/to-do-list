//concepto de clase permite agregar objetos
class TaskManager {
    tasks = [];
    lastId = 0;
    tagTasks = null;
    tagText = null;
    nameLabelStorage = "tasks";

    constructor(tagTasks, tagText) {

        this.tagTasks = tagTasks;
        this.tagText = tagText;

        if (localStorage.getItem(this.nameLabelStorage) !==null) {
            this.tasks = JSON.parse(localStorage.getItem(this.nameLabelStorage));
            this.lastId = this.tasks.length > 0 ?
                        this.tasks[this.tasks.length -1].id : 0;
            this.refresh();
        }
    }

    //agregar elemento y que se incremente
    // ({--}) <= es un objeto anonimo
    // localStorage.getItem() = va a setiar o guardar un valor, reemplazar si ya existe
    
    // localStorage.getItem(this.nameLebelStorage,JSON.stringify(this.tasks));
    // primer parametro se puede llamar con un string
    // el segundo parametro "JSON.stringify(this.tasks));" es el valor de las tareas
    add() {
        this.lastId++;
        this.tasks.push({
            id: this.lastId,
            text:  this.tagText.value
        });
        localStorage.setItem(this.nameLabelStorage,
            JSON.stringify(this.tasks));

        //para cuando se guarde el texto , el texto se borre
        this.tagText.value = "";
        this.tagText.focus();
        this.refresh();
    }

    //con filter creara otro arreglo, sustituye al de origen en este caso a "this.tasks"
    // es inmutable osea no cambia el elemento origen
    remove(id) {
        this.tasks = this.tasks.filter(e => e.id !==id);
        localStorage.setItem(this.nameLabelStorage,
            JSON.stringify(this.tasks));
            this.refresh();
    }

        // refresh mostrara la información recibida de this.tagTasks
        // forEach hará todos los recorridos de task
    refresh() {
        this.tagTasks.innerHTML = "";

        this.tasks.forEach(e=>{
            let div = document.createElement("div");
            let divRemove = document.createElement("div");
            let buttonRemove = document.createElement("input");

            // div por elemento
            div.innerHTML = e.text;

            // div del boton
            divRemove.className="divButton";

            // botón
            buttonRemove.value="X";
            buttonRemove.className = "btn-danger";
            buttonRemove.type = "button";
            buttonRemove.addEventListener("click",() => {
                this.remove(e.id);
            })

            divRemove.appendChild(buttonRemove);
            div.appendChild(divRemove);

            // agregar
            this.tagTasks.appendChild(div);

        });

    }
}