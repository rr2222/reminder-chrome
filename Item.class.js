class Item {

    constructor(titulo, descricao, createdDate, finalDate){
        this.titulo = titulo;
        this.descricao = descricao;
        this.created = createdDate;
        this.finalDate = finalDate;
    }
   
    get _titulo(){
        return this.titulo;
    }

    set _titulo(titulo){
        this.titulo = titulo;
    }

    get _descricao(){
        return this.descricao;
    }

    set _descricao(descricao){
        this.descricao = descricao;
    }

    get _createdDate(){
        return this.created;
    }

    get _finalDate(){
        return this.finalDate;
    }

    set _finalDate(finalDate){
        this.finalDate = finalDate
    }

}