class Operacao {
    constructor(descricao, valor, saldo, numero) {
        this.descricao = descricao;
        this.valor = valor;
        this.saldo = saldo;   
        this.numero = numero;
    }

    detalhes() {
        const infosConta = document.querySelector('.infosConta');
        const infosSaldo = document.querySelector('.infosSaldo');
        const extrato = document.querySelector('.list');
        const node = document.createElement('li');
        const infoExtratoDescricao = document.createElement('p');
        const infoExtratoValor = document.createElement('p');
        const infoExtratoSaldo = document.createElement('p');

        extrato.appendChild(node);
        node.appendChild(infoExtratoDescricao);
        node.appendChild(infoExtratoValor);
        node.appendChild(infoExtratoSaldo);

        this.verificaDescricao(this.descricao, infoExtratoValor);
        this.verificaSaldo(this.saldo, infoExtratoSaldo);
        this.verificaSaldo(this.saldo, infosSaldo);

        infoExtratoDescricao.innerHTML = `${this.descricao}`;
        infoExtratoValor.innerHTML = `${this.valor}`;
        infoExtratoSaldo.innerHTML = `${this.saldo}`;
        infosConta.innerHTML = `Conta: ${this.numero}`
        infosSaldo.innerHTML = `Saldo: ${this.saldo}`
    }

    verificaDescricao(descricao, item) {
        if(descricao === "depósito" || descricao === "extorno") {
            item.style.color = "#0ec27d";
            item.style.fontWeight = "bolder";
        }else{
            item.style.color = "#c0392b";
            item.style.fontWeight = "bolder";
        }
    }

    verificaSaldo(saldo, item) {
        if(saldo > 0) {
            item.style.color = "#0ec27d";
            item.style.fontWeight = "bolder";
        }else{
            item.style.color = "#c0392b";
            item.style.fontWeight = "bolder";
        }
    }
}

class ContaBancaria {

    constructor(numero) {
        this.saldo = 0;
        this.numero = numero;
    }

    verificaConta(conta) {
        this.numero = conta;
        const validate = document.querySelector('.contentConta label');
        if(this.numero > 0) {
            validate.classList.add('active');
            return true;
        }else{
            validate.classList.remove('active');
            return false;
        }
    }

    depositar(deposito) {
        if(deposito < 0) {
            alert("ERRO: O valor que digitou é incompatível com a ação desejada");
            return;
        }else{
            this.saldo += Number.parseFloat(deposito);
            let operacao = new Operacao("depósito", `+${deposito}`, this.saldo, this.numero);
            return operacao.detalhes();
        }
    }

    debito(debito) {
        this.saldo -= Number.parseFloat(debito);
        let operacao = new Operacao("débito", `-${debito}`, this.saldo, this.numero);
        return operacao.detalhes();
    }

    tarifa(tarifa) {
        this.saldo -= Number.parseFloat(tarifa);
        let operacao = new Operacao("tarifa", `-${tarifa}`, this.saldo, this.numero);
        return operacao.detalhes();
    }

    saque(saque) {
        const result = document.querySelector('.result');
        if(saque > this.saldo) {
            var alert = document.createElement('h4');
            result.appendChild(alert);
            alert.innerHTML = `Saldo insuficiente`
            return result;
        }

        let resultH4 = document.querySelectorAll('h4');
        if(resultH4 !== null || resultH4 !== undefined) {
            resultH4.forEach(item => {
                item.remove();
            })
        }

        this.saldo -= Number.parseFloat(saque);
        let operacao = new Operacao("saque", `-${saque}`, this.saldo, this.numero);
        return operacao.detalhes();
    }

    extornar(pos) {
        const itensLista = document.querySelectorAll('.list li');

        itensLista.forEach((item, index) => {

            const result = document.querySelector('.result');

            if(Number.parseInt(pos) === index) {

                if(item.firstChild.textContent !== "tarifa") {
                    var alert = document.createElement('h4');
                    result.appendChild(alert);
                    alert.innerHTML = `A operação ${pos} indicada não é uma tarifa`
                    return result;
                }

                let resultH4 = document.querySelectorAll('h4');
                if(resultH4 !== null || resultH4 !== undefined) {
                    resultH4.forEach(item => {
                        item.remove();
                    })
                }

                var extorno = Number.parseInt(item.firstChild.nextSibling.textContent.replace("-",""));
                this.saldo += extorno;
                let operacao = new Operacao("extorno", `+${extorno}`, this.saldo, this.numero);
                return operacao.detalhes();

            }
        })
    }

    exibirConta() {
        return console.log(this.numero);
    }

    iniciar() {
        this.verificaConta();
    }
}

const confirm = document.querySelector('.confirm');
const conta = new ContaBancaria(0);

confirm.addEventListener('click', () => {
    const numeroConta = document.querySelector('.contaNumero').value;
    const action = document.querySelector('.acoes').value;
    const valor = document.querySelector('.valor').value;
    
    if(conta.verificaConta(numeroConta)) {
        switch (action) {
            case "Depositar":
                conta.depositar(valor);
                break;
            case "Débito":
                conta.debito(valor);
                break;
            case "Tarifa":
                conta.tarifa(valor);
                break;
            case "Saque":
                conta.saque(valor);
                break;
            case "Extornar":
                conta.extornar(valor);
                break;
            default:
                break;
        }
    }else{
        alert("Digite o número da conta")
    }
})