const Node = require('./node');

class LinkedList {
    constructor() {
        this.list = null;
        this.length = 0;
    }

    append(data) {
        if(!this.list){
            this.list = [];

            this.list.push( new Node(data) );
            this._head = this.list[0];
            this._tail = this.list[this.list.length-1];
            this.length = this.list.length;
        } else {
            this.list[this.length-1].next = this.length;
            this.list.push( new Node(data,this.length-1) );
            this.length = this.list.length;
            this._tail = this.list[this.list.length-1];
        }

        return this;
    }

    head() {
        return this._head? this._head.data: null;
    }

    tail() {
        return this._tail? this._tail.data: null;
    }

    at(index) {
        return this.list[index].data;
    }

    insertAt(index, data) {
        if(!this.list){this.list = []}
        if(index === 0){
            this.list.unshift(new Node(data,null,1));
            this.length = this.list.length;
        }else{
            this.list.splice(index ,0,new Node(data,index - 1,index+1));
            this.length =this.list.length;
        }
        this.list.forEach(function(it,ind,arr){
            if(ind > index){
                it.prev = ind - 1;
                it.next = (ind === (arr.length-1))? null: ind +1;
            }
        });

        this._head = this.list[0];
        this._tail = this.list[this.list.length-1];

        return this;
    }

    isEmpty() {
        return this.length === 0;
    }

    clear() {
        this.list = null;
        this.length = 0;
        this._head = null;
        this._tail = null;

        return this;
    }

    deleteAt(index) {
        this.list.splice(index,1);
        this.length = this.list.length;
        
        this.list.forEach(function(it,ind,arr){
            if(ind >= index){
                it.prev = (ind === 0)? null: ind - 1;
                it.next = (ind === arr.length-1)? null: ind + 1;
            }
        });

        this._head = this.list[0];
        this._tail = this.list[this.list.length-1];

        return this;
    }

    reverse() {
        this.list.reverse();
        this.list.forEach(function(it,ind, arr){
            it.prev = (ind === 0)? null: ind-1;
            it.next = (ind === arr.length-1)? null: ind+1;
        });

        this._head = this.list[0];
        this._tail = this.list[this.list.length-1];

        return this;
    }

    indexOf(data) {
        let index = -1

        for(let i=0,len = this.list.length; i < len; i++){
            if(this.list[i].data === data){
                index = i;
                break;
            }
        }

        return index;
    }
}

module.exports = LinkedList;
